---
title: It's sync or scream time
permalink: disqus-sync-2
when: 2019-08-24
summary: Grabbing comment data using the disqus API, the rightish way
draft: false
---
Let's get our challenge and story data into DynamoDb. Let's store all the comment counts there too.

And hey, at the same time, let's go for a less naive approach for grabbing comments from disqus.

New syncing technique - instead of listing ALL threads (aka, stories), let's just list *posts* (aka, comments) made against those threads. We can query for posts made since a certain date, meaning that we can query for posts made since we last checked for posts. 

If we query once per minute that means we'll end up with 60 disqus requests per hour, which is well under the 1,000 limit. 

> If there's a massive influx of comments we'll have to make multiple calls to diqus to page through the results - you're limited to a max of 100 items per response. But we are talking about a *huge* number of comments in a short space of time to make that a problem for us. 
