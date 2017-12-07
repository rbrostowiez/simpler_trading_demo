import express from 'express';
import SecurityModel from '../../../shared/models/SecurityModel';
import SecuritySearchFilter from "../../../shared/models/SecuritySearchFilter";

const securityRouter = new express.Router();

securityRouter.post('/data', (req, res) => {
    res.send(SecurityModel.getSecuritySearchResultsByFilter(req.session.filter));
});

securityRouter.get('/details/:symbol', (req, res)=> {
    res.send(SecurityModel.getSecurityByTickerSymbol(req.params.symbol));
});

securityRouter.get('/lookup/:partial', (req, res) => {
    res.send(SecurityModel.lookupSymbol(req.params.partial));
});

export default securityRouter;
