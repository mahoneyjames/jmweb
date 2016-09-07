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
	
	.eventTitle
	{ cursor: pointer; cursor: hand; }

</style>





<div id="calendar">Loading...</div>

<div id="eventDetail" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Modal title</h4>
      </div>
      <div class="modal-body" id="eventDetailBody">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

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
			getJson(region, showCalendar,apiMode);
		}
		else
		{
			getJson(region, showCalendar,apiMode);
		}
	}
	else
	{
		$("#dynamic").empty();
		$("#dynamic").append("<div class='alert alert-danger'>Please pick a region from the navigation bar</div>");
	}
});

function showCalendar($json)
{

		var events = [];
		$.each($json.Items, function(i,item){
			if(item.Status=='Confirmed')
			{
				for(var index=0;index<item.When.Upcoming.length; index++)
				{
					log(item.When.Upcoming[index]);
					var event = {title: item.Title + ' - ' + item.Area, 
								start: item.When.Upcoming[index] + "T" + item.When.StartTime,
								end: item.When.Upcoming[index] + "T" + item.When.EndTime,
					className:['eventTitle'],
					sourceItem: item};
				
					events[events.length] = event;
				}
			}
		});
		
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay,listWeek'
			},
			defaultView: 'listWeek',
			defaultDate: '2016-09-04',
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: events,
			 eventClick: function(event) {
				$("#eventDetailBody").empty();
				var $div = $("#eventDetailBody");
				renderMeetup(event.sourceItem, $div);
				
				$('#eventDetail .modal-title').text(event.sourceItem.Title);
				$('#eventDetail').modal();
				
				return false;

			}	
		});
	
}


</script>
