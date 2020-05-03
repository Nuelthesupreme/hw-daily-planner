let schedule = {
    '0900am': '',
    '1000am': '',
    '1100am': '',
    '1200pm': '',
    '0100pm': '',
    '0200pm': '',
    '0300pm': '',
    '0400pm': '',
    '0500pm': ''
}

function getCurrentDate(){
    return moment().format('dddd, MMMM Do')
}

function getHour(time){
    return moment(time, 'hhmma').hour()
}

function getCurrentHour(){
    return moment().hour()
}

function hourBlock(time, appointement){
    const ch = getCurrentHour();
    return (
        `<div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">${time.substring(0,2)+':'+time.substring(2,4)+' '+time.substring(4,6)}</span>
            </div>
            <input id='${time}-input' type="text" class="form-control ${getHour(time) < ch && 'bg-danger text-white'} ${getHour(time) > ch && 'bg-success text-white'}" id="new task"  aria-label="Remind me"
                aria-describedby="button-addon2" value='${appointement}'>
            <div class="input-group-append">
                <button onclick="updateBlock('${time}')" class="btn btn-outline-secondary" type="button" id="button-addon2">Save</button>
            </div>
        </div>`
    )
}

function storeSchedule(){
    localStorage.setItem('schedule', JSON.stringify(schedule))
}

function updateSchedule(){
    const savedSchedule = localStorage.getItem('schedule');
    if (savedSchedule) schedule = JSON.parse(savedSchedule);
    
    $(`#reminder`).text('') // cleans reminder

    // populate reminder
    for (const time in schedule){
        const appointement = schedule[time];
        $(`#reminder`).append(hourBlock(time, appointement))
    }
}

function updateBlock(time){
    schedule[time] = $(`#${time}-input`).val();
    storeSchedule()
    console.log('saved!')
}


$('#currentDay').text(getCurrentDate())
updateSchedule()