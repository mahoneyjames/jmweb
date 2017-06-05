const fs = require('fs');
const path = require('path');
const pug = require('pug');
const showdown = require('showdown');
const jfile = require('jfile');
const frontmatter = require('front-matter');
           
const helpers = require('./helpers');
           
const posts = [
    generateFileHtmlFromMarkdown("post",'_posts/2015-07-21-welcome.md','posts/2015-07-21-welcome',{} ),
    generateFileHtmlFromMarkdown("post",'_posts/2015-07-23-acra_email_alerts.md','posts/2015-07-23-acra_email_alerts',{} ),
    generateFileHtmlFromMarkdown("post",'_posts/2016-09-02-google_sheets_backend_data_store_via_json.md','posts/2016-09-02-google_sheets_backend_data_store_via_json',{} )
    ];

generateHtml("index", "index", {posts});
generateHtml("about","about",{title:"About"});
    
function generateHtml(view, outputFile, options)
{
    options.helpers = helpers; 
    options.siteRoot = "";   
    const html = pug.renderFile(`${__dirname}/views/${view}.pug`,options);

    const fullOutputFileName =`./_generated/${outputFile}.htm`;    
    helpers.ensureDirectoryExists(fullOutputFileName);
    fs.writeFileSync(fullOutputFileName, html, 'utf-8');
}

function sanitisePath(path)
{
    return path.split(" ").join("-") + ".htm";
}



function generateFileHtmlFromMarkdown(view, sourceFile, outputFile, options)
{
    const converter = new showdown.Converter();
    const content = frontmatter(helpers.readFile(sourceFile));
    options.body = converter.makeHtml(content.body);
    console.log(content.attributes);
    options.attributes = content.attributes;
    options.title = options.attributes.title;
    generateHtml(view, outputFile,options);

    const postDetails = {
        path: `/${outputFile}.htm`,
        title: content.attributes.title
    };

    return postDetails;

}

function htmlFromMarkdown(sourceFile){

    const filecontents = helpers.readFile(sourceFile);

    return converter.makeHtml(filecontents);
}
//console.log(htmlFromMarkdown('_posts/2015-07-21-welcome.md'));

