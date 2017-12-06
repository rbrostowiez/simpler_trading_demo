/**
 * @class SecuritySearchSummary
 */
export default class SecuritySearchSummary {
    constructor({securityCount = 0, totalVolume = 0}) {
        this.securityCount = securityCount;
        this.totalVolume = totalVolume;
    }
}