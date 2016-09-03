---
layout: meetups
title: Meetups in Newport and the surrounding area
---


<h1 id="title"><span id="titleRegion"></span> Wales meetups</h1>



<div id="dynamic">Loading...</div>

---

<script src="meetups.js"></script>

###### Info
<p>Feed updated: <span id="feedDate" /></p>
<script>

$( document ).ready(function() 
{
	$("#titleRegion").text(getParameterByName('region'));
	
    if(getParameterByName('mode')=='day')
	{
		getJson(getParameterByName('region'), showMeetupsByDay);
	}
	else
	{
		getJson(getParameterByName('region'), showMeetups);
	}
});

function showMeetups(data)
{

	$("#dynamic").empty();
	
	$json = $.parseJSON(data);
	
	$.each($json.Items, function(i,item)
	{
		renderMeetup(item);
	});
	
	renderFilters($json);
	$("#feedDate").text($json.Generated);
	
}

function showMeetupsByDay(data)

{

	
	$("#dynamic").empty();
	
	$json = $.parseJSON(data);
	
	printDay("Saturday",$json);
	printDay("Sunday",$json);
	printDay("Monday",$json);
	printDay("Tuesday",$json);
	printDay("Wednesday",$json);
	printDay("Thursday",$json);
	printDay("Friday",$json);
	
	renderFilters($json);
	
	$("#feedDate").text($json.Generated);
}
function printDay(day, $json)
{
	if($json.Items.length>0)
	{
		var isFirstForDay = true;
		

		$.each($json.Items, function(i,item){
		if(item.When.Day==day)
		
		{
			if(isFirstForDay==true)
			{
				$("#dynamic").append("<hr/>");
				$("#dynamic").append("<h2>" + day + "</h2>");
				isFirstForDay=false;
			}
			renderMeetup(item);
		
		}
		
		});
		
		
	
	}
	
}
</script>
