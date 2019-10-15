import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';
import {createAppContainer } from 'react-navigation';
import{createStackNavigator} from 'react-navigation-stack';

import Login from './Screens/LoginActivity';
import Register from './Screens/RegisterActivity';
import Home from './Screens/Home';
import Detail from './Screens/DetailActivity';
import Add from './Screens/AddActivity';
import Edit from './Screens/EditActivity';

const TabNavigator = createStackNavigator({
    LoginAct: {
      screen: Login,
      navigationOptions: {
        title: 'Đăng Nhập',
        headerTintColor:'red',
        headerLeft: null
      }
    },

    RegisterAct: {
      screen: Register,
      navigationOptions: {
        title: 'Đăng Kí',
        headerTintColor:'red',
        // headerLeft: null
      }
    },
    HomeAct :{
      screen: Home,
      navigationOptions: {
        title: 'Danh sách',
        headerTintColor:'red',
        //headerLeft: null
      }
    },
    DetailAct: {
      screen:Detail,
      navigationOptions: {
        title: 'Chi Tiết',
        headerTintColor:'red',
        //headerLeft: null
      }
    },
    AddAct:{
      screen:Add,
      navigationOptions:{
        headerTintColor:'red',
        title:'Thêm nhật ký',
        //headerLeft: null
      }
    },
    EditAct:{
      screen:Edit,
      navigationOptions:{
        headerTintColor:'red',
        title:'Sửa nhật ký',
        //headerLeft: null
      }
    }
  });
  
  export default createAppContainer(TabNavigator);