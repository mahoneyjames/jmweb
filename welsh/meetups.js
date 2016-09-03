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
	var $areaFilters = $("<div id='filterAreas'/>")
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
		 $areaFilters.append("<label for='filter" + propertyName + "'>" + propertyName + "</label");
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
function renderMeetup(item)
{
	var $wrapperDiv = $("<div/>");
	$wrapperDiv.appendTo($("#dynamic"));
	
	
	$wrapperDiv.addClass("area-" + item.Area.split(' ').join('-'));
	$wrapperDiv.append("<h3>" + item.Title + "</h3>");
	$wrapperDiv.append("<p>" + item.Where + " " + item.Postcode + "</p>");
	$wrapperDiv.append("<p>" + item.When.Summary + "</p>");
	$wrapperDiv.append("<p>" + item.Notes + "</p>");
	if(item.Link!="")
	{
		$wrapperDiv.append("<p><a target='_blank' href='" + item.Link + "'>More info</a></p>");
	}
	
	if(item.When.Upcoming.length>0)
	{	
		$wrapperDiv.append("<p>Next: " + moment(item.When.Upcoming[0]).format('dddd Do MMMM') + "</p>");
	}
	
}