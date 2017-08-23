const fs = require('fs');
const path = require('path');
const pug = require('pug');
const showdown = require('showdown');
const jfile = require('jfile');
const frontmatter = require('front-matter');
           
const helpers = require('./helpers');
const moment = require('moment');   

fs.readdir(`./_posts`, function readDirResults(err, files){
    if(err)
        console.log(err);
    else{
        processPosts(`./_posts`,files);
    }

})
    
function processPosts(sourceDirectory,files)
{
    
    const posts = [];
    const drafts = [];

    files.forEach((file)=>{
        
        var newPost = generateFileHtmlFromMarkdown("post", sourceDirectory, file, {});
        if(newPost)
        {

            if(newPost.isDraft==true)
            {
                drafts[drafts.length] = newPost;
            }
            else
            {
                posts[posts.length] = newPost;
            }
        }
    });

    generatePages(posts,drafts);
}    



function generatePages(posts, drafts)
{
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





function generateFileHtmlFromMarkdown(view, sourceDirectory, sourceFile,  options)
{
    
    const content = frontmatter(helpers.readFile(`${sourceDirectory}/${sourceFile}`));
    if(content.attributes.title===undefined)
    {
        return null;        
    }

    const postDetails = {                
        title: content.attributes.title,
        summary: content.attributes.summary,
        when: moment(content.attributes.when),
        isDraft: content.attributes.draft ? content.attributes.draft : false,
        body: bodyFormatterFromMarkdown(content.body),
        attributes: content.attributes,
        permalink: content.attributes.permalink ? content.attributes.permalink:content.attributes.title
    };

    if(postDetails.permalink===undefined)
    {
        postDetails.permalink = sourceFile;
    }
    
    postDetails.permalink = `posts/${sanitisePath(postDetails.permalink)}.htm`;
        
    generateHtml(view,postDetails.permalink ,postDetails);
    return postDetails;

}

function bodyFormatterFromMarkdown(content)
{
    const converter = new showdown.Converter();

    converter.setOption('prefixHeaderId','true');
    return converter.makeHtml(content)
}


//console.log(htmlFromMarkdown('_posts/2015-07-21-welcome.md'));

function sanitisePath (path)
{
    return path.split(" ").join("-").split(".").join("");
}