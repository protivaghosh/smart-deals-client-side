import React from 'react';
import { createBrowserRouter } from "react-router";

import Home from '../Home/Home';
import AllProducts from '../AllProducts/AllProducts';
import Root from '../Layout/Root';
import MyProducts from '../MyProdect/MyProducts';
import MyBids from '../MyBids/MyBids';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
        {
            index: true,
            element:<Home></Home>
        },
        {
            path:'/allProducts',
            element:<AllProducts></AllProducts>
        },
        {
            path: '/myProducts',
            element:<MyProducts></MyProducts>
        },
        {
            path: '/myBids',
            element:<MyBids></MyBids>
        },
        {
            path: '/login',
            element:<Login></Login>
        },
        {
            path: '/register',
            element:<Register></Register>
        }
    ]
  },
]);


export default Router;
