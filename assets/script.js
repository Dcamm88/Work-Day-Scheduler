// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var loadTasks = function(){
    tasks = JSON.parse(localStorage.getItem("tasks"))
    if(!tasks) {
        tasks={};
    } ;
    printTasks(tasks)
}

var printTasks = function(){
    $.each(tasks, function(list, arr){

        var taskP = $("<p>").addClass("description task-item-" + list).text(arr)
        
         console.log(list)
         console.log(taskP);

        $("#task-item-" + list).replaceWith(taskP);
    })
 }


    
var Today = (moment().format("MMMM D, YYYY"))
    $("#currentDay").text(Today);


var hourAudit =function(){
    var currentHour = moment().hour() 

    for(var i=8; i<18; i++){
        var taskArea = $("#task-"+i)  
        if(currentHour>i){
            $(taskArea).addClass("past");
        } else if (currentHour === i){
            $(taskArea).addClass("present");
        }else{
            $(taskArea).addClass("future")
        }
    }
}

$('.colorcode').each(function(){
    var val = parseInt($(this).prop('id'));
    if(val > currentHour && val < currentHour+6){
        $(this).css('background-color','Blue');
    }else if(val < currentHour && val > currentHour-6){
        $(this).css('background-color','Red');
    }else if(val === currentHour){
        $(this).css('background-color','Green');
    }else{
        $(this).css('background-color','White');
    }
});


$(".taskBin").on("click", "p", function(){
     console.log("<p> was clicked");
    var text =$(this)
      .text()
      .trim();
    var textInput =$("<textarea>")
      .addClass("form-control")
      .val(text);
  
    $(this).replaceWith(textInput);
     textInput.trigger("focus");
  });

 
$(".taskBin").on("blur", "textarea", function() {
  
    var text = $(this)
      .val()
      .trim();
     console.log(text)

   
    var taskP = $("<p>")
      .addClass("taskItem")
      .text(text);

    
    $(this).replaceWith(taskP);
  });    


  $(".saveBtn").on("click", function(){
       console.log("<save button> clicked");
      var index = $(".saveBtn").index(this);
       console.log(index)
      tasks[index] = $(this).parent().find(".taskItem").text();
      localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  setInterval(function(){
      hourAudit();},1000*60*60);

  loadTasks();
  hourAudit();
   
  // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  