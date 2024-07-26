const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SocialMediaDB');

module.exports = mongoose.connection; 
