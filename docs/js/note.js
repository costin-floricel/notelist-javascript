//Define the UI variables
const form = document.querySelector('#note-form');
const noteList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-notes');
const filter = document.querySelector('#filter');
const noteInput = document.querySelector('#note');

//Load all event listeners
loadEventListeners();

//Load all event listeners function
function loadEventListeners(){
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getNotes);

  //Add note - event listener
  form.addEventListener('submit', addNote);

  //Remove note event
  noteList.addEventListener('click', removeNote);

  //Clear notes event
  clearBtn.addEventListener('click', clearNotes);

  //Filter through the notes event Listener
  filter.addEventListener('keyup', filterNotes);

}
//Get Notes from Local Storage
function getNotes(){
  let lsnotes;
  if(localStorage.getItem('lsnotes') === null) {
    lsnotes = [];
  } else {
    lsnotes = JSON.parse(localStorage.getItem('lsnotes'));
  }
  lsnotes.forEach(function(lsnote){
   
  const li =document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(lsnote));
  const link = document.createElement('a');
  link.className = 'delete-btn';
  li.appendChild(link);
  noteList.appendChild(li);
  })
}

//Create the addNote function
function addNote(e) {
  if(noteInput.value === ''){
    
    alert('Please enter a note');
  } 
  
  //Create a list item when the ADD NOTE button is clicked
  const li =document.createElement('li');

  //Add a class to the li element
  li.className = 'collection-item';

  //Create the text node and append it to the li
  li.appendChild(document.createTextNode(noteInput.value));

  //Create the delete icon link
  const link = document.createElement('a');

  //Add a class to the a link 
  link.className = 'delete-btn';

  //Append the link to the li
  li.appendChild(link);

  //Append the li to the ul
  noteList.appendChild(li);

  //Store the notes in Local Storage
  storeNoteInLocalStorage(noteInput.value);

  //Clear Input
  noteInput.value= '';
  e.preventDefault();
  
}

//Store the note in Local Storage fuction
function storeNoteInLocalStorage(lsnote){
  
  let lsnotes;
  if(localStorage.getItem('lsnotes') === null) {
    lsnotes = [];
  } else {
    lsnotes = JSON.parse(localStorage.getItem('lsnotes'));
  }
  lsnotes.push(lsnote);
  
  localStorage.setItem('lsnotes', JSON.stringify(lsnotes));
  
}

//Remove Note function
function removeNote(e){

  if(e.target.parentElement.classList.contains('collection-item')) {
    e.target.parentElement.remove();

    //Remove the notes from Local storage
    removeNoteFromLocalStorage(e.target.parentElement);
  }
}

//Remove notes from Local Storage function
function removeNoteFromLocalStorage(noteItem){
  let lsnotes;
  if(localStorage.getItem('lsnotes') === null) {
    lsnotes = [];
  } else {
    lsnotes = JSON.parse(localStorage.getItem('lsnotes'));
  }
  lsnotes.forEach(function(lsnote, index){
    if(noteItem.textContent === lsnote){
      lsnotes.splice(index, 1);
    }
    });
    localStorage.setItem('lsnotes', JSON.stringify(lsnotes));
}

//Clear Notes function
function clearNotes() {

  while(noteList.firstChild) {
    noteList.removeChild(noteList.firstChild);
  }
  //Clear Notes from Local storage
  clearNotesFromLocalStorage();
  localStorage.clear();
}

//Clear Notes from Local storage function
function clearNotesFromLocalStorage() { 

}

//Filter Notes function
function filterNotes(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(
    function(note){
      const item = note.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        note.style.display = 'block';
      } else {
        note.style.display = 'none';
      }
    }
  );
}
