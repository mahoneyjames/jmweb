---
layout: default
title: Meetups in Newport and the surrounding area
---

### Meetups in Newport and the surrounding area


<div id="dynamic">Loading...</div>

<script>

$( document ).ready(function() {
    
	$.get('https://chatdirectory.blob.core.windows.net/simpleapi/newport/meetups.json', null,showMeetups);
});

function showMeetups(data)

{

	
	$("#dynamic").empty();
	
	$json = $.parseJSON(data);
	$.each($json.Items, function(i,item){
	
	$("#dynamic").append("<h1>" + item.Title + "</h1>");
	$("#dynamic").append("<p>" + item.Where + " " + item.Postcode + "</p>");
	$("#dynamic").append("<p>" + item.When + "</p>");
	$("#dynamic").append("<p>" + item.Notes + "</p>");
	if(item.Link!="")
	{
		$("#dynamic").append("<p><a target='_blank' href='" + item.Link + "'>" + item.Link + "</a></p>");
	}
	
	});
}
</script>
