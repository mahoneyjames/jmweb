---
title: DynamoDB for the relational guy
permalink: dynamodb-relational
when: 2019-08-22
summary: Or, pretty fly for a relational database guy
draft: true
---

NoSql. That's just a JSON doc keyed against something, right? 

Well...

Kinda. Sorta. Not really. 

But I can just take a javascript object and whack it into the database? Yeah.

Well...

## Here's the rough relational database design for storyclub

TODO!

## Initial mapping of relational design to DynamoDb 

Here's a rough mapping between the relational world and DynamoDb. Okay, it's not strictly true, but it helps to get your head around some of the key DynamoDb concepts

### Relational database == DynamoDb table

> Most apps can get by with a single DynamoDb table.

[Reference](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-general-nosql-design.html)

### Relational table == A single partition in a DynamoDb table

Sort of. 

One approach to take is to have partitions with the following keys

 - Users
 - Comments
 - Challenges
 - Stories
 - Authors
 - etc

To do 
```
select * from users
```
you simply query for all data in the users partition. 

### Row in a relational table == An entry in a partition with range key

 - users - james
 - users - phil
 - users - brian
 - stories - story1
 - stories - story2
 - stories - story3

```
select * from users where name = 'james'
```
Query the users partition for the range key 'james'




## You really want to do it like that...?

At least we've avoided the relational guy's standard trap of imagining there's a users table, and a comments table, and a stories table...

> Time to talk about partitions

A partition in DynamoDb is a big hunk of data, up to 10GB in size. 

If you go with a single partition key of "stuff", then the max amount of stuff you can support is 10GB. 

If you go with "users" and "comments" and "stories" as partition keys, you can support 10GB per "virtual table". 

This might be fine for your size requirements, but it does have some other drawbacks. That partition is ultimately saved on a hard disk somewhere. But putting all of the user data on the same hard disk it means that all requests for data about all users go through that single disk, which becomes a bottleneck. 

If each of these hypothetical disks support 100 concurrent connections, that's a max of 100 concurrent pages about users you can display on your website. That might be fine for your usage requirments, but NoSql is supposed to be *infintely* scalable. 

Instead, choose "user-james" and "user-phil" and "user-brian" for partition keys. By going with 1 partition key per user we can store 10GB of data per user, *and* we've increased our theoretical throughput to be limited by however many of these hard disks Amazon is using. 


> Think of a relational table as **the static part of a unique partition key**
