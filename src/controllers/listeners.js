import { project } from "../class/project"
import { task } from "../class/task"
import content from "../class/content"
import DOMcontroller from "./DOMcontroller"

function createProjectListener(name){

    content.addProject(name)
    DOMcontroller.showProjects()
    DOMcontroller.showTasks()

}

function createTaskListener(name, description, priority, dueDate){

    const projectObj = content.projects[content.activeIndex()]
    projectObj.addTask(name, description, priority, dueDate)
    DOMcontroller.showTasks()

}

function changeDetail() {

    const taskObj = content.projects[content.activeIndex()].tasks[content.projects[content.activeIndex()].activeIndex()]

    taskObj.title = document.querySelector('#det-title').value
    taskObj.description = document.querySelector('#det-desc').value
    taskObj.priority = document.querySelector('#det-priority').value
    taskObj.dueDate = document.querySelector('#det-dueDate').value

    DOMcontroller.showTasks()
    DOMcontroller.showDetails()

    //console.log(taskObj)

}

function deleteProject() {
    
    if (content.projects.length > 0) {
        
        const projectObj = content.projects[content.activeIndex()]
        content.removeProject(projectObj)
        DOMcontroller.showProjects()
        DOMcontroller.showTasks()
        DOMcontroller.blankDetails()

    }

}

function deleteTask() {

    const projectObj = content.projects[content.activeIndex()]
    const taskObj = projectObj.tasks[projectObj.activeIndex()]

    projectObj.removeTask(taskObj)
    DOMcontroller.showTasks()
    DOMcontroller.blankDetails()

}

function sortTitle() {

    let taskArray = content.projects[content.activeIndex()].tasks
    content.sortTitle = !content.sortTitle

    if (content.sortTitle) { 
        taskArray = taskArray.sort((a,b) => (a.title > b.title) ? -1 : ((b.title > a.title) ? 1 : 0))
    }else{
        taskArray = taskArray.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    }

    DOMcontroller.showTasks()

}

function sortPriority() {

    let taskArray = content.projects[content.activeIndex()].tasks
    content.sortPriority = !content.sortPriority

    if (content.sortPriority) { 
        taskArray = taskArray.sort((a,b) => (a.priority > b.priority) ? -1 : ((b.priority > a.priority) ? 1 : 0))
    }else{
        taskArray = taskArray.sort((a,b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0))
    }

    DOMcontroller.showTasks()
    
}

function sortDue() {
    
    let taskArray = content.projects[content.activeIndex()].tasks
    content.sortDue = !content.sortDue

    if (content.sortDue) { 
        taskArray = taskArray.sort((a,b) => (a.dueDate > b.dueDate) ? -1 : ((b.dueDate > a.dueDate) ? 1 : 0))
    }else{
        taskArray = taskArray.sort((a,b) => (a.dueDate > b.dueDate) ? 1 : ((b.dueDate > a.dueDate) ? -1 : 0))
    }

    DOMcontroller.showTasks()

}

export {createProjectListener, createTaskListener, changeDetail, deleteProject, deleteTask, sortTitle, sortPriority, sortDue}