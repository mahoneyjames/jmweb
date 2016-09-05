---
layout: meetups
title: Meetups in Newport and the surrounding area
---


<script src="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.0.0/fullcalendar.min.js" crossorigin="anonymous"></script>

<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.0.0/fullcalendar.min.css"/>

<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.0.0/fullcalendar.print.css" media="print"/>


<style>

	body {
		margin: 40px 10px;
		padding: 0;
		font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
		font-size: 14px;
	}

	#calendar {
		max-width: 900px;
		margin: 0 auto;
	}

</style>





<div id="calendar">Loading...</div>

---

<script src="meetups.js"></script>
<script>

$( document ).ready(function() 
{

$("#calendar").empty();

	var region = getParameterByName('region');
	var apiMode = getParameterByName('apimode');
	
	if(region!=null)
	{
		$(".areanav .active").removeClass("active");
		log($(".region." + region).length);
		$(".region." + region).addClass("active");
		
		if(getParameterByName('mode')!='all')
		{
			getJson(region, showMeetups,apiMode);
		}
		else
		{
			getJson(region, showMeetups,apiMode);
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

	$json = $.parseJSON(data);

		var events = [];
		$.each($json.Items, function(i,item){
			if(item.When.Upcoming.length>0)
			{
				events[events.length] = {title: item.Title, 
				start: item.When.Upcoming[0] + "T" + item.When.StartTime,
				end: item.When.Upcoming[0] + "T" + item.When.EndTime};
			}
		});
		
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay,listWeek'
			},
			defaultDate: '2016-09-12',
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: events
			/*
			[
				{
					title: 'All Day Event',
					start: '2016-09-01'
				},
				{
					title: 'Long Event',
					start: '2016-09-07',
					end: '2016-09-10'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2016-09-09T16:00:00'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2016-09-16T16:00:00'
				},
				{
					title: 'Conference',
					start: '2016-09-11',
					end: '2016-09-13'
				},
				{
					title: 'Meeting',
					start: '2016-09-12T10:30:00',
					end: '2016-09-12T12:30:00'
				},
				{
					title: 'Lunch',
					start: '2016-09-12T12:00:00'
				},
				{
					title: 'Meeting',
					start: '2016-09-12T14:30:00'
				},
				{
					title: 'Happy Hour',
					start: '2016-09-12T17:30:00'
				},
				{
					title: 'Dinner',
					start: '2016-09-12T20:00:00'
				},
				{
					title: 'Birthday Party',
					start: '2016-09-13T07:00:00'
				},
				{
					title: 'Click for Google',
					url: 'http://google.com/',
					start: '2016-09-28'
				}
			]*/
		});
	
}


</script>
