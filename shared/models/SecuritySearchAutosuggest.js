
export default class SecuritySearchAutosuggest{
    constructor({ partial = '', suggestions = [], processingPartial = false }){
        this.partial = partial;
        this.suggestions = suggestions;
        this.processingPartial = partial;
    }
}