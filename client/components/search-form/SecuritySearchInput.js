import React from 'react';
import _ from 'underscore';
import Autosuggest from 'react-autosuggest';

import SecuritiesStore from "../../stores/SecuritiesStore";
import SecuritiesActions from '../../actions/SecuritiesActions';



export default class SecuritySearchInput extends React.Component {

    constructor() {
        super();

        this.state = SecuritiesStore.getSecuritiesSummary();
    }

    componentWillMount() {
        SecuritiesStore.on('change', () => {
            this.setState(SecuritiesStore.getSecuritiesSummary());
        });
    }

    render() {
        let tokenList = null;
        if(this.state.filter.tokens.length){
            tokenList = (
                <span className="input-group-addon">
                    {_.map(this.state.filter.tokens, item => (
                        <a onClick={this.removeSymbolFromSearch} key={`security-${item}`} href={`#${item}`} className="badge badge-pill badge-primary">
                            {item}
                        </a>
                    ))}
                </span>
            );
        }

        return (
            <div className="security-search">
                <div className="input-group">
                    {tokenList}
                    <Autosuggest
                        suggestions={this.state.suggestions}
                        inputProps={ {value: this.state.partial, onChange: ()=>{} } }
                        onSuggestionsFetchRequested={this.handleUpdates}
                        getSuggestionValue={suggestion => suggestion}
                        renderSuggestion={suggestion => suggestion}
                        alwaysRenderSuggestions={true}
                    />
                </div>

            </div>
        );
    }

    handleUpdates(update){
        if(update.reason === 'input-changed'){
            SecuritiesActions.lookupSymbol(update.value);
        }
        else if(update.reason === 'suggestion-selected'){
            SecuritiesActions.updateSecuritySearchFilter('addToken', update.value);
        }
    }


    removeSymbolFromSearch(e) {
        e.preventDefault();

        SecuritiesActions.updateSecuritySearchFilter('removeToken', e.target.text);

        return false;
    }
}