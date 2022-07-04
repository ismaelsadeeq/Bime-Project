let button = document.getElementById('mobileNavIcon');
let firstDiv = document.getElementById('first');
let thirdDiv = document.getElementById('third');
let close = document.getElementById('close');

button.addEventListener('click',()=>{
  firstDiv.style.display = '';
  thirdDiv.style.display = '';
  thirdDiv.classList.remove('translate-x-full');
  
})

close.addEventListener('click',()=>{
  firstDiv.style.display = 'none';
  thirdDiv.style.display = 'none';
  thirdDiv.classList.add('translate-x-full');
})
