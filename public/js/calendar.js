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

getDate = async(e) => {
    var date = $(e.target).text().trim();
    var month = month_names.indexOf($('#month-picker').text().trim());
    var year = $('#year').text().trim();
    var fullDate = new Date(year, month, date);
    var selectDate = moment(fullDate).format('YYYY-MM-DD');
    // $('#selectDate').text(selectDate);
    getExercise(selectDate);
}

function getExercise(date) {
    fetch(`/exercise/${date}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(responses => {
        if (responses.ok) {
            responses.json()
                .then(data => {
                    renderActivity(data, date);
                })
        } else {
            alert("Error: " + responses.statusText);
        }
    });
}

function renderActivity(data, date) {
    // let date = "2022-01-17"
    // let data = [{ name: 'Running', type: 'Carido', duration: 90 }, { name: 'Bench Press', type: 'Resistance', duration: 60 }]
    activity.innerHTML = "";
    var dateEl = document.createElement('h1');
    dateEl.innerHTML = "Date: <span>" + moment(date).format("MMMM Do, YYYY") + "</span>";
    var activityEl = document.createElement('h1');
    activityEl.textContent = "Exercise";
    activity.append(dateEl, activityEl);
    var tableEl = document.createElement('table');
    tableEl.className = "table table-secondary table-hover table-bordered"
    tableEl.innerHTML = "<thead> <tr> <th scope='col'>Name</th> <th scope='col'>Type</th> <th scope='col'>duration</th> </thead>";
    var tbodyEl = document.createElement('tbody');
    for (x in data) {
        var trEl = document.createElement('tr');
        var exerciseNameEl = document.createElement('td');
        exerciseNameEl.textContent = data[x].name;
        var exerciseTypeEl = document.createElement('td');
        exerciseTypeEl.textContent = data[x].type;
        var duration = document.createElement('td');
        duration.textContent = data[x].duration;
        trEl.append(exerciseNameEl, exerciseTypeEl, duration);
        tbodyEl.append(trEl);
    }
    tableEl.append(tbodyEl);
    activity.append(tableEl);
}

$(document).on('click', '.calendar-day-hover', getDate);