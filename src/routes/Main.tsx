import React, {useState, useRef} from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import * as S from "./style"
import Search from "../components/SearchCompleted";
import SearchFail from "../components/SearchFail";
import dayjs from 'dayjs'
import 'antd/dist/antd.css';
import { DatePicker, Space, Form, Alert, Checkbox, Layout, Breadcrumb} from 'antd';
import { Input } from 'antd';
import moment from "moment";
import {searchAction} from "../components/store/SearchSlice";
import {useDispatch} from "react-redux";

type SelectType = {value: string, name: string};

function Main() {
    const { RangePicker } = DatePicker;
    const { Header, Content} = Layout;

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

    const [form, setForm] = useState<{category: string; keyword: string}>({
        category: "",
        keyword: "",
    });
    const { category, keyword } :{ category: string; keyword: string; } = form;

    const [startDate, setStartDate] = useState<any>("2021-12-31");
    const [endDate, setEndDate] = useState<any>("2022-01-01");

    const [device, setDevice] = useState<string>("");
    const [timeUnit, setTimeunit] = useState<string>("date")
    const [gender, setGender] = useState<string>("")

    const [age, setAge] = useState<string[]>([])

    const [DataCheck, setDataCheck] = useState<boolean>(false);
    const [DateCheck, setDateCheck] = useState<boolean>(false);
    const [KeyCheck, setKeyCheck] = useState<boolean>(false);
    const [ageNotCheck, setAgeNotCheck] = useState<boolean>(false)
    const [categoryCheck, setCategoryCheck] = useState<boolean>(false);

    //API 호출
    const dispatch = useDispatch();
    const getShoppingData= async () => {
        const data = {
            "startDate": dayjs(startDate).format("YYYY-MM-DD"),
            "endDate": dayjs(endDate).format("YYYY-MM-DD"),
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
                // 'data' 부분만 전달
                console.log(response)
                dispatch(searchAction.addToList(response.data));
                setDataCheck(true)
            })
            .catch(function (error) {
                console.log(error);
                setDataCheck(false)
            });
    };

    //조회 버튼 누르면 api 호출
    const keywordInput:any = useRef();
    const categoryInput:any = useRef();

    const onClick = async() => {
        // keyword, category 빈 칸 있으면 focus 이동
        if (keyword === "") keywordInput.current.focus();
        else if (category === "") categoryInput.current.focus();

        // alert 창 띄우기 위한 체크
        startDate > endDate? setDateCheck(true) : setDateCheck(false)
        keyword === "" ? setKeyCheck(true) : setKeyCheck(false)
        category === "" ? setCategoryCheck(true) : setCategoryCheck(false)
        //모두 false 일 때 통과
        if (!(DateCheck || KeyCheck || categoryCheck)) await getShoppingData()
    }

    const onChange = (e: any) => {
        const { name, value }:{ name: string; value: string; } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleClick = (name: string) => (e:any) =>{
        switch (name) {
            case "device": setDevice(e.target.value); break;
            case "age": {
                if (e.target.value==="" && ageNotCheck) setAgeNotCheck(false);
                else if (e.target.value === "") {setAge([]); setAgeNotCheck(true) }
                else if (age.includes(e.target.value)) setAge(age.filter(age => age !== e.target.value));  // 체크 박스 선택 해제
                else setAge([...age, e.target.value]);
                break;
            }
            case "gender": setGender(e.target.value); break;
            case "timeUnit": setTimeunit(e.target.value); break;
        }
    };

    return (
        <Layout className="layout">
            <Header>
                <S.logo/>
            </Header>
            <Content style={{ padding: '30px 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Src</Breadcrumb.Item>
                    <Breadcrumb.Item>Routes</Breadcrumb.Item>
                    <Breadcrumb.Item>Main</Breadcrumb.Item>
                </Breadcrumb>
                <S.site_layout_content>
                    <S.dateForm>
                        <Space direction={"horizontal"}>
                            <S.inputDate defaultValue={moment('2021-12-31', 'YYYY-MM-DD')} placeholder={"startDate"} className="inputDate" onChange={setStartDate}/>
                            <S.inputDate defaultValue={moment('2022-01-01', 'YYYY-MM-DD')} placeholder={"endDate"} className="inputDate" onChange={setEndDate} />
                            <RangePicker
                                defaultValue={[moment('2017-08-01', 'YYYY-MM-DD'), moment(new Date(), "YYYY-MM-DD")]}
                                disabled size={"large"}
                            />
                        </Space>
                    </S.dateForm>
                    <S.dataForm>
                        <Space direction="horizontal">
                            <Form.Item  name="keyword" label="keyword" rules={[{ required: true }]} >
                                <Input ref={keywordInput} name="keyword" size={"large"} value={keyword} onChange={onChange}/>
                            </Form.Item>
                            <Form.Item name="category" label="category" rules={[{ required: true }]}>
                                <Input ref={categoryInput} name="category" size={"large"} value={category} onChange={onChange}/>
                            </Form.Item>
                        </Space>
                    </S.dataForm>
                    <S.selectForm>
                        <Space direction="horizontal">
                        <Form.Item label="device">
                            <S.selectBox>
                                <S.select onChange={handleClick("device")}>
                                    {devices.map((devices) => (
                                        <option key={devices.value} value={devices.value}>
                                            {devices.name}
                                        </option>
                                    ))}
                                </S.select>
                            </S.selectBox>
                        </Form.Item>
                        <Form.Item label="gender">
                            <S.selectBox>
                                <S.select onChange={handleClick("gender")}>
                                    {genders.map((genders) => (
                                        <option key={genders.value} value={genders.value}>
                                            {genders.name}
                                        </option>
                                    ))}
                                </S.select>
                            </S.selectBox>
                        </Form.Item>
                        <Form.Item name="timeUnit" label="timeUnit" rules={[{ required: true }]}>
                        <S.select onChange={handleClick("timeUnit")} >
                            {timeUnits.map((timeUnits) => (
                                <option key={timeUnits.value} value={timeUnits.value}>
                                    {timeUnits.name}
                                </option>
                            ))}
                        </S.select>
                        </Form.Item>
                        </Space>
                    </S.selectForm>
                    <S.selectForm>
                        <Form.Item name="ages" label="ages">
                            {ages.map((age) => (
                                age.value === ""? <Checkbox onChange={handleClick("age")} value={age.value}>{age.name}</Checkbox>:
                                <Checkbox onChange={handleClick("age")} value={age.value} disabled={ageNotCheck}>{age.name}</Checkbox>
                            ))}
                        </Form.Item>
                    </S.selectForm>
                    <S.btnSubmit onClick={onClick} type="submit">Search</S.btnSubmit>
                    {DateCheck ? <S.alert> <Alert message="Error" description="start date must be less than the end date." type="error" showIcon/> </S.alert> : null}
                    {KeyCheck ? <S.alert> <Alert message="Error" description="enter the keyword." type="error" showIcon/> </S.alert> : null}
                    {categoryCheck ? <S.alert> <Alert message="Error" description="enter the category." type="error" showIcon/> </S.alert> : null}
                </S.site_layout_content>
                {DataCheck ? <Search/> : <SearchFail/> }
            </Content>
        </Layout>
    );
}

export default Main;