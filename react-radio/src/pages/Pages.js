import React from "react";
import RadioPage from "./RadioPage";
import YoutubePage from "./YoutubePage";
import Whoops404Page from "./Whoops404Page";

import StationProvider from "../providers/StationProvider";
import YoutubeProvider from "../providers/YoutubeProvider";

export function Radio() {
    return (
        <StationProvider>
            <RadioPage />
        </StationProvider>
    );
}

export function Youtube() {
    return (
        <YoutubeProvider>
            <YoutubePage />
        </YoutubeProvider>
    );
}

export function Whoops404() {
    return (
        <Whoops404Page />
    );
}
