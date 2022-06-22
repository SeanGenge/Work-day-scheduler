// Contains the moment times from 9AM to 5PM
var times = [];
var timeBlocksEl = document.getElementById("timeBlocks");
var currentDayEl = document.getElementById("currentDay");

function initTime() {
    // Loops from 9am to 5pm
    for (var t = 9; t <= 17; t++) {
        times.push(moment().set("hour", t).set("minute", 0).set("second", 0));
    }
}

function initCurrentDay() {
    var currentDay = moment().format("dddd, MMMM DD");
    
    currentDayEl.textContent = currentDay;
}

function initTimeblocks() {
    var currentTime = moment();
    var timeBlockColour = "present";
    
    // Adds timeblocks from 9am to 5pm
    for (var t = 0; t < times.length; t++) {
        var time = times[t];
        
        var timeBlockEl = document.createElement("div");
        timeBlockEl.className = "row time-block";
        
        var timeEl = document.createElement("div");
        timeEl.className = "hour";
        timeEl.textContent = time.format("hh A");
        
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
        
        var descriptionEl = document.createElement("textArea");
        descriptionEl.className = timeBlockColour;
        
        var saveEl = document.createElement("div");
        saveEl.className = "btn saveBtn";
        
        var iconEl = document.createElement("i");
        iconEl.className = "fa fa-save";
        
        saveEl.appendChild(iconEl);
        timeBlockEl.append(timeEl, descriptionEl, saveEl);
        timeBlocksEl.appendChild(timeBlockEl);
    }
}

initCurrentDay();
initTime();
initTimeblocks();