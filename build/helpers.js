const fs = require('fs');
const moment = require('moment');
const mkdirp = require('mkdirp');

exports.moment = require('moment');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

exports.siteName='James Mahoney'; 


exports.friendlyDateShort = (date)=>
{
    return moment(date).format("MMM Do");
};


exports.friendlyDateLong = (date)=>
{
    return moment(date).format("MMM Do YYYY");
};

exports.ensureDirectoryExists = async (directory)=>{
    const path = directory.split('/').slice(0,-1).join('/');
    mkdirp(path); 
}