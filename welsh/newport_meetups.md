---
layout: default
title: Meetups in Newport and the surrounding area
---

### Meetups in Newport and the surrounding area


<div id="dynamic">Loading...</div>

---


###### Info
<p>Feed updated: <span id="feedDate" /></p>
<script>

$( document ).ready(function() {
    
	$.get('https://chatdirectory.blob.core.windows.net/simpleapi/south-east/meetups.json', null,showMeetups);
});

function showMeetups(data)

{

	
	$("#dynamic").empty();
	
	$json = $.parseJSON(data);
	$.each($json.Items, function(i,item){
	
	$("#dynamic").append("<h1>" + item.Title + "</h1>");
	$("#dynamic").append("<p>" + item.Where + " " + item.Postcode + "</p>");
	$("#dynamic").append("<p>" + item.When.Summary + "</p>");
	$("#dynamic").append("<p>" + item.Notes + "</p>");
	if(item.Link!="")
	{
		$("#dynamic").append("<p><a target='_blank' href='" + item.Link + "'>More info</a></p>");
	}
	
	if(item.When.Upcoming.length>0)
	{	
		$("#dynamic").append("<p>Next: " + moment(item.When.Upcoming[0]).format('dddd Do MMMM') + "</p>");
	}
	
	});
	
	$("#feedDate").text($json.Generated);
}
</script>
