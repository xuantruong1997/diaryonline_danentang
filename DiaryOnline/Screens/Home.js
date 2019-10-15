import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

export default class Home extends Component{
   
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://10.0.3.2:8888/ReactNative/getdiary.php',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.props.navigation.getParam('username'),

        })
      }
    
    )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

         });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

    _detail(id_diary, id_user, title, date, content, note){
        this.props.navigation.navigate('DetailAct', {username: this.props.navigation.getParam('username'),
                                                     id_diary: id_diary,
                                                    id_user: id_user, title: title, date: date, content: content, note: note});
    };

    _adddiary(){
      this.props.navigation.navigate('AddAct', 
                                    {username: this.props.navigation.getParam('username')});
    };

    
    _deleteDiary(id){
    //  alert(id);
      fetch('http://10.0.3.2:8888/ReactNative/deletediary.php',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_diary:id,
          }),
        }
      )
      .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === 'Delete Done')
                {
                   // this.props.navigation.replace('HomeAct',
                       //         {: this.props.navigation.getParam('username')});
                    // alert('OK, Xóa thành công');
                    this.props.navigation.navigate('HomeAct');
                }
                 else{
                    Alert.alert('Lỗi' ,responseJson);
                }
            
                })
                .catch((error) => {
                    console.error(error);
                });            
    }

    render(){
        if(this.state.isLoading){
        return(
            <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
            </View>
        )
        }
    
    
    return(
        <View style={{flex: 1, paddingTop:20}}>
        <SwipeListView style={{backgroundColor: 'white'}}
            data={this.state.dataSource}
            renderItem={({item}) => 
            
            <TouchableHighlight onPress = {()=> this._detail(item.id_diary, item.id_user,
                                                        item.title, item.date, item.content, item.note)}>
                <View style={styles.item}>
                    <View style={{flex: 1, marginLeft:5}}>
                        <Text style={styles.titlediary} > {item.title} </Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text ellipsizeMode='middle' numberOfLines={1} 
                              style={{fontStyle: 'italic', paddingBottom: 5, marginLeft: 10}} >
                           {item.content} </Text>
                    </View>
                </View>
            </TouchableHighlight>
            }
            renderHiddenItem={({item})=>(
              <View style={{flexDirection:'row', marginTop:11}}>
                <TouchableHighlight onPress = {()=> this._deleteDiary(item.id_diary)} >
                  <View style={{borderRadius:5, backgroundColor:'red', marginLeft:130 ,width:170,height:60}}>
                    <Text style={{textAlign:'right',marginRight:6,marginTop:18}}>Xóa</Text>
                  </View>
                </TouchableHighlight>
              </View>
            )}
            //leftOpenValue={75}

            rightOpenValue={-55}
            automaticallyAdjustContentInsets={true}
            />
            <TouchableHighlight style={styles.floating} onPress = {()=> this._adddiary()}>
              <View>
                <Text style={{fontSize:24}}>+</Text>
              </View>
            </TouchableHighlight>
            </View>
    );
  }
}
const styles = StyleSheet.create( {
    item: {
      backgroundColor: '#ffddd2',
      marginTop: 10,
      marginLeft: 5,
      marginRight: 5,
      borderBottomWidth: 1 ,
      borderBottomColor: 'green',
      borderWidth: 0.5,
      borderRadius: 5,
      borderColor: 'white'
    },

    titlediary: {
      fontSize: 20,
      color: 'blue',
      fontWeight: 'bold',
      paddingTop: 10,
    },

    floating:{
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.1)',
      alignItems:'center',
      justifyContent:'center',
      width:45,
      height:45,
      position: 'absolute',                                          
      bottom: 10,                                                    
      right: 10,
      backgroundColor:'#FF0000',
      borderRadius:100,
    }
  }
)