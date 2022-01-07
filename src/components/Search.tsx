import React from "react";
import "./SearchFail"
import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import {Breadcrumb, Tag} from "antd";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import * as S from "./SearchStyle"
import {RootState} from "@reduxjs/toolkit/dist/query/core/apiState";
import {chart} from "./SearchStyle";

const parseToChartData = (searchData: string[]) => {
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

const group:{age:string, color:string}[] = [
    {age: "10", color: "#8884d8"},
    {age: "20", color: "#FFF064"},
    {age: "30", color: "#288CFF"},
    {age: "40", color: "#FFD2D7"},
    {age: "50", color: "#82ca9d"},
    {age: "60", color: "#82EB5A"}
]

function Search(): any {
    //const useAppSelector:TypedUseSelectorHook<RootState<any, any, any>> = useSelector
    const selector = useSelector<string[]>(state => state);
    // const selector = useAppSelector(state => state);
    // @ts-ignore
    const data = selector.list;
    const chartData = parseToChartData(data.results[0].data);

    console.log(data)
    console.log(chartData)

    return (
            <S.search_content>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Src</Breadcrumb.Item>
                    <Breadcrumb.Item>Components</Breadcrumb.Item>
                    <Breadcrumb.Item>Search</Breadcrumb.Item>
                </Breadcrumb>
                <S.chart_content>
                    <S.tag>
                        <Tag color="#f50">#{data.startDate} ~ {data.endDate}</Tag>
                        <Tag color="#87d068">#{data.timeUnit}</Tag>
                        <Tag color="#108ee9">#{data.results[0].title}</Tag>
                    </S.tag>
                    <S.chart width={903} height={430} data={chartData} id={"chart"}
                               margin={{top: 15, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="_period"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        {group.map((user) =>
                            user.age in chartData[0] ?
                                <Line key={user.age} type="monotone" strokeWidth={3} dataKey={user.age}
                                      stroke={user.color}/> : null
                        )}
                    </S.chart>
                </S.chart_content>
            </S.search_content>
        )
}
export default Search;