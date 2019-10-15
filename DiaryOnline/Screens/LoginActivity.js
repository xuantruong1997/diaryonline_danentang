import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableHighlight,
  Image,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { BorderlessButton } from 'react-native-gesture-handler';

export default class LoginActivity extends Component{
    constructor(props){
        super(props);
        this.state =  {
            username: 'xuantruong',
            password: '123',
        }
    }

    _login(){
        if(this.state.username==="" || this.state.password===""){
            Alert.alert('Xảy ra lỗi', 'Không được bỏ trống')
        }

        else{
          //http://192.168.137.1:8888/ReactNative/login.php
        fetch('http://10.0.3.2:8888/ReactNative/login.php', 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            
            })
        
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson === 'Trung Khop')
            {
              //Alert.alert(title="Chúc mừng", 'Đăng nhập thành công');
                this.props.navigation.navigate('HomeAct', { username: this.state.username });
            }
            else{
              Alert.alert('Lỗi' ,responseJson);
            }
     
          })
          .catch((error) => {
            console.error(error);
          });
        }
    }
    _moveRegister(){

      this.props.navigation.navigate('RegisterAct');
    }

    render(){
        return(                          
         <View style={{flex: 1, justifyContent: 'center',
                       backgroundColor: 'cyan'}}> 
              <View style={style.about}>
                <Image 
                  source= {require('../img/person.png')}
                  style={style.icon}
                  />
                <TextInput
                  defaultValue = {this.state.username}
                    placeholder="Tên tài khoản"
                    placeholderTextColor='#BEBEBE'         
                    onChangeText={username => this.setState({username})}
                    style={style.input}
                    underlineColorAndroid='transparent'
                    maxLength={255}
                />
              </View>

              <View style={[style.about, {marginTop: 20}]}>
                <Image 
                  source= {require('../img/key.jpg')}
                  style={style.icon}
                  />
                <TextInput
                    defaultValue={this.state.password}
                    placeholder="Mật khẩu"   
                    placeholderTextColor = '#BEBEBE'
                    textContentType='password'
                    onChangeText={password => this.setState({password})}            
                    style={style.input}
                    underlineColorAndroid='transparent'
                    maxLength={255}
                    secureTextEntry={true}
                    
                />
              </View>

              <View>
                <TouchableHighlight style={[style.button, { marginTop: 20}]}
                    onPress = {()=> this._login()}>
                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: 13 }}>ĐĂNG NHẬP</Text>
                </TouchableHighlight>
              </View> 
               
                  <View style={{flexDirection:'row',justifyContent:'center', marginTop: 15}}>
                    <Text style={{fontSize:13}}>Bạn chưa có tài khoản ?</Text>
                    <Text onPress = {()=> this._moveRegister()} style={{fontSize:14 ,
                                      textDecorationLine:'underline', fontWeight: 'bold', color: 'red'}}> Đăng kí</Text>
                  </View>
            </View>
                  
        );
    }
}
const style = StyleSheet.create({

  about: {
    flexDirection: 'row',
    borderWidth: 0.5, 
    borderColor: 'red',
    borderRadius: 10,
    height: 45,
    marginLeft: 30,     
    marginRight: 30,
    backgroundColor: '#fff'
  },
    input: {     
      fontSize: 15,
      marginLeft: 5
    },

    icon: {
      marginLeft: 10,
      alignSelf:'center',
      width: 29,
      height: 29,
    },


    button: {
      backgroundColor: 'green',
      justifyContent: 'center',
      borderRadius: 10,
      alignSelf: 'center',
      marginTop: 12,
      height: 45,
      width: 100
  
    },

  });