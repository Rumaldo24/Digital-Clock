
let is24HoursFormat = false;

function setProgress(el, progress) {
    const circle = el.querySelector('circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - progress * circumference;
    circle.style.strokeDashoffset = offset;
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    // const ampm = hours >= 12 ? 'PM' : 'AM';
    let ampm = '';

    if(!is24HoursFormat) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // convierte a formato de  12 horas.
    }

    // hours = hours % 12 || 12;

    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    // document.getElementById('ampm').textContent = ampm;
    document.getElementById('ampm').textContent = is24HoursFormat ? '' : ampm;

    // setProgress(document.querySelector('.hours').parentNode, (hours % 12) / 12);
    setProgress(document.querySelector('.hours').parentNode, (hours % (is24HoursFormat ? 24 : 12)) / (is24HoursFormat ? 24 : 12));
    setProgress(document.querySelector('.minutes').parentNode, minutes / 60);
    setProgress(document.querySelector('.seconds').parentNode, seconds / 60);

    // Actualizar la fecha
    updateDate();
}

document.getElementById('toggle-12h').addEventListener('click', () => {
    is24HoursFormat = false;
    document.getElementById('ampm').style.display = 'inline';
    updateClock();
});

document.getElementById('toggle-24h').addEventListener('click', () => {
    is24HoursFormat = true;
    document.getElementById('ampm').style.display = 'none';
    updateClock();
});

function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('es-ES', options);
    document.getElementById('date').textContent = formattedDate;
}

setInterval(updateClock, 1000);
updateClock(); // Llamar inmediatamente para evitar el retraso inicial

