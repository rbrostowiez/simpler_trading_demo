import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import SecurityStore from '../../stores/SecuritiesStore';
import SecuritySearchInput from './SecuritySearchInput'
import SecuritiesActions from "../../actions/SecuritiesActions";

import 'react-datepicker/dist/react-datepicker.css';

export default class SecuritySearchForm extends React.Component {
    constructor(){
        super();

        this.onSecuritiesStoreChange = () =>{
            this.setState(SecurityStore.getFilter());
        };

        this.state = SecurityStore.getFilter();
    }

    componentDidMount(){
        SecurityStore.on('change', this.onSecuritiesStoreChange);
    }

    componentWillUnmount(){
        SecurityStore.removeListener('change', this.onSecuritiesStoreChange);
    }



    getCalendarProps(fieldName, selectedDate) {

        let props = {
            minTime: moment().subtract(1,'years'),
            maxTime: moment(),
            onChange: this.onDateChangeGenerator(fieldName),
            placeHolderText: 'Choose a date',
            locale: 'en-us',
            isClearable: true,
            monthsShown: 1,
            id: selectedDate
        };

        if(moment(selectedDate, 'YYYY-MM-DD').isValid()){
            props.selected = moment(selectedDate);
        }


        return props;
    }

    onChange(e){
        e.preventDefault();
        let value = e.target.value;
        console.log(['volumeMin', 'volumeMax'].indexOf(e.target.name));
        //Putting a little validation in...
        if(['volumeMin', 'volumeMax'].indexOf(e.target.name) !== -1){
            console.log(['volumeMin', 'volumeMax'].indexOf(e.target.name));
            value = parseInt(value.replace(/\D/, ''));
            if(isNaN(value)){
                value = '';
            }
        }

        SecuritiesActions.updateSecuritySearchFilter(e.target.name, value);

        return true;
    }

    onDateChangeGenerator(fieldName) {
        return (date)=>{

            SecuritiesActions.updateSecuritySearchFilter(fieldName, date ? date.format('YYYY-MM-DD') : date);
        }
    }

    render(){
        let{ intervalStart, symbols, intervalEnd, intervalSize, volumeMin = '', volumeMax = '' } = this.state;
        let calendarStartProps = this.getCalendarProps('intervalStart', intervalStart);
        let calendarEndProps = this.getCalendarProps('intervalEnd', intervalEnd);


        return (
            <div className="security-search-form">
                <form>
                    <div className="form-row">
                        <div className="col form-group">
                            <SecuritySearchInput />
                        </div>

                        <div className="col form-group">
                            <label htmlFor="interval-size">Interval Size:</label>
                            <select className="form-control" name="interval-size" id="interval-size" disabled>
                                <option value="week">Week</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col form-group">
                            <label htmlFor="interval-range-start">Start: </label>
                            <DatePicker {...calendarStartProps} id="interval-range-start" />
                        </div>
                        <div className="col form-group">
                            <label htmlFor="interval-range-end"> End:</label>
                            <DatePicker {...calendarEndProps} id="interval-range-end"/>
                        </div>
                        <div className="col form-group">
                            <label htmlFor="volume-min">Minimum Volume</label>
                            <input type="text" {...{onChange: this.onChange, value: volumeMin} } id="volume-min" name="volumeMin"/>
                        </div>
                        <div className="col form-group">
                            <label htmlFor="volume-max">Maximum Volume</label>
                            <input type="text" {...{onChange: this.onChange, value: volumeMax} } id="volume-max" name="volumeMax"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
