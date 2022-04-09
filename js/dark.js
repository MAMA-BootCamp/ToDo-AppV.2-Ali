let toggleBtn = document.querySelector('.toggle')
let body = document.querySelector('body')
toggleBtn.addEventListener('click', switchTheme)

function switchTheme() {
 darkMode = localStorage.getItem('dark')
if (darkMode !== 'off') {
  body.classList.toggle('dark')
  darkMode = localStorage.setItem('dark', 'off')
} else {
  body.classList.toggle('dark')
  darkMode = localStorage.setItem('dark', 'on')
}
}

// onload
let darkMode = localStorage.getItem('dark')
if(darkMode === 'off'){
  body.classList.toggle('dark')
}

