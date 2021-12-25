import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(){
    super()
    this.state={
      email : "",
      password : ""
    }
  }

  showAlert(errorCode){
    switch(errorCode){
      case 'auth/too-many-requests':
        Alert.alert('To many requests\nTry again later')
        this.setState({
          email:"",
          password : ""
        })
        break
      case 'auth/wrong-password':
        Alert.alert('Enter Correct password')
        this.setState({
          password : ""
        })
        break
      default:
        this.setState({
          email:"",
          password : ""
        })
        return Alert.alert('Invalid email and password')
    }
  }

  render(){
    return(
      <View style={styles.container}>

        <View style={styles.subContainer1}>
          <Text style={styles.title}>Bedtime Stories</Text>
          <Image source = { require("../assets/icon.png")} style={styles.image} />
          <TextInput
              placeholder="programmer@whitehatjr.com"
              placeholderTextColor = "#000"
              onChangeText= {(emailText)=>{
                  this.setState({
                      email: emailText
                  })
              }}
              value={this.state.email}
              style={styles.textInput}
              />
          <TextInput
              placeholder="password"
              placeholderTextColor = "#000"
              onChangeText= {(passwordText)=>{
                  this.setState({
                      password: passwordText
                  })
              }}
              value={this.state.password}
              style={styles.textInput}
              secureTextEntry = {true}
              />
        </View>
        <View style={styles.subContainer2}>
          <TouchableOpacity
            style={styles.button}
            onPress = {async()=>{
              var email  = await this.state.email;
              var password = await this.state.password
              firebase.auth().signInWithEmailAndPassword(email, password)
              //firebase.auth().signInWithEmailAndPassword(emailId, password)
              //firebase.auth().signWithEmailAndPassword(email, password)
              //firebase.auth().signInWithEmailAndPassword()
              .then(()=>{
                this.props.navigation.navigate('WriteStory')
                //this.props.navigation.navigate('writeStory')
                //this.props.navigate('WriteStory')
                //this.props.navigate.navigation('WriteStory')
              })
              .catch((error)=> {
                var errorCode = error.code;
                var errorMessage = error.message;
                return this.showAlert(errorCode)
              })
            }}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#3c6382'
  },
  title:{
    fontWeight:"normal",
    fontSize:35,
    width:"100%",
    color:'#000',
    textAlign:'center',
    marginTop:0,
    backgroundColor:'white'
  },
  image:{
    width:180,
    height:180,
    margin:30,
    borderWidth:4,
    borderColor:'#ffff',
    borderRadius:30,
    alignSelf:'center'
  },
  subContainer1:{
    flex:0.6,
    justifyContent:'center',
    alignItems:'center'
  },
  subContainer2:{
    flex:0.4,
    alignItems:'center'
  },
  textInput : {
    width:"80%",
    height: "10%",
    borderWidth:3,
    borderColor:'#000',
    padding:10,
    marginBottom:10,
    borderRadius:20,
    backgroundColor:"white",
  },
  button:{
    marginTop:100,
    borderColor:'#000',
    borderWidth:3,
    borderRadius:15,
    width:"50%",
    heigth:"25%",
    textAlign:'center'
  },
  buttonText:{
    color:'#000',
    fontSize:25,
   
  }
})
