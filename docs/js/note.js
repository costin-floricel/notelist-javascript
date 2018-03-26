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

  //Add note - event listener
  form.addEventListener('submit', addNote);

  //Remove note event
  noteList.addEventListener('click', removeNote);

  //Clear notes event
  clearBtn.addEventListener('click', clearNotes);

  //Filter through the notes event Listener
  filter.addEventListener('keyup', filterNotes);

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

  //Clear Input
  noteInput.value= '';

  e.preventDefault();
}


//Remove Note function
function removeNote(e){

  if(e.target.parentElement.classList.contains('collection-item')) {
    e.target.parentElement.remove();
  }
}

//Clear Notes function
function clearNotes() {
  noteList.innerHTML = ' ';

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