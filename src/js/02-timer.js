import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}
let isActive = false;

refs.startBtn.setAttribute('disabled', 'disabled');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (options.defaultDate > selectedDates[0]) {
            window.alert('Please choose a date in the future');
            }
       
        refs.startBtn.removeAttribute('disabled', 'disabled');

        refs.startBtn.addEventListener('click', () => {
            if(isActive) {
                return;
            }
            
            let timeLeft = selectedDates[0].getTime() - options.defaultDate.getTime();
            
            const intervalId = setInterval(() => {
                isActive = true;
                timeLeft -= 1000;

                if(timeLeft < 1000) {
                    clearInterval(intervalId);
                    updateTimer(convertMs(0));
                    refs.startBtn.removeAttribute('disabled', 'disabled');
                };

                updateTimer(convertMs(timeLeft));

            }, 1000);

            refs.startBtn.setAttribute('disabled', 'disabled');
        });
    },
  };

  
flatpickr('#datetime-picker', options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
    };

function updateTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
    };

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
    };