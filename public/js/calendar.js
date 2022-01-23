let calendar = document.querySelector('.calendar');
let activity = document.querySelector('.activity');

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month

    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

let dark_mode_toggle = document.querySelector('.dark-mode-switch')

dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
}

// Allows you to click on the calendar to select the date
getDate = (e) => {
    var date = $(e.target).text().trim();
    var month = month_names.indexOf($('#month-picker').text().trim());
    var year = $('#year').text().trim();
    var fullDate = new Date(year, month, date);
    var selectDate = moment(fullDate).format('YYYY-MM-DD');
    // $('#selectDate').text(selectDate);
    // call getExercise function
    getExercise(selectDate);
}

// Get all exercise related to the date and user_id
function getExercise(date) {
    // Call /exercise/:date the GET route to get the data from the database
    fetch(`/api/exercise/getExercise/${date}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(responses => {
        if (responses.ok) {
            responses.json()
                .then(data => {
                    // If API responses is okay, call renderActivity Function
                    renderActivity(data, date);
                })
        } else {
            alert("Error: " + responses.statusText);
        }
    });
}
// Render data back to workout view
function renderActivity(data, date) {
    activity.innerHTML = "";
    var dateEl = document.createElement('h1');
    dateEl.innerHTML = "Date: ";
    var spanEl = document.createElement('span');
    spanEl.id = 'selectdate';
    spanEl.setAttribute('data-date', date);
    spanEl.textContent = moment(date).format("MMMM Do, YYYY");
    dateEl.append(spanEl);
    var activityEl = document.createElement('h1');
    activityEl.textContent = "Exercise";
    activity.append(dateEl, activityEl);
    var tableEl = document.createElement('table');
    tableEl.className = "table table-secondary table-hover table-bordered"
    tableEl.innerHTML = "<thead> <tr> <th scope='col'>Name</th> <th scope='col'>Type</th> <th scope='col'>duration</th> <th scope='col'>Action</th></tr> </thead>";
    var tbodyEl = document.createElement('tbody');
    for (x in data) {
        var trEl = document.createElement('tr');
        trEl.setAttribute('data-id', data[x].id);
        trEl.className = "exerciseData";
        var exerciseNameEl = document.createElement('td');
        exerciseNameEl.className = "exerName";
        exerciseNameEl.setAttribute("data-name", data[x].name);
        exerciseNameEl.textContent = data[x].name;
        var exerciseTypeEl = document.createElement('td');
        exerciseTypeEl.className = "exerType";
        exerciseTypeEl.setAttribute("data-type", data[x].type);
        exerciseTypeEl.textContent = data[x].type;
        var duration = document.createElement('td');
        duration.className = "exerDuration";
        duration.setAttribute("data-duration", data[x].duration);
        duration.textContent = data[x].duration;
        var actionEl = document.createElement('td');
        actionEl.className = "action";
        actionEl.innerHTML = `<a class="edit" title="Edit"><i class="fas fa-edit fa-lg"></i></a>
        <a class="delete" title="Delete"><i class="fas fa-trash fa-lg"></i></a>`
        trEl.append(exerciseNameEl, exerciseTypeEl, duration, actionEl);
        tbodyEl.append(trEl);
    }
    tableEl.append(tbodyEl);
    var addButtonEl = document.createElement('button');
    addButtonEl.type = 'button';
    addButtonEl.className = "btn btn-primary mt-5";
    addButtonEl.setAttribute("onclick", "addExercise()");
    addButtonEl.textContent = "Add Exercise"
    activity.append(tableEl, addButtonEl);
}

// Add Exercise to the database
async function addExercise() {
    $('#editActivity').attr('style','display:none;');
    $('#addActivity').removeAttr('style');
    // Show Modal
    $('#modal-trigger').modal('show');
    // Get all data using DOM to get Exercise Name/Exercise Type/Duration & Date
    const name = document.querySelector('#exercise-name').value.trim();
    const type = document.querySelector('#exercise-type').value.trim();
    const duration = document.querySelector('#duration').value.trim();
    let date = $('#selectdate').attr('data-date');
    console.log(name, type, duration);
    // Check if they all selected data have values
    if (name && type && duration && date) {
        // call /api/exercise/ the POST route to create a new Exercise
        const response = await fetch('/api/exercise', {
            method: 'POST',
            body: JSON.stringify({
                name,
                type,
                duration,
                date
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        // if API call is ok
        if (response.ok) {
            // Reset Form
            $('#modal-trigger form')[0].reset();
            // Hide the Modal
            $('#modal-trigger').modal('hide');
            // Render the data again to workout view
            getExercise(date);
        } else {
            // Else alert error
            alert(response.statusText);
        }
    }
}

// Delete Exercises from table & Database
deleteExercise = async(e) => {
    // Get all data using DOM to get Exercise Id & Date
    var exerciseId = $(e.target).parents('.exerciseData').attr('data-id');
    let date = $('#selectdate').attr('data-date');
    if(exerciseId) {
         // call /api/exercise/ the POST route to create a new Exercise
         const response = await fetch(`/api/exercise/${exerciseId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        // if API call is ok
        if (response.ok) {
            // Render the data again to workout view
            getExercise(date);
        } else {
            // Else alert error
            alert(response.statusText);
        }
    }
}

// Open Up Modal with selected Data, allow to modify and click 'save' to trigger saveExercise()
editExercise = (e) => {
    // Display Edit Modal with and values;
    var exerciseName = $(e.target).parents('.action').siblings('.exerName').attr('data-name');
    var exerciseType = $(e.target).parents('.action').siblings('.exerType').attr('data-type');
    var exerciseDuration = $(e.target).parents('.action').siblings('.exerDuration').attr('data-duration');
    var exerciseId = $(e.target).parents('.exerciseData').attr('data-id');
    $('#editActivity').removeAttr('data-id');
    $('#addActivity').attr('style','display:none;');
    $('#editActivity').removeAttr('style');
    $('#editActivity').attr('data-id', exerciseId);
    $('#modal-trigger').modal('show');
    $('#exercise-name').val(exerciseName);
    $('#exercise-type').val(exerciseType);
    $('#duration').val(exerciseDuration);
}

async function saveExercise() {
    const name = document.querySelector('#exercise-name').value.trim();
    const type = document.querySelector('#exercise-type').value.trim();
    const duration = document.querySelector('#duration').value.trim();
    const exerciseId = $('#editActivity').attr('data-id');
    let date = $('#selectdate').attr('data-date');
    // Check if they all selected data have values
    if (name && type && duration && exerciseId) {
        // call /api/exercise/ the POST route to create a new Exercise
        const response = await fetch(`/api/exercise/${exerciseId}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                type,
                duration
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        // if API call is ok
        if (response.ok) {
            // Reset Form
            $('#modal-trigger form')[0].reset();
            // Hide the Modal
            $('#modal-trigger').modal('hide');
            // Render the data again to workout view
            getExercise(date);
        } else {
            // Else alert error
            alert(response.statusText);
        }
    }
}

$(document).on('click', '.calendar-day-hover', getDate);
$(document).on('click', '.delete', deleteExercise);
$(document).on('click', '.edit', editExercise);
$('#modal-trigger').on('hidden.bs.modal', function (e) {
    $('#modal-trigger form')[0].reset();
})