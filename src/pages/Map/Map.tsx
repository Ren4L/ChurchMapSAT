import React, {useEffect, useState} from 'react';
import './Map.scss';
import axios from "axios";
import * as Yandex from '@pbe/react-yandex-maps';
import ChurchImg from "./Custom-Icon-Design-Happy-Easter-Church.512.png";

export default function Map(){
    const coordinateCity = [
        [40.730610, -73.935242],
        [41.881832,-87.623177],
        [42.361145, -71.057083],
        [37.804363, -122.271111],
    ];
    const [City, setCity] = useState<Array<number>>(coordinateCity[0]);
    const [Churchs, setChurchs] = useState([]);
    useEffect(() => {document.title = "Map";}, []);

    useEffect(()=>{
        getChurchs();
    }, [City])

    async function getChurchs() {
        let arrBuf:any = [];
        let flag = true;
        let i = 1;
        while (i < 2) {
            let response = await axios.get(`https://apiv4.updateparishdata.org/Churchs/?lat=${City[0]}&long=${City[1]}&pg=${i}`);
            if (response.data.length < 30)
                flag = false;
            arrBuf = arrBuf.concat(response.data);
            i++;
        }
        setChurchs(arrBuf);
    }

    return (
        <div className="Map--container">
            <div className="Map--ContentBox">
                <select className="Map--select" defaultValue={0} onChange={(e) => setCity(coordinateCity[+e.target.value])}>
                    <option value="0">New York</option>
                    <option value="1">Chicago</option>
                    <option value="2">Boston</option>
                    <option value="3">Oakland</option>
                </select>
            </div>
            <Yandex.YMaps
                query={{
                    ns: "use-load-option",
                    load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
                }}>
                <Yandex.Map className="Map--YandexMap" state={{center:City, zoom: 15}} >
                    {Churchs.map((el)=>{
                        let ballonContent = "";
                        if (el.name) ballonContent += `<strong>Name: </strong><div>${el.name}</div>`;
                        if (el.church_address_street_address) ballonContent += `<strong>Address: </strong><div>${el.church_address_street_address}</div>`;
                        if (el.phone_number) ballonContent += `<strong>Phone: </strong><div>${el.phone_number}</div>`;
                        if (el.url) ballonContent += `<strong>Site: </strong><a href="${el.url}" target="_blank">${el.url}</a>`;


                        return <Yandex.Placemark geometry={[el?.latitude, el?.longitude]}
                                          options={{
                                              iconLayout: 'default#image',
                                              iconImageHref: ChurchImg,
                                              iconImageSize: [42, 42],
                                              iconImageOffset: [-5, -38]
                                          }}
                                          properties={{
                                              balloonContentBody:ballonContent
                                          }}
                                          key={el.resultID}
                        />;
                    })}
                </Yandex.Map>
            </Yandex.YMaps>
        </div>
    );
};
