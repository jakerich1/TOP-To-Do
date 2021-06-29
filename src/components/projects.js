import {
    createProjectListener, deleteProject
} from "../controllers/listeners.js";

export default function projects() {

    //add project modal append to body
    const modal = document.createElement('div')
    modal.id = "addProject"
    const modalCont = document.createElement('div')
    modalCont.classList.add('modal-content')
    modal.appendChild(modalCont)
    const closeBtn = document.createElement('span')
    closeBtn.classList.add('close')
    closeBtn.innerHTML = '&times;'
    modalCont.appendChild(closeBtn)
    const modalInput = document.createElement('input')
    modalInput.type = "text"
    modalInput.placeholder = "Enter project name here"
    modalCont.appendChild(modalInput)
    const modalSubmit = document.createElement('button')
    modalSubmit.innerText = "Submit"
    modalSubmit.addEventListener('click', function () {
        let name = modalInput.value
        modal.style.display = "none";
        modalInput.value = ""
        createProjectListener(name)
    })
    modalCont.appendChild(modalSubmit)
    document.body.appendChild(modal)
    // When the user clicks on <span> (x), close the modal
    closeBtn.onclick = function () {
        modal.style.display = "none";
    }
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    })
    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    //Main Projects container
    const projects = document.createElement('div')
    projects.classList.add('project-area')

    //Header of the projects list
    const head = document.createElement('div')
    head.classList.add('head')

    //Header text
    const title = document.createElement('div')
    title.classList.add('head-text')
    title.innerText = 'Projects'
    head.appendChild(title)

    const headControls = document.createElement('div')
    headControls.classList.add('head-control')

    //Add project button
    const add = document.createElement('div')
    add.classList.add('add-project')
    add.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>'
    headControls.appendChild(add)
    add.addEventListener('click', function () {
        modal.style.display = "block"
    })

    //Delete project button
    const deleteIcon = document.createElement('div')
    deleteIcon.classList.add('delete-project')
    deleteIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>'
    headControls.appendChild(deleteIcon)
    deleteIcon.addEventListener('click', function () {
        deleteProject()
    })


    head.appendChild(headControls)
    projects.appendChild(head)

    //Project List
    const list = document.createElement('ul')
    list.id = 'project-list'
    projects.appendChild(list)

    return projects

}