import React, { useState, useEffect, createContext, useContext } from "react";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({children, socket})
{
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            console.log('connected');
            setIsConnected(true);
        }
        function onDisconnect() {
            console.log('disconnected');
            setIsConnected(false);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
        };
    }, []);

    return (
        <SocketContext.Provider value={{socket, isConnected}}>
            {children}
        </SocketContext.Provider>
    )
}
