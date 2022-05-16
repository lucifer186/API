const cors = require("cors");
const express = require('express')
const bodyParser = require('body-parser');

const http = require('http')

const app = express();
const cookieParser = require('cookie-parser')

const cardRoute = require('./routes/card');

let port = 8080;
var corsOptions = {
    origin: "http://localhost:8081"
  };
global.__basedir = __dirname;

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
// app.use((req,res, next)=>{
//     res.setHeader('Content-Type', 'application/json');
//     next();
// })
app.use(cardRoute)
const server = http.createServer(app)

server.listen(port, 
    ()=>console.log('Server running at http://127.0.0.1:3000/'));


