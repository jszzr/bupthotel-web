import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteList from './routers/Router.jsx';
import { AirConditionerProvider } from './components/Context/AirConditionerContext.jsx';
import {RoomProvider} from "./components/Context/RoomContext.jsx"; // 引入 AirConditionerProvider
import {GuestNameProvider} from "./components/Context/GuestNameContext.jsx";
const App = () => {
    return (
        <GuestNameProvider >
        <RoomProvider>
        <AirConditionerProvider> {/* 包装你的应用 */}
            <BrowserRouter>
                <RouteList />
            </BrowserRouter>
        </AirConditionerProvider>
        </RoomProvider>
        </GuestNameProvider >
    );
};

export default App;
// import "antd/dist/reset.css";
// import NotAuth from "./components/error/PageNotFound.jsx";
// import Loading from "./components/error/Loading.jsx";
// import { getAuthRouters } from "../lib";
// import useSWR from "swr";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { routers } from "./routers";
// import { Suspense } from "react";
//
// const fetcher = async (url) =>
//     await new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(["user"]);
//         }, 1000);
//     });
//
// function App() {
//     const { data: auth, isValidating } = useSWR("/api/user", fetcher, {
//         // close fetch on window focus
//         revalidateOnFocus: false,
//     });
//
//     const _routers = getAuthRouters({
//         routers,
//         noAuthElement: (router) => <NotAuth />,
//         render: (element) => (isValidating ? <Loading /> : element),
//         auth: auth || [],
//     });
//
//     return (
//         <Suspense fallback={<Loading />}>
//             <AirConditionerProvider>
//                 <RouterProvider
//                     router={createBrowserRouter(_routers)}
//                     // route loader loading
//                     fallbackElement={<Loading />}
//                 />
//             </AirConditionerProvider>
//         </Suspense>
//     );
// }
//
// export default App;
