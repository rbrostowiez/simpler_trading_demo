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

app.get('/', express.static(path.join(__dirname, '/../public'), {fallthrough: false}));

//Serves index.html for 404's
app.use((req, res) => { res.sendFile(path.join(__dirname, '/../public/index.html')); });

app.listen(serverPort, () => {
    console.log(`Listening on port: ${serverPort}`);
});
