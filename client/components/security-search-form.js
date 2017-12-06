import React from 'react';

import SecurityStore from '../stores/SecuritiesStore';
import SecuritySearchInput from './search-form/SecuritySearchInput'

export default class SecuritySearchForm extends React.Component {
    constructor(){
        super();

        this.state = SecurityStore.getFilter();
    }

    render(){
        let{ intervalStart, symbols, intervalEnd, intervalSize } = this.state;

        return (
            <div className="security-search-form">
                <form>
                    <div className="form-row">
                        <div className="col form-group">
                            <SecuritySearchInput />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col form-group">
                            <label htmlFor="interval-range-start">Start: </label>
                            <select className="form-control" name="interval-range-start"
                                    id="interval-range-start" disabled>
                                <option value={intervalStart}>
                                    {intervalStart}
                                </option>
                            </select>
                        </div>
                        <div className="col form-group">
                            <label htmlFor="interval-range-end"> End:</label>
                            <select className="form-control" name="interval-range-end" id="interval-range-end"
                                    disabled>
                                <option value={intervalEnd}>
                                    {intervalEnd}
                                </option>
                            </select>
                        </div>
                        <div className="col form-group">
                            <label htmlFor="interval-size">Interval Size:</label>
                            <select className="form-control" name="interval-size" id="interval-size" disabled>
                                <option value="week">Week</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}