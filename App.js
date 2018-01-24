/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

export default class RegularTextboxExample extends Component {
   	
  state = {
     
	  toPhoneNo: '',
	  myText:''
   }
   handlePhoneNumber = (text) => {
	   	console.log("hi" , text)
		let newText = text.replace(/[^0-9]/g, '');
		console.log("newText" , newText)
		this.setState({toPhoneNo: newText});
   }
   
   handleMultiline = (text) =>{
      console.log(text)
	  this.setState({myText: text});
   }
   
   
   sendSMS = (phno, msg) => {
      alert('phno: ' + phno + ' \n SMS: ' + msg);
	  var inParams  = {'toPhoneNo': phno, 'SMS':msg}
	  console.log(inParams)
	  return fetch("http://192.168.0.100:3000/captureSMS", 
	        {	method: "POST",
				mode: 'cors', 
				headers: {
					"Content-Type": "application/json",
					"Accept": 'application/json'
				},
				body: JSON.stringify(inParams)
			})
        .then((response) => response.json())
        .then((responseData) => {
            console.log("responseData :::",responseData)
        })
		.catch((error) => {
        console.error(error);
      })
        .done();
   }
   render(){
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Receiver's Phone Number"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
			   keyboardType="numeric"
			   maxLength = {10}
               onChangeText = {this.handlePhoneNumber}
			   value = {this.state.toPhoneNo}/>
			   
			    <TextInput style={styles.multilinee}
                    multiline={true}
                    blurOnSubmit={false}
                    editable={true}
                    maxLength={40}
					borderBottomWidth = {3}
                    onChangeText = {this.handleMultiline}
					value = {this.state.myText}
                /> 
		            
              			   
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.sendSMS(this.state.toPhoneNo, this.state.myText)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      )
   }
}


const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   multilinee:{
	  margin: 15,
	  padding:10,
      height:100,
	  borderColor: '#7a42f4',
      borderWidth: 3
	  
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})