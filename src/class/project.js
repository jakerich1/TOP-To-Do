import { task } from './task';
import content from "./content"

//Project class
export class project {

    constructor(name) {
        this.name = name
        this.tasks = []
        this.id = ""
        this.activeTask = ""

        this.initId = function () {
            let s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            this.id = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }

        this.initId()

    }

    //Methods
    addTask(name, description, priority, dueDate) {
        let ntask = new task(name, description, priority, dueDate)
        this.tasks.push(ntask)
        content.setStorage()
        return
    }

    removeTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1)
        content.setStorage()
        return
    }

    setActive(passedid) {
        activeTask = passedid
        content.setStorage()
        return
    }

    checkActive(passedid) {
        if (passedid == activeTask) {
            return true
        }
        return false
    }

    activeIndex() {
        const index = this.tasks.map(function(e) { return e.id; }).indexOf(this.activeTask)
        return index
    }

}