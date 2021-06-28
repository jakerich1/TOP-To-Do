const content = (function factory() {

    let projects = []

    return {

        addProject: function (project) {
            projects.push(project)
            return 1
        },

        removeProject: function (project) {
            projects.splice(projects.indexOf(project), 1)
            return
        }

    };

}())

export default content