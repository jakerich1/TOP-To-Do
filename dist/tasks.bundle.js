/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/class/content.js":
/*!******************************!*\
  !*** ./src/class/content.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _class_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../class/project */ "./src/class/project.js");


const content = (function factory() {

    let projects = []
    let activeProject = ""
    let sortTitle = 0
    let sortPriority = 0
    let sortDue = 0

    function returnProjects() {
        return projects
    }

    function setActive(id) {
        activeProject = id
        return
    }

    function activeIndex() {
        const index = projects.map(function(e) { return e.id; }).indexOf(activeProject)
        return index
    }

    function checkActive(id) {
        if (id == activeProject) {
            return true
        }
        return false
    }

    function addProject(name) {
        let proj = new _class_project__WEBPACK_IMPORTED_MODULE_0__.project(name)
        projects.push(proj)
        if (projects.length == 1) {
            setActive(proj.id)
        }
        return 1
    }

    function removeProject(project) {
        projects.splice(projects.indexOf(project), 1)
        return
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
        checkActive: checkActive,
        activeIndex: activeIndex

    };

}())

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (content);

/***/ }),

/***/ "./src/class/project.js":
/*!******************************!*\
  !*** ./src/class/project.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "project": () => (/* binding */ project)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/class/task.js");

//Project class
class project {

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
        let ntask = new _task__WEBPACK_IMPORTED_MODULE_0__.task(name, description, priority, dueDate)
        this.tasks.push(ntask)
        return
    }

    removeTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1)
        return
    }

    setActive(passedid) {
        activeTask = passedid
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

/***/ }),

/***/ "./src/class/task.js":
/*!***************************!*\
  !*** ./src/class/task.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "task": () => (/* binding */ task)
/* harmony export */ });
class task {

    constructor(title, description, priority, dueDate){
        this.title = title
        this.description = description
        this.priority = priority
        this.dueDate = dueDate
        this.completed = false
        this.id = ""

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
    toggle() {
        this.completed = !this.completed
        return
    }

    daysLeft() {

        const today = new Date()
        const diff = this.dueDate.getTime() - today.getTime()
        const diffDays = diff / (1000 * 3600 * 24)

        return diffDays

    }

}

/***/ }),

/***/ "./src/controllers/DOMcontroller.js":
/*!******************************************!*\
  !*** ./src/controllers/DOMcontroller.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _class_content__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../class/content */ "./src/class/content.js");


const DOMcontroller = (function factory() {

    return {

        setProjectTitle: function (name) {

            const projectTitle = document.querySelector('#project-name')
            projectTitle.innerText = name

        },

        showProjects: function () {

            const projectList = document.querySelector('#project-list')
            projectList.innerHTML = ""
            const projectsArray = _class_content__WEBPACK_IMPORTED_MODULE_0__.default.returnProjects()

            projectsArray.forEach(element => {

                const li = document.createElement('li')
                li.innerText = element.name

                if (_class_content__WEBPACK_IMPORTED_MODULE_0__.default.checkActive(element.id)) {
                    li.classList.add('active')
                    DOMcontroller.setProjectTitle(element.name)
                }

                li.addEventListener('click', function () {
                    _class_content__WEBPACK_IMPORTED_MODULE_0__.default.setActive(element.id)
                    DOMcontroller.showProjects()
                    DOMcontroller.showTasks()
                    DOMcontroller.setProjectTitle(element.name)
                })

                projectList.appendChild(li)

            });

            return

        },

        showTasks: function () {

            const taskBody = document.querySelector('#task-body')
            taskBody.innerHTML = ""

            const projectObj = _class_content__WEBPACK_IMPORTED_MODULE_0__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_0__.default.activeIndex()]

            if (typeof projectObj !== "undefined") {

                let taskArray = projectObj.tasks
                if (taskArray.length > 0) {

                    taskArray.forEach(element => {

                        const row = document.createElement('tr')

                        if (element.id == projectObj.activeTask) {
                            row.innerHTML = `<td style="border-top: 1px solid #E4FF76; border-left: 1px solid #E4FF76; border-bottom: 1px solid #E4FF76;" >${element.title}</td><td style="border-top: 1px solid #E4FF76; border-bottom: 1px solid #E4FF76;">${element.priority}</td><td style="border-top: 1px solid #E4FF76; border-bottom: 1px solid #E4FF76;">${element.dueDate}</td>`
                        } else {
                            row.innerHTML = `<td>${element.title}</td><td>${element.priority}</td><td>${element.dueDate}</td>`
                        }

                        const checkbox = document.createElement(`td`)
                        const checkboxInner = document.createElement(`div`)
                        checkboxInner.classList.add(`checkbox`)
                        checkbox.appendChild(checkboxInner)

                        if (element.id == projectObj.activeTask) {
                            checkbox.style.borderTop = '1px solid #E4FF76'
                            checkbox.style.borderRight = '1px solid #E4FF76'
                            checkbox.style.borderBottom = '1px solid #E4FF76'
                        }

                        if (element.completed) {
                            checkboxInner.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg></div></td>`
                        }

                        checkbox.addEventListener('click', function () {
                            element.toggle()
                            DOMcontroller.showTasks()
                        })

                        row.addEventListener('click', function () {
                            let taskID = element.id
                            _class_content__WEBPACK_IMPORTED_MODULE_0__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_0__.default.activeIndex()].activeTask = taskID
                            DOMcontroller.showTasks()
                            DOMcontroller.showDetails()
                        })

                        row.appendChild(checkbox)
                        taskBody.appendChild(row)

                    });

                }

            }

        },

        showDetails: function () {
            //DOM element declarations

            let taskObj = _class_content__WEBPACK_IMPORTED_MODULE_0__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_0__.default.activeIndex()].tasks[_class_content__WEBPACK_IMPORTED_MODULE_0__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_0__.default.activeIndex()].activeIndex()]

            if (!taskObj) {
                taskObj = _class_content__WEBPACK_IMPORTED_MODULE_0__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_0__.default.activeIndex()].tasks[0]
            }

            const detTitle = document.querySelector('#det-title')
            const detDescription = document.querySelector('#det-desc')
            const detPriority = document.querySelector('#det-priority')
            const detDueDate = document.querySelector('#det-dueDate')

            detTitle.value = taskObj.title
            detDescription.value = taskObj.description
            detPriority.value = taskObj.priority
            detDueDate.value = taskObj.dueDate

        },

        blankDetails: function () {

            const detTitle = document.querySelector('#det-title')
            const detDescription = document.querySelector('#det-desc')
            const detPriority = document.querySelector('#det-priority')
            const detDueDate = document.querySelector('#det-dueDate')

            detTitle.value = ''
            detDescription.value = ''
            detPriority.value = ''
            detDueDate.value = ''

        }

    }

}())

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMcontroller);

/***/ }),

/***/ "./src/controllers/listeners.js":
/*!**************************************!*\
  !*** ./src/controllers/listeners.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProjectListener": () => (/* binding */ createProjectListener),
/* harmony export */   "createTaskListener": () => (/* binding */ createTaskListener),
/* harmony export */   "changeDetail": () => (/* binding */ changeDetail),
/* harmony export */   "deleteProject": () => (/* binding */ deleteProject),
/* harmony export */   "deleteTask": () => (/* binding */ deleteTask),
/* harmony export */   "sortTitle": () => (/* binding */ sortTitle),
/* harmony export */   "sortPriority": () => (/* binding */ sortPriority),
/* harmony export */   "sortDue": () => (/* binding */ sortDue)
/* harmony export */ });
/* harmony import */ var _class_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../class/project */ "./src/class/project.js");
/* harmony import */ var _class_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../class/task */ "./src/class/task.js");
/* harmony import */ var _class_content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../class/content */ "./src/class/content.js");
/* harmony import */ var _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DOMcontroller */ "./src/controllers/DOMcontroller.js");





function createProjectListener(name){

    _class_content__WEBPACK_IMPORTED_MODULE_2__.default.addProject(name)
    _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__.default.showProjects()
    _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__.default.showTasks()

}

function createTaskListener(name, description, priority, dueDate){

    const projectObj = _class_content__WEBPACK_IMPORTED_MODULE_2__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_2__.default.activeIndex()]
    projectObj.addTask(name, description, priority, dueDate)
    _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__.default.showTasks()

}

function changeDetail() {

    const taskObj = _class_content__WEBPACK_IMPORTED_MODULE_2__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_2__.default.activeIndex()].tasks[_class_content__WEBPACK_IMPORTED_MODULE_2__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_2__.default.activeIndex()].activeIndex()]

    taskObj.title = document.querySelector('#det-title').value
    taskObj.description = document.querySelector('#det-desc').value
    taskObj.priority = document.querySelector('#det-priority').value
    taskObj.dueDate = document.querySelector('#det-dueDate').value

    _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__.default.showTasks()
    _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__.default.showDetails()

    //console.log(taskObj)

}

function deleteProject() {
    
    if (_class_content__WEBPACK_IMPORTED_MODULE_2__.default.projects.length > 0) {
        
        const projectObj = _class_content__WEBPACK_IMPORTED_MODULE_2__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_2__.default.activeIndex()]
        _class_content__WEBPACK_IMPORTED_MODULE_2__.default.removeProject(projectObj)
        _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__.default.showProjects()
        _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__.default.showTasks()
        _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__.default.blankDetails()

    }

}

function deleteTask() {

    const projectObj = _class_content__WEBPACK_IMPORTED_MODULE_2__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_2__.default.activeIndex()]
    const taskObj = projectObj.tasks[projectObj.activeIndex()]

    projectObj.removeTask(taskObj)
    _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__.default.showTasks()
    _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__.default.blankDetails()

}

function sortTitle() {

    let taskArray = _class_content__WEBPACK_IMPORTED_MODULE_2__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_2__.default.activeIndex()].tasks
    _class_content__WEBPACK_IMPORTED_MODULE_2__.default.sortTitle = !_class_content__WEBPACK_IMPORTED_MODULE_2__.default.sortTitle

    if (_class_content__WEBPACK_IMPORTED_MODULE_2__.default.sortTitle) { 
        taskArray = taskArray.sort((a,b) => (a.title > b.title) ? -1 : ((b.title > a.title) ? 1 : 0))
    }else{
        taskArray = taskArray.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    }

    _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__.default.showTasks()

}

function sortPriority() {

    let taskArray = _class_content__WEBPACK_IMPORTED_MODULE_2__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_2__.default.activeIndex()].tasks
    _class_content__WEBPACK_IMPORTED_MODULE_2__.default.sortPriority = !_class_content__WEBPACK_IMPORTED_MODULE_2__.default.sortPriority

    if (_class_content__WEBPACK_IMPORTED_MODULE_2__.default.sortPriority) { 
        taskArray = taskArray.sort((a,b) => (a.priority > b.priority) ? -1 : ((b.priority > a.priority) ? 1 : 0))
    }else{
        taskArray = taskArray.sort((a,b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0))
    }

    _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__.default.showTasks()
    
}

function sortDue() {
    
    let taskArray = _class_content__WEBPACK_IMPORTED_MODULE_2__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_2__.default.activeIndex()].tasks
    _class_content__WEBPACK_IMPORTED_MODULE_2__.default.sortDue = !_class_content__WEBPACK_IMPORTED_MODULE_2__.default.sortDue

    if (_class_content__WEBPACK_IMPORTED_MODULE_2__.default.sortDue) { 
        taskArray = taskArray.sort((a,b) => (a.dueDate > b.dueDate) ? -1 : ((b.dueDate > a.dueDate) ? 1 : 0))
    }else{
        taskArray = taskArray.sort((a,b) => (a.dueDate > b.dueDate) ? 1 : ((b.dueDate > a.dueDate) ? -1 : 0))
    }

    _DOMcontroller__WEBPACK_IMPORTED_MODULE_3__.default.showTasks()

}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/components/tasks.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tasks)
/* harmony export */ });
/* harmony import */ var _controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/listeners.js */ "./src/controllers/listeners.js");


function tasks() {

    //add project modal append to body
    const taskModal = document.createElement('div')
    taskModal.id = "addTasks"

    const modalCont = document.createElement('div')
    modalCont.classList.add('modal-content')
    taskModal.appendChild(modalCont)

    const closeBtn = document.createElement('span')
    closeBtn.classList.add('close')
    closeBtn.innerHTML = '&times;'
    modalCont.appendChild(closeBtn)

    //MOdal Inputs
    const nameInput = document.createElement('input')
    nameInput.type = "text"
    nameInput.placeholder = "Enter task name here"
    modalCont.appendChild(nameInput)

    const descInput = document.createElement('textarea')
    descInput.placeholder = "Enter description"
    modalCont.appendChild(descInput)

    const priorityInput = document.createElement('input')
    priorityInput.type = "text"
    priorityInput.placeholder = "Enter priority"
    modalCont.appendChild(priorityInput)

    const dateInput = document.createElement('input')
    dateInput.type = "date"
    modalCont.appendChild(dateInput)

    const modalSubmit = document.createElement('button')
    modalSubmit.innerText = "Submit"
    modalSubmit.addEventListener('click', function () {

        let name = nameInput.value
        let desc = descInput.value
        let priority = priorityInput.value
        let duedate = dateInput.value

        ;(0,_controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__.createTaskListener)(name, desc, priority, duedate)

        nameInput.value = ""
        descInput.value = ""
        priorityInput.value = ""
        dateInput.value = ""
        taskModal.style.display = "none"

    })

    modalCont.appendChild(modalSubmit)
    document.body.appendChild(taskModal)
    // When the user clicks on <span> (x), close the modal
    closeBtn.addEventListener('click', function (event) {
        taskModal.style.display = "none"
    })
    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function (event) {
        if (event.target == taskModal) {
            taskModal.style.display = "none";
        }
    });

    //Main Projects container
    const tasks = document.createElement('div')
    tasks.classList.add('task-area')

    const taskControl = document.createElement('div')
    taskControl.classList.add('task-control')

    //Remove task button
    const removeBtn = document.createElement('div')
    removeBtn.classList.add('remove')
    removeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>'
    removeBtn.addEventListener('click', function () {
        ;(0,_controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__.deleteTask)()
    })

    //Add task button
    const addBtn = document.createElement('div')
    addBtn.classList.add('add')
    addBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>'
    addBtn.addEventListener('click', function () {
        taskModal.style.display = "block"
    })

    taskControl.appendChild(addBtn)
    taskControl.appendChild(removeBtn)
    tasks.appendChild(taskControl)

    //Table element
    const table = document.createElement('table')

    //Header row 
    const thead = document.createElement('thead')
    const thr = document.createElement('tr')
    const thTask = document.createElement('th')
    thTask.innerHTML = "Task"
    const thPriority = document.createElement('th')
    thPriority.innerHTML = "Priority"
    const thDue = document.createElement('th')
    thDue.innerHTML = "Due Date"

    thr.appendChild(thTask)
    thr.appendChild(thPriority)
    thr.appendChild(thDue)
    thr.appendChild(document.createElement('th'))
    thead.appendChild(thr)
    table.appendChild(thead)

    thTask.addEventListener('click', function () {
        ;(0,_controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__.sortTitle)()
    })

    thPriority.addEventListener('click', function () {
        ;(0,_controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__.sortPriority)()
    })

    thDue.addEventListener('click', function () {
        ;(0,_controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__.sortDue)()
    })

    //Placeholder table rows
    const tbody = document.createElement('tbody')
    tbody.id = "task-body"

    table.appendChild(tbody)
    tasks.appendChild(table)

    return tasks

}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvY29udGVudC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvdGFzay5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvRE9NY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RPUC1Uby1Eby8uL3NyYy9jb21wb25lbnRzL3Rhc2tzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEwQzs7QUFFMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0QsYUFBYSxFQUFFO0FBQy9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLG1EQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQsaUVBQWUsTzs7Ozs7Ozs7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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsOEVBQWtCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzRUFBVTtBQUNsQixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEscUVBQVM7QUFDakIsS0FBSzs7QUFFTDtBQUNBLFFBQVEsd0VBQVk7QUFDcEIsS0FBSzs7QUFFTDtBQUNBLFFBQVEsbUVBQU87QUFDZixLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEMiLCJmaWxlIjoidGFza3MuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvamVjdCB9IGZyb20gXCIuLi9jbGFzcy9wcm9qZWN0XCJcblxuY29uc3QgY29udGVudCA9IChmdW5jdGlvbiBmYWN0b3J5KCkge1xuXG4gICAgbGV0IHByb2plY3RzID0gW11cbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IFwiXCJcbiAgICBsZXQgc29ydFRpdGxlID0gMFxuICAgIGxldCBzb3J0UHJpb3JpdHkgPSAwXG4gICAgbGV0IHNvcnREdWUgPSAwXG5cbiAgICBmdW5jdGlvbiByZXR1cm5Qcm9qZWN0cygpIHtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0QWN0aXZlKGlkKSB7XG4gICAgICAgIGFjdGl2ZVByb2plY3QgPSBpZFxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhY3RpdmVJbmRleCgpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBwcm9qZWN0cy5tYXAoZnVuY3Rpb24oZSkgeyByZXR1cm4gZS5pZDsgfSkuaW5kZXhPZihhY3RpdmVQcm9qZWN0KVxuICAgICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0FjdGl2ZShpZCkge1xuICAgICAgICBpZiAoaWQgPT0gYWN0aXZlUHJvamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KG5hbWUpIHtcbiAgICAgICAgbGV0IHByb2ogPSBuZXcgcHJvamVjdChuYW1lKVxuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2opXG4gICAgICAgIGlmIChwcm9qZWN0cy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgc2V0QWN0aXZlKHByb2ouaWQpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDFcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgcHJvamVjdHMuc3BsaWNlKHByb2plY3RzLmluZGV4T2YocHJvamVjdCksIDEpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgc29ydFRpdGxlOiBzb3J0VGl0bGUsXG4gICAgICAgIHNvcnRQcmlvcml0eTogc29ydFByaW9yaXR5LFxuICAgICAgICBzb3J0RHVlOiBzb3J0RHVlLFxuICAgICAgICBhY3RpdmVQcm9qZWN0OiBhY3RpdmVQcm9qZWN0LFxuICAgICAgICBwcm9qZWN0czogcHJvamVjdHMsXG4gICAgICAgIHJldHVyblByb2plY3RzOiByZXR1cm5Qcm9qZWN0cyxcbiAgICAgICAgYWRkUHJvamVjdDogYWRkUHJvamVjdCxcbiAgICAgICAgcmVtb3ZlUHJvamVjdDogcmVtb3ZlUHJvamVjdCxcbiAgICAgICAgc2V0QWN0aXZlOiBzZXRBY3RpdmUsXG4gICAgICAgIGNoZWNrQWN0aXZlOiBjaGVja0FjdGl2ZSxcbiAgICAgICAgYWN0aXZlSW5kZXg6IGFjdGl2ZUluZGV4XG5cbiAgICB9O1xuXG59KCkpXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQiLCJpbXBvcnQgeyB0YXNrIH0gZnJvbSAnLi90YXNrJztcbi8vUHJvamVjdCBjbGFzc1xuZXhwb3J0IGNsYXNzIHByb2plY3Qge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMudGFza3MgPSBbXVxuICAgICAgICB0aGlzLmlkID0gXCJcIlxuICAgICAgICB0aGlzLmFjdGl2ZVRhc2sgPSBcIlwiXG5cbiAgICAgICAgdGhpcy5pbml0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgczQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaWQgPSBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdElkKClcblxuICAgIH1cblxuICAgIC8vTWV0aG9kc1xuICAgIGFkZFRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKSB7XG4gICAgICAgIGxldCBudGFzayA9IG5ldyB0YXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSlcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKG50YXNrKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UodGhpcy50YXNrcy5pbmRleE9mKHRhc2spLCAxKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXRBY3RpdmUocGFzc2VkaWQpIHtcbiAgICAgICAgYWN0aXZlVGFzayA9IHBhc3NlZGlkXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNoZWNrQWN0aXZlKHBhc3NlZGlkKSB7XG4gICAgICAgIGlmIChwYXNzZWRpZCA9PSBhY3RpdmVUYXNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGFjdGl2ZUluZGV4KCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMudGFza3MubWFwKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGUuaWQ7IH0pLmluZGV4T2YodGhpcy5hY3RpdmVUYXNrKVxuICAgICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgdGFzayB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKXtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZVxuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlXG4gICAgICAgIHRoaXMuaWQgPSBcIlwiXG5cbiAgICAgICAgdGhpcy5pbml0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgczQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaWQgPSBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdElkKClcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy9NZXRob2RzXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9ICF0aGlzLmNvbXBsZXRlZFxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBkYXlzTGVmdCgpIHtcblxuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKClcbiAgICAgICAgY29uc3QgZGlmZiA9IHRoaXMuZHVlRGF0ZS5nZXRUaW1lKCkgLSB0b2RheS5nZXRUaW1lKClcbiAgICAgICAgY29uc3QgZGlmZkRheXMgPSBkaWZmIC8gKDEwMDAgKiAzNjAwICogMjQpXG5cbiAgICAgICAgcmV0dXJuIGRpZmZEYXlzXG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgY29udGVudCBmcm9tIFwiLi4vY2xhc3MvY29udGVudFwiXG5cbmNvbnN0IERPTWNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gZmFjdG9yeSgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgc2V0UHJvamVjdFRpdGxlOiBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lJylcbiAgICAgICAgICAgIHByb2plY3RUaXRsZS5pbm5lclRleHQgPSBuYW1lXG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93UHJvamVjdHM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0JylcbiAgICAgICAgICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBjb250ZW50LnJldHVyblByb2plY3RzKClcblxuICAgICAgICAgICAgcHJvamVjdHNBcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICAgICAgbGkuaW5uZXJUZXh0ID0gZWxlbWVudC5uYW1lXG5cbiAgICAgICAgICAgICAgICBpZiAoY29udGVudC5jaGVja0FjdGl2ZShlbGVtZW50LmlkKSkge1xuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNldFByb2plY3RUaXRsZShlbGVtZW50Lm5hbWUpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuc2V0QWN0aXZlKGVsZW1lbnQuaWQpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Byb2plY3RzKClcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNldFByb2plY3RUaXRsZShlbGVtZW50Lm5hbWUpXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGxpKVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93VGFza3M6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3QgdGFza0JvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1ib2R5JylcbiAgICAgICAgICAgIHRhc2tCb2R5LmlubmVySFRNTCA9IFwiXCJcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdE9iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb2plY3RPYmogIT09IFwidW5kZWZpbmVkXCIpIHtcblxuICAgICAgICAgICAgICAgIGxldCB0YXNrQXJyYXkgPSBwcm9qZWN0T2JqLnRhc2tzXG4gICAgICAgICAgICAgICAgaWYgKHRhc2tBcnJheS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGFza0FycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaWQgPT0gcHJvamVjdE9iai5hY3RpdmVUYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmlubmVySFRNTCA9IGA8dGQgc3R5bGU9XCJib3JkZXItdG9wOiAxcHggc29saWQgI0U0RkY3NjsgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjRTRGRjc2OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0U0RkY3NjtcIiA+JHtlbGVtZW50LnRpdGxlfTwvdGQ+PHRkIHN0eWxlPVwiYm9yZGVyLXRvcDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTRGRjc2O1wiPiR7ZWxlbWVudC5wcmlvcml0eX08L3RkPjx0ZCBzdHlsZT1cImJvcmRlci10b3A6IDFweCBzb2xpZCAjRTRGRjc2OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0U0RkY3NjtcIj4ke2VsZW1lbnQuZHVlRGF0ZX08L3RkPmBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmlubmVySFRNTCA9IGA8dGQ+JHtlbGVtZW50LnRpdGxlfTwvdGQ+PHRkPiR7ZWxlbWVudC5wcmlvcml0eX08L3RkPjx0ZD4ke2VsZW1lbnQuZHVlRGF0ZX08L3RkPmBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGB0ZGApXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja2JveElubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94SW5uZXIuY2xhc3NMaXN0LmFkZChgY2hlY2tib3hgKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guYXBwZW5kQ2hpbGQoY2hlY2tib3hJbm5lcilcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaWQgPT0gcHJvamVjdE9iai5hY3RpdmVUYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guc3R5bGUuYm9yZGVyVG9wID0gJzFweCBzb2xpZCAjRTRGRjc2J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LnN0eWxlLmJvcmRlclJpZ2h0ID0gJzFweCBzb2xpZCAjRTRGRjc2J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LnN0eWxlLmJvcmRlckJvdHRvbSA9ICcxcHggc29saWQgI0U0RkY3NidcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY29tcGxldGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hJbm5lci5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWNoZWNrXCIgd2lkdGg9XCI0NFwiIGhlaWdodD1cIjQ0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGZpbGw9XCJub25lXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PHBhdGggZD1cIk01IDEybDUgNWwxMCAtMTBcIiAvPjwvc3ZnPjwvZGl2PjwvdGQ+YFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnRvZ2dsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXNrSUQgPSBlbGVtZW50LmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLmFjdGl2ZVRhc2sgPSB0YXNrSURcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93RGV0YWlscygpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2hlY2tib3gpXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrQm9keS5hcHBlbmRDaGlsZChyb3cpXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dEZXRhaWxzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL0RPTSBlbGVtZW50IGRlY2xhcmF0aW9uc1xuXG4gICAgICAgICAgICBsZXQgdGFza09iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1tjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0uYWN0aXZlSW5kZXgoKV1cblxuICAgICAgICAgICAgaWYgKCF0YXNrT2JqKSB7XG4gICAgICAgICAgICAgICAgdGFza09iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1swXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBkZXRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtdGl0bGUnKVxuICAgICAgICAgICAgY29uc3QgZGV0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWRlc2MnKVxuICAgICAgICAgICAgY29uc3QgZGV0UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXByaW9yaXR5JylcbiAgICAgICAgICAgIGNvbnN0IGRldER1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWR1ZURhdGUnKVxuXG4gICAgICAgICAgICBkZXRUaXRsZS52YWx1ZSA9IHRhc2tPYmoudGl0bGVcbiAgICAgICAgICAgIGRldERlc2NyaXB0aW9uLnZhbHVlID0gdGFza09iai5kZXNjcmlwdGlvblxuICAgICAgICAgICAgZGV0UHJpb3JpdHkudmFsdWUgPSB0YXNrT2JqLnByaW9yaXR5XG4gICAgICAgICAgICBkZXREdWVEYXRlLnZhbHVlID0gdGFza09iai5kdWVEYXRlXG5cbiAgICAgICAgfSxcblxuICAgICAgICBibGFua0RldGFpbHM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3QgZGV0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXRpdGxlJylcbiAgICAgICAgICAgIGNvbnN0IGRldERlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kZXNjJylcbiAgICAgICAgICAgIGNvbnN0IGRldFByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1wcmlvcml0eScpXG4gICAgICAgICAgICBjb25zdCBkZXREdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kdWVEYXRlJylcblxuICAgICAgICAgICAgZGV0VGl0bGUudmFsdWUgPSAnJ1xuICAgICAgICAgICAgZGV0RGVzY3JpcHRpb24udmFsdWUgPSAnJ1xuICAgICAgICAgICAgZGV0UHJpb3JpdHkudmFsdWUgPSAnJ1xuICAgICAgICAgICAgZGV0RHVlRGF0ZS52YWx1ZSA9ICcnXG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59KCkpXG5cbmV4cG9ydCBkZWZhdWx0IERPTWNvbnRyb2xsZXIiLCJpbXBvcnQgeyBwcm9qZWN0IH0gZnJvbSBcIi4uL2NsYXNzL3Byb2plY3RcIlxuaW1wb3J0IHsgdGFzayB9IGZyb20gXCIuLi9jbGFzcy90YXNrXCJcbmltcG9ydCBjb250ZW50IGZyb20gXCIuLi9jbGFzcy9jb250ZW50XCJcbmltcG9ydCBET01jb250cm9sbGVyIGZyb20gXCIuL0RPTWNvbnRyb2xsZXJcIlxuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0TGlzdGVuZXIobmFtZSl7XG5cbiAgICBjb250ZW50LmFkZFByb2plY3QobmFtZSlcbiAgICBET01jb250cm9sbGVyLnNob3dQcm9qZWN0cygpXG4gICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2tMaXN0ZW5lcihuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpe1xuXG4gICAgY29uc3QgcHJvamVjdE9iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXVxuICAgIHByb2plY3RPYmouYWRkVGFzayhuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpXG4gICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuXG59XG5cbmZ1bmN0aW9uIGNoYW5nZURldGFpbCgpIHtcblxuICAgIGNvbnN0IHRhc2tPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0udGFza3NbY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLmFjdGl2ZUluZGV4KCldXG5cbiAgICB0YXNrT2JqLnRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC10aXRsZScpLnZhbHVlXG4gICAgdGFza09iai5kZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZGVzYycpLnZhbHVlXG4gICAgdGFza09iai5wcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtcHJpb3JpdHknKS52YWx1ZVxuICAgIHRhc2tPYmouZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZHVlRGF0ZScpLnZhbHVlXG5cbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgRE9NY29udHJvbGxlci5zaG93RGV0YWlscygpXG5cbiAgICAvL2NvbnNvbGUubG9nKHRhc2tPYmopXG5cbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdCgpIHtcbiAgICBcbiAgICBpZiAoY29udGVudC5wcm9qZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwcm9qZWN0T2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldXG4gICAgICAgIGNvbnRlbnQucmVtb3ZlUHJvamVjdChwcm9qZWN0T2JqKVxuICAgICAgICBET01jb250cm9sbGVyLnNob3dQcm9qZWN0cygpXG4gICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICAgICAgRE9NY29udHJvbGxlci5ibGFua0RldGFpbHMoKVxuXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2soKSB7XG5cbiAgICBjb25zdCBwcm9qZWN0T2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldXG4gICAgY29uc3QgdGFza09iaiA9IHByb2plY3RPYmoudGFza3NbcHJvamVjdE9iai5hY3RpdmVJbmRleCgpXVxuXG4gICAgcHJvamVjdE9iai5yZW1vdmVUYXNrKHRhc2tPYmopXG4gICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgIERPTWNvbnRyb2xsZXIuYmxhbmtEZXRhaWxzKClcblxufVxuXG5mdW5jdGlvbiBzb3J0VGl0bGUoKSB7XG5cbiAgICBsZXQgdGFza0FycmF5ID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzXG4gICAgY29udGVudC5zb3J0VGl0bGUgPSAhY29udGVudC5zb3J0VGl0bGVcblxuICAgIGlmIChjb250ZW50LnNvcnRUaXRsZSkgeyBcbiAgICAgICAgdGFza0FycmF5ID0gdGFza0FycmF5LnNvcnQoKGEsYikgPT4gKGEudGl0bGUgPiBiLnRpdGxlKSA/IC0xIDogKChiLnRpdGxlID4gYS50aXRsZSkgPyAxIDogMCkpXG4gICAgfWVsc2V7XG4gICAgICAgIHRhc2tBcnJheSA9IHRhc2tBcnJheS5zb3J0KChhLGIpID0+IChhLnRpdGxlID4gYi50aXRsZSkgPyAxIDogKChiLnRpdGxlID4gYS50aXRsZSkgPyAtMSA6IDApKVxuICAgIH1cblxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcblxufVxuXG5mdW5jdGlvbiBzb3J0UHJpb3JpdHkoKSB7XG5cbiAgICBsZXQgdGFza0FycmF5ID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzXG4gICAgY29udGVudC5zb3J0UHJpb3JpdHkgPSAhY29udGVudC5zb3J0UHJpb3JpdHlcblxuICAgIGlmIChjb250ZW50LnNvcnRQcmlvcml0eSkgeyBcbiAgICAgICAgdGFza0FycmF5ID0gdGFza0FycmF5LnNvcnQoKGEsYikgPT4gKGEucHJpb3JpdHkgPiBiLnByaW9yaXR5KSA/IC0xIDogKChiLnByaW9yaXR5ID4gYS5wcmlvcml0eSkgPyAxIDogMCkpXG4gICAgfWVsc2V7XG4gICAgICAgIHRhc2tBcnJheSA9IHRhc2tBcnJheS5zb3J0KChhLGIpID0+IChhLnByaW9yaXR5ID4gYi5wcmlvcml0eSkgPyAxIDogKChiLnByaW9yaXR5ID4gYS5wcmlvcml0eSkgPyAtMSA6IDApKVxuICAgIH1cblxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICBcbn1cblxuZnVuY3Rpb24gc29ydER1ZSgpIHtcbiAgICBcbiAgICBsZXQgdGFza0FycmF5ID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzXG4gICAgY29udGVudC5zb3J0RHVlID0gIWNvbnRlbnQuc29ydER1ZVxuXG4gICAgaWYgKGNvbnRlbnQuc29ydER1ZSkgeyBcbiAgICAgICAgdGFza0FycmF5ID0gdGFza0FycmF5LnNvcnQoKGEsYikgPT4gKGEuZHVlRGF0ZSA+IGIuZHVlRGF0ZSkgPyAtMSA6ICgoYi5kdWVEYXRlID4gYS5kdWVEYXRlKSA/IDEgOiAwKSlcbiAgICB9ZWxzZXtcbiAgICAgICAgdGFza0FycmF5ID0gdGFza0FycmF5LnNvcnQoKGEsYikgPT4gKGEuZHVlRGF0ZSA+IGIuZHVlRGF0ZSkgPyAxIDogKChiLmR1ZURhdGUgPiBhLmR1ZURhdGUpID8gLTEgOiAwKSlcbiAgICB9XG5cbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbn1cblxuZXhwb3J0IHtjcmVhdGVQcm9qZWN0TGlzdGVuZXIsIGNyZWF0ZVRhc2tMaXN0ZW5lciwgY2hhbmdlRGV0YWlsLCBkZWxldGVQcm9qZWN0LCBkZWxldGVUYXNrLCBzb3J0VGl0bGUsIHNvcnRQcmlvcml0eSwgc29ydER1ZX0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XG4gICAgY3JlYXRlVGFza0xpc3RlbmVyLCBkZWxldGVUYXNrLCBzb3J0VGl0bGUsIHNvcnRQcmlvcml0eSwgc29ydER1ZVxufSBmcm9tIFwiLi4vY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRhc2tzKCkge1xuXG4gICAgLy9hZGQgcHJvamVjdCBtb2RhbCBhcHBlbmQgdG8gYm9keVxuICAgIGNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGFza01vZGFsLmlkID0gXCJhZGRUYXNrc1wiXG5cbiAgICBjb25zdCBtb2RhbENvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIG1vZGFsQ29udC5jbGFzc0xpc3QuYWRkKCdtb2RhbC1jb250ZW50JylcbiAgICB0YXNrTW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxDb250KVxuXG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBjbG9zZUJ0bi5jbGFzc0xpc3QuYWRkKCdjbG9zZScpXG4gICAgY2xvc2VCdG4uaW5uZXJIVE1MID0gJyZ0aW1lczsnXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKGNsb3NlQnRuKVxuXG4gICAgLy9NT2RhbCBJbnB1dHNcbiAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgbmFtZUlucHV0LnR5cGUgPSBcInRleHRcIlxuICAgIG5hbWVJbnB1dC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgdGFzayBuYW1lIGhlcmVcIlxuICAgIG1vZGFsQ29udC5hcHBlbmRDaGlsZChuYW1lSW5wdXQpXG5cbiAgICBjb25zdCBkZXNjSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpXG4gICAgZGVzY0lucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciBkZXNjcmlwdGlvblwiXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKGRlc2NJbnB1dClcblxuICAgIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgcHJpb3JpdHlJbnB1dC50eXBlID0gXCJ0ZXh0XCJcbiAgICBwcmlvcml0eUlucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciBwcmlvcml0eVwiXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKHByaW9yaXR5SW5wdXQpXG5cbiAgICBjb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgZGF0ZUlucHV0LnR5cGUgPSBcImRhdGVcIlxuICAgIG1vZGFsQ29udC5hcHBlbmRDaGlsZChkYXRlSW5wdXQpXG5cbiAgICBjb25zdCBtb2RhbFN1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgbW9kYWxTdWJtaXQuaW5uZXJUZXh0ID0gXCJTdWJtaXRcIlxuICAgIG1vZGFsU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGxldCBuYW1lID0gbmFtZUlucHV0LnZhbHVlXG4gICAgICAgIGxldCBkZXNjID0gZGVzY0lucHV0LnZhbHVlXG4gICAgICAgIGxldCBwcmlvcml0eSA9IHByaW9yaXR5SW5wdXQudmFsdWVcbiAgICAgICAgbGV0IGR1ZWRhdGUgPSBkYXRlSW5wdXQudmFsdWVcblxuICAgICAgICBjcmVhdGVUYXNrTGlzdGVuZXIobmFtZSwgZGVzYywgcHJpb3JpdHksIGR1ZWRhdGUpXG5cbiAgICAgICAgbmFtZUlucHV0LnZhbHVlID0gXCJcIlxuICAgICAgICBkZXNjSW5wdXQudmFsdWUgPSBcIlwiXG4gICAgICAgIHByaW9yaXR5SW5wdXQudmFsdWUgPSBcIlwiXG4gICAgICAgIGRhdGVJbnB1dC52YWx1ZSA9IFwiXCJcbiAgICAgICAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuXG4gICAgfSlcblxuICAgIG1vZGFsQ29udC5hcHBlbmRDaGlsZChtb2RhbFN1Ym1pdClcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRhc2tNb2RhbClcbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiA8c3Bhbj4gKHgpLCBjbG9zZSB0aGUgbW9kYWxcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG4gICAgfSlcbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIG9mIHRoZSBtb2RhbCwgY2xvc2UgaXRcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0YXNrTW9kYWwpIHtcbiAgICAgICAgICAgIHRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vTWFpbiBQcm9qZWN0cyBjb250YWluZXJcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGFza3MuY2xhc3NMaXN0LmFkZCgndGFzay1hcmVhJylcblxuICAgIGNvbnN0IHRhc2tDb250cm9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0YXNrQ29udHJvbC5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbnRyb2wnKVxuXG4gICAgLy9SZW1vdmUgdGFzayBidXR0b25cbiAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHJlbW92ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUnKVxuICAgIHJlbW92ZUJ0bi5pbm5lckhUTUwgPSAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLXRyYXNoXCIgd2lkdGg9XCI0NFwiIGhlaWdodD1cIjQ0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGZpbGw9XCJub25lXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PGxpbmUgeDE9XCI0XCIgeTE9XCI3XCIgeDI9XCIyMFwiIHkyPVwiN1wiIC8+PGxpbmUgeDE9XCIxMFwiIHkxPVwiMTFcIiB4Mj1cIjEwXCIgeTI9XCIxN1wiIC8+PGxpbmUgeDE9XCIxNFwiIHkxPVwiMTFcIiB4Mj1cIjE0XCIgeTI9XCIxN1wiIC8+PHBhdGggZD1cIk01IDdsMSAxMmEyIDIgMCAwIDAgMiAyaDhhMiAyIDAgMCAwIDIgLTJsMSAtMTJcIiAvPjxwYXRoIGQ9XCJNOSA3di0zYTEgMSAwIDAgMSAxIC0xaDRhMSAxIDAgMCAxIDEgMXYzXCIgLz48L3N2Zz4nXG4gICAgcmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkZWxldGVUYXNrKClcbiAgICB9KVxuXG4gICAgLy9BZGQgdGFzayBidXR0b25cbiAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdhZGQnKVxuICAgIGFkZEJ0bi5pbm5lckhUTUwgPSAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLXBsdXNcIiB3aWR0aD1cIjQ0XCIgaGVpZ2h0PVwiNDRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgZmlsbD1cIm5vbmVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48bGluZSB4MT1cIjEyXCIgeTE9XCI1XCIgeDI9XCIxMlwiIHkyPVwiMTlcIiAvPjxsaW5lIHgxPVwiNVwiIHkxPVwiMTJcIiB4Mj1cIjE5XCIgeTI9XCIxMlwiIC8+PC9zdmc+J1xuICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbiAgICB9KVxuXG4gICAgdGFza0NvbnRyb2wuYXBwZW5kQ2hpbGQoYWRkQnRuKVxuICAgIHRhc2tDb250cm9sLmFwcGVuZENoaWxkKHJlbW92ZUJ0bilcbiAgICB0YXNrcy5hcHBlbmRDaGlsZCh0YXNrQ29udHJvbClcblxuICAgIC8vVGFibGUgZWxlbWVudFxuICAgIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKVxuXG4gICAgLy9IZWFkZXIgcm93IFxuICAgIGNvbnN0IHRoZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKVxuICAgIGNvbnN0IHRociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcbiAgICBjb25zdCB0aFRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpXG4gICAgdGhUYXNrLmlubmVySFRNTCA9IFwiVGFza1wiXG4gICAgY29uc3QgdGhQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJylcbiAgICB0aFByaW9yaXR5LmlubmVySFRNTCA9IFwiUHJpb3JpdHlcIlxuICAgIGNvbnN0IHRoRHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgIHRoRHVlLmlubmVySFRNTCA9IFwiRHVlIERhdGVcIlxuXG4gICAgdGhyLmFwcGVuZENoaWxkKHRoVGFzaylcbiAgICB0aHIuYXBwZW5kQ2hpbGQodGhQcmlvcml0eSlcbiAgICB0aHIuYXBwZW5kQ2hpbGQodGhEdWUpXG4gICAgdGhyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJykpXG4gICAgdGhlYWQuYXBwZW5kQ2hpbGQodGhyKVxuICAgIHRhYmxlLmFwcGVuZENoaWxkKHRoZWFkKVxuXG4gICAgdGhUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzb3J0VGl0bGUoKVxuICAgIH0pXG5cbiAgICB0aFByaW9yaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzb3J0UHJpb3JpdHkoKVxuICAgIH0pXG5cbiAgICB0aER1ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc29ydER1ZSgpXG4gICAgfSlcblxuICAgIC8vUGxhY2Vob2xkZXIgdGFibGUgcm93c1xuICAgIGNvbnN0IHRib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKVxuICAgIHRib2R5LmlkID0gXCJ0YXNrLWJvZHlcIlxuXG4gICAgdGFibGUuYXBwZW5kQ2hpbGQodGJvZHkpXG4gICAgdGFza3MuYXBwZW5kQ2hpbGQodGFibGUpXG5cbiAgICByZXR1cm4gdGFza3NcblxufSJdLCJzb3VyY2VSb290IjoiIn0=