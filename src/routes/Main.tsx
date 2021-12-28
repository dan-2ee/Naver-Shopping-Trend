import React, {ReactNode, useState} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import axios from 'axios';
import "./Main.css"
import Search from "../components/Search";

type SelectType = {value: string, name: string};


function Main() {
    const devices: SelectType[] = [
        { value: "", name: "설정 안 함" },
        { value: "pc", name: "PC" },
        { value: "mo", name: "Mobile" }
    ];
    const genders: SelectType[]= [
        { value: "", name: "설정 안 함"},
        { value: "m", name: "남성" },
        { value: "f", name: "여성" }
    ]
    const ages: SelectType[] = [
        { value: "", name: "설정 안 함"},
        { value: "10", name: "10대"},
        { value: "20", name: "20대"},
        { value: "30", name: "30대"},
        { value: "40", name: "40대"},
        { value: "50", name: "50대"},
        { value: "60", name: "60대 이상"}
    ]
    const timeUnits: SelectType[] = [
        { value: "date", name: "일간"},
        { value: "week", name: "주간"},
        { value: "month", name: "월간"}
    ]

    const [form, setForm] = useState({
        category: "",
        keyword: "",
    });

    const { category, keyword } :{ category: string; keyword: string; } = form;

    const [startDate, setStartDate] = useState<any>(new Date());   // todo: 선택한 날짜 입력 포맷에 맞게 가공해야함
    const [endDate, setEndDate] = useState<any>(new Date());
    const [device, setDevice] = useState<any>("");    // 입력이 ""일경우 설정 안 함
    const [age, setAge] = useState<any>([])

    const [timeUnit, setTimeunit] = useState<any>("date")
    const [gender, setGender] = useState<any>("")

    //YYYY-MM-dd 형식으로 변환
    const newStartDate:string = `${startDate.getFullYear()}-${("0"+(startDate.getMonth()+1)).slice(-2)}-${("0"+startDate.getDate()).slice(-2)}`
    const newEndDate:string = `${endDate.getFullYear()}-${("0"+(endDate.getMonth()+1)).slice(-2)}-${("0"+endDate.getDate()).slice(-2)}`

    //API 호출
    const [searchData, setSearchData] = useState<any[]>([]);

    const getShoppingData = async () => {
        const data = {
            "startDate": newStartDate,
            "endDate": newEndDate,
            "timeUnit": timeUnit,
            "category": category,
            "keyword": keyword,
            "device": device,
            "gender": gender,
            "ages": age
        };

        const config : any = {
            method: 'post',
            // package.json 파일에 "proxy":"https://openapi.naver.com" 추가 ->  CORS ERROR 방지
            url: '/v1/datalab/shopping/category/keyword/age',
            headers: {
                'X-Naver-Client-Id': 'hxWEKjmbZxVIP1xj0sB0',
                'X-Naver-Client-Secret': 'SZbL1NRx9W',
                'Content-Type': 'application/json'
            },
            data
        };

        axios(config)
            .then(function (response) {
                // setSearchData(JSON.stringify(response.data));
                setSearchData(response.data?.results[0]['data']);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    //조회 버튼 누르면 api 호출
    const onClick = async() => {
        await getShoppingData()
    }
    const onChange = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
            [name]: value
        });
    };

    //select 된 값 저장
    const handleClick = (name: string) => (e:any) =>{
        if (name==="device") setDevice(e.target.value)
        else if (name==="age") setAge([...age, e.target.value])
        // age.push(e.target.value)
        else if (name==="gender") setGender(e.target.value)
        else if (name==="timeUnit") setTimeunit(e.target.value)
    };

    return (
        <div id="main">
            <div id = "inputBox">
                <div id ="dateForm">
                    <div className="dateTitle">start: </div>
                    <DatePicker
                        className="inputDate"
                        selected={startDate}
                        locale={ko}
                        dateFormat={"yyyy-MM-dd"}
                        onChange={date => setStartDate(date)}/>
                    <div className="dateTitle">end: </div>
                    <DatePicker
                        className="inputDate"
                        selected={endDate}
                        locale={ko}
                        dateFormat="yyyy-MM-dd"
                        onChange={date => setEndDate(date)}/>
                </div>
                <form id = "dataForm">
                    <div className="dataTitle">category:</div>
                    <input className="inputData" placeholder="   category" name="category" value={category} onChange={onChange} />
                    <div className="dataTitle">keyword:</div>
                    <input className="inputData" placeholder="   keyword" name="keyword" value={keyword} onChange={onChange} />
                </form>
            <div id="selectForm">
                <div className="dataTitle">device:</div>
                <select className = "select" onChange={handleClick("device")}>
                    {devices.map((devices) => (
                        <option
                            key={devices.value}
                            value={devices.value}>
                            {devices.name}
                        </option>
                    ))}
                </select>
                <div className="dataTitle" >gender:</div>
                <select className = "select" onChange={handleClick("gender")}>
                    {genders.map((genders) => (
                        <option
                            key={genders.value}
                            value={genders.value}>
                            {genders.name}
                        </option>
                    ))}
                </select>
                <div className="dataTitle">ages:</div>
                <select className = "select" onChange={handleClick("age")}>
                    {ages.map((ages) => (
                        <option
                            key={ages.value}
                            value={ages.value}>
                            {ages.name}
                        </option>
                    ))}
                </select>
                <div className="dataTitle">timeUnit:</div>
                <select className = "select" onChange={handleClick("timeUnit")}>
                    {timeUnits.map((timeUnits) => (
                        <option
                            key={timeUnits.value}
                            value={timeUnits.value}>
                            {timeUnits.name}
                        </option>
                    ))}
                </select>
            </div>
                <button id="btnSubmit" onClick={onClick} type="submit">조회</button>
            </div>
            <Search searchData={searchData}/>
        </div>
    )
}

export default Main;