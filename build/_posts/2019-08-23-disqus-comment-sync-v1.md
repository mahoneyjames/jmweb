---
title: Grabbing comment data using the disqus API
permalink: disqus-sync-1
when: 2019-08-23
summary: This is the tale all about how my disqus syncing got flipped turned upside down
draft: false
---

We want to grab details about comments made using disqus so we can make it more obvious that commenting is going on. 

On disqus, one story equals one disqus thread. Comments made are posts made against the thread.

First go at this is
 - Grab a list of all stories
 - Query disqus for each story to work out a comment count
 - Work out the total number of comments per challenge
 - Save all this comment data somewhere e.g. a JSON file in S3
 - Run this sync every 10 minutes or so
 - Expose this data via a HTTP Lambda function and call it via Javascript from our HTML pages


## Problem #1: disqus API rate limit
It's 1000 requests per hour.
Given 250 stories and querying every 10 minutes, we hit that limit in 40 minutes. 

Querying every 15 minutes mean we just about get away with it, but we'll have a problem in the future when we hit 300 stories. 

### Quick and hacky solution
Every 5 minutes query for only the 10 most recent stories - these are the ones people are most likely to comment on. 

Every hour or so, query for **every** story, to pick up any comments added to old stories. 

## Problem #2: Oh my goodness, **how many** S3 requests?

The Google spreadsheet is still our master source of data. But rather than query this each time, challenge and story details are also stored in S3 as JSON files. 1 file per thing. To work out a list of all stories we list files in S3, and then read them. Every five minutes. 

250 stories means 250 files. That's 3,000 reads per hour. That's 72,000 per day. 

That's 2 million a month, which is a tad over the 20,000 limit. Bugger. 

That's four quid or so I won't see again. 

### Quick and hacky solution
Our users are all UK based, so let's turn off comment syncing overnight. We only sync comments between 0700 and 2200, which is a nice saving. 

### Non hacky solution - hey, let's cache stuff
Our story data doesn't change often, so let's take advantage of Lambda functions sticking around in between invocations to cache our data.

Woo hoo! S3 costs down dramatically, for the win!

## Problem #3: stale data

Our Lambda that syncs comments doesn't know that new stories have been added to the website because it's caching. Luckily (!), Lambda function recycling means that this problem goes away eventually, but it does mean that sometimes there's a short delay before it starts to pick up comments for **new** stories. 

Our Lambda that provides the HTTP API for comment counts is caching those comment counts. If people are actively using the site then this Lambda instance hangs around, with its stale data.

### Quick (and hacky?) solution
Expose another HTTP end point on our HTTP Lambda function to allow the comment sync Lambda to notify us when there's new information. Hooray! Our comment counts are correct.

## Problem #4: Too many users
How many is too many? 

Well...one.

There are 2 AJAX calls on the home page, which means two simultaneous HTTP requests, which means 2 concurrent Lambda functions. 

When comment syncing runs it can only notify one of these functions that there are new comments. 

This means we end up with inconsistent comment counts being reported.

### No quick and hacky solution
This is sticking plaster after your leg's been ripped off by a cougar. 

Let's do it properly. How about a database for comments?

