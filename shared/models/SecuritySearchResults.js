import SecuritySearchFilter from "./SecuritySearchFilter";
import SecuritySearchSummary from "./SecuritySearchSummary";
export default class SecuritySearchResults{
    /**
     * 
     * @param {SecuritySearchFilter} filter
     * @param {SecuritySearchSummary} summary
     * @param {SecuritySearchItem[]} securities
     */
    constructor({filter = {}, summary = {}, securities = []}){
        this.filter = new SecuritySearchFilter(filter);
        this.summary = new SecuritySearchSummary(summary);
        this.securities = securities;
    }
}