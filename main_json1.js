import { Editor } from 'https://esm.sh/@tiptap/core@2.27.3';
import StarterKit from 'https://esm.sh/@tiptap/starter-kit@2.27.3';
import Underline from 'https://esm.sh/@tiptap/extension-underline@2.27.3';
import TextAlign from 'https://esm.sh/@tiptap/extension-text-align@2.27.3';
import Highlight from 'https://esm.sh/@tiptap/extension-highlight@2.27.3';
import Placeholder from 'https://esm.sh/@tiptap/extension-placeholder@2.27.3';

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];


const STORAGE_KEY = 'notesApp';


let notes = [
  { id: 1, date: '2018-06-22', title: 'Что-то',     description: 'Что-то там', content: '' },
  { id: 2, date: '2018-06-18', title: 'Что-то ещё', description: 'Что-то там', content: '' },
  { id: 3, date: '2018-06-13', title: 'Что-то ещё', description: 'Что-то там', content: '' }
];
let activeNoteId = notes[0].id;
let nextId = 4; 

const navbarElement = document.getElementById('navbar');


const addButton = document.getElementById('add-button');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

const editorElement = document.getElementById('editor');
const formatToolbar = document.getElementById('format-toolbar');
const headingSelect = document.getElementById('heading-select');

let editor = null; 



function saveData() {
  const data = {
    notes: notes,
    activeNoteId: activeNoteId,
    nextId: nextId
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return;
  }

  try {
    const data = JSON.parse(saved);
    if (Array.isArray(data.notes) && data.notes.length > 0) {
      notes = data.notes;
      activeNoteId = data.activeNoteId;
      nextId = data.nextId;
    }
  } catch (error) {
    console.log('Не удалось прочитать сохранённые данные', error);
  }


  for (let note of notes) {
    if (note.content === undefined) {
      note.content = '';
    }
  }
}

function getActiveNote() {
  for (let note of notes) {
    if (note.id === activeNoteId) {
      return note;
    }
  }
  return notes[0];
}


function openNoteInEditor() {
  if (editor !== null) {
    editor.destroy();
  }
  editorElement.innerHTML = '';

  const note = getActiveNote();

  editor = new Editor({
    element: editorElement,
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Начните писать заметку...' })
    ],
    content: note.content,

    
    onUpdate: ({ editor }) => {
      const currentNote = getActiveNote();
      currentNote.content = editor.getHTML();
      saveData();
    },

   
    onTransaction: ({ editor }) => {
      updateToolbar(editor);
    }
  });

  updateToolbar(editor);
}


function updateToolbar(ed) {
  const buttons = formatToolbar.querySelectorAll('button');

  for (let button of buttons) {
    const action = button.dataset.action;
    let active = false;

    if (action === 'bold') active = ed.isActive('bold');
    if (action === 'italic') active = ed.isActive('italic');
    if (action === 'underline') active = ed.isActive('underline');
    if (action === 'strike') active = ed.isActive('strike');
    if (action === 'bulletList') active = ed.isActive('bulletList');
    if (action === 'orderedList') active = ed.isActive('orderedList');
    if (action === 'highlight') active = ed.isActive('highlight');
    if (action === 'alignLeft') active = ed.isActive({ textAlign: 'left' });
    if (action === 'alignCenter') active = ed.isActive({ textAlign: 'center' });
    if (action === 'alignRight') active = ed.isActive({ textAlign: 'right' });

    button.classList.toggle('is-active', active);

    if (action === 'undo') button.disabled = !ed.can().undo();
    if (action === 'redo') button.disabled = !ed.can().redo();
  }

 
  headingSelect.value = 'p';
  for (let level = 1; level <= 3; level++) {
    if (ed.isActive('heading', { level: level })) {
      headingSelect.value = String(level);
    }
  }
}


formatToolbar.addEventListener('mousedown', (event) => {
  if (event.target.closest('button')) {
    event.preventDefault();
  }
});


formatToolbar.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (button === null || editor === null) {
    return;
  }

  const chain = editor.chain().focus();
  const action = button.dataset.action;

  if (action === 'bold') chain.toggleBold().run();
  if (action === 'italic') chain.toggleItalic().run();
  if (action === 'underline') chain.toggleUnderline().run();
  if (action === 'strike') chain.toggleStrike().run();
  if (action === 'bulletList') chain.toggleBulletList().run();
  if (action === 'orderedList') chain.toggleOrderedList().run();
  if (action === 'highlight') chain.toggleHighlight().run();
  if (action === 'alignLeft') chain.setTextAlign('left').run();
  if (action === 'alignCenter') chain.setTextAlign('center').run();
  if (action === 'alignRight') chain.setTextAlign('right').run();
  if (action === 'undo') chain.undo().run();
  if (action === 'redo') chain.redo().run();
});


headingSelect.addEventListener('change', () => {
  if (editor === null) {
    return;
  }

  if (headingSelect.value === 'p') {
    editor.chain().focus().setParagraph().run();
  } else {
    editor.chain().focus().setHeading({ level: Number(headingSelect.value) }).run();
  }
});



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
    
    if (note.id === activeNoteId) {
      return;
    }
    activeNoteId = note.id;
    saveData();
    renderNavbar();
    openNoteInEditor();   
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
  modalTitle.value = '';
  modalText.value = '';
  modal.classList.add('modal--open');
  modalTitle.focus();
}

function closeModal() {
  modal.classList.remove('modal--open');
}

function saveNote() {
  const titleText = modalTitle.value.trim();
  const descText = modalText.value.trim();

 
  if (titleText === '') {
    modalTitle.focus();
    return;
  }

  const newNote = {
    id: nextId,
    date: getTodayDate(),
    title: titleText,
    description: descText,
    content: ''            
  };
  nextId++;

  notes.unshift(newNote);
  activeNoteId = newNote.id;
  saveData();
  renderNavbar();
  openNoteInEditor();      
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


loadData();
renderNavbar();
openNoteInEditor();