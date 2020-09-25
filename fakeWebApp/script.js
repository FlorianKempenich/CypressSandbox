const btn = document.querySelector('#btn')
const debugDiv = document.querySelector('#debug')

debugDiv.classList.add('hidden')

btn.addEventListener('click', () => {
  debugDiv.classList.remove('hidden')
})
