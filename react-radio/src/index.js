import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { io } from "socket.io-client";
import StationProvider from "./StationProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
// Development:
const socket = io("/", {
  transport:['websocket', 'polling'],
  path: `${API_ENDPOINT}/socket.io`
});
// Production:
//const socket = io(`${API_ENDPOINT}`);

root.render(
  <React.StrictMode>
    <StationProvider socket={socket}>
      <App />
    </StationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
