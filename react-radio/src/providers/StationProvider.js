import React, { useState, useEffect, createContext, useContext } from "react";
import { useSocket } from "./SocketProvider";

const StationContext = createContext();
export const useStationData = () => useContext(StationContext);

export default function StationProvider ({children}) {
    const { socket, isConnected } = useSocket();
    const [stations, setStations] = useState({stations: []});
    const [playingNow, setPlayingNow] = useState({});
    const [currentStation, setCurrentStation] = useState({});

    useEffect(() => {
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
        socket.on("onReceiveStations", onReceiveStations);
        socket.on("onReceivePlayingNow", onReceivePlayingNow);
        socket.on("onReceiveCurrentStation", onReceiveCurrentStation);
        socket.emit("all stations");
        socket.emit("playing now");
        socket.emit("current station");

    }, []);

    return (
        <StationContext.Provider value={{isConnected, stations, playingNow, currentStation}}>
            {children}
        </StationContext.Provider>
    )
}
