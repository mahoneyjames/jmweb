---
title: Email alerts with ACRA
layout: post
---
For capturing errors in an Android app, ACRA is great. 

>ACRA catches the error, turns it into JSON and then persists that data on a web server using the *acra-storage* CouchDB app. The *acralyzer* CouchDB HTML app provides a nice front end to view error information. 

One thing it lacks is a mechanism to notify about new errors via email, but what it does have is an RSS feed of the latest errors that have been uploaded. Combine this with a script executed every few minutes and you have a simple alerting system. 

#### Enter....Google App Scripts. 

Think of this as a Javascript environment hosted by Google. It was designed to add scripting capabilities to Google documents and spreadsheets, but since it includes a timer based trigger for executing scripts it can be used to provide a hosted alerting system

There's nothing much to the script

	1. Download the RSS feed
	2. Work through the items until we find the first one that we've sent already, or we reach the end
	3. Add the details of any unset items to an email
	4. Send the email
	5. Make a note of the guid of the first error item we included in the email, so that next time the script runs we know where to stop including items


##Acralyzer RSS feed
This is the URL you need
> https://username.cloudant.com/acra-XXXXX/_design/acra-storage/_list/rss/recent-items?descending=true

username = 
acra-XXXXX = the name of your acra-storage instance

###RSS XML Example

##Authentication using Cloudant
>Cloudant provides hosting of CouchDB apps. It's a common choice when setting up *acra-storage* because their free plans are pretty generous.

Cloudant handles authentication with a username and what they term an "API Key". (Or, username and password...)

When calling the RSS feed you need to supply the details of a user that has been granted **read** access to your *acra-storage* instance. 

See this link for information: (https://docs.cloudant.com/authentication.html)

More usefully, here's how to do it using our script

> var options =
  {
      "headers": {
        "Authorization":"Basic c2F5c29tZljlkjadfjadlfjalksdjfkladjflkajdfkajsdfasdfkasdfklRUI="
        }
  };

>var xml = UrlFetchApp.fetch(sourceRssUrl, options).getContentText();

###Base64 encoding your username and password
The simplest way to get this is to use a HTTP Proxy (e.g. Fiddler) and then access your *acralyzer* front end in your browser. Sign in with the user you're going to use for script. Once signed in you can inspect the headers and grab the Base64 encoded details. 

##Parsing the XML


###Tracking the most recently sent guid
You can use the PropertiesService to persist data across script runs. Think of this as name/value pairs linked to your Google account. 

>var userProperties = PropertiesService.getUserProperties();
  
####Sending an email
Google makes this easy for us

>MailApp.sendEmail("bob@gmail.com", title, emailBody);

##Set the script up in Google App Script
    1. In Google Drive click on the big red button labeled "New", choose "More" and then "Google Apps Script"
    2. From the dialog that pops up, go ahead and choose "Blank project"
    3. Give the project a suitable name and save it
    4. Copy the script into the code editor
Now you need to manually run your function from the first time. This is important because it's how you grant any permissions your script needs

    5. There's a drop down that says "select function" in the toolbar. This contains a list of all functions in your script. Select the function "sendAlerts" then click the play button
You will be prompted that authorisation is required
Go ahead and set up any permissions the script needs
When the script starts you'll see a little tooltip like popup near the top of the window. 
If everything has gone to plan, that's all you'll see. Assuming you've got some errors in your acra-storage database you should receive an email

###If your script fails to run...
You'll see a red tooltip like popup inviting you to view details of the failure

The View menu also has a couple of options to help with debugging - the Execution Transcript and Logs

##Full script
Goes here...