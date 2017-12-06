

export default class SecuritySearchFilter {
    constructor(props = {}){
        let{
            symbols,
            intervalStart,
            intervalEnd,
            intervalSize
        } = props;

        this.symbols = symbols || [];
        this.intervalStart = intervalStart;
        this.intervalEnd = intervalEnd;
        this.intervalSize = intervalSize;
    }
}