const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData } = require('./data');

connection.on('error', (err) => console.error(err));

connection.once('open', () => {
    console.log('connected');
    
})

