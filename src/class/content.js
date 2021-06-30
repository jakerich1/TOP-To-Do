import {
    project
} from "../class/project"
import DOMcontroller from "../controllers/DOMcontroller"

const content = (function factory() {

    let projects = []
    let activeProject = ""
    let sortTitle = 0
    let sortPriority = 0
    let sortDue = 0
    const myStorage = window.localStorage

    function returnProjects() {
        return projects
    }

    function setActive(id) {
        activeProject = id
        content.setStorage()
        return
    }

    function activeIndex() {
        const index = projects.map(function (e) {
            return e.id;
        }).indexOf(activeProject)
        return index
    }

    function checkActive(id) {
        if (id == activeProject) {
            return true
        }
        return false
    }

    function addProject(name) {
        let proj = new project(name)
        projects.push(proj)
        if (projects.length == 1) {
            setActive(proj.id)
        }
        setStorage()
        return 1
    }

    function removeProject(project) {
        projects.splice(projects.indexOf(project), 1)
            setStorage()
        return
    }

    function setStorage() {

        myStorage.setItem('active', activeProject)

        const tempProjects = JSON.stringify(content.projects)
        myStorage.setItem('projects', tempProjects)

    }

    function getStorage() {

        const storedActive = localStorage.getItem('active')

        if (storedActive) {

            const storedProjects = localStorage.getItem('projects')
            let sProjParsed = JSON.parse(storedProjects)
            
            sProjParsed.forEach(element => {

                content.addProject(element.name)
                let lastKey = content.projects.length - 1
                let lastProject = content.projects[lastKey]

                element.tasks.forEach(taskLocal => {       
                    lastProject.addTask(taskLocal.title, taskLocal.description, taskLocal.priority, taskLocal.dueDate)
                })

            })
           
            DOMcontroller.showProjects()
            DOMcontroller.showTasks()

        }

    }

    return {

        sortTitle: sortTitle,
        sortPriority: sortPriority,
        sortDue: sortDue,
        activeProject: activeProject,
        projects: projects,
        returnProjects: returnProjects,
        addProject: addProject,
        removeProject: removeProject,
        setActive: setActive,
        removeProject: removeProject,
        setActive: setActive,
        checkActive: checkActive,
        activeIndex: activeIndex,
        setStorage: setStorage,
        getStorage: getStorage

    };

}())

export default content