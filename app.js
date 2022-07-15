const dotenv = require('dotenv');
const { Server } = require('./server/Server');


dotenv.config();


const server = new Server()
server.listen();

