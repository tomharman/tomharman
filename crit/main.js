// Setup

var count = 3; // how many designers in rotation
var numOfWeeks = 12; // how many weeks to show crit for
var startDate = new Date('October 18, 2016'); // Tuesday, 18 Oct 2016 - Where dates start from: This is also the weekday that will repeat
var designers = ['Cait','Allison','Elaine','Lindsey','Jac','Wolasi','Emily','Nico']; // These will be appear in order
var skipWeeks = ['Dec 27, 2016']; // e.g. Thanksgiving, holidays etc
var override = [
	['Nov 1, 2016', 'Wolasi', 'Remove'],
	['Nov 1, 2016', 'Allison', 'Remove'],
	['Nov 1, 2016', 'Cait', 'Remove'],
	['Nov 8, 2016', 'Cait', 'Add'],
	['Nov 8, 2016', 'Allison', 'Add'],
	['Nov 8, 2016', 'Sabrina', 'Add'],
	['Nov 15, 2016', 'Wolasi', 'Remove'],
	['Nov 22, 2016', 'Wolasi', 'Remove']
]; // If a designer needs to be removed or added to the rotation use 'Remove' or 'Add' and the date

//--------------------------- If you know how to write code, look no further, it gets ugly ---------------------------//

function getWeekDay(date) {
  var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  return days[ date.getDay() ]
}

function getYear(date) {
  var year = date.getFullYear();
  return year;
}

function getMonth(date) {
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return months [date.getMonth()];
}

function getDay(date) {
  var day = date.getDate();
  return day;
}

function getFriendlyDate(date){
	return getMonth(date)+' '+getDay(date)+', '+getYear(date);
}

function addWeek(date) {
    startDate.setDate(date.getDate() + 7);
    return startDate;
}

function thisIsASkipWeek(currentWeek, skipWeeks) {
	for (var i = 0; i < skipWeeks.length; i++) {
		if(currentWeek==skipWeeks[i]){
				return true;
		}
	}
	return false;
}

function howManyDesignersOverridden(currentWeek, override) {
	var counter = 0;
	for (var i = 0; i < override.length; i++) {
		if(currentWeek==override[i][0]){
			if(override[i][2] == 'Add'){
				counter++;
			}
		}
	}
	return counter;
}

function thisDesignerCanPresent(currentWeek,override,designerName){
	for (var i = 0; i < override.length; i++) {
		if(currentWeek==override[i][0]){
			if(override[i][2] == 'Remove'){
				if(override[i][1] == designerName){
					return false;
				}
			}
		}
	}
	return true;
}

function isInThePast(currentWeek){
	var date1 = new Date(currentWeek);
	var date2 = new Date();
	if(date2.getTime() - date1.getTime() >= 0) {
		return true;
	} else {
		return false;
	}
	// var futureDate = 
	// var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	// var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
}

// BUG: override remove skip's person this week but they won't come around again until we reach them in the rotation again
function init() {
	var currentDesigner = 0;
	var html = "";
	var skip = false;
	var overrideCounter;

	// Loop through each week
	for (var a = 0; a < numOfWeeks; a++) {

		if(isInThePast(getFriendlyDate(startDate))==true || thisIsASkipWeek(getFriendlyDate(startDate), skipWeeks)==true){
			html += '<div class=\"card xs-p2 in-the-past\"><h2 class=\"xs-text-4 bold\">'+getFriendlyDate(startDate)+'</h2><ul>';
		} else {
			html += '<div class=\"card xs-p2\"><h2 class=\"xs-text-4 bold\">'+getFriendlyDate(startDate)+'</h2><ul>';
		}

		// If this is a skip week don't add designers
		if(thisIsASkipWeek(getFriendlyDate(startDate), skipWeeks) == false) {

			// reset override;
			overrideCounter = 0;
			overrideCounter += howManyDesignersOverridden(getFriendlyDate(startDate), override);

			// add all overrides for this week
			if(overrideCounter > 0){
				for (var j = 0; j < override.length; j++) {
					if(override[j][0]==getFriendlyDate(startDate)){
						html += '<li>' + override[j][1] + '</li>';
					}
				}
			}

			// Loop through each remaining designer slot
			for (var i = 0; i < (count-overrideCounter); i++) {

				// if Designer has been removed from this week's crit, skip them
				if(thisDesignerCanPresent(getFriendlyDate(startDate),override,designers[currentDesigner])==true){
					html += '<li>' + designers[currentDesigner] + '</li>';
				} else {
					i--;
				}

				if(currentDesigner+1<designers.length) {
				  currentDesigner++;
				} else {
				  currentDesigner = 0;
				}

			}

		} else {
			html += '<li class=\"skip-week\">Skip this week :(</li>';
		}

		html += '</ul></div>';
		addWeek(startDate);
	}

	// output full list
	d = document.getElementById("results");
	d.innerHTML = html;
}
