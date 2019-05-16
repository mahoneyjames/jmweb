const {promisify} = require('util');
const glob = promisify(require('glob'));
const {readFile,exists} = require('fs');
const readAFileReturnPromise = promisify(readFile);
const existsPromise = promisify(exists);
const marked = require('meta-marked');
const moment = require('moment');

const markdownToHtmlConvertor = new marked.Renderer();

const loadPosts = async () =>{

    const files = await glob('_posts/*.md');

    for (const file of files)
    {
        console.log(file);
    }

    const newWay = await Promise.all(files.map(async file=>{

        const fileContents = await readAFileReturnPromise(file, "utf-8");
        
        var post = marked(fileContents, {renderer: markdownToHtmlConvertor});
        const newObject =  Object.assign({}, post.meta, {body: post.html});
        //console.log(post.meta);
        if(newObject.draft===undefined)
        {
            newObject.draft = true;
        }

        if(newObject.permalink===undefined)
        {
            newObject.permalink = newObject.title;
        }

        newObject.when = moment(newObject.when);
        newObject.sourcePostPath = file;
        newObject.sourcePostFileName = file.split('/')[1].replace(".md","");
        
        if(await existsPromise(file.replace(".md","")))
        {
            newObject.extraFilesPath=file.replace(".md","");
            newObject.extraFiles = await glob(`${newObject.extraFilesPath}/*`)
        }
        else
        {
            newObject.extraFilesPath = null;
            newObject.extraFiles=[];
        }

        console.log(newObject.extraFiles);
        
        
        return newObject;
    }));//.filter((post)=>post.title!=undefined).reverse();;

    // const fileContentPromises = files.map(file=> readAFileReturnPromise(file,'utf-8'));
    // const postContents = await Promise.all(fileContentPromises);

    // const posts = postContents
    //     .map(md=>marked(md, {renderer: markdownToHtmlConvertor}))
    //     .map((post,i)=>
    //     {
    //         const newObject =  Object.assign({}, post.meta, {body: post.html});
    //         if(newObject.draft===undefined)
    //         {
    //             newObject.draft = true;
    //         }

    //         if(newObject.permalink===undefined)
    //         {
    //             newObject.permalink = newObject.title;
    //         }

    //         newObject.when = moment(newObject.when);
            
            
    //         return newObject;
    //     }).filter((post)=>post.title!=undefined).reverse();




  //      console.log(newWay.length);
//console.log();
    return newWay.filter((post)=>post.title!=undefined).reverse();
}

exports.getPosts = async()=>
{
    return await loadPosts();
}