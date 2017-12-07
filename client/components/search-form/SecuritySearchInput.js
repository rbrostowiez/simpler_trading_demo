import React from 'react';
import _ from 'underscore';
import Autosuggest from 'react-autosuggest';

import SecuritiesStore from "../../stores/SecuritiesStore";
import SecuritiesActions from '../../actions/SecuritiesActions';



export default class SecuritySearchInput extends React.Component {

    constructor() {
        super();

        this.onSecurityStoreChange = () => {
            this.setState({
                filter: SecuritiesStore.getFilter(),
                autosuggest: SecuritiesStore.getAutoSuggest()
            })
        };

        this.state = {
            filter: SecuritiesStore.getFilter(),
            autosuggest: SecuritiesStore.getAutoSuggest()
        };
    }

    componentDidMount() {
        SecuritiesStore.on('change', this.onSecurityStoreChange);
    }

    componentWillUnmount(){
        SecuritiesStore.removeListener('change', this.onSecurityStoreChange);
    }

    render() {
        let {filter: { symbols }, autosuggest: {partial, suggestions, processingPartial}} = this.state;

        let tokenList = null;
        if(this.state.filter.symbols.length){
            tokenList = (
                <span className="input-group-addon">
                    {_.map(symbols, item => (
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
                        suggestions={suggestions}
                        inputProps={ {size: 36, value: partial, placeholder: 'Search for Securities by Symbol', onChange: ()=>{} } }
                        onSuggestionsFetchRequested={this.handleUpdates}
                        getSuggestionValue={suggestion => suggestion}
                        renderSuggestion={suggestion => suggestion}
                        alwaysRenderSuggestions={true}
                        renderSuggestion={(suggestion) => (<span>{suggestion}</span>)}
                    />
                </div>

            </div>
        );
    }

    handleUpdates(update){
        console.log(update);
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
