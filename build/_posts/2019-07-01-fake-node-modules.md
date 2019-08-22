---
title: Fake node modules, and AWS Lambda and Claudia.js
permalink: fake-node-modules
when: 2019-07-01
summary: How to deploy shared libraries to AWS Lambda without publishing to NPM
draft: true
---

I need to create some shared libraries to use in my various projects, but I don't want to publish them to NPM in their unfinished half implemented state. 

> Nothing fills me with more woe than finding the perfect package on NPM only to discover it was last edited four years ago with the chirpy note that it's the *start* of a library to be the next best thing in chirpy cheery thingamajigs. 

This is my rough folder structure
- storyclub
  - lambda1
  - lambda2
- otherapps
  - app1
  - app2
  - app3
- shared
     - /util
     - /log

I want to reference that **log** library in app1 and app2, and also in lambda1 and lambda2, and so on.

## first go: npm link
npm link doesn't seem to play nicely with Claudia.js. Linked packages aren't picked up when packaging.

## What about symbolic links?
Symbolic links (on windows, using mklink) doesn't work either. (This might be down to npm pack - I've seen mention that this doesn't support symbolic links).

## npm install -S: to the rescue
What does work is 
```
$ npm install -S ../shared/log
```
This does the following to package.json
```
"dependencies": {
    "log": "file:../shared/log"
  }
```
To use, it's as simple as 
```
const log = require("log");
```

This works with Clauda.js and AWS Lambda.

> It's less good if you want to use these shared packages in a project that sits outside this folder structure, because references could easily get broken. I guess in that case it's time to actually turn this stuff into real packages.

# Steps
 - Create your shared lib e.g. super-logging
 - npm init in the super-logging directory
 - make sure that main in package.json points to your entry point js
 - npm init your cool-app
 - npm install -S ../shared/super-logging
 - use require("super-logging") 

**the name here is what's set in the dependencies in package.json**

This is based on the name of the folder containing the fake package.

 - To support more than one class in your package
 
 ```
 require("super-logging/even-superer-logging");
 ```
