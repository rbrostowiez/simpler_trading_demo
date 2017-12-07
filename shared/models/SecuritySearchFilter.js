

export default class SecuritySearchFilter {
    constructor({ symbols = [], intervalStart, intervalEnd, intervalSize = 'week', volumeMin, volumeMax }){
        this.symbols = symbols;
        this.intervalStart = intervalStart;
        this.intervalEnd = intervalEnd;
        this.intervalSize = intervalSize;
        this.volumeMin = volumeMin;
        this.volumeMax = volumeMax;
    }
}
