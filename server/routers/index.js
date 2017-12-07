import express from 'express';
import path from 'path';

import api from './api';

const router = new express.Router();

//Binding /data for this router to return the Sample JSON data
router.use('/api', api);

//Serve any static assets we need(none atm)
router.use('/', express.static(path.join(__dirname, '/../../public'), {fallthrough: true}));

//Middleware that will serve index.html for 404's
router.use((req, res, next) => { res.sendFile(path.join(__dirname, '/../../public/index.html')); });


export default router;
