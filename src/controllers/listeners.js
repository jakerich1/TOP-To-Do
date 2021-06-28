import { project } from "../class/project"
import { task } from "../class/task"

function createProjectListener(name){

    let proj = new project(name)
    console.log(`Created new project ${proj.name}`)

}

function createTaskListener(name, description, priority, dueDate){

    let nTask = new task(name, description, priority, dueDate)
    console.log(`Created new task ${nTask.title}`)

}


export {createProjectListener, createTaskListener}