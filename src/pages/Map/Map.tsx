import React, {useEffect, useState} from 'react';
import './Map.scss';
import axios from "axios";

export default function Map(){
    const coordinateChurchs = [
        [40.730610, -73.935242],
        [41.881832,-87.623177],
        [42.361145, -71.057083],
        [37.804363, -122.271111],
    ];
    const [City, setCity] = useState<string>("0");
    const [Churchs, setChurchs] = useState();
    useEffect(() => {document.title = "Map";}, []);

    useEffect(()=>{
        getChurchs();
    }, [City])

    async function getChurchs() {
        let arrBuf:any = [];
        let flag = true;
        let i = 1;
        while (i < 2) {
            let response = await axios.get(`https://apiv4.updateparishdata.org/Churchs/?lat=${coordinateChurchs[+City][0]}&long=${coordinateChurchs[+City][1]}&pg=${i}`);
            if (response.data.length < 30)
                flag = false;
            arrBuf = arrBuf.concat(response.data);
            i++;
        }
        setChurchs(arrBuf);
    }

    return (
        <div className="Map--container">
            <select defaultValue={0} onChange={(e) => setCity(e.target.value)}>
                <option value="0">New York</option>
                <option value="1">Chicago</option>
                <option value="2">Boston</option>
                <option value="3">Oakland</option>
            </select>
        </div>
    );
};
