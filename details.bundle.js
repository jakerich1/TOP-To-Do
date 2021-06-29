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
/*!***********************************!*\
  !*** ./src/components/details.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ details)
/* harmony export */ });
/* harmony import */ var _controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/listeners.js */ "./src/controllers/listeners.js");


function details() {

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
        ;(0,_controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__.changeDetail)()
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
        ;(0,_controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__.changeDetail)()
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
        ;(0,_controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__.changeDetail)()
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
        ;(0,_controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__.changeDetail)()
    })


    details.appendChild(dueDate)    

    return details

}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvY29udGVudC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvdGFzay5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvRE9NY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RPUC1Uby1Eby8uL3NyYy9jb21wb25lbnRzL2RldGFpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTBDOztBQUUxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRCxhQUFhLEVBQUU7QUFDL0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsbURBQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRCxpRUFBZSxPOzs7Ozs7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdFQUFZO0FBQ3BCLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdFQUFZO0FBQ3BCLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3RUFBWTtBQUNwQixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0VBQVk7QUFDcEIsS0FBSzs7O0FBR0w7O0FBRUE7O0FBRUEsQyIsImZpbGUiOiJkZXRhaWxzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb2plY3QgfSBmcm9tIFwiLi4vY2xhc3MvcHJvamVjdFwiXG5cbmNvbnN0IGNvbnRlbnQgPSAoZnVuY3Rpb24gZmFjdG9yeSgpIHtcblxuICAgIGxldCBwcm9qZWN0cyA9IFtdXG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBcIlwiXG4gICAgbGV0IHNvcnRUaXRsZSA9IDBcbiAgICBsZXQgc29ydFByaW9yaXR5ID0gMFxuICAgIGxldCBzb3J0RHVlID0gMFxuXG4gICAgZnVuY3Rpb24gcmV0dXJuUHJvamVjdHMoKSB7XG4gICAgICAgIHJldHVybiBwcm9qZWN0c1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEFjdGl2ZShpZCkge1xuICAgICAgICBhY3RpdmVQcm9qZWN0ID0gaWRcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWN0aXZlSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcHJvamVjdHMubWFwKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGUuaWQ7IH0pLmluZGV4T2YoYWN0aXZlUHJvamVjdClcbiAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBY3RpdmUoaWQpIHtcbiAgICAgICAgaWYgKGlkID09IGFjdGl2ZVByb2plY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChuYW1lKSB7XG4gICAgICAgIGxldCBwcm9qID0gbmV3IHByb2plY3QobmFtZSlcbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qKVxuICAgICAgICBpZiAocHJvamVjdHMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIHNldEFjdGl2ZShwcm9qLmlkKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0KSB7XG4gICAgICAgIHByb2plY3RzLnNwbGljZShwcm9qZWN0cy5pbmRleE9mKHByb2plY3QpLCAxKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHNvcnRUaXRsZTogc29ydFRpdGxlLFxuICAgICAgICBzb3J0UHJpb3JpdHk6IHNvcnRQcmlvcml0eSxcbiAgICAgICAgc29ydER1ZTogc29ydER1ZSxcbiAgICAgICAgYWN0aXZlUHJvamVjdDogYWN0aXZlUHJvamVjdCxcbiAgICAgICAgcHJvamVjdHM6IHByb2plY3RzLFxuICAgICAgICByZXR1cm5Qcm9qZWN0czogcmV0dXJuUHJvamVjdHMsXG4gICAgICAgIGFkZFByb2plY3Q6IGFkZFByb2plY3QsXG4gICAgICAgIHJlbW92ZVByb2plY3Q6IHJlbW92ZVByb2plY3QsXG4gICAgICAgIHNldEFjdGl2ZTogc2V0QWN0aXZlLFxuICAgICAgICBjaGVja0FjdGl2ZTogY2hlY2tBY3RpdmUsXG4gICAgICAgIGFjdGl2ZUluZGV4OiBhY3RpdmVJbmRleFxuXG4gICAgfTtcblxufSgpKVxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50IiwiaW1wb3J0IHsgdGFzayB9IGZyb20gJy4vdGFzayc7XG4vL1Byb2plY3QgY2xhc3NcbmV4cG9ydCBjbGFzcyBwcm9qZWN0IHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLnRhc2tzID0gW11cbiAgICAgICAgdGhpcy5pZCA9IFwiXCJcbiAgICAgICAgdGhpcy5hY3RpdmVUYXNrID0gXCJcIlxuXG4gICAgICAgIHRoaXMuaW5pdElkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHM0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlkID0gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRJZCgpXG5cbiAgICB9XG5cbiAgICAvL01ldGhvZHNcbiAgICBhZGRUYXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xuICAgICAgICBsZXQgbnRhc2sgPSBuZXcgdGFzayhuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpXG4gICAgICAgIHRoaXMudGFza3MucHVzaChudGFzaylcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcmVtb3ZlVGFzayh0YXNrKSB7XG4gICAgICAgIHRoaXMudGFza3Muc3BsaWNlKHRoaXMudGFza3MuaW5kZXhPZih0YXNrKSwgMSlcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2V0QWN0aXZlKHBhc3NlZGlkKSB7XG4gICAgICAgIGFjdGl2ZVRhc2sgPSBwYXNzZWRpZFxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjaGVja0FjdGl2ZShwYXNzZWRpZCkge1xuICAgICAgICBpZiAocGFzc2VkaWQgPT0gYWN0aXZlVGFzaykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBhY3RpdmVJbmRleCgpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnRhc2tzLm1hcChmdW5jdGlvbihlKSB7IHJldHVybiBlLmlkOyB9KS5pbmRleE9mKHRoaXMuYWN0aXZlVGFzaylcbiAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIHRhc2sge1xuXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSl7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25cbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZVxuICAgICAgICB0aGlzLmlkID0gXCJcIlxuXG4gICAgICAgIHRoaXMuaW5pdElkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHM0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlkID0gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRJZCgpXG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vTWV0aG9kc1xuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSAhdGhpcy5jb21wbGV0ZWRcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZGF5c0xlZnQoKSB7XG5cbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gICAgICAgIGNvbnN0IGRpZmYgPSB0aGlzLmR1ZURhdGUuZ2V0VGltZSgpIC0gdG9kYXkuZ2V0VGltZSgpXG4gICAgICAgIGNvbnN0IGRpZmZEYXlzID0gZGlmZiAvICgxMDAwICogMzYwMCAqIDI0KVxuXG4gICAgICAgIHJldHVybiBkaWZmRGF5c1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IGNvbnRlbnQgZnJvbSBcIi4uL2NsYXNzL2NvbnRlbnRcIlxuXG5jb25zdCBET01jb250cm9sbGVyID0gKGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHNldFByb2plY3RUaXRsZTogZnVuY3Rpb24gKG5hbWUpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpXG4gICAgICAgICAgICBwcm9qZWN0VGl0bGUuaW5uZXJUZXh0ID0gbmFtZVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd1Byb2plY3RzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpXG4gICAgICAgICAgICBwcm9qZWN0TGlzdC5pbm5lckhUTUwgPSBcIlwiXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0c0FycmF5ID0gY29udGVudC5yZXR1cm5Qcm9qZWN0cygpXG5cbiAgICAgICAgICAgIHByb2plY3RzQXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAgICAgICAgIGxpLmlubmVyVGV4dCA9IGVsZW1lbnQubmFtZVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuY2hlY2tBY3RpdmUoZWxlbWVudC5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zZXRQcm9qZWN0VGl0bGUoZWxlbWVudC5uYW1lKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNldEFjdGl2ZShlbGVtZW50LmlkKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dQcm9qZWN0cygpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zZXRQcm9qZWN0VGl0bGUoZWxlbWVudC5uYW1lKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChsaSlcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd1Rhc2tzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRhc2tCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stYm9keScpXG4gICAgICAgICAgICB0YXNrQm9keS5pbm5lckhUTUwgPSBcIlwiXG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9qZWN0T2JqICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgdGFza0FycmF5ID0gcHJvamVjdE9iai50YXNrc1xuICAgICAgICAgICAgICAgIGlmICh0YXNrQXJyYXkubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRhc2tBcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmlkID09IHByb2plY3RPYmouYWN0aXZlVGFzaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5pbm5lckhUTUwgPSBgPHRkIHN0eWxlPVwiYm9yZGVyLXRvcDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0U0RkY3NjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFNEZGNzY7XCIgPiR7ZWxlbWVudC50aXRsZX08L3RkPjx0ZCBzdHlsZT1cImJvcmRlci10b3A6IDFweCBzb2xpZCAjRTRGRjc2OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0U0RkY3NjtcIj4ke2VsZW1lbnQucHJpb3JpdHl9PC90ZD48dGQgc3R5bGU9XCJib3JkZXItdG9wOiAxcHggc29saWQgI0U0RkY3NjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFNEZGNzY7XCI+JHtlbGVtZW50LmR1ZURhdGV9PC90ZD5gXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5pbm5lckhUTUwgPSBgPHRkPiR7ZWxlbWVudC50aXRsZX08L3RkPjx0ZD4ke2VsZW1lbnQucHJpb3JpdHl9PC90ZD48dGQ+JHtlbGVtZW50LmR1ZURhdGV9PC90ZD5gXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgdGRgKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tib3hJbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveElubmVyLmNsYXNzTGlzdC5hZGQoYGNoZWNrYm94YClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmFwcGVuZENoaWxkKGNoZWNrYm94SW5uZXIpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmlkID09IHByb2plY3RPYmouYWN0aXZlVGFzaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LnN0eWxlLmJvcmRlclRvcCA9ICcxcHggc29saWQgI0U0RkY3NidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5zdHlsZS5ib3JkZXJSaWdodCA9ICcxcHggc29saWQgI0U0RkY3NidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5zdHlsZS5ib3JkZXJCb3R0b20gPSAnMXB4IHNvbGlkICNFNEZGNzYnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNvbXBsZXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94SW5uZXIuaW5uZXJIVE1MID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiaWNvbiBpY29uLXRhYmxlciBpY29uLXRhYmxlci1jaGVja1wiIHdpZHRoPVwiNDRcIiBoZWlnaHQ9XCI0NFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBmaWxsPVwibm9uZVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIHN0cm9rZT1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIvPjxwYXRoIGQ9XCJNNSAxMmw1IDVsMTAgLTEwXCIgLz48L3N2Zz48L2Rpdj48L3RkPmBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC50b2dnbGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFza0lEID0gZWxlbWVudC5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS5hY3RpdmVUYXNrID0gdGFza0lEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd0RldGFpbHMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGNoZWNrYm94KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGFza0JvZHkuYXBwZW5kQ2hpbGQocm93KVxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93RGV0YWlsczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy9ET00gZWxlbWVudCBkZWNsYXJhdGlvbnNcblxuICAgICAgICAgICAgbGV0IHRhc2tPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0udGFza3NbY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLmFjdGl2ZUluZGV4KCldXG5cbiAgICAgICAgICAgIGlmICghdGFza09iaikge1xuICAgICAgICAgICAgICAgIHRhc2tPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0udGFza3NbMF1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZGV0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXRpdGxlJylcbiAgICAgICAgICAgIGNvbnN0IGRldERlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kZXNjJylcbiAgICAgICAgICAgIGNvbnN0IGRldFByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1wcmlvcml0eScpXG4gICAgICAgICAgICBjb25zdCBkZXREdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kdWVEYXRlJylcblxuICAgICAgICAgICAgZGV0VGl0bGUudmFsdWUgPSB0YXNrT2JqLnRpdGxlXG4gICAgICAgICAgICBkZXREZXNjcmlwdGlvbi52YWx1ZSA9IHRhc2tPYmouZGVzY3JpcHRpb25cbiAgICAgICAgICAgIGRldFByaW9yaXR5LnZhbHVlID0gdGFza09iai5wcmlvcml0eVxuICAgICAgICAgICAgZGV0RHVlRGF0ZS52YWx1ZSA9IHRhc2tPYmouZHVlRGF0ZVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgYmxhbmtEZXRhaWxzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRldFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC10aXRsZScpXG4gICAgICAgICAgICBjb25zdCBkZXREZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZGVzYycpXG4gICAgICAgICAgICBjb25zdCBkZXRQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtcHJpb3JpdHknKVxuICAgICAgICAgICAgY29uc3QgZGV0RHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZHVlRGF0ZScpXG5cbiAgICAgICAgICAgIGRldFRpdGxlLnZhbHVlID0gJydcbiAgICAgICAgICAgIGRldERlc2NyaXB0aW9uLnZhbHVlID0gJydcbiAgICAgICAgICAgIGRldFByaW9yaXR5LnZhbHVlID0gJydcbiAgICAgICAgICAgIGRldER1ZURhdGUudmFsdWUgPSAnJ1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSgpKVxuXG5leHBvcnQgZGVmYXVsdCBET01jb250cm9sbGVyIiwiaW1wb3J0IHsgcHJvamVjdCB9IGZyb20gXCIuLi9jbGFzcy9wcm9qZWN0XCJcbmltcG9ydCB7IHRhc2sgfSBmcm9tIFwiLi4vY2xhc3MvdGFza1wiXG5pbXBvcnQgY29udGVudCBmcm9tIFwiLi4vY2xhc3MvY29udGVudFwiXG5pbXBvcnQgRE9NY29udHJvbGxlciBmcm9tIFwiLi9ET01jb250cm9sbGVyXCJcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdExpc3RlbmVyKG5hbWUpe1xuXG4gICAgY29udGVudC5hZGRQcm9qZWN0KG5hbWUpXG4gICAgRE9NY29udHJvbGxlci5zaG93UHJvamVjdHMoKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcblxufVxuXG5mdW5jdGlvbiBjcmVhdGVUYXNrTGlzdGVuZXIobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKXtcblxuICAgIGNvbnN0IHByb2plY3RPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV1cbiAgICBwcm9qZWN0T2JqLmFkZFRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcblxufVxuXG5mdW5jdGlvbiBjaGFuZ2VEZXRhaWwoKSB7XG5cbiAgICBjb25zdCB0YXNrT2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzW2NvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS5hY3RpdmVJbmRleCgpXVxuXG4gICAgdGFza09iai50aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtdGl0bGUnKS52YWx1ZVxuICAgIHRhc2tPYmouZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWRlc2MnKS52YWx1ZVxuICAgIHRhc2tPYmoucHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXByaW9yaXR5JykudmFsdWVcbiAgICB0YXNrT2JqLmR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWR1ZURhdGUnKS52YWx1ZVxuXG4gICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd0RldGFpbHMoKVxuXG4gICAgLy9jb25zb2xlLmxvZyh0YXNrT2JqKVxuXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoKSB7XG4gICAgXG4gICAgaWYgKGNvbnRlbnQucHJvamVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdE9iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXVxuICAgICAgICBjb250ZW50LnJlbW92ZVByb2plY3QocHJvamVjdE9iailcbiAgICAgICAgRE9NY29udHJvbGxlci5zaG93UHJvamVjdHMoKVxuICAgICAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgICAgIERPTWNvbnRyb2xsZXIuYmxhbmtEZXRhaWxzKClcblxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrKCkge1xuXG4gICAgY29uc3QgcHJvamVjdE9iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXVxuICAgIGNvbnN0IHRhc2tPYmogPSBwcm9qZWN0T2JqLnRhc2tzW3Byb2plY3RPYmouYWN0aXZlSW5kZXgoKV1cblxuICAgIHByb2plY3RPYmoucmVtb3ZlVGFzayh0YXNrT2JqKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICBET01jb250cm9sbGVyLmJsYW5rRGV0YWlscygpXG5cbn1cblxuZnVuY3Rpb24gc29ydFRpdGxlKCkge1xuXG4gICAgbGV0IHRhc2tBcnJheSA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1xuICAgIGNvbnRlbnQuc29ydFRpdGxlID0gIWNvbnRlbnQuc29ydFRpdGxlXG5cbiAgICBpZiAoY29udGVudC5zb3J0VGl0bGUpIHsgXG4gICAgICAgIHRhc2tBcnJheSA9IHRhc2tBcnJheS5zb3J0KChhLGIpID0+IChhLnRpdGxlID4gYi50aXRsZSkgPyAtMSA6ICgoYi50aXRsZSA+IGEudGl0bGUpID8gMSA6IDApKVxuICAgIH1lbHNle1xuICAgICAgICB0YXNrQXJyYXkgPSB0YXNrQXJyYXkuc29ydCgoYSxiKSA9PiAoYS50aXRsZSA+IGIudGl0bGUpID8gMSA6ICgoYi50aXRsZSA+IGEudGl0bGUpID8gLTEgOiAwKSlcbiAgICB9XG5cbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbn1cblxuZnVuY3Rpb24gc29ydFByaW9yaXR5KCkge1xuXG4gICAgbGV0IHRhc2tBcnJheSA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1xuICAgIGNvbnRlbnQuc29ydFByaW9yaXR5ID0gIWNvbnRlbnQuc29ydFByaW9yaXR5XG5cbiAgICBpZiAoY29udGVudC5zb3J0UHJpb3JpdHkpIHsgXG4gICAgICAgIHRhc2tBcnJheSA9IHRhc2tBcnJheS5zb3J0KChhLGIpID0+IChhLnByaW9yaXR5ID4gYi5wcmlvcml0eSkgPyAtMSA6ICgoYi5wcmlvcml0eSA+IGEucHJpb3JpdHkpID8gMSA6IDApKVxuICAgIH1lbHNle1xuICAgICAgICB0YXNrQXJyYXkgPSB0YXNrQXJyYXkuc29ydCgoYSxiKSA9PiAoYS5wcmlvcml0eSA+IGIucHJpb3JpdHkpID8gMSA6ICgoYi5wcmlvcml0eSA+IGEucHJpb3JpdHkpID8gLTEgOiAwKSlcbiAgICB9XG5cbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgXG59XG5cbmZ1bmN0aW9uIHNvcnREdWUoKSB7XG4gICAgXG4gICAgbGV0IHRhc2tBcnJheSA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1xuICAgIGNvbnRlbnQuc29ydER1ZSA9ICFjb250ZW50LnNvcnREdWVcblxuICAgIGlmIChjb250ZW50LnNvcnREdWUpIHsgXG4gICAgICAgIHRhc2tBcnJheSA9IHRhc2tBcnJheS5zb3J0KChhLGIpID0+IChhLmR1ZURhdGUgPiBiLmR1ZURhdGUpID8gLTEgOiAoKGIuZHVlRGF0ZSA+IGEuZHVlRGF0ZSkgPyAxIDogMCkpXG4gICAgfWVsc2V7XG4gICAgICAgIHRhc2tBcnJheSA9IHRhc2tBcnJheS5zb3J0KChhLGIpID0+IChhLmR1ZURhdGUgPiBiLmR1ZURhdGUpID8gMSA6ICgoYi5kdWVEYXRlID4gYS5kdWVEYXRlKSA/IC0xIDogMCkpXG4gICAgfVxuXG4gICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuXG59XG5cbmV4cG9ydCB7Y3JlYXRlUHJvamVjdExpc3RlbmVyLCBjcmVhdGVUYXNrTGlzdGVuZXIsIGNoYW5nZURldGFpbCwgZGVsZXRlUHJvamVjdCwgZGVsZXRlVGFzaywgc29ydFRpdGxlLCBzb3J0UHJpb3JpdHksIHNvcnREdWV9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjaGFuZ2VEZXRhaWwgfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRldGFpbHMoKSB7XG5cbiAgICAvL01haW4gUHJvamVjdHMgY29udGFpbmVyXG4gICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKCdkZXRhaWwtYXJlYScpXG5cbiAgICAvL0RldGFpbHMgaGVhZGluZyBhcmVhXG4gICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaGVhZC5jbGFzc0xpc3QuYWRkKCdoZWFkJylcbiAgICBoZWFkLmlubmVyVGV4dCA9IFwiRGV0YWlsc1wiXG4gICAgZGV0YWlscy5hcHBlbmRDaGlsZChoZWFkKVxuXG4gICAgLy9UYXNrIHRpdGxlIGFyZWFcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndGl0bGUnLCAnZGV0YWlsLWNvbnQnKVxuICAgIGNvbnN0IHRpdGxlSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGl0bGVIZWFkLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKVxuICAgIHRpdGxlSGVhZC5pbm5lclRleHQgPSBcIlRpdGxlXCJcbiAgICB0aXRsZS5hcHBlbmRDaGlsZCh0aXRsZUhlYWQpXG4gICAgY29uc3QgdGl0bGVDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIHRpdGxlQ29udGVudC5pZCA9ICdkZXQtdGl0bGUnXG4gICAgdGl0bGVDb250ZW50LnZhbHVlID0gXCJcIlxuICAgIHRpdGxlLmFwcGVuZENoaWxkKHRpdGxlQ29udGVudClcbiAgICBkZXRhaWxzLmFwcGVuZENoaWxkKHRpdGxlKVxuICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGFuZ2VEZXRhaWwoKVxuICAgIH0pXG5cbiAgICAvL1Rhc2sgRGVzY3JpcHRpb25cbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb24nLCAnZGV0YWlsLWNvbnQnKVxuICAgIGNvbnN0IGRlc2NUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZGVzY1RpdGxlLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKVxuICAgIGRlc2NUaXRsZS5pbm5lclRleHQgPSBcIkRlc2NyaXB0aW9uXCJcbiAgICBkZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkZXNjVGl0bGUpXG4gICAgY29uc3QgZGVzY0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpXG4gICAgZGVzY0NvbnRlbnQuaWQgPSAnZGV0LWRlc2MnXG4gICAgZGVzY0NvbnRlbnQuaW5uZXJUZXh0ID0gXCJFbnRlciB0YXNrIGRlc2NyaXB0aW9uIGhlcmVcIlxuICAgIGRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRlc2NDb250ZW50KVxuICAgIGRldGFpbHMuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pXG4gICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoYW5nZURldGFpbCgpXG4gICAgfSlcblxuICAgIC8vUHJpb3JpdHkgYXJlYVxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScsICdkZXRhaWwtY29udCcpXG4gICAgY29uc3QgcHJpb3JpdHlIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBwcmlvcml0eUhlYWQuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpXG4gICAgcHJpb3JpdHlIZWFkLmlubmVyVGV4dCA9IFwiUHJpb3JpdHlcIlxuICAgIHByaW9yaXR5LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZClcbiAgICBjb25zdCBwcmlvcml0eUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgcHJpb3JpdHlDb250ZW50LmlkID0gJ2RldC1wcmlvcml0eSdcbiAgICBwcmlvcml0eS5hcHBlbmRDaGlsZChwcmlvcml0eUNvbnRlbnQpXG4gICAgZGV0YWlscy5hcHBlbmRDaGlsZChwcmlvcml0eSlcbiAgICBwcmlvcml0eS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hhbmdlRGV0YWlsKClcbiAgICB9KVxuXG4gICAgLy9EdWUgZGF0ZSBhcmVhXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdkdWUtZGF0ZScsICdkZXRhaWwtY29udCcpXG4gICAgY29uc3QgZHVlSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZHVlSGVhZC5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJylcbiAgICBkdWVIZWFkLmlubmVyVGV4dCA9ICdEdWUtRGF0ZSdcbiAgICBkdWVEYXRlLmFwcGVuZENoaWxkKGR1ZUhlYWQpXG4gICAgY29uc3QgZHVlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBkdWVDb250ZW50LnR5cGUgPSAnZGF0ZSdcbiAgICBkdWVDb250ZW50LmlkID0gJ2RldC1kdWVEYXRlJ1xuICAgIGR1ZURhdGUuYXBwZW5kQ2hpbGQoZHVlQ29udGVudClcbiAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGFuZ2VEZXRhaWwoKVxuICAgIH0pXG5cblxuICAgIGRldGFpbHMuYXBwZW5kQ2hpbGQoZHVlRGF0ZSkgICAgXG5cbiAgICByZXR1cm4gZGV0YWlsc1xuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==