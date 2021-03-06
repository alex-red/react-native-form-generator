'use strict';


import React from 'react';
let { View, StyleSheet, TextInput, Text, DatePickerIOS} = require('react-native');
import {Field} from './Field';


export class DatePickerComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: props.date? new Date(props.date) : '',
      isPickerVisible: false
    }

  }
  handleLayoutChange(e){
    let {x, y, width, height} = {... e.nativeEvent.layout};

    this.setState(e.nativeEvent.layout);
    //e.nativeEvent.layout: {x, y, width, height}}}.
  }

  handleValueChange(date){

    this.setState({date:date});

    this.props.onChange && this.props.onChange((this.props.prettyPrint)?this.props.dateTimeFormat(date, this.props.mode):date);
    this.props.onValueChange && this.props.onValueChange(date);

  }



  //      this.refs.picker.measure(this.getPickerLayout.bind(this));


  _togglePicker(event){
    this.setState({isPickerVisible:!this.state.isPickerVisible});
    //this._scrollToInput(event);
  }

  render(){
    let { maximumDate,    minimumDate,
          minuteInterval, mode,
          onDateChange,   timeZoneOffsetInMinutes } = this.props;

    let  valueString = this.props.dateTimeFormat(this.state.date, this.props.mode);

    let datePicker= <DatePickerIOS
      maximumDate = {maximumDate}
      minimumDate = {minimumDate}
      minuteInterval = {minuteInterval}
      mode = {mode}
      timeZoneOffsetInMinutes = {timeZoneOffsetInMinutes}
      date = {this.state.date || new Date()}
      onDateChange = {this.handleValueChange.bind(this)}
    />

    let pickerWrapper = React.cloneElement(this.props.pickerWrapper,{onHidePicker:()=>{this.setState({isPickerVisible:false})}},datePicker);

    return(<View><Field
      {...this.props}
      ref='inputBox'
      onPress={(event) => {this._togglePicker(event); this.props.onPress && this.props.onPress()}}>
      <View style={[formStyles.fieldContainer,
          formStyles.horizontalContainer,
          this.props.containerStyle]}
          onLayout={this.handleLayoutChange.bind(this)}>

          <Text style={formStyles.fieldText}>{this.props.placeholder}</Text>
          <View style={[formStyles.alignRight, formStyles.horizontalContainer]}>
            <Text style={formStyles.fieldValue}>{ valueString }</Text>


          </View>
          {(this.props.iconRight)
            ? this.props.iconRight
            : null
          }
          {(this.props.iconToggle)
            ? (!this.state.isPickerVisible ? this.props.iconToggle[0] : this.props.iconToggle[1])
            : null
          }
        </View>
      </Field>
      {(this.state.isPickerVisible)?
        pickerWrapper:null
      }

    </View>
  )
}

}

DatePickerComponent.propTypes = {
  dateTimeFormat: React.PropTypes.func,
  pickerWrapper: React.PropTypes.element,
  prettyPrint: React.PropTypes.bool
}

DatePickerComponent.defaultProps = {
  pickerWrapper: <View/>,
  dateTimeFormat: (date, mode)=>{
    if(!date) return "";
    let value='';
    switch(mode){
      case 'datetime':
       value = date.toLocaleDateString()
              + ' '
              + date.toLocaleTimeString()
      break;
      case 'time':
        value = date.toLocaleTimeString()
      break;
      default:
        value = date.toLocaleDateString()
    }
    return value;
  }
};

let formStyles = StyleSheet.create({
  form:{

  },
  alignRight:{
    marginTop: 7, position:'absolute', right: 10
  },
  noBorder:{
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  separatorContainer:{
    // borderTopColor: '#C8C7CC',
    // borderTopWidth: 1,
    paddingTop: 35,
    borderBottomColor: '#C8C7CC',
    borderBottomWidth: 1,

  },
  separator:{

    paddingLeft: 10,
    paddingRight: 10,
    color: '#6D6D72',
    paddingBottom: 7

  },
  fieldsWrapper:{
    // borderTopColor: '#afafaf',
    // borderTopWidth: 1,
  },
  horizontalContainer:{
    flexDirection: 'row',

    justifyContent: 'flex-start'
  },
  fieldContainer:{
    borderBottomWidth: 1,
    borderBottomColor: '#C8C7CC',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 45
  },
  fieldValue:{
    fontSize: 34/2,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight:10,
    paddingTop: 4,
    justifyContent: 'center',

    color: '#C7C7CC'
  },
  fieldText:{
    fontSize: 34/2,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    lineHeight: 32
  },
  input:{
    paddingLeft: 10,
    paddingRight: 10,

  },
  helpTextContainer:{
    marginTop:9,
    marginBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,

  },
  helpText:{
    color: '#7a7a7a'
  }
});
