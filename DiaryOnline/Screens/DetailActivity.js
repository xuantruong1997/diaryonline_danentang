import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  Image
} from 'react-native';

export default class DetailActivity extends Component{

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://10.0.3.2:8888/ReactNative/getdetail.php',
    {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: this.props.navigation.getParam('username'),
          id_diary: this.props.navigation.getParam('id_diary'),
      
      })
  
  })
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

  _editdiary(title, date, content, note){
    this.props.navigation.navigate('EditAct', {username: this.props.navigation.getParam('username'),
                                              id_diary: this.props.navigation.getParam('id_diary'),
                                              title: title, date: date,
                                              content: content, note: note});
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
        <FlatList style={{backgroundColor: 'white'}}
            data={this.state.dataSource}
            renderItem={({item}) => 
            
                <View style={{marginLeft: 15, marginRight: 9}}>
                  <View style={{flex:1, flexDirection: 'row',backgroundColor:'orange'}}>
                  <View style={styles.titlediary}>
                      <Text style={{fontSize: 20}}> {item.title} </Text>                      
                  </View>
                  <View style={{justifyContent: 'center'}}>
                  <TouchableHighlight 
                        onPress = {()=> this._editdiary(item.title, item.date, item.content, item.note)}>
                        <Image 
                          source= {require('../img/edit.jpg')}
                          style={styles.icon}
                        />
                      </TouchableHighlight>
                      </View>
                  </View>


                  <View style={{backgroundColor: 'cyan'}}>
                    <View style={styles.date} >
                        <Text style={{fontSize: 13}}> {item.date} </Text>    
                    </View>

                    <View style={styles.content} >
                        <Text style={{fontStyle: 'italic'}}> {item.content} </Text>    
                    </View>
                    
                    <View style={styles.note}>
                        <Text style={{}}> Note: {item.note} </Text>    
                    </View>
                  </View>
                </View>
            }
        />
        
            </View>
    );
  }
}
const styles = StyleSheet.create( {
    titlediary: {
      flex:0.9,
      paddingVertical: 10,
    },

    date: {
      alignItems: 'flex-end',
      paddingVertical: 9,
      paddingRight: 9,
    },

    content:{
      marginLeft: 10,
      paddingRight: 5
    },

    note: {
      marginLeft: 10,
      paddingTop: 30,
      paddingBottom: 10,
    },
    icon: {
      flex:0.09,
      
      marginLeft: 10,
      alignSelf:'center',
      width: 29,
      height: 29
    },
  }
)