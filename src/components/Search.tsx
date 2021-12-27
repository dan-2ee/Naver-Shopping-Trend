import React, {useState} from "react";
import axios from 'axios';
import "./Search.css"
import {
    Line,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
//import {ChildProps} from "../routes/Main";


//function Search({startDate, endDate, category, keyword, timeUnit, gender, device, ages}: ChildProps): any {
function Search(): any {
    const searchData = {
        "startDate": "2020-11-01",
        "endDate": "2021-01-31",
        "timeUnit": "month",
        "results": [
            {
                "title": "정장",
                "keyword": [
                    "정장"
                ],
                "data": [
                    {
                        "period": "2020-11-01",
                        "ratio": 9.64749,
                        "group": "10"
                    },
                    {
                        "period": "2020-11-01",
                        "ratio": 100,
                        "group": "20"
                    },
                    {
                        "period": "2020-12-01",
                        "ratio": 7.94681,
                        "group": "10"
                    },
                    {
                        "period": "2020-12-01",
                        "ratio": 62.77056,
                        "group": "20"
                    },
                    {
                        "period": "2021-01-01",
                        "ratio": 6.80272,
                        "group": "10"
                    },
                    {
                        "period": "2021-01-01",
                        "ratio": 67.16141,
                        "group": "20"
                    }
                ]
            }
        ]
    }

    const dataLen = searchData.results.map((data) => data.data.length)[0];   //"data" length
    const dateList:string[] = []   //date list, 중복 x
    for (let i = 0; i < dataLen; i++) {
        const date:any = searchData.results.map((data) => data.data[i]['period']);
        if (!(dateList.includes(date[0]))) {
            dateList.push(date[0])
        }
    }

    const count = 0
    for (let x in dateList) {
        for (let i=0; i<2; i++) {    //todo: age 리스트 길이에 따라 반복 횟수 달라지도록
            const temp = searchData.results.map((data) => data.data[i]);
        }

    }
    /*
    for (let i=0; i<dataLen; i++) {
        const dateArr:any = searchData.results.map((data) => data.data[i]['period'][0]);
        const date = dateArr[0]
        while()
    }*/


    /*
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
    console.log(searchData)*/
    /*return (
        <LineChart width={750} height={100} data={searchData}
                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ratio" stroke="#8884d8" />
        </LineChart>
    )*/
}
export default Search;


