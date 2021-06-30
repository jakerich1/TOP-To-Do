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
/* harmony import */ var _controllers_DOMcontroller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/DOMcontroller */ "./src/controllers/DOMcontroller.js");



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
        let proj = new _class_project__WEBPACK_IMPORTED_MODULE_0__.project(name)
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
           
            _controllers_DOMcontroller__WEBPACK_IMPORTED_MODULE_1__.default.showProjects()
            _controllers_DOMcontroller__WEBPACK_IMPORTED_MODULE_1__.default.showTasks()

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
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content */ "./src/class/content.js");



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
        _content__WEBPACK_IMPORTED_MODULE_1__.default.setStorage()
        return
    }

    removeTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1)
        _content__WEBPACK_IMPORTED_MODULE_1__.default.setStorage()
        return
    }

    setActive(passedid) {
        activeTask = passedid
        _content__WEBPACK_IMPORTED_MODULE_1__.default.setStorage()
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
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./content */ "./src/class/content.js");


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
        _content__WEBPACK_IMPORTED_MODULE_0__.default.setStorage()
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

    console.log(_class_content__WEBPACK_IMPORTED_MODULE_2__.default)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvY29udGVudC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvdGFzay5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvRE9NY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RPUC1Uby1Eby8uL3NyYy9jb21wb25lbnRzL2RldGFpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUV5QjtBQUMrQjs7QUFFeEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixtREFBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNB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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7O0FDTjJEOztBQUU1Qzs7QUFFZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0VBQVk7QUFDcEIsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0VBQVk7QUFDcEIsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdFQUFZO0FBQ3BCLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3RUFBWTtBQUNwQixLQUFLOzs7QUFHTDs7QUFFQTs7QUFFQSxDIiwiZmlsZSI6ImRldGFpbHMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBwcm9qZWN0XG59IGZyb20gXCIuLi9jbGFzcy9wcm9qZWN0XCJcbmltcG9ydCBET01jb250cm9sbGVyIGZyb20gXCIuLi9jb250cm9sbGVycy9ET01jb250cm9sbGVyXCJcblxuY29uc3QgY29udGVudCA9IChmdW5jdGlvbiBmYWN0b3J5KCkge1xuXG4gICAgbGV0IHByb2plY3RzID0gW11cbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IFwiXCJcbiAgICBsZXQgc29ydFRpdGxlID0gMFxuICAgIGxldCBzb3J0UHJpb3JpdHkgPSAwXG4gICAgbGV0IHNvcnREdWUgPSAwXG4gICAgY29uc3QgbXlTdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZVxuXG4gICAgZnVuY3Rpb24gcmV0dXJuUHJvamVjdHMoKSB7XG4gICAgICAgIHJldHVybiBwcm9qZWN0c1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEFjdGl2ZShpZCkge1xuICAgICAgICBhY3RpdmVQcm9qZWN0ID0gaWRcbiAgICAgICAgY29udGVudC5zZXRTdG9yYWdlKClcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWN0aXZlSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcHJvamVjdHMubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5pZDtcbiAgICAgICAgfSkuaW5kZXhPZihhY3RpdmVQcm9qZWN0KVxuICAgICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0FjdGl2ZShpZCkge1xuICAgICAgICBpZiAoaWQgPT0gYWN0aXZlUHJvamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KG5hbWUpIHtcbiAgICAgICAgbGV0IHByb2ogPSBuZXcgcHJvamVjdChuYW1lKVxuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2opXG4gICAgICAgIGlmIChwcm9qZWN0cy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgc2V0QWN0aXZlKHByb2ouaWQpXG4gICAgICAgIH1cbiAgICAgICAgc2V0U3RvcmFnZSgpXG4gICAgICAgIHJldHVybiAxXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0KSB7XG4gICAgICAgIHByb2plY3RzLnNwbGljZShwcm9qZWN0cy5pbmRleE9mKHByb2plY3QpLCAxKVxuICAgICAgICAgICAgc2V0U3RvcmFnZSgpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFN0b3JhZ2UoKSB7XG5cbiAgICAgICAgbXlTdG9yYWdlLnNldEl0ZW0oJ2FjdGl2ZScsIGFjdGl2ZVByb2plY3QpXG5cbiAgICAgICAgY29uc3QgdGVtcFByb2plY3RzID0gSlNPTi5zdHJpbmdpZnkoY29udGVudC5wcm9qZWN0cylcbiAgICAgICAgbXlTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgdGVtcFByb2plY3RzKVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3RvcmFnZSgpIHtcblxuICAgICAgICBjb25zdCBzdG9yZWRBY3RpdmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWN0aXZlJylcblxuICAgICAgICBpZiAoc3RvcmVkQWN0aXZlKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0b3JlZFByb2plY3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJylcbiAgICAgICAgICAgIGxldCBzUHJvalBhcnNlZCA9IEpTT04ucGFyc2Uoc3RvcmVkUHJvamVjdHMpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNQcm9qUGFyc2VkLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb250ZW50LmFkZFByb2plY3QoZWxlbWVudC5uYW1lKVxuICAgICAgICAgICAgICAgIGxldCBsYXN0S2V5ID0gY29udGVudC5wcm9qZWN0cy5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RQcm9qZWN0ID0gY29udGVudC5wcm9qZWN0c1tsYXN0S2V5XVxuXG4gICAgICAgICAgICAgICAgZWxlbWVudC50YXNrcy5mb3JFYWNoKHRhc2tMb2NhbCA9PiB7ICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsYXN0UHJvamVjdC5hZGRUYXNrKHRhc2tMb2NhbC50aXRsZSwgdGFza0xvY2FsLmRlc2NyaXB0aW9uLCB0YXNrTG9jYWwucHJpb3JpdHksIHRhc2tMb2NhbC5kdWVEYXRlKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgIFxuICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93UHJvamVjdHMoKVxuICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgc29ydFRpdGxlOiBzb3J0VGl0bGUsXG4gICAgICAgIHNvcnRQcmlvcml0eTogc29ydFByaW9yaXR5LFxuICAgICAgICBzb3J0RHVlOiBzb3J0RHVlLFxuICAgICAgICBhY3RpdmVQcm9qZWN0OiBhY3RpdmVQcm9qZWN0LFxuICAgICAgICBwcm9qZWN0czogcHJvamVjdHMsXG4gICAgICAgIHJldHVyblByb2plY3RzOiByZXR1cm5Qcm9qZWN0cyxcbiAgICAgICAgYWRkUHJvamVjdDogYWRkUHJvamVjdCxcbiAgICAgICAgcmVtb3ZlUHJvamVjdDogcmVtb3ZlUHJvamVjdCxcbiAgICAgICAgc2V0QWN0aXZlOiBzZXRBY3RpdmUsXG4gICAgICAgIHJlbW92ZVByb2plY3Q6IHJlbW92ZVByb2plY3QsXG4gICAgICAgIHNldEFjdGl2ZTogc2V0QWN0aXZlLFxuICAgICAgICBjaGVja0FjdGl2ZTogY2hlY2tBY3RpdmUsXG4gICAgICAgIGFjdGl2ZUluZGV4OiBhY3RpdmVJbmRleCxcbiAgICAgICAgc2V0U3RvcmFnZTogc2V0U3RvcmFnZSxcbiAgICAgICAgZ2V0U3RvcmFnZTogZ2V0U3RvcmFnZVxuXG4gICAgfTtcblxufSgpKVxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50IiwiaW1wb3J0IHsgdGFzayB9IGZyb20gJy4vdGFzayc7XG5pbXBvcnQgY29udGVudCBmcm9tIFwiLi9jb250ZW50XCJcblxuLy9Qcm9qZWN0IGNsYXNzXG5leHBvcnQgY2xhc3MgcHJvamVjdCB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdXG4gICAgICAgIHRoaXMuaWQgPSBcIlwiXG4gICAgICAgIHRoaXMuYWN0aXZlVGFzayA9IFwiXCJcblxuICAgICAgICB0aGlzLmluaXRJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBzNCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pZCA9IHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0SWQoKVxuXG4gICAgfVxuXG4gICAgLy9NZXRob2RzXG4gICAgYWRkVGFzayhuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpIHtcbiAgICAgICAgbGV0IG50YXNrID0gbmV3IHRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKVxuICAgICAgICB0aGlzLnRhc2tzLnB1c2gobnRhc2spXG4gICAgICAgIGNvbnRlbnQuc2V0U3RvcmFnZSgpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJlbW92ZVRhc2sodGFzaykge1xuICAgICAgICB0aGlzLnRhc2tzLnNwbGljZSh0aGlzLnRhc2tzLmluZGV4T2YodGFzayksIDEpXG4gICAgICAgIGNvbnRlbnQuc2V0U3RvcmFnZSgpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNldEFjdGl2ZShwYXNzZWRpZCkge1xuICAgICAgICBhY3RpdmVUYXNrID0gcGFzc2VkaWRcbiAgICAgICAgY29udGVudC5zZXRTdG9yYWdlKClcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY2hlY2tBY3RpdmUocGFzc2VkaWQpIHtcbiAgICAgICAgaWYgKHBhc3NlZGlkID09IGFjdGl2ZVRhc2spIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgYWN0aXZlSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy50YXNrcy5tYXAoZnVuY3Rpb24oZSkgeyByZXR1cm4gZS5pZDsgfSkuaW5kZXhPZih0aGlzLmFjdGl2ZVRhc2spXG4gICAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxufSIsImltcG9ydCBjb250ZW50IGZyb20gXCIuL2NvbnRlbnRcIlxuXG5leHBvcnQgY2xhc3MgdGFzayB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKXtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZVxuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlXG4gICAgICAgIHRoaXMuaWQgPSBcIlwiXG5cbiAgICAgICAgdGhpcy5pbml0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgczQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaWQgPSBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdElkKClcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy9NZXRob2RzXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9ICF0aGlzLmNvbXBsZXRlZFxuICAgICAgICBjb250ZW50LnNldFN0b3JhZ2UoKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBkYXlzTGVmdCgpIHtcblxuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKClcbiAgICAgICAgY29uc3QgZGlmZiA9IHRoaXMuZHVlRGF0ZS5nZXRUaW1lKCkgLSB0b2RheS5nZXRUaW1lKClcbiAgICAgICAgY29uc3QgZGlmZkRheXMgPSBkaWZmIC8gKDEwMDAgKiAzNjAwICogMjQpXG5cbiAgICAgICAgcmV0dXJuIGRpZmZEYXlzXG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgY29udGVudCBmcm9tIFwiLi4vY2xhc3MvY29udGVudFwiXG5cbmNvbnN0IERPTWNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gZmFjdG9yeSgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgc2V0UHJvamVjdFRpdGxlOiBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lJylcbiAgICAgICAgICAgIHByb2plY3RUaXRsZS5pbm5lclRleHQgPSBuYW1lXG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93UHJvamVjdHM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0JylcbiAgICAgICAgICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBjb250ZW50LnJldHVyblByb2plY3RzKClcblxuICAgICAgICAgICAgcHJvamVjdHNBcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICAgICAgbGkuaW5uZXJUZXh0ID0gZWxlbWVudC5uYW1lXG5cbiAgICAgICAgICAgICAgICBpZiAoY29udGVudC5jaGVja0FjdGl2ZShlbGVtZW50LmlkKSkge1xuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNldFByb2plY3RUaXRsZShlbGVtZW50Lm5hbWUpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuc2V0QWN0aXZlKGVsZW1lbnQuaWQpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Byb2plY3RzKClcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNldFByb2plY3RUaXRsZShlbGVtZW50Lm5hbWUpXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGxpKVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93VGFza3M6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3QgdGFza0JvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1ib2R5JylcbiAgICAgICAgICAgIHRhc2tCb2R5LmlubmVySFRNTCA9IFwiXCJcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdE9iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb2plY3RPYmogIT09IFwidW5kZWZpbmVkXCIpIHtcblxuICAgICAgICAgICAgICAgIGxldCB0YXNrQXJyYXkgPSBwcm9qZWN0T2JqLnRhc2tzXG5cbiAgICAgICAgICAgICAgICBpZiAodGFza0FycmF5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICB0YXNrQXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCA9PSBwcm9qZWN0T2JqLmFjdGl2ZVRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuaW5uZXJIVE1MID0gYDx0ZCBzdHlsZT1cImJvcmRlci10b3A6IDFweCBzb2xpZCAjRTRGRjc2OyBib3JkZXItbGVmdDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTRGRjc2O1wiID4ke2VsZW1lbnQudGl0bGV9PC90ZD48dGQgc3R5bGU9XCJib3JkZXItdG9wOiAxcHggc29saWQgI0U0RkY3NjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFNEZGNzY7XCI+JHtlbGVtZW50LnByaW9yaXR5fTwvdGQ+PHRkIHN0eWxlPVwiYm9yZGVyLXRvcDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTRGRjc2O1wiPiR7ZWxlbWVudC5kdWVEYXRlfTwvdGQ+YFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuaW5uZXJIVE1MID0gYDx0ZD4ke2VsZW1lbnQudGl0bGV9PC90ZD48dGQ+JHtlbGVtZW50LnByaW9yaXR5fTwvdGQ+PHRkPiR7ZWxlbWVudC5kdWVEYXRlfTwvdGQ+YFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHRkYClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94SW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hJbm5lci5jbGFzc0xpc3QuYWRkKGBjaGVja2JveGApXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5hcHBlbmRDaGlsZChjaGVja2JveElubmVyKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCA9PSBwcm9qZWN0T2JqLmFjdGl2ZVRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5zdHlsZS5ib3JkZXJUb3AgPSAnMXB4IHNvbGlkICNFNEZGNzYnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guc3R5bGUuYm9yZGVyUmlnaHQgPSAnMXB4IHNvbGlkICNFNEZGNzYnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guc3R5bGUuYm9yZGVyQm90dG9tID0gJzFweCBzb2xpZCAjRTRGRjc2J1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveElubmVyLmlubmVySFRNTCA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImljb24gaWNvbi10YWJsZXIgaWNvbi10YWJsZXItY2hlY2tcIiB3aWR0aD1cIjQ0XCIgaGVpZ2h0PVwiNDRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgZmlsbD1cIm5vbmVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48cGF0aCBkPVwiTTUgMTJsNSA1bDEwIC0xMFwiIC8+PC9zdmc+PC9kaXY+PC90ZD5gXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudG9nZ2xlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2tJRCA9IGVsZW1lbnQuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0uYWN0aXZlVGFzayA9IHRhc2tJRFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dEZXRhaWxzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjaGVja2JveClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tCb2R5LmFwcGVuZENoaWxkKHJvdylcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd0RldGFpbHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vRE9NIGVsZW1lbnQgZGVjbGFyYXRpb25zXG5cbiAgICAgICAgICAgIGxldCB0YXNrT2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzW2NvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS5hY3RpdmVJbmRleCgpXVxuXG4gICAgICAgICAgICBpZiAoIXRhc2tPYmopIHtcbiAgICAgICAgICAgICAgICB0YXNrT2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzWzBdXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGRldFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC10aXRsZScpXG4gICAgICAgICAgICBjb25zdCBkZXREZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZGVzYycpXG4gICAgICAgICAgICBjb25zdCBkZXRQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtcHJpb3JpdHknKVxuICAgICAgICAgICAgY29uc3QgZGV0RHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZHVlRGF0ZScpXG5cbiAgICAgICAgICAgIGRldFRpdGxlLnZhbHVlID0gdGFza09iai50aXRsZVxuICAgICAgICAgICAgZGV0RGVzY3JpcHRpb24udmFsdWUgPSB0YXNrT2JqLmRlc2NyaXB0aW9uXG4gICAgICAgICAgICBkZXRQcmlvcml0eS52YWx1ZSA9IHRhc2tPYmoucHJpb3JpdHlcbiAgICAgICAgICAgIGRldER1ZURhdGUudmFsdWUgPSB0YXNrT2JqLmR1ZURhdGVcblxuICAgICAgICB9LFxuXG4gICAgICAgIGJsYW5rRGV0YWlsczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBkZXRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtdGl0bGUnKVxuICAgICAgICAgICAgY29uc3QgZGV0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWRlc2MnKVxuICAgICAgICAgICAgY29uc3QgZGV0UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXByaW9yaXR5JylcbiAgICAgICAgICAgIGNvbnN0IGRldER1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWR1ZURhdGUnKVxuXG4gICAgICAgICAgICBkZXRUaXRsZS52YWx1ZSA9ICcnXG4gICAgICAgICAgICBkZXREZXNjcmlwdGlvbi52YWx1ZSA9ICcnXG4gICAgICAgICAgICBkZXRQcmlvcml0eS52YWx1ZSA9ICcnXG4gICAgICAgICAgICBkZXREdWVEYXRlLnZhbHVlID0gJydcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0oKSlcblxuZXhwb3J0IGRlZmF1bHQgRE9NY29udHJvbGxlciIsImltcG9ydCB7IHByb2plY3QgfSBmcm9tIFwiLi4vY2xhc3MvcHJvamVjdFwiXG5pbXBvcnQgeyB0YXNrIH0gZnJvbSBcIi4uL2NsYXNzL3Rhc2tcIlxuaW1wb3J0IGNvbnRlbnQgZnJvbSBcIi4uL2NsYXNzL2NvbnRlbnRcIlxuaW1wb3J0IERPTWNvbnRyb2xsZXIgZnJvbSBcIi4vRE9NY29udHJvbGxlclwiXG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RMaXN0ZW5lcihuYW1lKXtcblxuICAgIGNvbnRlbnQuYWRkUHJvamVjdChuYW1lKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Byb2plY3RzKClcbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFza0xpc3RlbmVyKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSl7XG5cbiAgICBjb25zb2xlLmxvZyhjb250ZW50KVxuXG4gICAgY29uc3QgcHJvamVjdE9iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXVxuXG5cblxuICAgIHByb2plY3RPYmouYWRkVGFzayhuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpXG4gICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuXG59XG5cbmZ1bmN0aW9uIGNoYW5nZURldGFpbCgpIHtcblxuICAgIGNvbnN0IHRhc2tPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0udGFza3NbY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLmFjdGl2ZUluZGV4KCldXG5cbiAgICB0YXNrT2JqLnRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC10aXRsZScpLnZhbHVlXG4gICAgdGFza09iai5kZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZGVzYycpLnZhbHVlXG4gICAgdGFza09iai5wcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtcHJpb3JpdHknKS52YWx1ZVxuICAgIHRhc2tPYmouZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZHVlRGF0ZScpLnZhbHVlXG5cbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgRE9NY29udHJvbGxlci5zaG93RGV0YWlscygpXG5cbiAgICAvL2NvbnNvbGUubG9nKHRhc2tPYmopXG5cbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdCgpIHtcbiAgICBcbiAgICBpZiAoY29udGVudC5wcm9qZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwcm9qZWN0T2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldXG4gICAgICAgIGNvbnRlbnQucmVtb3ZlUHJvamVjdChwcm9qZWN0T2JqKVxuICAgICAgICBET01jb250cm9sbGVyLnNob3dQcm9qZWN0cygpXG4gICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICAgICAgRE9NY29udHJvbGxlci5ibGFua0RldGFpbHMoKVxuXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2soKSB7XG5cbiAgICBjb25zdCBwcm9qZWN0T2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldXG4gICAgY29uc3QgdGFza09iaiA9IHByb2plY3RPYmoudGFza3NbcHJvamVjdE9iai5hY3RpdmVJbmRleCgpXVxuXG4gICAgcHJvamVjdE9iai5yZW1vdmVUYXNrKHRhc2tPYmopXG4gICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgIERPTWNvbnRyb2xsZXIuYmxhbmtEZXRhaWxzKClcblxufVxuXG5mdW5jdGlvbiBzb3J0VGl0bGUoKSB7XG5cbiAgICBsZXQgdGFza0FycmF5ID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzXG4gICAgY29udGVudC5zb3J0VGl0bGUgPSAhY29udGVudC5zb3J0VGl0bGVcblxuICAgIGlmIChjb250ZW50LnNvcnRUaXRsZSkgeyBcbiAgICAgICAgdGFza0FycmF5ID0gdGFza0FycmF5LnNvcnQoKGEsYikgPT4gKGEudGl0bGUgPiBiLnRpdGxlKSA/IC0xIDogKChiLnRpdGxlID4gYS50aXRsZSkgPyAxIDogMCkpXG4gICAgfWVsc2V7XG4gICAgICAgIHRhc2tBcnJheSA9IHRhc2tBcnJheS5zb3J0KChhLGIpID0+IChhLnRpdGxlID4gYi50aXRsZSkgPyAxIDogKChiLnRpdGxlID4gYS50aXRsZSkgPyAtMSA6IDApKVxuICAgIH1cblxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcblxufVxuXG5mdW5jdGlvbiBzb3J0UHJpb3JpdHkoKSB7XG5cbiAgICBsZXQgdGFza0FycmF5ID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzXG4gICAgY29udGVudC5zb3J0UHJpb3JpdHkgPSAhY29udGVudC5zb3J0UHJpb3JpdHlcblxuICAgIGlmIChjb250ZW50LnNvcnRQcmlvcml0eSkgeyBcbiAgICAgICAgdGFza0FycmF5ID0gdGFza0FycmF5LnNvcnQoKGEsYikgPT4gKGEucHJpb3JpdHkgPiBiLnByaW9yaXR5KSA/IC0xIDogKChiLnByaW9yaXR5ID4gYS5wcmlvcml0eSkgPyAxIDogMCkpXG4gICAgfWVsc2V7XG4gICAgICAgIHRhc2tBcnJheSA9IHRhc2tBcnJheS5zb3J0KChhLGIpID0+IChhLnByaW9yaXR5ID4gYi5wcmlvcml0eSkgPyAxIDogKChiLnByaW9yaXR5ID4gYS5wcmlvcml0eSkgPyAtMSA6IDApKVxuICAgIH1cblxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICBcbn1cblxuZnVuY3Rpb24gc29ydER1ZSgpIHtcbiAgICBcbiAgICBsZXQgdGFza0FycmF5ID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzXG4gICAgY29udGVudC5zb3J0RHVlID0gIWNvbnRlbnQuc29ydER1ZVxuXG4gICAgaWYgKGNvbnRlbnQuc29ydER1ZSkgeyBcbiAgICAgICAgdGFza0FycmF5ID0gdGFza0FycmF5LnNvcnQoKGEsYikgPT4gKGEuZHVlRGF0ZSA+IGIuZHVlRGF0ZSkgPyAtMSA6ICgoYi5kdWVEYXRlID4gYS5kdWVEYXRlKSA/IDEgOiAwKSlcbiAgICB9ZWxzZXtcbiAgICAgICAgdGFza0FycmF5ID0gdGFza0FycmF5LnNvcnQoKGEsYikgPT4gKGEuZHVlRGF0ZSA+IGIuZHVlRGF0ZSkgPyAxIDogKChiLmR1ZURhdGUgPiBhLmR1ZURhdGUpID8gLTEgOiAwKSlcbiAgICB9XG5cbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbn1cblxuZXhwb3J0IHtjcmVhdGVQcm9qZWN0TGlzdGVuZXIsIGNyZWF0ZVRhc2tMaXN0ZW5lciwgY2hhbmdlRGV0YWlsLCBkZWxldGVQcm9qZWN0LCBkZWxldGVUYXNrLCBzb3J0VGl0bGUsIHNvcnRQcmlvcml0eSwgc29ydER1ZX0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNoYW5nZURldGFpbCB9IGZyb20gXCIuLi9jb250cm9sbGVycy9saXN0ZW5lcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGV0YWlscygpIHtcblxuICAgIC8vTWFpbiBQcm9qZWN0cyBjb250YWluZXJcbiAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoJ2RldGFpbC1hcmVhJylcblxuICAgIC8vRGV0YWlscyBoZWFkaW5nIGFyZWFcbiAgICBjb25zdCBoZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBoZWFkLmNsYXNzTGlzdC5hZGQoJ2hlYWQnKVxuICAgIGhlYWQuaW5uZXJUZXh0ID0gXCJEZXRhaWxzXCJcbiAgICBkZXRhaWxzLmFwcGVuZENoaWxkKGhlYWQpXG5cbiAgICAvL1Rhc2sgdGl0bGUgYXJlYVxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd0aXRsZScsICdkZXRhaWwtY29udCcpXG4gICAgY29uc3QgdGl0bGVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0aXRsZUhlYWQuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpXG4gICAgdGl0bGVIZWFkLmlubmVyVGV4dCA9IFwiVGl0bGVcIlxuICAgIHRpdGxlLmFwcGVuZENoaWxkKHRpdGxlSGVhZClcbiAgICBjb25zdCB0aXRsZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgdGl0bGVDb250ZW50LmlkID0gJ2RldC10aXRsZSdcbiAgICB0aXRsZUNvbnRlbnQudmFsdWUgPSBcIlwiXG4gICAgdGl0bGUuYXBwZW5kQ2hpbGQodGl0bGVDb250ZW50KVxuICAgIGRldGFpbHMuYXBwZW5kQ2hpbGQodGl0bGUpXG4gICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoYW5nZURldGFpbCgpXG4gICAgfSlcblxuICAgIC8vVGFzayBEZXNjcmlwdGlvblxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdkZXNjcmlwdGlvbicsICdkZXRhaWwtY29udCcpXG4gICAgY29uc3QgZGVzY1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkZXNjVGl0bGUuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpXG4gICAgZGVzY1RpdGxlLmlubmVyVGV4dCA9IFwiRGVzY3JpcHRpb25cIlxuICAgIGRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRlc2NUaXRsZSlcbiAgICBjb25zdCBkZXNjQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJylcbiAgICBkZXNjQ29udGVudC5pZCA9ICdkZXQtZGVzYydcbiAgICBkZXNjQ29udGVudC5pbm5lclRleHQgPSBcIkVudGVyIHRhc2sgZGVzY3JpcHRpb24gaGVyZVwiXG4gICAgZGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZGVzY0NvbnRlbnQpXG4gICAgZGV0YWlscy5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbilcbiAgICBkZXNjcmlwdGlvbi5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hhbmdlRGV0YWlsKClcbiAgICB9KVxuXG4gICAgLy9Qcmlvcml0eSBhcmVhXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3ByaW9yaXR5JywgJ2RldGFpbC1jb250JylcbiAgICBjb25zdCBwcmlvcml0eUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHByaW9yaXR5SGVhZC5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJylcbiAgICBwcmlvcml0eUhlYWQuaW5uZXJUZXh0ID0gXCJQcmlvcml0eVwiXG4gICAgcHJpb3JpdHkuYXBwZW5kQ2hpbGQocHJpb3JpdHlIZWFkKVxuICAgIGNvbnN0IHByaW9yaXR5Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBwcmlvcml0eUNvbnRlbnQuaWQgPSAnZGV0LXByaW9yaXR5J1xuICAgIHByaW9yaXR5LmFwcGVuZENoaWxkKHByaW9yaXR5Q29udGVudClcbiAgICBkZXRhaWxzLmFwcGVuZENoaWxkKHByaW9yaXR5KVxuICAgIHByaW9yaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGFuZ2VEZXRhaWwoKVxuICAgIH0pXG5cbiAgICAvL0R1ZSBkYXRlIGFyZWFcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2R1ZS1kYXRlJywgJ2RldGFpbC1jb250JylcbiAgICBjb25zdCBkdWVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkdWVIZWFkLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKVxuICAgIGR1ZUhlYWQuaW5uZXJUZXh0ID0gJ0R1ZS1EYXRlJ1xuICAgIGR1ZURhdGUuYXBwZW5kQ2hpbGQoZHVlSGVhZClcbiAgICBjb25zdCBkdWVDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIGR1ZUNvbnRlbnQudHlwZSA9ICdkYXRlJ1xuICAgIGR1ZUNvbnRlbnQuaWQgPSAnZGV0LWR1ZURhdGUnXG4gICAgZHVlRGF0ZS5hcHBlbmRDaGlsZChkdWVDb250ZW50KVxuICAgIGR1ZURhdGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoYW5nZURldGFpbCgpXG4gICAgfSlcblxuXG4gICAgZGV0YWlscy5hcHBlbmRDaGlsZChkdWVEYXRlKSAgICBcblxuICAgIHJldHVybiBkZXRhaWxzXG5cbn0iXSwic291cmNlUm9vdCI6IiJ9