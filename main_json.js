const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const notes = [
  { id: 1, date: '2018-06-22', title: 'Что-то',     description: 'Что-то там' },
  { id: 2, date: '2018-06-18', title: 'Что-то ещё', description: 'Что-то там' },
  { id: 3, date: '2018-06-13', title: 'Что-то ещё', description: 'Что-то там' }
];
const navbarElement = document.getElementById('navbar');
let activeNoteId = notes[0].id;
let nextId = 4; 


const addButton = document.getElementById('add-button');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

function getNoteHTML(note) {
  const rootElement = document.createElement('div');
  rootElement.classList.add('note');
  if (note.id === activeNoteId) {
    rootElement.classList.add('note--active');
  }

  const noteDate = new Date(note.date + 'T00:00:00');

  const dateElement = document.createElement('div');
  dateElement.classList.add('note__date');

  const num = document.createElement('div');
  num.classList.add('note__date-number');
  num.innerHTML = noteDate.getDate();

  const day = document.createElement('div');
  day.classList.add('note__date-day');
  day.innerHTML = days[(noteDate.getDay() + 6) % 7];

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


function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(today.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + dayOfMonth;
}

function openModal() {
  modalText.value = '';
  modal.classList.add('modal--open');
  modalText.focus();
}

function closeModal() {
  modal.classList.remove('modal--open');
}

function saveNote() {
  const text = modalText.value.trim();

  if (text === '') {
    return;
  }

  const newNote = {
    id: nextId,
    date: getTodayDate(),
    title: text.split('\n')[0].slice(0, 20), 
    description: text
  };
  nextId++;

  notes.unshift(newNote);     
  activeNoteId = newNote.id;  
  renderNavbar();
  closeModal();
}

addButton.addEventListener('click', openModal);
saveButton.addEventListener('click', saveNote);
cancelButton.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

renderNavbar();