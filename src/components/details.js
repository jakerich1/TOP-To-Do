import { changeDetail } from "../controllers/listeners.js";

export default function details() {

    //Main Projects container
    const details = document.createElement('div')
    details.classList.add('detail-area')

    //Details heading area
    const head = document.createElement('div')
    head.classList.add('head')
    head.innerText = "Details"
    details.appendChild(head)

    //Task title area
    const title = document.createElement('div')
    title.classList.add('title', 'detail-cont')
    const titleHead = document.createElement('div')
    titleHead.classList.add('heading')
    titleHead.innerText = "Title"
    title.appendChild(titleHead)
    const titleContent = document.createElement('input')
    titleContent.id = 'det-title'
    titleContent.value = ""
    title.appendChild(titleContent)
    details.appendChild(title)
    title.addEventListener('input', function () {
        changeDetail()
    })

    //Task Description
    const description = document.createElement('div')
    description.classList.add('description', 'detail-cont')
    const descTitle = document.createElement('div')
    descTitle.classList.add('heading')
    descTitle.innerText = "Description"
    description.appendChild(descTitle)
    const descContent = document.createElement('textarea')
    descContent.id = 'det-desc'
    descContent.innerText = "Enter task description here"
    description.appendChild(descContent)
    details.appendChild(description)
    description.addEventListener('input', function () {
        changeDetail()
    })

    //Priority area
    const priority = document.createElement('div')
    priority.classList.add('priority', 'detail-cont')
    const priorityHead = document.createElement('div')
    priorityHead.classList.add('heading')
    priorityHead.innerText = "Priority"
    priority.appendChild(priorityHead)
    const priorityContent = document.createElement('input')
    priorityContent.id = 'det-priority'
    priority.appendChild(priorityContent)
    details.appendChild(priority)
    priority.addEventListener('input', function () {
        changeDetail()
    })

    //Due date area
    const dueDate = document.createElement('div')
    dueDate.classList.add('due-date', 'detail-cont')
    const dueHead = document.createElement('div')
    dueHead.classList.add('heading')
    dueHead.innerText = 'Due-Date'
    dueDate.appendChild(dueHead)
    const dueContent = document.createElement('input')
    dueContent.type = 'date'
    dueContent.id = 'det-dueDate'
    dueDate.appendChild(dueContent)
    dueDate.addEventListener('input', function () {
        changeDetail()
    })


    details.appendChild(dueDate)    

    return details

}