const fs = require('fs');
const path = require('path');
const pug = require('pug');
const showdown = require('showdown');
const jfile = require('jfile');
const frontmatter = require('front-matter');
           
const helpers = require('./helpers');
const moment = require('moment');           
const posts = [
    generateFileHtmlFromMarkdown("post",'_posts/2015-07-23-acra_email_alerts.md','posts/2015-07-23-acra_email_alerts',{} ),
    generateFileHtmlFromMarkdown("post",'_posts/2016-09-02-google_sheets_backend_data_store_via_json.md','posts/2016-09-02-google_sheets_backend_data_store_via_json',{} ),
    generateFileHtmlFromMarkdown("post",'_drafts/static_site_generation_with_node_js.md','posts/static_site_generation_with_node_js',{} )
    ];

const drafts = [
    generateFileHtmlFromMarkdown("post",'_drafts/static_site_generation_with_node_js.md','drafts/static_site_generation_with_node_js',{} )
];

generateHtml("index", "index", {posts});
generateHtml("index", "drafts", {posts:drafts});
generateHtml("about","about",{title:"About"});
    
function generateHtml(view, outputFile, options)
{
    options.helpers = helpers; 
    options.h = helpers;
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
    
    const content = frontmatter(helpers.readFile(sourceFile));
    options.body = bodyFormatterFromMarkdown(content.body);
    console.log(content.attributes);
    options.attributes = content.attributes;
    options.title = options.attributes.title;


    const postDetails = {
        path: `/${outputFile}.htm`,
        title: content.attributes.title,
        summary: content.attributes.summary,
        when: moment(content.attributes.when)
    };
    options.post=postDetails;
    generateHtml(view, outputFile,options);
    return postDetails;

}

function bodyFormatterFromMarkdown(content)
{
    const converter = new showdown.Converter();

    converter.setOption('prefixHeaderId','true');
    return converter.makeHtml(content)
}


//console.log(htmlFromMarkdown('_posts/2015-07-21-welcome.md'));

