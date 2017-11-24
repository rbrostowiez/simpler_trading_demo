import express from 'express';
import path from 'path';

import data from '../data';

const router = new express.Router();

router.get('data', (req, res) => {
    res.send(data);
});

router.use('/', express.static(path.join(__dirname, '/../../public')));


export default router;