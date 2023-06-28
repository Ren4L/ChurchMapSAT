import React, {FC} from 'react';
import {BrowserRouter} from "react-router-dom";
import {Map} from "@pages";

const App:FC = () => {
    return (
        <BrowserRouter>
            <Map/>
        </BrowserRouter>
    );
};

export default App;