let config;
try{
config = require('../../config.json');
}
catch(e){}

import { connect, Promise } from 'mongoose';
const connectionOptions = { 
    useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    user : `${process.env.MongoUser || config.user}`,
    pass : `${process.env.MongoSecret || config.secret}`,    
    useFindAndModify: false };
connect(process.env.MongoConnectionString || config.connectionString, connectionOptions);
Promise = global.Promise;

export const User = require('../users/user.model');