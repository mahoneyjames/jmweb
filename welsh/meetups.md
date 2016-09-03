---
layout: meetups
title: Meetups in Newport and the surrounding area
---





<div id="dynamic">Loading...</div>

---

<script src="meetups.js"></script>

###### Info
<p>Feed updated: <span id="feedDate" /></p>
<script>

$( document ).ready(function() 
{
	var region = getParameterByName('region');
	
	if(region!=null)
	{
		$(".areanav .active").removeClass("active");
		log($(".region." + region).length);
		$(".region." + region).addClass("active");
		
		if(getParameterByName('mode')!='all')
		{
			getJson(region, showMeetupsByDay);
		}
		else
		{
			getJson(region, showMeetups);
		}
	}
	else
	{
		$("#dynamic").empty();
		$("#dynamic").append("<div class='alert alert-danger'>Please pick a region from the navigation bar</div>");
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
		var $row = null;
		var isFirstForDay = true;
		var $col1 = null;
		var $col2 = null;
		

		var index = -1;
		$.each($json.Items, function(i,item){
		if(item.When.Day==day)
		
		{
			if(isFirstForDay==true)
			{
				$row = $("<div class='row'/>");
				$row.appendTo($("#dynamic"));
				$row.append("<h2>" + day + "</h2>");
				isFirstForDay=false;
			}
			index++;
			if(isOdd(index))
			{
				if($col1==null)
				{
					$col1 = $("<div class='col-sm-6'/>")
					$col1.appendTo($row);
				}
			
				renderMeetup(item);
			}
			else
			{
				if($col2==null)
				{
					$col2 = $("<div class='col-sm-6'/>");
					$col2.appendTo($row);
				}
				renderMeetup(item);
			}
		}
		
		});
		
		
	
	}
	
}


</script>
