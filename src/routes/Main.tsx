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


function Main({ onSubmit }: DataFormProps) {
    const device = [
        { value: "pc", name: "PC" },
        { value: "mo", name: "Mobile" },
        { value: "", name: "설정 안 함" },
    ];
    const gender = [
        { value: "m", name: "남성" },
        { value: "f", name: "여성" },
        { value: "", name: "설정 안 함"}
    ]
    const ages:({ value: any; name: string; })[] = [
        { value: "10", name: "10대"},
        { value: "20", name: "20대"},
        { value: "30", name: "30대"},
        { value: "40", name: "40대"},
        { value: "50", name: "50대"},
        { value: "60", name: "60대 이상"},
        { value: "", name: "설정 안 함"}
    ]
    const timeUnit = [
        { value: "date", name: "일간"},
        { value: "week", name: "주간"},
        { value: "month", name: "월간"}
    ]

    const [form, setForm] = useState({
        category: "",
        keyword: "",
    });


    const { category, keyword } = form;

    const [startDate, setStartDate] = useState<any>(new Date());
    const [endDate, setEndDate] = useState<any>(new Date());

    function onClick() {
        console.log(category, keyword, startDate, endDate )
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

    return (
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
                <select className = "select" >
                    {device.map((device) => (
                        <option
                            key={device.value}
                            value={device.value}>
                            {device.name}
                        </option>
                    ))}
                </select>
                <select className = "select">
                    {gender.map((gender) => (
                        <option
                            key={gender.value}
                            value={gender.value}>
                            {gender.name}
                        </option>
                    ))}
                </select>
                <select className = "select" >
                    {ages.map((ages) => (
                        <option
                            key={ages.value}
                            value={ages.value}>
                            {ages.name}
                        </option>
                    ))}
                </select>
                <select className = "select" >
                    {timeUnit.map((timeUnit) => (
                        <option
                            key={timeUnit.value}
                            value={timeUnit.value}>
                            {timeUnit.name}
                        </option>
                    ))}
                </select>
            </div>
            <Link to = {{ pathname: "/search"}}>
                <button onClick={onClick} id="btnSubmit" type="submit">조회</button>
            </Link>
        </div>
    )
}

export default Main;