import express from 'express';

import securityRouter from './security';

const apiRouter = express.Router();

apiRouter.use('/security', securityRouter);

export default apiRouter;