function getParameterByName(name, url) {
	
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
	
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getJson(region, callback)
{
	$.get('https://chatdirectory.blob.core.windows.net/simpleapi/' + region + '/meetups.json', null,callback);
}

function log(message)
{
	if(window.console)
	{
		console.log(message);
	}
}

function showArea(area)
{
	$divsForSelectedArea = $(".area-" + area).show();
}

function hideArea(area)
{
	$divsForSelectedArea = $(".area-" + area).hide();
}

function toggleAreaFilter()
{
	var $checkBox = $(event.target);
	
	if($checkBox.is(":checked"))
	{
		showArea($checkBox.val());
	}
	else
	{
		hideArea($checkBox.val());
	}
}
function renderFilters($json)
{
	var areas = {};
	var $areaFilters = $("<div id='filterAreas' class='well'/>")
	$areaFilters.prependTo($("#dynamic"));
	
	$.each($json.Items, function(i,item)
	{
	
		if(areas[item.Area]==undefined)
		{
			areas[item.Area]='';
		}
	});
	
	var areaFilter = getParameterByName('areaFilter');
	
	for(var propertyName in areas) 
	{
		var escapedArea = propertyName.split(' ').join('-');
		log(propertyName);
		 var $checkBox = $("<input type='checkbox'></input>");
		 $checkBox.attr('id', 'filter' + propertyName);
		 $checkBox.val(escapedArea);
		 
		 
		 $areaFilters.append($checkBox);
		 $areaFilters.append(" <label for='filter" + propertyName + "'>" + propertyName + "</label> ");
		$checkBox.click(toggleAreaFilter);
		
		if(areaFilter==null || areaFilter==propertyName)
		{
			$checkBox.prop('checked','true');
			showArea(escapedArea);
		}
		else
		
		{
			hideArea(escapedArea);
		}
	}
}
function renderMeetup(item,$wrapper)
{
	var $wrapperDiv = $("<div class='panel panel-primary'/>");
	
	if($wrapper==null)
	{
		$wrapperDiv.appendTo($("#dynamic"));
	}
	else
	{
		$wrapperDiv.appendTo($wrapper);
	}
	
	
	
		  
	$wrapperDiv.addClass("area-" + item.Area.split(' ').join('-'));
	$wrapperDiv.append("<div class='panel-heading'><h3>" + item.Title + "</h3></div>");
	var $details = $("<div class='panel-body'/>")
	$details.appendTo($wrapperDiv);
	$details.append("<p>" + item.Where + " " + item.Postcode + "</p>");
	
	$details.append("<p>" + item.Notes + "</p>");
	if(item.Link!="")
	{
		$details.append("<p><a target='_blank' href='" + item.Link + "'>More info</a></p>");
	}
	
	$footerDiv = $("<div class='panel-footer'/>");
	$footerDiv.appendTo($wrapperDiv);
	$footerDiv.append("<p>" + item.When.Summary + "</p>");
	if(item.When.Upcoming.length>0)
	{	

		$footerDiv.append("<p>Next: " + moment(item.When.Upcoming[0]).format('dddd Do MMMM') + "</p>");
	}
	
}

function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}