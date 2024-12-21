const express =  require('express');
const winston = require('winston') 
require('dotenv').config();

const app =  express();

const server_port = process.env.SERVER_PORT;


  

const consoleTransport = new winston.transports.Console() 
const myWinstonOptions = { 
    transports: [consoleTransport] 
} 
const logger = new winston.createLogger(myWinstonOptions) 
  
function logRequest(req, res, next) { 
    logger.info(req.url) 
    next() 
} 
app.use(logRequest) 
  
function logError(err, req, res, next) { 
    logger.error(err) 
    next() 
} 
app.use(logError)

const wiki_article = require('./wiki_article');
wiki_article();
app.listen(server_port,()=>{
    console.log("Server Run On ",server_port)
})