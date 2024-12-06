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
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    document.getElementById('ampm').textContent = ampm;

    setProgress(document.querySelector('.hours').parentNode, (hours % 12) / 12);
    setProgress(document.querySelector('.minutes').parentNode, minutes / 60);
    setProgress(document.querySelector('.seconds').parentNode, seconds / 60);
}

setInterval(updateClock, 1000);
updateClock(); // Llamar inmediatamente para evitar el retraso inicial

