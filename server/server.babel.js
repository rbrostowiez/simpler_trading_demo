import express from 'express';
import data from '../shared/data';
import path from 'path';
import routers from './routers';

const app = express();
const serverPort = process.env.PORT || 3000;

app.use('/', routers);

app.listen(serverPort, () => {
    console.log(`Listening on port: ${serverPort}`);
});
