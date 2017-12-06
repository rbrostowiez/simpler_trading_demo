import express from 'express';
import SecurityModel from '../../../shared/models/SecurityModel';

const securityRouter = new express.Router();

securityRouter.post('/data', (req, res) => {
    res.send(SecurityModel.processRequest(req.body));
});

securityRouter.get('/data', (req, res) => {
    res.send(SecurityModel.getAllData());
});

securityRouter.get('/details/:symbol', (req, res)=> {
    res.send(SecurityModel.getSecurityByTickerSymbol(req.params.symbol));
});

securityRouter.get('/lookup/:partial', (req, res) => {
    res.send(SecurityModel.lookupSymbol(req.params.partial));
});

export default securityRouter;