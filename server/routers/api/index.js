import express from 'express';

import SecurityModel from '../../models/SecurityModel';

const apiRouter = express.Router();

apiRouter.get('/security/:symbol', (req, res)=> {
    res.send(SecurityModel.getSecurityByTickerSymbol(req.params.symbol));
});

apiRouter.post('/data', (req, res) => {
    res.send(SecurityModel.processRequest(req.body));
});

apiRouter.get('/data', (req, res) => {
    res.send(SecurityModel.getAllData());
});

export default apiRouter;