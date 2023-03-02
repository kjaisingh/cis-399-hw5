const remember = document.querySelector('.remember');
const forget = document.querySelector('.forget');
const form = document.querySelector('form');
const enterName = document.querySelector('#entername');
const submitName = document.querySelector('#submitname');
const forgetName = document.querySelector('#forgetname');
const h1 = document.querySelector('h1');
const personalGreeting = document.querySelector('.personal-greeting');

form.addEventListener('submit', e => e.preventDefault());

submitName.addEventListener('click', () => {
    localStorage.setItem('name', enterName.value);
    nameDisplayCheck();
});

forgetName.addEventListener('click', () => {
    localStorage.removeItem('name');
    nameDisplayCheck();
});

function nameDisplayCheck() {
    if (localStorage.getItem('name')) {
        const name = localStorage.getItem('name');
        h1.textContent = `Welcome, ${name}`;

        personalGreeting.textContent = `Welcome to our website, ${name}! `
        personalGreeting.textContent += 'We hope you have fun while you are here.';

        forget.style.display = 'block';
        remember.style.display = 'none';
    } else {
        h1.textContent = 'Welcome to our website ';

        personalGreeting.textContent = 'Welcome to our website. '
        personalGreeting.textContent += 'We hope you have fun while you are here.';

        forget.style.display = 'none';
        remember.style.display = 'block';
  }
}

nameDisplayCheck();