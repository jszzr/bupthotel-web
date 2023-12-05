import React, { createContext, useContext, useState } from 'react';

// 创建 GuestNameContext 上下文
const GuestNameContext = createContext({
    guestName: '',
    setGuestName: () => {},
});

// 创建 GuestNameProvider 提供者组件
export const GuestNameProvider = ({ children }) => {
    const [guestName, setGuestName] = useState('');

    // 将访客姓名信息包装在上下文中
    const contextValue = {
        guestName,
        setGuestName,
    };

    // 返回提供者，并将子组件包裹在其中
    return (
        <GuestNameContext.Provider value={contextValue}>
            {children}
        </GuestNameContext.Provider>
    );
};

// 创建自定义 hook 以便于在组件中使用访客姓名信息
export const useGuestNameContext = () => {
    return useContext(GuestNameContext);
};
