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

    return  _periodArr?.map((_period: any) => {
        const filtered = searchData?.filter((row: any) => {
            const { period } = row;
            return period === _period      //searchData 중애서 period 같으면 반환
        });

        const parsedObject = filtered?.reduce((acc: any, filteredRow: any) => {    //acc:result, filteredRow: value
            const {ratio, group} = filteredRow;
            //console.log(ratio, group)      // {"period:"2020-11-29", "10":100, "20":21.345}
            return {
                ...acc,
                [group]: ratio
            }
        }, {});      //{}: init value
        //date, group:ratio 합침
        return {
            ...parsedObject,
            _period
        }
    })

}

const group = [
    {age: "10", color: "#8884d8"},
    {age: "20", color: "#82ca9d"},
    {age: "30", color: "#82EB5A"},
    {age: "40", color: "#FFD2D7"},
    {age: "50", color: "#FFF064"},
    {age: "60", color: "#288CFF"}
]

function Search(searchData: SearchProps): any {
    const data = parseToChartData(searchData?.searchData)
    console.log(data)


    return (
            <div id={"chartBox"}>
                <LineChart id="chart" width={850} height={350} data={data}
                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_period" />
                    <YAxis />
                    <Tooltip />
                    <Legend/>
                    {/*{group.map(user => (*/}
                    {/*    {"10" in data[0]?<Line type="monotone" strokeWidth={3} dataKey="10" stroke="#8884d8" />:null}*/}
                    {/*))}*/}

                    {"10" in data[0]?<Line type="monotone" strokeWidth={3} dataKey="10" stroke="#8884d8" />:null}
                    {"20" in data[0]?<Line type="monotone" strokeWidth={3} dataKey="20" stroke="#82ca9d" />:null}
                    {"30" in data[0]?<Line type="monotone" strokeWidth={3} dataKey="30" stroke="#82EB5A" />:null}
                    {"40" in data[0]?<Line type="monotone" strokeWidth={3} dataKey="40" stroke="#FFD2D7" />:null}
                    {"50" in data[0]?<Line type="monotone" strokeWidth={3} dataKey="50" stroke="#FFF064" />:null}
                    {"60" in data[0]?<Line type="monotone" strokeWidth={3} dataKey="60" stroke="#288CFF" />:null}
                </LineChart>
            </div>
    )
}
export default Search;