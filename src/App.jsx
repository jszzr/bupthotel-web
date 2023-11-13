import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteList from './routers/Router.jsx';
import { AirConditionerProvider } from './components/Context/AirConditionerContext.jsx'; // 引入 AirConditionerProvider

const App = () => {
    return (
        <AirConditionerProvider> {/* 包装你的应用 */}
            <BrowserRouter>
                <RouteList />
            </BrowserRouter>
        </AirConditionerProvider>
    );
};

export default App;