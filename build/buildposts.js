const {promisify} = require('util');
const glob = promisify(require('glob'));
const {readFile} = require('fs');
const readAFileReturnPromise = promisify(readFile);
const marked = require('meta-marked');
const moment = require('moment');

const markdownToHtmlConvertor = new marked.Renderer();

const loadPosts = async () =>{

    const files = await glob('_posts/*.md');
    const fileContentPromises = files.map(file=> readAFileReturnPromise(file,'utf-8'));
    const postContents = await Promise.all(fileContentPromises);

    const posts = postContents
        .map(md=>marked(md, {renderer: markdownToHtmlConvertor}))
        .map((post,i)=>
        {
            const newObject =  Object.assign({}, post.meta, {body: post.html});
            if(newObject.draft===undefined)
            {
                newObject.draft = true;
            }

            if(newObject.permalink===undefined)
            {
                newObject.permalink = newObject.title;
            }

            newObject.when = moment(newObject.when);
            
            
            return newObject;
        }).filter((post)=>post.title!=undefined).reverse();






    return posts;
}

exports.getPosts = async()=>
{
    return await loadPosts();
}