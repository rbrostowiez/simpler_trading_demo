

export default class SecuritySearchFilter {
    constructor({ symbols = [], intervalStart, intervalEnd, intervalSize = 'week' }){
        this.symbols = symbols;
        this.intervalStart = intervalStart;
        this.intervalEnd = intervalEnd;
        this.intervalSize = intervalSize;
    }
}