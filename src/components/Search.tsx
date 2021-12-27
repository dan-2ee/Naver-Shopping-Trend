import React, {useState} from "react";
import axios from 'axios';
import "./Search.css"

function Search(): any {

    const [searchData, setState] = useState("");

    const getShoppingData = async () => {
        const data = JSON.stringify({
            "startDate": "2017-08-01",
            "endDate": "2017-09-30",
            "timeUnit": "month",
            "category": "50000000",
            "keyword": "정장",
            "device": "",
            "gender": "",
            "ages": []
        });

        const config : any = {
            method: 'post',
            // package.json 파일에 "proxy":"https://openapi.naver.com" 추가 ->  CORS ERROR 방지
            url: '/v1/datalab/shopping/category/keyword/age',
            headers: {
                'X-Naver-Client-Id': 'hxWEKjmbZxVIP1xj0sB0',
                'X-Naver-Client-Secret': 'SZbL1NRx9W',
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                // 성공했을 때
                setState(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    getShoppingData();
    return (
        <div> </div>
    )
}
export default Search;


