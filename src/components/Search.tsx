import React, {useEffect, useState} from "react";
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

    const [result, setResult] = useState(searchData['searchData'])
    const [newData, setNewData] = useState<any>([])   //그래프 그리기 위한 새로운 데이터
    const [newDate, setNewDate] = useState<any>([])    //date만 빼놓은 리스트
    const [ageGroup, setGroup] = useState<any>([])

    useEffect(() => {
        //date 값만 모아서 _temp에 저장
        let _temp:any[] = []
        console.log(searchData['searchData']);
        for (let i =0; i<searchData['searchData'].length; i++) {
            const date:any = searchData['searchData'][i]['period']
            if (!(_temp.includes(date))) {
                _temp = [..._temp, date];
            }
        }

        // const reDate = _temp.reverse()
        //setNewDate(reDate);

        for (let j=0; j<_temp.length; j++) {
            const date = _temp[j]
            const temp:any = {}   //같은 날짜 ratio, group 묶어서 저장
            temp['period'] = date
            for (let i =0; i<searchData['searchData'].length; i++) {
                const data:any = searchData['searchData'][i]
                const group = data['group']
                const ratio = data['ratio']
                if (date === data['period']) {
                    temp[group] = ratio
                }
                if (!(ageGroup.includes(group))) ageGroup.push(group)
            }
            if (!(newData.includes(temp))) newData.push(temp)
        }
    }, [])

    const data = []
    for (let x in Object.keys(newData)) {
        data.push(newData[x])
    }

    useEffect(() => {
        console.log(newData);
    },[newData]);

    return (
        <LineChart id="chart" width={730} height={250} data={data}
                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="10" stroke="#8884d8" />
            <Line type="monotone" dataKey="20" stroke="#82ca9d" />
        </LineChart>
    )
}
export default Search;


