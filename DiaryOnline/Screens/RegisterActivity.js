import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableHighlight
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { BorderlessButton } from 'react-native-gesture-handler';

export default class RegisterActivity extends Component{
    constructor(props){
        super(props);
        this.state =  {
            username: '',
            password: '',
            repassword:''
        }
    }

    _register(){ 
        if(this.state.username==="" || this.state.password===""|| this.state.repassword===""){
            Alert.alert('xảy ra lỗi', 'không được bỏ trống')
        }else{
            // kt if pass trùng hay k?
            if(this.state.password !== this.state.repassword){
                alert('không trùng khớp ^~^');
            }else{
                fetch('http://10.0.3.2:8888/ReactNative/register.php', 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    repassword: this.state.repassword
                })
            
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === 'Thanh Cong')
                {
                    this.props.navigation.navigate('LoginAct');
                    alert('đăng kí thành công, xin mời bạn đăng nhập ^.^')
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
        
    }
    render(){
        return(                          
         <View style={{ alignItems: "center",justifyContent: 'center', backgroundColor: 'cyan', flex:1}}> 
          
            <View style={{justifyContent: "center"}}>

                <TextInput
                    placeholder="Tên tài khoản"
                    placeholderTextColor='#BEBEBE'         
                    onChangeText={username => this.setState({username})}
                    style={style.input}
                    underlineColorAndroid='transparent'
                    maxLength={255}
                />

                <TextInput
                    placeholder="Mật khẩu"   
                    placeholderTextColor = '#BEBEBE'
                    textContentType='password'     
                    onChangeText={password => this.setState({password})}            
                    style={style.input}
                    underlineColorAndroid='transparent'
                    maxLength={255}
                    secureTextEntry={true}
                    
                />
                <TextInput
                    placeholder="Nhập lại mật khẩu"   
                    placeholderTextColor = '#BEBEBE'
                    textContentType='password'     
                    onChangeText={repassword => this.setState({repassword})}            
                    style={style.input}
                    underlineColorAndroid='transparent'
                    maxLength={255}
                    secureTextEntry={true}
                    
                />

                <TouchableHighlight style={[style.button, { marginTop: 15 }]}
                    onPress = {()=> this._register()}>
                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>ĐĂNG KÍ</Text>
                </TouchableHighlight>
                
                
            </View>
            </View> 
        
         
        );
    }
}
const style = StyleSheet.create({
    input: {
      paddingLeft: 30,
      borderRadius: 10,
      marginTop: 12,
      height: 45,
      width:250,
      marginLeft: 30,
      fontSize: 15,
      marginRight: 30,
      backgroundColor: 'white',
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