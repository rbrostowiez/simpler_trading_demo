import express from 'express';
import bodyParser from 'body-parser';

import securityRouter from './security';

const apiRouter = express.Router();

apiRouter.use(bodyParser.json())

apiRouter.use('/security', securityRouter);

export default apiRouter;