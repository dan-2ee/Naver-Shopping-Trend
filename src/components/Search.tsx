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
import {exists} from "fs";

// main에서 전달받을 검색 결과
type SearchProps ={
    searchData: any[]
}

function Search(searchData:SearchProps): any {

    const [newData, setNewData] = useState<any>([])   // 그래프 그리기 위한 새로운 데이터
    const data:any[] = []
    useEffect(() => {
        //date 값만 모아서 dateLst에 저장
        let dateLst:any[] = []
        for (let i =0; i<searchData['searchData'].length; i++) {
            const date:any = searchData['searchData'][i]['period']
            if (!(dateLst.includes(date))) {
                dateLst = [...dateLst, date];
            }
        }
        // const reDate = _temp.reverse()
        //setNewDate(reDate);
        for (let j=0; j<dateLst.length; j++) {
            const date = dateLst[j]
            const temp:any = {}   //같은 날짜에 해당하는 ratio, group 묶어서 저장
            temp['period'] = date
            for (let i =0; i<searchData['searchData'].length; i++) {
                const data:any = searchData['searchData'][i]
                const group = data['group']
                const ratio = data['ratio']
                if (date === data['period']) {
                    temp[group] = ratio
                }
            }
            if (!(newData.includes(temp))) newData.push(temp)
        }
    }, [])
    // data: newData에서 value 값만 가져옴

    for (let x in Object.keys(newData)) data.push(newData[x])
    /*useEffect(() => {
        console.log(data);
    },[data]);*/
    return (
        <LineChart id="chart" width={730} height={250} data={data}
                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="10" stroke="#A4C3FF" />
            <Line type="monotone" dataKey="20" stroke="#FFC6C3" />
            <Line type="monotone" dataKey="30" stroke="#FFE146" />
            <Line type="monotone" dataKey="40" stroke="#1E96FF" />
            <Line type="monotone" dataKey="50" stroke="#3C3C8C" />
            <Line type="monotone" dataKey="60" stroke="#82EB5A" />
        </LineChart>
    )
}
export default Search;


