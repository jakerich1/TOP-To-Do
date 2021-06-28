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
    projectName.id = "project-name"
    projectName.classList.add('project-name')
    projectName.innerHTML = ""

    //Right side controls container
    const controlArea = document.createElement('div')
    controlArea.classList.add('control')

    taskBar.appendChild(projectName)
    taskBar.appendChild(controlArea)

    nav.appendChild(navTitle)
    nav.appendChild(taskBar)

    nav.appendChild(taskBar)

    return nav

}