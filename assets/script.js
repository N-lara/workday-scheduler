var schedule = $('#schedule')
var today = dayjs();
var hour = dayjs().format('HH');
var currentDay = dayjs().format('DD');
var savedDay = ""

//jqueary wrapper to make sure the page loads first
$(function () {

  //checks to see if day last used is and sets it so savedDay used in line 45
  check = localStorage.getItem('Day');
  if(check == null){savedDay = 0}
  else{savedDay = check};

  //when the save button is clicked the text in its sibling text area is saved to local storage under the key named the same as the area id
  schedule.on('click', 'button', function(event){
    event.preventDefault();
    var text = $(event.target).prev('textarea').val();
    var key = $(event.target).parent('div').attr('id');
    localStorage.setItem(key, text);
  })

  // this section sets the areas to past present and future
  for(var i = 9; i <= 17; i++){
    //if schedule hour is less than current time then set it to past
    if(i < hour){
      schedule.children('#hour-'+i).addClass('past');
       schedule.children('#hour-'+i).removeClass('present future');
    }
    //if schedule hour is more than current time then set it to future
    else if(i > hour){
      schedule.children('#hour-'+i).addClass('future');
      schedule.children('#hour-'+i).removeClass('present past');
    }
    //if schedule hour is equal to current time then set it to present
    else{
    schedule.children('#hour-'+i).addClass('present');
    schedule.children('#hour-'+i).removeClass('past future');
    }
  }

  //checks to see if day has changed if it has clears local storage for fresh claender for new day
  if (savedDay != currentDay){
    localStorage.clear()
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

  //sets today to the saved day for refrence in future to reset on new days line 45
  localStorage.setItem('Day', currentDay);
});