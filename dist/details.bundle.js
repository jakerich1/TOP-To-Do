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
        tasks.splice(tasks.indexOf(task), 1)
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
/* harmony export */   "deleteProject": () => (/* binding */ deleteProject)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvY29udGVudC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvdGFzay5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvRE9NY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RPUC1Uby1Eby8uL3NyYy9jb21wb25lbnRzL2RldGFpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTBDOztBQUUxQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRCxhQUFhLEVBQUU7QUFDL0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsbURBQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRCxpRUFBZSxPOzs7Ozs7Ozs7Ozs7Ozs7QUN6RGU7QUFDOUI7QUFDTzs7QUFF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Ozs7Ozs7O1VDbkRBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7O0FDTjJEOztBQUU1Qzs7QUFFZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0VBQVk7QUFDcEIsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0VBQVk7QUFDcEIsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdFQUFZO0FBQ3BCLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3RUFBWTtBQUNwQixLQUFLOzs7QUFHTDs7QUFFQTs7QUFFQSxDIiwiZmlsZSI6ImRldGFpbHMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvamVjdCB9IGZyb20gXCIuLi9jbGFzcy9wcm9qZWN0XCJcblxuY29uc3QgY29udGVudCA9IChmdW5jdGlvbiBmYWN0b3J5KCkge1xuXG4gICAgbGV0IHByb2plY3RzID0gW11cbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IFwiXCJcblxuICAgIGZ1bmN0aW9uIHJldHVyblByb2plY3RzKCkge1xuICAgICAgICByZXR1cm4gcHJvamVjdHNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRBY3RpdmUoaWQpIHtcbiAgICAgICAgYWN0aXZlUHJvamVjdCA9IGlkXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFjdGl2ZUluZGV4KCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHByb2plY3RzLm1hcChmdW5jdGlvbihlKSB7IHJldHVybiBlLmlkOyB9KS5pbmRleE9mKGFjdGl2ZVByb2plY3QpXG4gICAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQWN0aXZlKGlkKSB7XG4gICAgICAgIGlmIChpZCA9PSBhY3RpdmVQcm9qZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3QobmFtZSkge1xuICAgICAgICBsZXQgcHJvaiA9IG5ldyBwcm9qZWN0KG5hbWUpXG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvailcbiAgICAgICAgaWYgKHByb2plY3RzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBzZXRBY3RpdmUocHJvai5pZClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVByb2plY3QocHJvamVjdCkge1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UocHJvamVjdHMuaW5kZXhPZihwcm9qZWN0KSwgMSlcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBhY3RpdmVQcm9qZWN0OiBhY3RpdmVQcm9qZWN0LFxuICAgICAgICBwcm9qZWN0czogcHJvamVjdHMsXG4gICAgICAgIHJldHVyblByb2plY3RzOiByZXR1cm5Qcm9qZWN0cyxcbiAgICAgICAgYWRkUHJvamVjdDogYWRkUHJvamVjdCxcbiAgICAgICAgcmVtb3ZlUHJvamVjdDogcmVtb3ZlUHJvamVjdCxcbiAgICAgICAgc2V0QWN0aXZlOiBzZXRBY3RpdmUsXG4gICAgICAgIGNoZWNrQWN0aXZlOiBjaGVja0FjdGl2ZSxcbiAgICAgICAgYWN0aXZlSW5kZXg6IGFjdGl2ZUluZGV4XG5cbiAgICB9O1xuXG59KCkpXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQiLCJpbXBvcnQgeyB0YXNrIH0gZnJvbSAnLi90YXNrJztcbi8vUHJvamVjdCBjbGFzc1xuZXhwb3J0IGNsYXNzIHByb2plY3Qge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMudGFza3MgPSBbXVxuICAgICAgICB0aGlzLmlkID0gXCJcIlxuICAgICAgICB0aGlzLmFjdGl2ZVRhc2sgPSBcIlwiXG5cbiAgICAgICAgdGhpcy5pbml0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgczQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaWQgPSBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdElkKClcblxuICAgIH1cblxuICAgIC8vTWV0aG9kc1xuICAgIGFkZFRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKSB7XG4gICAgICAgIGxldCBudGFzayA9IG5ldyB0YXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSlcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKG50YXNrKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgdGFza3Muc3BsaWNlKHRhc2tzLmluZGV4T2YodGFzayksIDEpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNldEFjdGl2ZShwYXNzZWRpZCkge1xuICAgICAgICBhY3RpdmVUYXNrID0gcGFzc2VkaWRcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY2hlY2tBY3RpdmUocGFzc2VkaWQpIHtcbiAgICAgICAgaWYgKHBhc3NlZGlkID09IGFjdGl2ZVRhc2spIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgYWN0aXZlSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy50YXNrcy5tYXAoZnVuY3Rpb24oZSkgeyByZXR1cm4gZS5pZDsgfSkuaW5kZXhPZih0aGlzLmFjdGl2ZVRhc2spXG4gICAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyB0YXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpe1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eVxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlXG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2VcbiAgICAgICAgdGhpcy5pZCA9IFwiXCJcblxuICAgICAgICB0aGlzLmluaXRJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBzNCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pZCA9IHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0SWQoKVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvL01ldGhvZHNcbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGRheXNMZWZ0KCkge1xuXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKVxuICAgICAgICBjb25zdCBkaWZmID0gdGhpcy5kdWVEYXRlLmdldFRpbWUoKSAtIHRvZGF5LmdldFRpbWUoKVxuICAgICAgICBjb25zdCBkaWZmRGF5cyA9IGRpZmYgLyAoMTAwMCAqIDM2MDAgKiAyNClcblxuICAgICAgICByZXR1cm4gZGlmZkRheXNcblxuICAgIH1cblxufSIsImltcG9ydCBjb250ZW50IGZyb20gXCIuLi9jbGFzcy9jb250ZW50XCJcblxuY29uc3QgRE9NY29udHJvbGxlciA9IChmdW5jdGlvbiBmYWN0b3J5KCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBzZXRQcm9qZWN0VGl0bGU6IGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUnKVxuICAgICAgICAgICAgcHJvamVjdFRpdGxlLmlubmVyVGV4dCA9IG5hbWVcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dQcm9qZWN0czogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKVxuICAgICAgICAgICAgcHJvamVjdExpc3QuaW5uZXJIVE1MID0gXCJcIlxuICAgICAgICAgICAgY29uc3QgcHJvamVjdHNBcnJheSA9IGNvbnRlbnQucmV0dXJuUHJvamVjdHMoKVxuXG4gICAgICAgICAgICBwcm9qZWN0c0FycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgICAgICBsaS5pbm5lclRleHQgPSBlbGVtZW50Lm5hbWVcblxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50LmNoZWNrQWN0aXZlKGVsZW1lbnQuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2V0UHJvamVjdFRpdGxlKGVsZW1lbnQubmFtZSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5zZXRBY3RpdmUoZWxlbWVudC5pZClcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93UHJvamVjdHMoKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2V0UHJvamVjdFRpdGxlKGVsZW1lbnQubmFtZSlcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQobGkpXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dUYXNrczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCB0YXNrQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWJvZHknKVxuICAgICAgICAgICAgdGFza0JvZHkuaW5uZXJIVE1MID0gXCJcIlxuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0T2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvamVjdE9iaiAhPT0gXCJ1bmRlZmluZWRcIikge1xuXG4gICAgICAgICAgICAgICAgbGV0IHRhc2tBcnJheSA9IHByb2plY3RPYmoudGFza3NcbiAgICAgICAgICAgICAgICBpZiAodGFza0FycmF5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICB0YXNrQXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCA9PSBwcm9qZWN0T2JqLmFjdGl2ZVRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuaW5uZXJIVE1MID0gYDx0ZCBzdHlsZT1cImJvcmRlci10b3A6IDFweCBzb2xpZCAjRTRGRjc2OyBib3JkZXItbGVmdDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTRGRjc2O1wiID4ke2VsZW1lbnQudGl0bGV9PC90ZD48dGQgc3R5bGU9XCJib3JkZXItdG9wOiAxcHggc29saWQgI0U0RkY3NjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFNEZGNzY7XCI+JHtlbGVtZW50LnByaW9yaXR5fTwvdGQ+PHRkIHN0eWxlPVwiYm9yZGVyLXRvcDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTRGRjc2O1wiPiR7ZWxlbWVudC5kdWVEYXRlfTwvdGQ+YFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuaW5uZXJIVE1MID0gYDx0ZD4ke2VsZW1lbnQudGl0bGV9PC90ZD48dGQ+JHtlbGVtZW50LnByaW9yaXR5fTwvdGQ+PHRkPiR7ZWxlbWVudC5kdWVEYXRlfTwvdGQ+YFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHRkYClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94SW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hJbm5lci5jbGFzc0xpc3QuYWRkKGBjaGVja2JveGApXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5hcHBlbmRDaGlsZChjaGVja2JveElubmVyKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCA9PSBwcm9qZWN0T2JqLmFjdGl2ZVRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5zdHlsZS5ib3JkZXJUb3AgPSAnMXB4IHNvbGlkICNFNEZGNzYnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guc3R5bGUuYm9yZGVyUmlnaHQgPSAnMXB4IHNvbGlkICNFNEZGNzYnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guc3R5bGUuYm9yZGVyQm90dG9tID0gJzFweCBzb2xpZCAjRTRGRjc2J1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveElubmVyLmlubmVySFRNTCA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImljb24gaWNvbi10YWJsZXIgaWNvbi10YWJsZXItY2hlY2tcIiB3aWR0aD1cIjQ0XCIgaGVpZ2h0PVwiNDRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgZmlsbD1cIm5vbmVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48cGF0aCBkPVwiTTUgMTJsNSA1bDEwIC0xMFwiIC8+PC9zdmc+PC9kaXY+PC90ZD5gXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudG9nZ2xlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2tJRCA9IGVsZW1lbnQuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0uYWN0aXZlVGFzayA9IHRhc2tJRFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dEZXRhaWxzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjaGVja2JveClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tCb2R5LmFwcGVuZENoaWxkKHJvdylcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd0RldGFpbHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vRE9NIGVsZW1lbnQgZGVjbGFyYXRpb25zXG5cbiAgICAgICAgICAgIGxldCB0YXNrT2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzW2NvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS5hY3RpdmVJbmRleCgpXVxuXG4gICAgICAgICAgICBpZiAoIXRhc2tPYmopIHtcbiAgICAgICAgICAgICAgICB0YXNrT2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzWzBdXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGRldFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC10aXRsZScpXG4gICAgICAgICAgICBjb25zdCBkZXREZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZGVzYycpXG4gICAgICAgICAgICBjb25zdCBkZXRQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtcHJpb3JpdHknKVxuICAgICAgICAgICAgY29uc3QgZGV0RHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZHVlRGF0ZScpXG5cbiAgICAgICAgICAgIGRldFRpdGxlLnZhbHVlID0gdGFza09iai50aXRsZVxuICAgICAgICAgICAgZGV0RGVzY3JpcHRpb24udmFsdWUgPSB0YXNrT2JqLmRlc2NyaXB0aW9uXG4gICAgICAgICAgICBkZXRQcmlvcml0eS52YWx1ZSA9IHRhc2tPYmoucHJpb3JpdHlcbiAgICAgICAgICAgIGRldER1ZURhdGUudmFsdWUgPSB0YXNrT2JqLmR1ZURhdGVcblxuICAgICAgICB9LFxuXG4gICAgICAgIGJsYW5rRGV0YWlsczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBkZXRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtdGl0bGUnKVxuICAgICAgICAgICAgY29uc3QgZGV0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWRlc2MnKVxuICAgICAgICAgICAgY29uc3QgZGV0UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXByaW9yaXR5JylcbiAgICAgICAgICAgIGNvbnN0IGRldER1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWR1ZURhdGUnKVxuXG4gICAgICAgICAgICBkZXRUaXRsZS52YWx1ZSA9ICcnXG4gICAgICAgICAgICBkZXREZXNjcmlwdGlvbi52YWx1ZSA9ICcnXG4gICAgICAgICAgICBkZXRQcmlvcml0eS52YWx1ZSA9ICcnXG4gICAgICAgICAgICBkZXREdWVEYXRlLnZhbHVlID0gJydcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0oKSlcblxuZXhwb3J0IGRlZmF1bHQgRE9NY29udHJvbGxlciIsImltcG9ydCB7IHByb2plY3QgfSBmcm9tIFwiLi4vY2xhc3MvcHJvamVjdFwiXG5pbXBvcnQgeyB0YXNrIH0gZnJvbSBcIi4uL2NsYXNzL3Rhc2tcIlxuaW1wb3J0IGNvbnRlbnQgZnJvbSBcIi4uL2NsYXNzL2NvbnRlbnRcIlxuaW1wb3J0IERPTWNvbnRyb2xsZXIgZnJvbSBcIi4vRE9NY29udHJvbGxlclwiXG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RMaXN0ZW5lcihuYW1lKXtcblxuICAgIGNvbnRlbnQuYWRkUHJvamVjdChuYW1lKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Byb2plY3RzKClcbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFza0xpc3RlbmVyKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSl7XG5cbiAgICBjb25zdCBwcm9qZWN0T2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldXG4gICAgcHJvamVjdE9iai5hZGRUYXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSlcbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbn1cblxuZnVuY3Rpb24gY2hhbmdlRGV0YWlsKCkge1xuXG4gICAgY29uc3QgdGFza09iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1tjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0uYWN0aXZlSW5kZXgoKV1cblxuICAgIHRhc2tPYmoudGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXRpdGxlJykudmFsdWVcbiAgICB0YXNrT2JqLmRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kZXNjJykudmFsdWVcbiAgICB0YXNrT2JqLnByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1wcmlvcml0eScpLnZhbHVlXG4gICAgdGFza09iai5kdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kdWVEYXRlJykudmFsdWVcblxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICBET01jb250cm9sbGVyLnNob3dEZXRhaWxzKClcblxuICAgIC8vY29uc29sZS5sb2codGFza09iailcblxufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KCkge1xuICAgIFxuXG4gICAgaWYgKGNvbnRlbnQucHJvamVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHByb2plY3RPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV1cbiAgICAgICAgY29udGVudC5yZW1vdmVQcm9qZWN0KHByb2plY3RPYmopXG4gICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Byb2plY3RzKClcbiAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgICAgICBET01jb250cm9sbGVyLmJsYW5rRGV0YWlscygpXG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IHtjcmVhdGVQcm9qZWN0TGlzdGVuZXIsIGNyZWF0ZVRhc2tMaXN0ZW5lciwgY2hhbmdlRGV0YWlsLCBkZWxldGVQcm9qZWN0fSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY2hhbmdlRGV0YWlsIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2xpc3RlbmVycy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRhaWxzKCkge1xuXG4gICAgLy9NYWluIFByb2plY3RzIGNvbnRhaW5lclxuICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGRldGFpbHMuY2xhc3NMaXN0LmFkZCgnZGV0YWlsLWFyZWEnKVxuXG4gICAgLy9EZXRhaWxzIGhlYWRpbmcgYXJlYVxuICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGhlYWQuY2xhc3NMaXN0LmFkZCgnaGVhZCcpXG4gICAgaGVhZC5pbm5lclRleHQgPSBcIkRldGFpbHNcIlxuICAgIGRldGFpbHMuYXBwZW5kQ2hpbGQoaGVhZClcblxuICAgIC8vVGFzayB0aXRsZSBhcmVhXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3RpdGxlJywgJ2RldGFpbC1jb250JylcbiAgICBjb25zdCB0aXRsZUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHRpdGxlSGVhZC5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJylcbiAgICB0aXRsZUhlYWQuaW5uZXJUZXh0ID0gXCJUaXRsZVwiXG4gICAgdGl0bGUuYXBwZW5kQ2hpbGQodGl0bGVIZWFkKVxuICAgIGNvbnN0IHRpdGxlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICB0aXRsZUNvbnRlbnQuaWQgPSAnZGV0LXRpdGxlJ1xuICAgIHRpdGxlQ29udGVudC52YWx1ZSA9IFwiXCJcbiAgICB0aXRsZS5hcHBlbmRDaGlsZCh0aXRsZUNvbnRlbnQpXG4gICAgZGV0YWlscy5hcHBlbmRDaGlsZCh0aXRsZSlcbiAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hhbmdlRGV0YWlsKClcbiAgICB9KVxuXG4gICAgLy9UYXNrIERlc2NyaXB0aW9uXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2Rlc2NyaXB0aW9uJywgJ2RldGFpbC1jb250JylcbiAgICBjb25zdCBkZXNjVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGRlc2NUaXRsZS5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJylcbiAgICBkZXNjVGl0bGUuaW5uZXJUZXh0ID0gXCJEZXNjcmlwdGlvblwiXG4gICAgZGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZGVzY1RpdGxlKVxuICAgIGNvbnN0IGRlc2NDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKVxuICAgIGRlc2NDb250ZW50LmlkID0gJ2RldC1kZXNjJ1xuICAgIGRlc2NDb250ZW50LmlubmVyVGV4dCA9IFwiRW50ZXIgdGFzayBkZXNjcmlwdGlvbiBoZXJlXCJcbiAgICBkZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkZXNjQ29udGVudClcbiAgICBkZXRhaWxzLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKVxuICAgIGRlc2NyaXB0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGFuZ2VEZXRhaWwoKVxuICAgIH0pXG5cbiAgICAvL1ByaW9yaXR5IGFyZWFcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknLCAnZGV0YWlsLWNvbnQnKVxuICAgIGNvbnN0IHByaW9yaXR5SGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgcHJpb3JpdHlIZWFkLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKVxuICAgIHByaW9yaXR5SGVhZC5pbm5lclRleHQgPSBcIlByaW9yaXR5XCJcbiAgICBwcmlvcml0eS5hcHBlbmRDaGlsZChwcmlvcml0eUhlYWQpXG4gICAgY29uc3QgcHJpb3JpdHlDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIHByaW9yaXR5Q29udGVudC5pZCA9ICdkZXQtcHJpb3JpdHknXG4gICAgcHJpb3JpdHkuYXBwZW5kQ2hpbGQocHJpb3JpdHlDb250ZW50KVxuICAgIGRldGFpbHMuYXBwZW5kQ2hpbGQocHJpb3JpdHkpXG4gICAgcHJpb3JpdHkuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoYW5nZURldGFpbCgpXG4gICAgfSlcblxuICAgIC8vRHVlIGRhdGUgYXJlYVxuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZHVlLWRhdGUnLCAnZGV0YWlsLWNvbnQnKVxuICAgIGNvbnN0IGR1ZUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGR1ZUhlYWQuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpXG4gICAgZHVlSGVhZC5pbm5lclRleHQgPSAnRHVlLURhdGUnXG4gICAgZHVlRGF0ZS5hcHBlbmRDaGlsZChkdWVIZWFkKVxuICAgIGNvbnN0IGR1ZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgZHVlQ29udGVudC50eXBlID0gJ2RhdGUnXG4gICAgZHVlQ29udGVudC5pZCA9ICdkZXQtZHVlRGF0ZSdcbiAgICBkdWVEYXRlLmFwcGVuZENoaWxkKGR1ZUNvbnRlbnQpXG4gICAgZHVlRGF0ZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hhbmdlRGV0YWlsKClcbiAgICB9KVxuXG5cbiAgICBkZXRhaWxzLmFwcGVuZENoaWxkKGR1ZURhdGUpICAgIFxuXG4gICAgcmV0dXJuIGRldGFpbHNcblxufSJdLCJzb3VyY2VSb290IjoiIn0=