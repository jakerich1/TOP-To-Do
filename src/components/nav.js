export default function nav() {

    //Main Nav container
    const nav = document.createElement('nav')

    //Left Nav title
    const navTitle = document.createElement('div')
    navTitle.classList.add('title')
    navTitle.innerHTML = "TOP To-Do"

    //Right aligned Task bar
    const taskBar = document.createElement('div')
    taskBar.classList.add('task-bar')

    //Project name container
    const projectName = document.createElement('div')
    projectName.classList.add('project-name')
    projectName.innerHTML = "The Odin Project"

    //Right side controls container
    const controlArea = document.createElement('div')
    controlArea.classList.add('control')

    //Control elements
    const addTaskNav = document.createElement('div')
    addTaskNav.classList.add('nav-add')
    addTaskNav.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>'

    const notifNav = document.createElement('div')
    notifNav.classList.add('nav-notif')
    notifNav.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell" width="44" height="44" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>'
    
    controlArea.appendChild(addTaskNav)
    controlArea.appendChild(notifNav)

    taskBar.appendChild(projectName)
    taskBar.appendChild(controlArea)

    nav.appendChild(navTitle)
    nav.appendChild(taskBar)

    nav.appendChild(taskBar)

    return nav

}