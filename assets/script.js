// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var schedule = $('#schedule')
var today = dayjs();
var hour = 15//dayjs().format('HH');
var day = dayjs().format('DD');

$(function () {
  //when the save button is clicked the text in its sibling text area is saved to local storage under the key named the same as the area id
  schedule.on('click', 'button', function(event){
    event.preventDefault();
    var text = $(event.target).prev('textarea').val();
    var key = $(event.target).parent('div').attr('id');
    localStorage.setItem(key, text);
  })

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  for(var i = 9; i <= 17; i++){
    if(i < hour){
      schedule.children('#hour-'+i).addClass('past');
      schedule.children('#hour-'+i).removeClass('present future');
    }else if(i > hour){
      schedule.children('#hour-'+i).addClass('future');
      schedule.children('#hour-'+i).removeClass('present past');
    }else{
    schedule.children('#hour-'+i).addClass('present');
    schedule.children('#hour-'+i).removeClass('past future');
    }
  }

  //gets saved information from local storage and puts the info into the schedule text areas of the corresponding hours
  for(var i = 9; i <= 17; i++){
    var check = 'hour-'+i
    var savedEvent = localStorage.getItem(check);
    if(savedEvent == null){
      savedEvent = ''  
    }
    schedule.children('#hour-'+i).children('textarea').text(savedEvent);
  }

  //displays date on top of page
  $('#currentDay').text('today is: '+ today.format('MMM DD, YYYY'));
});


/*
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
current hour red. time passed gray future time green*/