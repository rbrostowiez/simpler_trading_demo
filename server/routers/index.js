import express from 'express';
import path from 'path';

import data from '../data';

const router = new express.Router();

//Binding /data for this router to return the Sample JSON data
router.get('data', (req, res) => {
    //TODO: Make this be dynamically sourced and actually consumed
    res.send(data);
});

//Serve any static assets we need(none atm)
router.use('/', express.static(path.join(__dirname, '/../../public')));

//Middleware that will serve index.html for 404's
router.use((req, res) => { res.sendFile(path.join(__dirname, '/../public/index.html')); });


export default router;