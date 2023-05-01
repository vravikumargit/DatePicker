import * as React from 'react';
import styles from './Datepickercontrol.module.scss';
import { IDatepickercontrolProps } from './IDatepickercontrolProps';
import { IDatePickerstates } from './IDatePickerstate';
//import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
//import moment from 'moment';
import { DateTimePicker, DateConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';
import { PrimaryButton } from 'office-ui-fabric-react';
import * as moment from 'moment';
export default class Datepickercontrol extends React.Component<IDatepickercontrolProps, IDatePickerstates> {
  constructor(props:IDatepickercontrolProps){
    super(props);
    sp.setup({
      spfxContext:this.props.context
    });
    this.state={
      SelectedDate:null
    }
  }
  onSaveDateTime=()=>{
    // const timeutc=this.state.SelectedDate ? this.state.SelectedDate.utc():null;
    const selectedDateTime = this.state.SelectedDate;
  const selectedDateTimeUtc = selectedDateTime
    ? moment(selectedDateTime).utc().format()
    : null;

    sp.web.lists.getByTitle("Test1").items.add({
      RequestDate:selectedDateTimeUtc
    })
    .then((response)=>{
      console.log(`Item ${response.data.ID} created successfull`); 

    }).catch((error)=>{
      console.log("Error",error);
    });
  }
  onDateTimeSaving=(dateTime:any)=>{
    this.setState({SelectedDate:dateTime})
  }
  public render(): React.ReactElement<IDatepickercontrolProps> {
     

    return (
      <>
     <div className={styles.icon189}> 
     <DateTimePicker
      label='Select a date and Time'
      dateConvention={DateConvention.DateTime}
      onChange={this.onDateTimeSaving}     
        
      /></div>
      <div className={styles.btndiv}>
      <PrimaryButton onClick={this.onSaveDateTime} text='Save Date and Time'/></div>
      </>
       
    );
  }
}
