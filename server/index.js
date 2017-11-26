//Bootstrap babel before requiring the actual server file
require('babel-register');
require('./server.babel');
