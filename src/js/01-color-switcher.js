const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body'),
};

const getRandomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

refs.stopBtn.setAttribute('disabled', 'disabled');

const colorChange = {
    intervalId: null,
    start() {
        refs.startBtn.setAttribute('disabled', 'disabled');
        refs.stopBtn.removeAttribute('disabled', 'disabled');

        this.intervalId = setInterval(() => {
            refs.bodyEl.style.backgroundColor = getRandomHexColor();
        }, 1000);
    },
    stop() {
        clearInterval(this.intervalId);
        refs.stopBtn.setAttribute('disabled', 'disabled');
        refs.startBtn.removeAttribute('disabled', 'disabled');
    },
};

refs.startBtn.addEventListener('click', () => {
    colorChange.start();
});

refs.stopBtn.addEventListener('click', () => {
    colorChange.stop();
});
