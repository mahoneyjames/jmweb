const fs = require('fs');

const pug = require('pug');
           
const helpers = require('./helpers');
const moment = require('moment');   

const postLoader = require('./buildposts');

postLoader.getPosts().then((posts)=>
{
    
    const published = [];
    const drafts = [];    
    posts.forEach((newPost)=>{
        if(newPost.draft==true)
        {
            drafts[drafts.length] = newPost;
        }
        else
        {
            published[published.length] = newPost;
        }

        newPost.permalink = `posts/${sanitisePath(newPost.permalink)}.htm`;
        
        generateHtml("post",newPost.permalink ,newPost);
    });

    generatePages(published,drafts);
}).catch((err)=>console.log(err));


function generatePages(posts, drafts)
{
    //TODO - promisify this
    generateHtml("index", "index.htm", {posts});
    generateHtml("index", "drafts.htm", {posts:drafts});
    generateHtml("about","about.htm",{title:"About"});


}
    
function generateHtml(view, outputFile, options)
{
    options.helpers = helpers; 
    options.h = helpers;
    options.siteRoot = "";   
    const html = pug.renderFile(`${__dirname}/views/${view}.pug`,options);

    const fullOutputFileName =`./_generated/${outputFile}`;    
    helpers.ensureDirectoryExists(fullOutputFileName);
    fs.writeFileSync(fullOutputFileName, html, 'utf-8');
}





function sanitisePath (path)
{
    return path.split(" ").join("-").split(".").join("");
}