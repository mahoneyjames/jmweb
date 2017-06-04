const fs = require('fs');
const path = require('path');
const pug = require('pug');
           
const helpers = require('./helpers');
           

generateHtml("index", "index", {});
generateHtml("about","about",{title:"About"});
    
function generateHtml(view, outputFile, options)
{
    options.helpers = helpers; 
    options.siteRoot = "";   
    const html = pug.renderFile(`${__dirname}/views/${view}.pug`,options);
    fs.writeFileSync(`./_generated/${outputFile}.htm`, html, 'utf-8');
}

function sanitisePath(path)
{
    return path.split(" ").join("-") + ".htm";
}