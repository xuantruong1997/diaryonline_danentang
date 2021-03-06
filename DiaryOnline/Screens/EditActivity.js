import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableHighlight
} from 'react-native';



export default class EditActivity extends Component{

    constructor(props){
        super(props);
        this.state =  {
            title: this.props.navigation.getParam('title'),
            content: this.props.navigation.getParam('content'),
            //date: '',
            note: this.props.navigation.getParam('note'),
        }
    }

    _add(){
        // var ngay = new Date().getDate(); 
        // var thang = new Date().getMonth() + 1; 
        // var nam = new Date().getFullYear(); 
        //alert(ngay+'-'+ thang + '-' + nam);
        if(this.state.title==="" || this.state.content===""|| 
            this.state.note===""){
            Alert.alert('Lỗi', 'Nhập đầy đủ thông tin')
        }
        else {            
            fetch('http://10.0.3.2:8888/ReactNative/updatediary.php', 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.props.navigation.getParam('username'),
                    id_diary: this.props.navigation.getParam('id_diary'),
                    title: this.state.title,
                    content: this.state.content,
                   // date: this.state.date,
                    note: this.state.note
                })
            
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === 'Xong')
                {
                    this.props.navigation.replace('DetailAct',
                                {username: this.props.navigation.getParam('username'),
                                id_diary: this.props.navigation.getParam('id_diary')});
                    //alert('OK, Thêm thành công');
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

    _cancel(){
        this.props.navigation.replace('DetailAct',
             {id_diary: this.props.navigation.getParam('id_diary'),
             username: this.props.navigation.getParam('username')});
                    
    }

    render(){
        return(                          
         <View style={{ alignItems: "center",justifyContent: 'center', backgroundColor: 'cyan', flex:1}}> 
          
            <View style={{justifyContent: "center",flexDirection:'column'}}>

                <TextInput
                    defaultValue={this.state.title}      
                    onChangeText={title => this.setState({title})}
                    style={style.input}
                    underlineColorAndroid='transparent'
                    maxLength={35}
                />

                {/* <TextInput
                    defaultValue={this.props.navigation.getParam('date')}        
                    onChangeText={title => this.setState({title})}
                    style={style.input}
                    underlineColorAndroid='transparent'
                    maxLength={35}
                /> */}

                <TextInput
                    defaultValue={this.state.content} 
                    numberOfLines={10}
                    multiline = {true}
                    placeholderTextColor = '#BEBEBE'   
                    onChangeText={content => this.setState({content})}            
                    style={style.inputcontent}
                    textAlignVertical='top'
                    maxLength={1000}
                    
                />

                <TextInput
                    defaultValue={this.state.note}    
                    onChangeText={note => this.setState({note})}            
                    style={style.input}
                    underlineColorAndroid='transparent'
                    maxLength={255}
                    
                />
  
                <View style={{flexDirection:'row',justifyContent:'center', marginTop: 30}}>
                    <TouchableHighlight style={style.button1}
                        onPress = {()=> this._cancel()}>
                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>Hủy</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={style.button2}
                        onPress = {()=> this._add()}>
                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>Lưu</Text>
                    </TouchableHighlight>
                </View>
                
                
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
    inputcontent:{
        borderRadius: 10,
        marginTop: 12,
        height: 150,
        fontSize: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: 'white',
    },
    button1: {
      backgroundColor: 'green',
      justifyContent: 'center',
      borderRadius: 10,
      alignSelf: 'center',
      height: 35,
      width: 90 
    },

    button2: {
        backgroundColor: 'green',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        height: 35,
        width: 90,
        marginLeft: 50
      },

  });