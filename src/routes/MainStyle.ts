import styled from "styled-components";
import { DatePicker} from 'antd';

export const logo = styled.div`
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
`;

export const site_layout_content = styled.div`
    min-height: 470px;
    padding: 10px;
    background: #fff;
`;

export const dateForm =styled.div`
    margin-left: 5%;
    margin-top: 2%;
    display: flex;
`;

export const inputDate = styled(DatePicker)`
    margin-top: 5%;
    width: 10rem;
    height: 3rem;
    font-size: 13px;
    border: none;
    border-radius: 10px;
`;

export const dataForm =styled.div`
    margin-left: 5%;
    margin-top: 2%;
    display: flex;
`;

export const selectForm =styled.div`
    margin-left: 5%;
    margin-top: 2%;
    display: flex;
`;

export const selectBox =styled.div`
    margin-right: 80px;
`;

export const select = styled.select`
    margin-top: 5%;
    margin-left: 3%;
    margin-right: 10%;
    width: 7rem;
    height: 2rem;
    border: none;
    border-radius: 10px;
`;

export const btnSubmit = styled.button`
    margin-top: 3%;
    margin-left: 4%;
    width: 7rem;
    height: 2.5rem;
    background-color: #5f6061;
    font-size: 15px;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 10px;
`;

export const alert = styled.div`
    margin-left: 4%;
    margin-top: 2%;
    width: 25rem;
`;