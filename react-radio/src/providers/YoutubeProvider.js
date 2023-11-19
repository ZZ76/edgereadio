import React, { useState, useEffect, createContext, useContext } from "react";
import { useSocket } from "./SocketProvider";

const YoutubeContext = createContext();
export const useYoutubeData = () => useContext(YoutubeContext);

export default function YoutubeProvider ({children}) {
    const { socket, isConnected } = useSocket();
    const [player, setPlayer] = useState({});
    const [media, setMedia] = useState({});

    useEffect(() => {
        function onReceiveMedia(msg) {
            //console.log(msg);
            //console.log(msg.json);
            setMedia(msg);
        }
        function onReceivePlayer(msg) {
            setPlayer(msg);
        }
        socket.on("onReceive Youtube Media", onReceiveMedia);
        socket.on("onReceive Youtube Player", onReceivePlayer);
        socket.emit("Youtube Media");
        socket.emit("Youtube Player");

    }, []);

    return (
        <YoutubeContext.Provider value={{isConnected, media, player}}>
            {children}
        </YoutubeContext.Provider>
    )
}
