---
layout: default
title: Newport meetups by day of the week
---

### Newport meetups by day of the week


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
	
	printDay("Saturday",$json);
	printDay("Sunday",$json);
	printDay("Monday",$json);
	printDay("Tuesday",$json);
	printDay("Wednesday",$json);
	printDay("Thursday",$json);
	printDay("Friday",$json);
	
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
				$("#dynamic").append("<h1>" + day + "</h1>");
				isFirstForDay=false;
			}
			printMeetup(item);
		
		}
		
		});
	
	}
	else
	{
	}
}
function printMeetup(item)
{
$("#dynamic").append("<h3>" + item.Title + "</h3>");
	$("#dynamic").append("<p>" + item.Where + " " + item.Postcode + "</p>");
	$("#dynamic").append("<p>" + item.When.Repeats + ", " + item.When.Time + "</p>");
	$("#dynamic").append("<p>" + item.Notes + "</p>");
	if(item.Link!="")
	{
		$("#dynamic").append("<p><a target='_blank' href='" + item.Link + "'>Further info</a></p>");
	}
	
	if(item.When.Upcoming.length>0)
	{	
		$("#dynamic").append("<p>Next: " + moment(item.When.Upcoming[0]).format('dddd Do MMMM') + "</p>");
	}
}
</script>
