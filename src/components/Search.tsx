import React, {useState} from "react";
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


// main에서 전달받을 검색 결과
type SearchProps ={
    searchData: any[]
}

function Search(searchData:SearchProps): any {

    //console.log(searchData)
    const example = [{
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
                    }]

    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        }
]
    const [result, setResult] = useState(searchData['searchData'])
    const [newData, setNewData] = useState<any>([])   //그래프 그리기 위한 새로운 데이터
    const [newDate, setNewDate] = useState<any>([])    //date만 빼놓은 리스트

    for (let i =0; i<searchData['searchData'].length; i++) {
        const date:any = searchData['searchData'][i]['period']
        if (!(newDate.includes(date))) setNewDate([...newDate, date])
    }

    const reDate = newDate.reverse()
    for (let date in reDate) {
        const [temp,setTemp]:any = []    //같은 날짜 ratio, group 묶어서 저장
        for (let i =0; i<searchData['searchData'].length; i++) {
            const data:any = searchData['searchData'][i]
            if (date === data['period']) {
                setTemp([...temp, {data['group']:data['ratio']}])
            }
        }
    }


    /*
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


    return (
            <LineChart id="chart" width={730} height={250} data={data}
                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
    )
}
export default Search;


