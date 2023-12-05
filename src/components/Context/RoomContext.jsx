import React, { createContext, useContext, useState } from 'react';

// 创建 RoomContext 上下文
const RoomContext = createContext({
    roomNumber: null,
    setRoomNumber: () => {},
});

// 创建 RoomProvider 提供者组件
export const RoomProvider = ({ children }) => {
    const [roomNumber, setRoomNumber] = useState(null);

    // 将房间信息包装在上下文中
    const contextValue = {
        roomNumber,
        setRoomNumber,
    };

    // 返回提供者，并将子组件包裹在其中
    return (
        <RoomContext.Provider value={contextValue}>
            {children}
        </RoomContext.Provider>
    );
};

// 创建自定义 hook 以便于在组件中使用房间信息
export const useRoomContext = () => {
    return useContext(RoomContext);
};
