import express from 'express';
import data from './data';
import path from 'path';
import routers from './routers';

const app = express();
const serverPort = process.env.PORT || 3000;

app.use('/', routers);

app.get('/data', (req, res) => {
    res.send(data);
});

app.get('/', express.static(path.join(__dirname, '/../public')));

app.listen(serverPort, () => {
    console.log(`Listening on port: ${serverPort}`);
});
