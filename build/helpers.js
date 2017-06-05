const fs = require('fs');
const moment = require('moment');
const mkdirp = require('mkdirp');

exports.moment = require('moment');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

exports.siteName='James Mahoney'; 

exports.storyBody  = (story, rule) =>
{
        
    const filename = `${__dirname}/data/stories/${story.filename}`;
    try
    {
        return fs.readFileSync(filename)
    }
    catch(err)
    {
        return `Failed to find file '${filename}'`;
    }

    //return "haro!";
} 

exports.friendlyDateShort = (date)=>
{
    return moment(date).format("MMM Do");
};


exports.friendlyDateLong = (date)=>
{
    return moment(date).format("MMM Do YYYY");
};

exports.readFile = (sourcefile) =>
{
     const filename = `${__dirname}/${sourcefile}`;
    try
    {
        return fs.readFileSync(filename,'utf-8')
    }
    catch(err)
    {
        //TODO - really should learn about better error handling in node...
        console.log(`Failed to find file '${filename}'`);
        return `Failed to find file '${filename}'`;
    }
}

exports.ensureDirectoryExists = (directory)=>{
    const path = directory.split('/').slice(0,-1).join('/');
    mkdirp(path); 
}