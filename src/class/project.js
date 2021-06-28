//Project class
export class project {

    constructor(name) {
        this.name = name
        this.tasks = []
    }

    //Methods
    addTask(task) {
        this.tasks.push(task)
        return
    }

    removeTask(task) {
        tasks.splice(tasks.indexOf(task), 1)
        return
    }

    tasks() {
        return this.tasks
    }

    size() {
        return this.tasks.length;
    }

}
