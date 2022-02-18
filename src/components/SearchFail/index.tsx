import React from "react";
import {Result, Breadcrumb} from 'antd';
import * as S from "./style"

function SearchFail() {
    return (
        <S.search_content>
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Src</Breadcrumb.Item>
                <Breadcrumb.Item>Components</Breadcrumb.Item>
                <Breadcrumb.Item>Search</Breadcrumb.Item>
            </Breadcrumb>
            <S.image_content>
                <Result
                    status="404"
                    title="No Data."
                />
            </S.image_content>
        </S.search_content>
    );
}

export default SearchFail;