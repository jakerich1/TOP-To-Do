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

export {createProjectListener, createTaskListener}