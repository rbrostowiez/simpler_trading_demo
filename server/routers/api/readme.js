import express from 'express';
import path from 'path';
import fs from 'fs';
import Promise from 'bluebird';

const readFile = Promise.promisify(fs.readFile);

const readmeRouter = express.Router();

readmeRouter.get('/', (req, res) => {
    readFile(path.join(__dirname, '/../../../README.md'))
        .then(contents => {
            res.send({text: contents.toString()})
        });
});

export default readmeRouter;
