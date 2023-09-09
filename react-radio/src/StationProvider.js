import React, { useState, useEffect, createContext, useContext } from "react";

const StationContext = createContext();
export const useStationData = () => useContext(StationContext);

export default function StationProvider ({children, socket}) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [stations, setStations] = useState({stations: []});
    const [playingNow, setPlayingNow] = useState({playing: null});

    useEffect(() => {
        function onConnect() {
            console.log('connected');
            setIsConnected(true);
        }
        function onDisConnect() {
            console.log('disconnected');
            setIsConnected(false);
        }
        function onReceiveStations(msg) {
            //console.log("msg:", msg);
            setStations(msg);
        }
        function onReceivePlayingNow(msg) {
            setPlayingNow(msg);
        }
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisConnect);
        socket.on("onReceiveStations", onReceiveStations);
        socket.on("onReceivePlayingNow", onReceivePlayingNow);
        socket.emit("all stations");
        socket.emit("playing now");

        return () => {
            socket.off("connect", onConnect);
            //socket.off("disconnect", onDisConnect);
            //socket.off("onReceiveStations", onReceiveStations);
        };
    }, []);

    return (
        <StationContext.Provider value={{isConnected, stations, playingNow}}>
            {children}
        </StationContext.Provider>
    )
}
