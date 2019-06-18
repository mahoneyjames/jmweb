---
title: Storyclub project overview
permalink: storyclub-overview
when: 2019-05-16
summary: An overview of the storyclub project
draft: false
---

[storyclub](www.storyclub.co.uk) is a writing project I started with a friend of mine - [Jenny Allan](http://serenlas.co.uk/). We wanted a deadline, something to make us deliver, even in those times when life gets in the way. 

Each week we set a theme, and come up with three things the story must include, and then knock out five hundred words. 

Over time this has grown into a collective of like minded souls writing and sharing short fiction. 

We started out super low tech: **email**.

This was nice and simple, but it was so easy to miss stories, and once the week was over, that was it - those stories were lost to history. Or lost to the depths of an email inbox, which is pretty much the same thing. 

We wanted a way to make sharing our stuff easier, and give a permanent home to all those hundreds of hours we've spent on our frivolous five hundred word fancies. 

Enter: **the storyclub website**. 

Head over to [storyclub](www.storyclub.co.uk) to check us out ([relentless badger, anyone?](https://www.storyclub.co.uk/h/relentless/i-didnt-expect-a-sort-of-relentless-badger)), or keep on reading if you have an interest in building websites using node.js and Amazon Web Services.

# Why node.js? Why AWS?

I've been building tech stuff for nigh on twenty years. My first job involved spelunking through thousands upon thousands of lines of Fortran code looking for the handful magic numbers that identified chemical plant sensors to plug into a fancy new Excel based reporting system.

I've created websites, back office server apps, mobile apps, and integrated systems together using COM or Biztalk or SOAP web services, or the integration platform that will not die: FTP.

Most of this has involved Visual Basic, C#, SQL Server, bits of Java here and there, or cursing like hell when oh-my-god, why won't you work in IE6? 
My cloud experience has pretty much been Microsoft Azure. 

So, I know how to build stuff, just not with NodeJS and Amazon Web Services. 

I'd probably be done by now, had I gone with C# and Azure, but I was after a project to give me an excuse to learn something new. 

The project is split into a number of phases, each delivering a distinct feature. My plan is to document each phase as I go along. In theory you'll see the design evolve, from something quick and hacky, into something more elegant as I learn what works, and what doesn't.

It's not a detailed step by step follow this and build your own web app guide - AWS changes too frequently for me to keep stuff up to date. But I will make a note of anything that was particularly gnarly (i.e. took me lots of googling and stack overflowing to figure out).

# Project phases
 - Phase 1: Build a static site with node.js, and host in S3
 - Phase 2: Google sheets as a database, Lambda functions to build the website
 - Phase 3: Unit testing!
 - Phase 4: Ouch. Why am I paying TWO POUNDS a month for S3 storage?
 - Phase 5: Ajax
 - [Phase 6: https. Now we secure!](storyclub-https.htm)