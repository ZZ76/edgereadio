import React, { useState, useEffect, createContext, useContext } from "react";

const StationContext = createContext();
export const useStationData = () => useContext(StationContext);

export default function StationProvider ({children, socket}) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [stations, setStations] = useState({stations: []});
    const [playingNow, setPlayingNow] = useState({});
    const [currentStation, setCurrentStation] = useState({});

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
        function onReceiveCurrentStation(msg) {
            setCurrentStation(msg);
        }
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisConnect);
        socket.on("onReceiveStations", onReceiveStations);
        socket.on("onReceivePlayingNow", onReceivePlayingNow);
        socket.on("onReceiveCurrentStation", onReceiveCurrentStation);
        socket.emit("all stations");
        socket.emit("playing now");
        socket.emit("current station");

        return () => {
            socket.off("connect", onConnect);
            //socket.off("disconnect", onDisConnect);
            //socket.off("onReceiveStations", onReceiveStations);
        };
    }, []);

    return (
        <StationContext.Provider value={{isConnected, stations, playingNow, currentStation}}>
            {children}
        </StationContext.Provider>
    )
}
