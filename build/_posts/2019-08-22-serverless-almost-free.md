---
title: Serverless for (almost) free
permalink: serveless-am-ddim
when: 2019-08-22
summary: Is it possible to run a dynamic site just using the AWS Free Tier?
draft: false
---

Cloud services are super cheap. Wow! 2p a month to store a GB in cloud storage? Yes please! But those fractons of pennies for a bajillion operations can add up. 

Say you have an AWS queue triggering a Lambda function, that can add up to a couple of pounds a month merely to poll the queue to see if there are any messages to process. This isn't a big deal for a company with deep pockets - really, you want to spend a week of dev time to re-architecture your app to save **_two pound fifty a month???_**

But in the world of side projects, two pound fifty a month on lots of trivial things can soon add up to that sinking feeling: I have spent 5 million spare time hours **and** five hundred quid just so  two active users can argue with each other over a custom built commenting system. 

Is it possible to run a slick and performant app in a cloud provider, and do it for nothing? Well, almost nothing. 

## AWS free tier
Amazon offer a bunch of stuff, for free, forever. 

Stuff like
 - S3 storage
 - Lambda functions
 - Emails
 - NoSql DynamoDb

There are usage limits, but as long as you stay within these limits then it's free. Hooray!


## The app

[storyclub](www.storyclub.co.uk) is an informal weekly writing non-contest. The goal is to get people writing, and get them doing it regularly. 

The high level workflow is
 - The weekly rules are posted to the website
 - Writers write, then submit their stories
 - Stories are published
 - People read, and submit comments

# How it's been going
## Step 1: Proof of concept
Details of the challenges, and all the submitted stories live in a Google spreadsheet.

Node.js scripts to grab the data as JSON, then generate HTML out of it, before pushing files into S3 to hose a static website. 

### Outcome
Yep. Basically runs for free. 

20-30 stories a month, and 4 challenges means we are **well below** the S3 free tier limit of 2,000 writes per month.

Our abyssmal readership also means we just sneak under the free 20,000 reads a month.

Drawback
 - You need a laptop and the node know how to get the stories published. I don't get paid enough for this. 

## Step 2: Google Apps Scripts running Lambda functions for site building
A couple of menu options in a Google spreadsheet

These push the challenge/story data into a Lambda function, which then builds pages and writes them to S3.

Essentially that laptop and npm run has been replaced by a menu click and a Lambda function.

### Outcome
Yep, sitll bascially free.

Drawbacks
 - It's kind of multi admin user, but will likely explode if two people click the menu option at the same time
 - Data is still in a spreadsheet

## Step 3: Feedback online!
The original method of feedback was email. It was such a pain that people tended not to bother. Since the stories are on the website, why not write comments there too?

Hello, disqus.com

Add this to each page, and voilà, we are into pretentious French mode, but we also have a nice commenting system for free.
```
<div class="box" id="disqus_thread"></div>
<script>
    var disqus_config = function () {
        this.page.url = "http://www.storyclub.co.uk/h/last-orders/nice-little-runner";
        this.page.identifier = "1la4ic1jz1np174"; 
    };

(function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://storyclub.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
</script>
```
## Step 4: Who said what now?

Okay, so comments are buried on individual story pages, meaning that engagement is low. It would good to show commenting activity on the front page. Unfortunately disqus provides limited options for looking up posts from HTML or javascript. But it does provide a nice API...

Suppose we write a Lambda function to query the API and do nice things with the data. How hard could that be?

[Well...](disqus-sync-1.htm)


## Step 5: DynamoDb for comment syncing

Okay, so that went well.

Too many disqus requests, and too much S3 access. 

Can we solve both? [Let's see...](disqus-sync-2.htm)



Link to a page about dynamoDb for relational guys.