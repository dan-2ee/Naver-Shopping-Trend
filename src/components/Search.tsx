import React, {useRef, useState} from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "./Search.css"
import "react-datepicker/dist/react-datepicker.css";


function Search(): any {
    const device = [
        { value: "pc", name: "PC" },
        { value: "mo", name: "Mobile" },
        { value: "", name: "설정 안 함" },
    ];
return (
    <select>
        {device.map((device) => (
            <option
                key={device.value}
                value={device.value}>
                {device.name}
            </option>
        ))}
    </select>

);
}
export default Search;
    /*let request:any = require('request');
    const ID_KEY = 'hxWEKjmbZxVIP1xj0sB0';
    const SECRET_KEY = 'SZbL1NRx9W';
    let api_url = 'https://openapi.naver.com/v1/datalab/shopping/categories';
    let request_body = {
        "startDate": "2017-08-01",
        "endDate": "2017-09-30",
        "timeUnit": "month",
        "category": [
            {"name": "패션의류", "param": ["50000000"]},
            {"name": "화장품/미용", "param": ["50000002"]}
        ],
        "device": "pc",
        "ages": ["20", "30"],
        "gender": "f"
    };

    request.post({
            url: api_url,
            body: JSON.stringify(request_body),
            headers: {
                'X-Naver-Client-Id': ID_KEY,
                'X-Naver-Client-Secret': SECRET_KEY,
                'Content-Type': 'application/json'
            }
        },

        function (error: any, response: { statusCode: any; }, body: any) {
            console.log(response.statusCode);
            console.log(body);
        });
*/

