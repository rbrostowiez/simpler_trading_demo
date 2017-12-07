export default class SecurityInterval {
    constructor({symbol, open, close, high, low, volume, dataStart, dataEnd, lastRefreshed}){
        this.open = open;
        this.close = close;
        this.high = high;
        this.low = low;
        this.symbol = symbol;
        this.volume = volume;
        this.dataStart = dataStart;
        this.dataEnd = dataEnd;
        this.lastRefreshed = lastRefreshed;
    }
}