// Contains the moment times from 9AM to 5PM
var times = [];
var timeBlocksEl = $("#timeBlocks");
var currentDayEl = $("#currentDay");

function initTime() {
    // Loops from 9am to 5pm - 24 hour clock
    for (var t = 9; t <= 17; t++) {
        times.push(moment().set("hour", t).set("minute", 0).set("second", 0));
    }
}

function initCurrentDay() {
    var currentDay = moment().format("dddd, MMMM DD");
    
    currentDayEl.text(currentDay);
}

function initTimeblocks() {
    var currentTime = moment();
    var timeBlockColour = "present";
    
    // Adds timeblocks from 9am to 5pm
    for (var t = 0; t < times.length; t++) {
        var time = times[t];
        
        // ------------------- Create the row element for each time block. This is the root item
        var timeBlockEl = $("<div>");
        timeBlockEl.addClass("row time-block");
        
        // ------------------- The hour element of the time block
        var timeEl = $("<div>");
        timeEl.addClass("hour");
        timeEl.text(time.format("hh A"));
        
        // Check if current date is before or after the time block date
        if (currentTime.hour() > time.hour()) {
            timeBlockColour = "past";
        }
        else if (currentTime.hour() == time.hour()) {
            timeBlockColour = "present";
        }
        else if (currentTime.hour() < time.hour()) {
            timeBlockColour = "future";
        }
        
        // ------------------- The description element of the time block
        var descriptionEl = $("<textArea>");
        descriptionEl.attr("id", "desc-" + time.format("DD-MM-YYYY--hhA"));
        descriptionEl.addClass(timeBlockColour + " description");
        
        // ------------------- The save button element of the time block
        var saveEl = $("<button>");
        saveEl.addClass("btn saveBtn");
        
        var iconEl = $("<i>");
        iconEl.attr("id", time.format("DD-MM-YYYY--hhA"));
        iconEl.addClass("fa fa-save");
        
        // Add click event to the save button
        saveEl.on("click", saveDescription);
        
        // Add any saved data to the description
        var savedDescription = localStorage.getItem(iconEl.attr("id"));
        
        if (savedDescription !== null) {
            descriptionEl.text(savedDescription);
        }
        
        // Append all the elements to form the time block
        saveEl.append(iconEl);
        timeBlockEl.append(timeEl, descriptionEl, saveEl);
        timeBlocksEl.append(timeBlockEl);
    }
}

function saveDescription(event) {
    var buttonEl = event.target;
    var id = buttonEl.id;
    var a = $("#desc-" + id);
    var text = $("#desc-" + id).val();
    
    localStorage.setItem(id, text);
}

initCurrentDay();
initTime();
initTimeblocks();