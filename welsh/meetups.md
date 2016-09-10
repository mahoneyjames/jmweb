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


<div id="eventDetail" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Meetup details</h4>
      </div>
      <div class="modal-body" id="eventDetailBody">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="alert alert-warning" role="alert">
	<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
	<strong>Work in progress!</strong> This site is a work in progress. <a href="about.html">Learn more</a>
</div>


 <!-- Nav tabs -->
  <ul class="nav nav-tabs" id="tabStrip" role="tablist">
    <li role="presentation" class="active"><a href="#list" aria-controls="list" role="tab" data-toggle="tab">List</a></li>
    <li role="presentation"><a href="#calendar" aria-controls="calendar" role="tab" data-toggle="tab">Calendar</a></li>    
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">    
    <div role="tabpanel" class="tab-pane active" id="list"><div id="listContent" class="fc fc-unthemed fc-ltr">
	<!--div class="fc-toolbar">
		<div class="fc-left">
			<div class="fc-button-group">
				<button type="button" class="fc-prev-button fc-button fc-state-default fc-corner-left">
					<span class="fc-icon fc-icon-left-single-arrow"/>
				</button>
				<button type="button" class="fc-next-button fc-button fc-state-default fc-corner-right">
					<span class="fc-icon fc-icon-right-single-arrow"/>
				</button>
			</div>
			<button type="button" class="fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right fc-state-disabled" disabled="">today</button>
		</div>
		<div class="fc-right">
			<div class="fc-button-group">
				<button type="button" class="fc-month-button fc-button fc-state-default fc-corner-left">month</button>
				<button type="button" class="fc-agendaWeek-button fc-button fc-state-default">week</button>
				<button type="button" class="fc-agendaDay-button fc-button fc-state-default">day</button>
				<button type="button" class="fc-listWeek-button fc-button fc-state-default fc-corner-right fc-state-active">list</button>
			</div>
		</div>
		<div class="fc-center">
			<h2>Sep 4 – 10, 2016</h2>
		</div>
		<div class="fc-clear"/>
	</div-->
	<div class="fc-view-container" style="">
		<div class="fc-view fc-listWeek-view fc-list-view fc-widget-content">
			<table id="eventsTable" class="fc-list-table">
					<tbody>
					</tbody>
				</table>
			
			<!--div class="fc-scroller" style="overflow-x: hidden; overflow-y: auto; height: 466px;">
				
			</div-->
		</div>
	</div>
</div>
</div>
	<div role="tabpanel" class="tab-pane" id="calendar"><div id="calendarContent"><span class="loading">Loading...</span></div></div>
</div>

---



<script src="meetups.js"></script>

###### Info
<p>Feed updated: <span id="feedDate" /></p>

<script>

$( document ).ready(function() 
{
	var region = getParameterByName('region');
	var apiMode = getParameterByName('apimode');
	
	if(region!=null)
	{
		$(".areanav .active").removeClass("active");
		log($(".region." + region).length);
		$(".region." + region).addClass("active");
		
		if(getParameterByName('mode')!='all')
		{
			getJson(region, showMeetupsByDay,apiMode);
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
	
	setupTabs();
});

var $jsonData;
function setupTabs()
{

	$('#tabStrip a[href="#list"]').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	  
	});
	$('#tabStrip a[href="#calendar"]').click(function (e) {
	  e.preventDefault()
	  log("calendar");
	  $(this).tab('show')
	  showCalendar($jsonData);
	  
	  
 
	  
	});
	
}
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
function printTableVersion($json)
{
	$("#dynamic").empty();
	
	var $table = $("#eventsTable");
	
	var $tableBody = $table.find("tbody");
	//$table.appendTo($("#dynamic"));
	
	
	printTableDay($tableBody, "Monday",$json);
	printTableDay($tableBody, "Tuesday",$json);
	printTableDay($tableBody, "Wednesday",$json);
	printTableDay($tableBody, "Thursday",$json);
	printTableDay($tableBody, "Friday",$json);
	printTableDay($tableBody, "Saturday",$json);
	printTableDay($tableBody, "Sunday",$json);
	
}

function printTableDay($tableBody, day, $json)
{
	var isHeaderRowAppended = false;
	var $row = $(
					 '	<tr class="fc-list-heading" data-date="2016-09-06">'
					+ '		<td class="fc-widget-header" colspan="3">'
					+ '			<a class="fc-list-heading-main" data-goto="{&quot;date&quot;:&quot;2016-09-06&quot;,&quot;type&quot;:&quot;day&quot;}">Tuesday</a>' //<a class="fc-list-heading-alt" data-goto="{&quot;date&quot;:&quot;2016-09-06&quot;,&quot;type&quot;:&quot;day&quot;}">September 6, 2016</a>'
					+ '		</td>'
					+ '	</tr>');
	$row.find("a").text(day);
	
	
	for(var index=0;index<$json.Items.length;index++)
	{
		var item = $json.Items[index];
		
		if(item.When.Day==day)
		{
			if(!isHeaderRowAppended)
			{
				$row.appendTo($tableBody);
				isHeaderRowAppended=true;
			}
		
			$row = $('<tr class="fc-list-item eventTitle">'
					+ '		<td class="fc-list-item-time fc-widget-content"></td>'
					+ '		<td class="fc-list-item-marker fc-widget-content">'
					+ '			<span class="fc-event-dot"/>'
					+ '		</td>'
					+ '		<td class="fc-list-item-title fc-widget-content">'
					+ '			<a></a><span class="fc-list-heading-alt"/>'
					+ '		</td>'
					+ '	</tr>');
			//log($row);
			
			if(item.When.StartTime!=undefined && item.When.StartTime!="")
			{
				$row.find(".fc-list-item-time").text(moment("1963-09-23T" + item.When.StartTime).format("h:mma"));
			}
			var titleText = item.Title + " - " + item.Area;
			

			$row.find(".fc-list-item-title a").text(titleText);
			if(item.When.Repeats!='Weekly')
			{
				$row.find(".fc-list-item-title span").text(item.When.Summary);
			}
			
			$row.appendTo($tableBody);
			$row.data("item",item);
			$row.click(function(){
			
				$("#eventDetailBody").empty();
				var item = $(this).data("item");
				var $div = $("#eventDetailBody");
				renderMeetup(item, $div);
				
				//$('#eventDetail .modal-title').text(item.Title);
				$('#eventDetail').modal();
				
				return false;
			
			
			
		});
	}
}
}

function showMeetupsByDay($json)
{
	$jsonData = $json;
	printTableVersion($json);
	//showCalendar($json);
	
	//renderFilters($json);
	
	$("#feedDate").text($json.Generated);
return;
//log($json);
	
	$("#dynamic").empty();
	
	
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


function showCalendar($json)
{
	if($("#calendarContent .loading").length==0)
	{
		log("calendar already initialised");
		return;
	}

		var events = [];
		$.each($json.Items, function(i,item){
			if(item.Status=='Confirmed')
			{
				for(var index=0;index<item.When.Upcoming.length; index++)
				{
				var upcomingItem = item.When.Upcoming[index];
					log(upcomingItem);
					var event = {title: item.Title + ' - ' + item.Area, 
								start: upcomingItem.When + "T" + item.When.StartTime,
								end: upcomingItem.When + "T" + item.When.EndTime,
					className:['eventTitle'],
					sourceItem: item};
					
					//log(item.When.Upcoming[index].IsCancelled);
					if(upcomingItem.IsCancelled==true)
					{
						event.title += " (CANCELLED)";
					}
				
					events[events.length] = event;
				}
			}
		});
		
		log($('#calendarContent').html());
		$('#calendarContent').empty();
		log($('#calendarContent').html());
		$('#calendarContent').fullCalendar({
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
				
				
				$('#eventDetail').modal();
				
				return false;

			}	
		});
		
		log($('#calendarContent').html());
	
}


</script>
