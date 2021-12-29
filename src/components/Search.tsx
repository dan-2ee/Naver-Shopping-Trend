import React, { useEffect, useState } from "react";
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
type SearchProps = {
    searchData: any[]
}

const parseToChartData = (searchData: any) => {
    let _periodSet = new Set();
    searchData?.forEach((row: any) => _periodSet.add(row?.period));
    const _periodArr = Array.from(_periodSet);    //_periodArr = period array

    //console.log(_periodArr)
    //console.log(searchData)
    return  _periodArr?.map((_period: any) => {
        const filtered = searchData?.filter((row: any) => {
            const { period } = row;
            return period === _period      //searchData 중애서 period 같으면 반환
        });
        //console.log(filtered)

        const parsedObject = filtered?.reduce((acc: any, filteredRow: any) => {    //acc:result, filteredRow: value
            const { ratio, group } = filteredRow;
            //console.log(ratio, group)      // {"period:"2020-11-29", "10":100, "20""21
            console.log(acc)
            return {
                ...acc,
                [group]: ratio
            }
        }, {});      //{}: init value
        //console.log(period)
        //console.log(parsedObject)

        //date, group:ratio 합침
        return {
            ...parsedObject,
            _period
        }
    })

}

function Search(searchData: SearchProps): any {

    return (
        <LineChart id="chart" width={730} height={250} data={parseToChartData(searchData?.searchData)}
                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend/>
            <Line type="monotone" dataKey="10" stroke="#8884d8" />
            <Line type="monotone" dataKey="20" stroke="#82ca9d" />
            <Line type="monotone" dataKey="30" stroke="#82ca9d" />
            <Line type="monotone" dataKey="40" stroke="#82ca9d" />
            <Line type="monotone" dataKey="50" stroke="#82ca9d" />
            <Line type="monotone" dataKey="60" stroke="#82ca9d" />
        </LineChart>
    )
}
export default Search;