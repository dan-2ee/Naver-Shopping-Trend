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
        { value: ["10", "19"], name: "10"},
        { value: ["20", "29"], name: "20"},
        { value: ["30", "39"], name: "30"},
        { value: ["40", "49"], name: "40"},
        { value: ["50", "59"], name: "50"},
        { value: ["60", "69"], name: "60"},    //60세 이상
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

    const [startDate, setStartDate] = useState<any>(new Date());
    const [endDate, setEndDate] = useState<any>(new Date());
    return (
        <div id = "inputBox">
                <div id ="dateForm">
                    <DatePicker
                        className="inputDate"
                        selected={startDate}
                        onChange={date => setStartDate(date)}/>
                    <DatePicker
                        className="inputDate"
                        selected={endDate}
                        onChange={date => setEndDate(date)}/>
                </div>
                <form id = "dataForm" onSubmit={handleSubmit}>

                    <input className="inputData" placeholder="   category" name="category" value={category} onChange={onChange} />
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
                <select className = "select" >
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
                <button id="btnSubmit" type="submit">조회</button>
            </Link>
        </div>
    )
}

export default Main;