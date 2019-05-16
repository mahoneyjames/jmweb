---
title: Static site generation using node.js
permalink: Static site generation using node.js
when: 2017-08-22
summary: Jekyll is for wimps
draft: false
---

I used [Jekyll](https://jekyllrb.com/) to run this site for a while. Jekyll takes Markdown content and spits out a static HTML site. Use [GitHub Pages](https://pages.github.com/) with its built in support for Jekyll and you can host your own site - for free - in minutes. 

I was always filled with a vague sense of disquiet using Jekyll though. I didn't really know what was going on under the hood, and I had to put my content where Jekyll told me in order for things to work. There's a whole bunch of community written extensions and plugins to add features to a Jekyll site, but I always seemed to have to jump through hoops to get them to play nicely. 

## Enter...node.js and pug

pug is a whitespace based HTML templating system. As such, it's close enough to the tree structure of HTML that I'm already familier with, and it includes a clean and simple way to build dynamic content. Combine that with a node.js library that allows you to generate html out of pug files, and we have a very simple - and low level - static site builder. 

## High level workflow
 - Use node.js to run a JS file. This puts static HTML somewhere
 - Copy this HTML to a web server

### A little more detail
 - package.json - defines the node "app". For our purposes, this comes down to a list of dependancies, and the JS entry points that build the site.
 - build.js - contains the logic that builds the site. 
 - views directory - pug view templates. These are used to build the static HTML out of dynamic content   
 - _posts directory - markdown files holding blog posts
 - gulpfile.js

    - gulp is used to preview changes using [browsersync](https://www.browsersync.io/)
    - gulp is also used to "publish" the latest version of the site into a directory in the root called "docs". 

## Generating blog posts

Every post is a markdown file

I use [Showdown](https://www.npmjs.com/package/showdown) to convert the markdown into a fragment of HTML.

Each post becomes a Javascript object containing metadata about the post (title, date, etc) and a field to hold the body of the post. 

Then [pug](https://www.npmjs.com/package/pug) is used to template these objects out as standalone HTML pages. 

Here's the pug template

```html
extends layout

block content
    div.Container
        h1 #{title}
    
        .body !{body}

    
```

If you're new to pug - that "extends layout" bit is telling pug to use layout.pug and *insert* our generated content into layout.pug where it finds a block called content. 


### Updating the site

Here's my current cobbbled together workflow
 - Get latest on the *master* branch of my [github repository](https://github.com/mahoneyjames/jmweb)
 - Do things e.g. tweak the css or edit one of the layout.pug files, or add a new blog post 
 - Use gulp and browsersync to provide a local preview of my changes
 - Once I'm happy, use gulp to copy over the latest version of the site into the docs folder
 - Push all changes to github
    - [GitHub Pages](https://pages.github.com/) serves out any content in this directory to the web as [www.jamesmahoney.co.uk](http://www.jamesmahoney.co.uk)


## Update: May 2019

This page comes in super useful when it's almost two years later and you can't remember how your cobbled together not a CMS sort of static site works...