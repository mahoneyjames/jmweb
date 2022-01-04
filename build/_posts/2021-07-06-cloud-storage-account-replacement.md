---
title: Replacement for CloudStorageAccount
permalink: as2-mdn
when: 2021-07-06
summary: Some notes on how to create an AS2 MDN
draft: true
---


# CloudStorageAccount status quo

CloudStorageAccount can handle both of the following:

CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=blah;AccountKey=randomkeystuffsbg==;EndpointSuffix=core.windows.net")

CloudStorageAccount.Parse("SharedAccessSignature=sv=2020-04-08&ss=btqf&srt=sco&st=2021-07-05T12%3A49%3A46Z&se=2050-07-06T12%3A49%3A00Z&sp=rl&sig=Q%2Borandmom stuffYcKU6twqA8O0%3D;BlobEndpoint=https://blah.blob.core.windows.net/;FileEndpoint=https://blah.file.core.windows.net/;QueueEndpoint=https://blah.queue.core.windows.net/;TableEndpoint=https://blah.table.core.windows.net/;");


One is a connection string that uses the master account key for your storage account - this grants FULL CONTROL to everything. The second uses a shared access signature which allows you to limit how long it is valid for, and lock down access e.g. read only. This second one is what we should be using, according to all the docs and articles on the subject. This works great in the Windows.AzureStorage world, but as soon as you switch out to something like Azure.Storage.Blobs it all falls over because CloudStorageAccount no longer exists. 

# Shared access token connections with the new Azure libraries. 

You can do this
```
var container = new BlobContainerClient(connectionString, containerName);
```

That works fine if you're using an account key connection string, but not if you use the recommended shared access signature.