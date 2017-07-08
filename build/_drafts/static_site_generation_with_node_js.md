---
title: Static site generation using node.js
layout: post
---

Version 1 of this site was built using [Jekyll](https://jekyllrb.com/). This takes content written in Markdown and spits out a static HTML site. Works well for a site hosted in git pages, because that has built in support for Jekyll.

There were a few things I didn't like about Jekyll, namely 
 - Having to fit in with other people's way of doing things.
 - Having to learn *another* framework on top of HTML and Javascript
 - A vague sense of disquiet that I didn't really know what was going on behind the scenes. 


## Enter: node.js and pug

pug is a whitespace based HTML templating system. As such, it's close enough to the tree structure of HTML that I'm already familier with, and it includes a clean and simple way to build dynamic content. Combine that with a node.js library that allows you to generate html out of pug files, and we have a very simple - and low level - static site builder. 

High level workflow is
 - Use node.js to run a JS file. This puts static HTML somewhere
 - Copy this HTML to a web server

Important things
 - package.json - defines the node "app". For our purposes, this comes down to a list of dependancies, and the JS entry points that build the site.
 - build.js - contains the logic that builds the site. 
 - previewHost/preview.js - runs the node.js express webserver against the generated content to allow for local previewing
 - views directory - pug view templates. These are used to build the static HTML out of dynamic content   
