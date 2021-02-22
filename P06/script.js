//get DOM elements
const toggle = document.getElementById('toggle');
const open = document.getElementById('open');
const close = document.getElementById('close');
const modal = document.getElementById('modal');


//event listeners 
//1. toggle the nav
toggle.addEventListener('click',() => 
    document.body.classList.toggle('show-nav')
);

//2. show the modal
open.addEventListener('click', () => 
    modal.classList.add('show-modal')
);

//3. close the modal
close.addEventListener('click', () => 
    modal.classList.remove('show-modal')
);

//4. close the modal on click outside modal
window.addEventListener('click', e => 
    e.target === modal ? modal.classList.remove('show-modal'): false
);