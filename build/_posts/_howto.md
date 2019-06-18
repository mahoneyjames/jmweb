---
title: How to write a blog post
permalink: something unique
when: 2017-08-22
summary: Reminders for myself how the heck I go about adding a new post...
draft: true
---

Add a markdown file in _posts

Prefix it with the date, just to make finding it easier (This date isn't used when publishing)

Add front matter to the file

```
---
title: How to write a blog post
permalink: a draft post.exe
when: 2017-08-22
summary: Reminders for myself how the heck I go about adding a new post...
draft: true
---
```

Set draft = true to get the post visible via [/drafts.htm](/drafts.htm)

permalink needs to be unique

# Support for images
Create a folder named after the blog post but without the .md extension in the posts folder
Anything in this directory is copied into the _generated/_posts directory when the build script is run


# Building
Use npm run run

# Previewing

## Preview what's in _generated while writing posts
gulp serveG

## Preview what's in the docs directory
gulp serve

# Releasing
gulp rebuild

This copies all blog posts and static content and css into the docs directory