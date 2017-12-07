import express from 'express';
import bodyParser from 'body-parser';

import securityRouter from './security';
import readmeRouter from './readme';

const apiRouter = express.Router();

apiRouter.use(bodyParser.json());

apiRouter.use('/readme', readmeRouter);
apiRouter.use('/security', securityRouter);

export default apiRouter;
