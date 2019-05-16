const {promisify} = require('util');
const {writeFile, copyFileSync, mkdirSync, existsSync} = require('mz/fs');
const fs = require('fs');

const pug = require('pug');
           
const helpers = require('./helpers');
const moment = require('moment');   

const postLoader = require('./buildposts');

const generatePosts = async () =>{

   const posts = await postLoader.getPosts();
        
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

        const santisedPath = sanitisePath(newPost.permalink);
        newPost.permalink = `posts/${santisedPath}.htm`;
        //Ugh, lots of code just to copy over images!
        //Hmm, wonder if I could change the whole build process to web pack...
        if(newPost.extraFilesPath!=null)
        {
            const outputDir = `_generated/posts/${santisedPath}`;
            if(!existsSync(outputDir))
            {
                mkdirSync(outputDir);
            }
        
            for(const file of newPost.extraFiles)
            {
                //post has other files e.g. images
                //copy them from _posts into the final directory
                //i.e. ./_generated/posts/permalink/*
                console.log(file);
                const filename = file.split("/").slice(-1).pop();

                    copyFileSync(file, `${outputDir}/${filename}`);


            }
        }
    });

    await Promise.all(published.map((post)=>generateHtml("post",post.permalink ,post)),
                    drafts.map((post)=>generateHtml("post",post.permalink ,post)));    
    await generatePages(published,drafts);    
}

async function generatePages(posts, drafts)
{
    //TODO - promisify this
    await generateHtml("index", "index.htm", {posts});
    await generateHtml("index", "drafts.htm", {posts:drafts});
    await generateHtml("about","about.htm",{title:"About"});


}
    
async function generateHtml (view, outputFile, options)
{
    options.helpers = helpers; 
    options.h = helpers;
    options.siteRoot = "";   
    const html = pug.renderFile(`${__dirname}/views/${view}.pug`,options);

    const fullOutputFileName =`./_generated/${outputFile}`;    
    await helpers.ensureDirectoryExists(fullOutputFileName);
    await writeFile(fullOutputFileName, html, 'utf-8');
}





function sanitisePath (path)
{
    return path.split(" ").join("-").split(".").join("");
}

generatePosts();