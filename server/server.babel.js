import express from 'express';
import routers from './routers';
import AppConstants from "../shared/constants/AppConstants";
import session from 'express-session';

const app = express();
const serverPort = process.env.PORT || 3000;

app.use(session(AppConstants.APP_SESSION_CONFIG));
app.use('/', routers);

app.listen(serverPort, () => {
    console.log(`Listening on port: ${serverPort}`);
});
