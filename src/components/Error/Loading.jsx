import React from "react";
import { Spin } from "antd";

// 使用普通的函数声明
function Loading() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Spin size="large" />
        </div>
    );
}

export default Loading;
