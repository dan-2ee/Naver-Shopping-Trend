import React, {useState} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import "./Main.css"

type DataFormProps = {
    onSubmit: (form: {
        category: string,
        keyword: string,
    }) => void;
};

type SelectType = {value: string, name: string};

function Main({ onSubmit }: DataFormProps) {
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
        { value: "10", name: "10대"},    //todo: 다중선택 되도록
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


    const { category, keyword } = form;

    const [startDate, setStartDate] = useState<any>(new Date());   // todo: 선택한 날짜 입력 포맷에 맞게 가공해야함
    const [endDate, setEndDate] = useState<any>(new Date());
    const [device, setDevice] = useState<any>("");    // 입력이 ""일경우 설정 안 함
    const [age, setAges] = useState<any>("")
    const [timeUnit, setTimeunit] = useState<any>("일간")
    const [gender, setGender] = useState<any>("")

    const onClick = () => {     //value 저장되는지 확인
        console.log(category, keyword, startDate, endDate, "\n", device, age, timeUnit, gender )
    }

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
            [name]: value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSubmit(form);
        setForm({     //초기화
            category: '',
            keyword: ''
        });
    };

    //select 된 값 저장
    const handleClick = (name: string) => (e:any) =>{
        if (name==="device") setDevice(e.target.value)
        else if (name==="age") setAges([e.target.value])    //age input type = array
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
                        onChange={date => setStartDate(date)}/>
                    <div className="dateTitle">end: </div>
                    <DatePicker
                        className="inputDate"
                        selected={endDate}
                        onChange={date => setEndDate(date)}/>
                </div>
                <form id = "dataForm" onSubmit={handleSubmit}>
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
            <Link to = {{ pathname: "/search"}}>
                <button onClick={onClick} id="btnSubmit" type="submit">조회</button>
            </Link>
            </div>
            <div id="basicBox">
            </div>
        </div>
    )
}

export default Main;