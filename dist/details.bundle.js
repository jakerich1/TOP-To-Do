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

                if(_class_content__WEBPACK_IMPORTED_MODULE_0__.default.checkActive(element.id)){
                    li.classList.add('active')
                    DOMcontroller.setProjectTitle(element.name)
                }

                li.addEventListener('click', function() {
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
            //console.log(projectObj)
            const taskArray = projectObj.tasks

            if (taskArray.length > 0) {
                
                taskArray.forEach(element => {

                    const row = document.createElement('tr')

                    if (element.id == projectObj.activeTask) {
                        row.innerHTML = `<td style="border-top: 1px solid #E4FF76; border-left: 1px solid #E4FF76; border-bottom: 1px solid #E4FF76;" >${element.title}</td><td style="border-top: 1px solid #E4FF76; border-bottom: 1px solid #E4FF76;">${element.priority}</td><td style="border-top: 1px solid #E4FF76; border-bottom: 1px solid #E4FF76;">${element.dueDate}</td>`   
                    }else{
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
/* harmony export */   "changeDetail": () => (/* binding */ changeDetail)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvY29udGVudC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvdGFzay5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvRE9NY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RPUC1Uby1Eby8uL3NyYy9jb21wb25lbnRzL2RldGFpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTBDOztBQUUxQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRCxhQUFhLEVBQUU7QUFDL0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsbURBQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRCxpRUFBZSxPOzs7Ozs7Ozs7Ozs7Ozs7QUN6RGU7QUFDOUI7QUFDTzs7QUFF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O1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7OztBQ04yRDs7QUFFNUM7O0FBRWY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdFQUFZO0FBQ3BCLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdFQUFZO0FBQ3BCLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3RUFBWTtBQUNwQixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0VBQVk7QUFDcEIsS0FBSzs7O0FBR0w7O0FBRUE7O0FBRUEsQyIsImZpbGUiOiJkZXRhaWxzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb2plY3QgfSBmcm9tIFwiLi4vY2xhc3MvcHJvamVjdFwiXG5cbmNvbnN0IGNvbnRlbnQgPSAoZnVuY3Rpb24gZmFjdG9yeSgpIHtcblxuICAgIGxldCBwcm9qZWN0cyA9IFtdXG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBcIlwiXG5cbiAgICBmdW5jdGlvbiByZXR1cm5Qcm9qZWN0cygpIHtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0QWN0aXZlKGlkKSB7XG4gICAgICAgIGFjdGl2ZVByb2plY3QgPSBpZFxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhY3RpdmVJbmRleCgpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBwcm9qZWN0cy5tYXAoZnVuY3Rpb24oZSkgeyByZXR1cm4gZS5pZDsgfSkuaW5kZXhPZihhY3RpdmVQcm9qZWN0KVxuICAgICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0FjdGl2ZShpZCkge1xuICAgICAgICBpZiAoaWQgPT0gYWN0aXZlUHJvamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KG5hbWUpIHtcbiAgICAgICAgbGV0IHByb2ogPSBuZXcgcHJvamVjdChuYW1lKVxuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2opXG4gICAgICAgIGlmIChwcm9qZWN0cy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgc2V0QWN0aXZlKHByb2ouaWQpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDFcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgcHJvamVjdHMuc3BsaWNlKHByb2plY3RzLmluZGV4T2YocHJvamVjdCksIDEpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgYWN0aXZlUHJvamVjdDogYWN0aXZlUHJvamVjdCxcbiAgICAgICAgcHJvamVjdHM6IHByb2plY3RzLFxuICAgICAgICByZXR1cm5Qcm9qZWN0czogcmV0dXJuUHJvamVjdHMsXG4gICAgICAgIGFkZFByb2plY3Q6IGFkZFByb2plY3QsXG4gICAgICAgIHJlbW92ZVByb2plY3Q6IHJlbW92ZVByb2plY3QsXG4gICAgICAgIHNldEFjdGl2ZTogc2V0QWN0aXZlLFxuICAgICAgICBjaGVja0FjdGl2ZTogY2hlY2tBY3RpdmUsXG4gICAgICAgIGFjdGl2ZUluZGV4OiBhY3RpdmVJbmRleFxuXG4gICAgfTtcblxufSgpKVxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50IiwiaW1wb3J0IHsgdGFzayB9IGZyb20gJy4vdGFzayc7XG4vL1Byb2plY3QgY2xhc3NcbmV4cG9ydCBjbGFzcyBwcm9qZWN0IHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLnRhc2tzID0gW11cbiAgICAgICAgdGhpcy5pZCA9IFwiXCJcbiAgICAgICAgdGhpcy5hY3RpdmVUYXNrID0gXCJcIlxuXG4gICAgICAgIHRoaXMuaW5pdElkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHM0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlkID0gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRJZCgpXG5cbiAgICB9XG5cbiAgICAvL01ldGhvZHNcbiAgICBhZGRUYXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xuICAgICAgICBsZXQgbnRhc2sgPSBuZXcgdGFzayhuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpXG4gICAgICAgIHRoaXMudGFza3MucHVzaChudGFzaylcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcmVtb3ZlVGFzayh0YXNrKSB7XG4gICAgICAgIHRhc2tzLnNwbGljZSh0YXNrcy5pbmRleE9mKHRhc2spLCAxKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXRBY3RpdmUocGFzc2VkaWQpIHtcbiAgICAgICAgYWN0aXZlVGFzayA9IHBhc3NlZGlkXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNoZWNrQWN0aXZlKHBhc3NlZGlkKSB7XG4gICAgICAgIGlmIChwYXNzZWRpZCA9PSBhY3RpdmVUYXNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGFjdGl2ZUluZGV4KCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMudGFza3MubWFwKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGUuaWQ7IH0pLmluZGV4T2YodGhpcy5hY3RpdmVUYXNrKVxuICAgICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgdGFzayB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKXtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZVxuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlXG4gICAgICAgIHRoaXMuaWQgPSBcIlwiXG5cbiAgICAgICAgdGhpcy5pbml0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgczQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaWQgPSBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdElkKClcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy9NZXRob2RzXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9ICF0aGlzLmNvbXBsZXRlZFxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBkYXlzTGVmdCgpIHtcblxuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKClcbiAgICAgICAgY29uc3QgZGlmZiA9IHRoaXMuZHVlRGF0ZS5nZXRUaW1lKCkgLSB0b2RheS5nZXRUaW1lKClcbiAgICAgICAgY29uc3QgZGlmZkRheXMgPSBkaWZmIC8gKDEwMDAgKiAzNjAwICogMjQpXG5cbiAgICAgICAgcmV0dXJuIGRpZmZEYXlzXG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgY29udGVudCBmcm9tIFwiLi4vY2xhc3MvY29udGVudFwiXG5cbmNvbnN0IERPTWNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gZmFjdG9yeSgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgc2V0UHJvamVjdFRpdGxlOiBmdW5jdGlvbiAobmFtZSkgeyAgICBcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpXG4gICAgICAgICAgICBwcm9qZWN0VGl0bGUuaW5uZXJUZXh0ID0gbmFtZVxuXG4gICAgICAgIH0sICAgICAgICBcblxuICAgICAgICBzaG93UHJvamVjdHM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0JylcbiAgICAgICAgICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBjb250ZW50LnJldHVyblByb2plY3RzKClcblxuICAgICAgICAgICAgcHJvamVjdHNBcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICAgICAgbGkuaW5uZXJUZXh0ID0gZWxlbWVudC5uYW1lXG5cbiAgICAgICAgICAgICAgICBpZihjb250ZW50LmNoZWNrQWN0aXZlKGVsZW1lbnQuaWQpKXtcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zZXRQcm9qZWN0VGl0bGUoZWxlbWVudC5uYW1lKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuc2V0QWN0aXZlKGVsZW1lbnQuaWQpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Byb2plY3RzKClcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNldFByb2plY3RUaXRsZShlbGVtZW50Lm5hbWUpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChsaSlcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dUYXNrczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCB0YXNrQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWJvZHknKVxuICAgICAgICAgICAgdGFza0JvZHkuaW5uZXJIVE1MID0gXCJcIlxuICAgICAgICAgICAgY29uc3QgcHJvamVjdE9iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwcm9qZWN0T2JqKVxuICAgICAgICAgICAgY29uc3QgdGFza0FycmF5ID0gcHJvamVjdE9iai50YXNrc1xuXG4gICAgICAgICAgICBpZiAodGFza0FycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0YXNrQXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaWQgPT0gcHJvamVjdE9iai5hY3RpdmVUYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuaW5uZXJIVE1MID0gYDx0ZCBzdHlsZT1cImJvcmRlci10b3A6IDFweCBzb2xpZCAjRTRGRjc2OyBib3JkZXItbGVmdDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTRGRjc2O1wiID4ke2VsZW1lbnQudGl0bGV9PC90ZD48dGQgc3R5bGU9XCJib3JkZXItdG9wOiAxcHggc29saWQgI0U0RkY3NjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFNEZGNzY7XCI+JHtlbGVtZW50LnByaW9yaXR5fTwvdGQ+PHRkIHN0eWxlPVwiYm9yZGVyLXRvcDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTRGRjc2O1wiPiR7ZWxlbWVudC5kdWVEYXRlfTwvdGQ+YCAgIFxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5pbm5lckhUTUwgPSBgPHRkPiR7ZWxlbWVudC50aXRsZX08L3RkPjx0ZD4ke2VsZW1lbnQucHJpb3JpdHl9PC90ZD48dGQ+JHtlbGVtZW50LmR1ZURhdGV9PC90ZD5gXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHRkYClcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tib3hJbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94SW5uZXIuY2xhc3NMaXN0LmFkZChgY2hlY2tib3hgKVxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5hcHBlbmRDaGlsZChjaGVja2JveElubmVyKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmlkID09IHByb2plY3RPYmouYWN0aXZlVGFzaykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5zdHlsZS5ib3JkZXJUb3AgPSAnMXB4IHNvbGlkICNFNEZGNzYnXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5zdHlsZS5ib3JkZXJSaWdodCA9ICcxcHggc29saWQgI0U0RkY3NidcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LnN0eWxlLmJvcmRlckJvdHRvbSA9ICcxcHggc29saWQgI0U0RkY3NidcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY29tcGxldGVkKSB7ICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveElubmVyLmlubmVySFRNTCA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImljb24gaWNvbi10YWJsZXIgaWNvbi10YWJsZXItY2hlY2tcIiB3aWR0aD1cIjQ0XCIgaGVpZ2h0PVwiNDRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgZmlsbD1cIm5vbmVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48cGF0aCBkPVwiTTUgMTJsNSA1bDEwIC0xMFwiIC8+PC9zdmc+PC9kaXY+PC90ZD5gXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudG9nZ2xlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICAgICAgICAgICAgICAgICAgfSkgICAgICBcblxuICAgICAgICAgICAgICAgICAgICByb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXNrSUQgPSBlbGVtZW50LmlkXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0uYWN0aXZlVGFzayA9IHRhc2tJRFxuICAgICAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgICAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93RGV0YWlscygpXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2hlY2tib3gpXG4gICAgICAgICAgICAgICAgICAgIHRhc2tCb2R5LmFwcGVuZENoaWxkKHJvdylcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93RGV0YWlsczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy9ET00gZWxlbWVudCBkZWNsYXJhdGlvbnNcblxuICAgICAgICAgICAgbGV0IHRhc2tPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0udGFza3NbY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLmFjdGl2ZUluZGV4KCldXG5cbiAgICAgICAgICAgIGlmICghdGFza09iaikge1xuICAgICAgICAgICAgICAgIHRhc2tPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0udGFza3NbMF1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZGV0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXRpdGxlJykgXG4gICAgICAgICAgICBjb25zdCBkZXREZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZGVzYycpIFxuICAgICAgICAgICAgY29uc3QgZGV0UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXByaW9yaXR5JykgXG4gICAgICAgICAgICBjb25zdCBkZXREdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kdWVEYXRlJykgXG5cbiAgICAgICAgICAgIGRldFRpdGxlLnZhbHVlID0gdGFza09iai50aXRsZVxuICAgICAgICAgICAgZGV0RGVzY3JpcHRpb24udmFsdWUgPSB0YXNrT2JqLmRlc2NyaXB0aW9uXG4gICAgICAgICAgICBkZXRQcmlvcml0eS52YWx1ZSA9IHRhc2tPYmoucHJpb3JpdHlcbiAgICAgICAgICAgIGRldER1ZURhdGUudmFsdWUgPSB0YXNrT2JqLmR1ZURhdGVcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0oKSlcblxuZXhwb3J0IGRlZmF1bHQgRE9NY29udHJvbGxlciIsImltcG9ydCB7IHByb2plY3QgfSBmcm9tIFwiLi4vY2xhc3MvcHJvamVjdFwiXG5pbXBvcnQgeyB0YXNrIH0gZnJvbSBcIi4uL2NsYXNzL3Rhc2tcIlxuaW1wb3J0IGNvbnRlbnQgZnJvbSBcIi4uL2NsYXNzL2NvbnRlbnRcIlxuaW1wb3J0IERPTWNvbnRyb2xsZXIgZnJvbSBcIi4vRE9NY29udHJvbGxlclwiXG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RMaXN0ZW5lcihuYW1lKXtcblxuICAgIGNvbnRlbnQuYWRkUHJvamVjdChuYW1lKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Byb2plY3RzKClcbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFza0xpc3RlbmVyKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSl7XG5cbiAgICBjb25zdCBwcm9qZWN0T2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldXG4gICAgcHJvamVjdE9iai5hZGRUYXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSlcbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbn1cblxuZnVuY3Rpb24gY2hhbmdlRGV0YWlsKCkge1xuXG4gICAgY29uc3QgdGFza09iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1tjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0uYWN0aXZlSW5kZXgoKV1cblxuICAgIHRhc2tPYmoudGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXRpdGxlJykudmFsdWVcbiAgICB0YXNrT2JqLmRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kZXNjJykudmFsdWVcbiAgICB0YXNrT2JqLnByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1wcmlvcml0eScpLnZhbHVlXG4gICAgdGFza09iai5kdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kdWVEYXRlJykudmFsdWVcblxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICBET01jb250cm9sbGVyLnNob3dEZXRhaWxzKClcblxuICAgIC8vY29uc29sZS5sb2codGFza09iailcblxufVxuXG5leHBvcnQge2NyZWF0ZVByb2plY3RMaXN0ZW5lciwgY3JlYXRlVGFza0xpc3RlbmVyLCBjaGFuZ2VEZXRhaWx9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjaGFuZ2VEZXRhaWwgfSBmcm9tIFwiLi4vY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRldGFpbHMoKSB7XG5cbiAgICAvL01haW4gUHJvamVjdHMgY29udGFpbmVyXG4gICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKCdkZXRhaWwtYXJlYScpXG5cbiAgICAvL0RldGFpbHMgaGVhZGluZyBhcmVhXG4gICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaGVhZC5jbGFzc0xpc3QuYWRkKCdoZWFkJylcbiAgICBoZWFkLmlubmVyVGV4dCA9IFwiRGV0YWlsc1wiXG4gICAgZGV0YWlscy5hcHBlbmRDaGlsZChoZWFkKVxuXG4gICAgLy9UYXNrIHRpdGxlIGFyZWFcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndGl0bGUnLCAnZGV0YWlsLWNvbnQnKVxuICAgIGNvbnN0IHRpdGxlSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGl0bGVIZWFkLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKVxuICAgIHRpdGxlSGVhZC5pbm5lclRleHQgPSBcIlRpdGxlXCJcbiAgICB0aXRsZS5hcHBlbmRDaGlsZCh0aXRsZUhlYWQpXG4gICAgY29uc3QgdGl0bGVDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIHRpdGxlQ29udGVudC5pZCA9ICdkZXQtdGl0bGUnXG4gICAgdGl0bGVDb250ZW50LnZhbHVlID0gXCJcIlxuICAgIHRpdGxlLmFwcGVuZENoaWxkKHRpdGxlQ29udGVudClcbiAgICBkZXRhaWxzLmFwcGVuZENoaWxkKHRpdGxlKVxuICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGFuZ2VEZXRhaWwoKVxuICAgIH0pXG5cbiAgICAvL1Rhc2sgRGVzY3JpcHRpb25cbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb24nLCAnZGV0YWlsLWNvbnQnKVxuICAgIGNvbnN0IGRlc2NUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZGVzY1RpdGxlLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKVxuICAgIGRlc2NUaXRsZS5pbm5lclRleHQgPSBcIkRlc2NyaXB0aW9uXCJcbiAgICBkZXNjcmlwdGlvbi5hcHBlbmRDaGlsZChkZXNjVGl0bGUpXG4gICAgY29uc3QgZGVzY0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpXG4gICAgZGVzY0NvbnRlbnQuaWQgPSAnZGV0LWRlc2MnXG4gICAgZGVzY0NvbnRlbnQuaW5uZXJUZXh0ID0gXCJFbnRlciB0YXNrIGRlc2NyaXB0aW9uIGhlcmVcIlxuICAgIGRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRlc2NDb250ZW50KVxuICAgIGRldGFpbHMuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pXG4gICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoYW5nZURldGFpbCgpXG4gICAgfSlcblxuICAgIC8vUHJpb3JpdHkgYXJlYVxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScsICdkZXRhaWwtY29udCcpXG4gICAgY29uc3QgcHJpb3JpdHlIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBwcmlvcml0eUhlYWQuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpXG4gICAgcHJpb3JpdHlIZWFkLmlubmVyVGV4dCA9IFwiUHJpb3JpdHlcIlxuICAgIHByaW9yaXR5LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZClcbiAgICBjb25zdCBwcmlvcml0eUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgcHJpb3JpdHlDb250ZW50LmlkID0gJ2RldC1wcmlvcml0eSdcbiAgICBwcmlvcml0eS5hcHBlbmRDaGlsZChwcmlvcml0eUNvbnRlbnQpXG4gICAgZGV0YWlscy5hcHBlbmRDaGlsZChwcmlvcml0eSlcbiAgICBwcmlvcml0eS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hhbmdlRGV0YWlsKClcbiAgICB9KVxuXG4gICAgLy9EdWUgZGF0ZSBhcmVhXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdkdWUtZGF0ZScsICdkZXRhaWwtY29udCcpXG4gICAgY29uc3QgZHVlSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZHVlSGVhZC5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJylcbiAgICBkdWVIZWFkLmlubmVyVGV4dCA9ICdEdWUtRGF0ZSdcbiAgICBkdWVEYXRlLmFwcGVuZENoaWxkKGR1ZUhlYWQpXG4gICAgY29uc3QgZHVlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBkdWVDb250ZW50LnR5cGUgPSAnZGF0ZSdcbiAgICBkdWVDb250ZW50LmlkID0gJ2RldC1kdWVEYXRlJ1xuICAgIGR1ZURhdGUuYXBwZW5kQ2hpbGQoZHVlQ29udGVudClcbiAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGFuZ2VEZXRhaWwoKVxuICAgIH0pXG5cblxuICAgIGRldGFpbHMuYXBwZW5kQ2hpbGQoZHVlRGF0ZSkgICAgXG5cbiAgICByZXR1cm4gZGV0YWlsc1xuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==