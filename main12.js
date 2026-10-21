const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const notes = [
  { id: 1, date: '2018-06-22', title: 'Что-то',     description: 'Что-то там' },
  { id: 2, date: '2018-06-18', title: 'Что-то ещё', description: 'Что-то там' },
  { id: 3, date: '2018-06-13', title: 'Что-то ещё', description: 'Что-то там' }
];
const navbarElement = document.getElementById('navbar');
let activeNoteId = notes[0].id;

function getNoteHTML(note) {
  const rootElement = document.createElement('div');
  rootElement.classList.add('note');
  if (note.id === activeNoteId) {
    rootElement.classList.add('note--active');
  }

  const dateElement = document.createElement('div');
  dateElement.classList.add('note__date');

  const num = document.createElement('div');
  num.classList.add('note__date-number');
  num.innerHTML = new Date(note.date).getDate();

  const day = document.createElement('div');
  day.classList.add('note__date-day');
  day.innerHTML = days[(new Date(note.date).getDay() + 6) % 7];

  const fullDate = document.createElement('div');
  fullDate.classList.add('note__date-full');
  fullDate.innerHTML = note.date;

  dateElement.appendChild(num);
  dateElement.appendChild(day);
  dateElement.appendChild(fullDate);

  
  const descElement = document.createElement('div');
  descElement.classList.add('note__summary');

  const title = document.createElement('div');
  title.classList.add('note__title');
  title.textContent = note.title;

  const description = document.createElement('div');
  description.classList.add('note__description');
  description.textContent = note.description.slice(0, 50);

  descElement.appendChild(title);
  descElement.appendChild(description);

  rootElement.appendChild(dateElement);
  rootElement.appendChild(descElement);

 
  rootElement.addEventListener('click', () => {
    activeNoteId = note.id;
    renderNavbar();
  });

  return rootElement;
}


function renderNavbar() {
  navbarElement.innerHTML = '';

  for (let note of notes) {
    navbarElement.appendChild(getNoteHTML(note));
  }
}

renderNavbar();