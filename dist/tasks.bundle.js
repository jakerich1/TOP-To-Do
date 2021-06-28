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
        const index = tasks.map(function(e) { return e.id; }).indexOf(activeTask)
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
            const taskArray = projectObj.tasks

            if (taskArray.length > 0) {
                
                taskArray.forEach(element => {

                    const row = document.createElement('tr')

                    if (element.id == _class_content__WEBPACK_IMPORTED_MODULE_0__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_0__.default.activeIndex()].activeTask) {
                        row.innerHTML = `<td style="border-top: 1px solid #E4FF76; border-left: 1px solid #E4FF76; border-bottom: 1px solid #E4FF76;" >${element.title}</td><td style="border-top: 1px solid #E4FF76; border-bottom: 1px solid #E4FF76;">${element.priority}</td><td style="border-top: 1px solid #E4FF76; border-bottom: 1px solid #E4FF76;">${element.dueDate}</td>`   
                    }else{
                        row.innerHTML = `<td>${element.title}</td><td>${element.priority}</td><td>${element.dueDate}</td>`
                    }

                    const checkbox = document.createElement(`td`)
                    const checkboxInner = document.createElement(`div`)
                    checkboxInner.classList.add(`checkbox`)
                    checkbox.appendChild(checkboxInner)

                    if (element.id == _class_content__WEBPACK_IMPORTED_MODULE_0__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_0__.default.activeIndex()].activeTask) {

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

                        DOMcontroller.showDetails(element)
                        let taskID = element.id
                        _class_content__WEBPACK_IMPORTED_MODULE_0__.default.projects[_class_content__WEBPACK_IMPORTED_MODULE_0__.default.activeIndex()].activeTask = taskID
                        DOMcontroller.showTasks()

                    })

                    row.appendChild(checkbox)
                    taskBody.appendChild(row)

                });

            }

        },

        showDetails: function (element) {
            //DOM element declarations
            const detTitle = document.querySelector('#det-title') 
            const detDescription = document.querySelector('#det-desc') 
            const detPriority = document.querySelector('#det-priority') 
            const detDueDate = document.querySelector('#det-dueDate') 

            detTitle.value = element.title
            detDescription.value = element.description
            detPriority.value = element.priority
            detDueDate.value = element.dueDate

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
/* harmony export */   "createTaskListener": () => (/* binding */ createTaskListener)
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
    closeBtn.addEventListener('click', function(event){
        taskModal.style.display = "none"
    })
    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
        if (event.target == taskModal) {
            taskModal.style.display = "none";
        }
    });

    //Main Projects container
    const tasks = document.createElement('div')
    tasks.classList.add('task-area')

    //Add task button
    const addBtn = document.createElement('div')
    addBtn.classList.add('add')
    addBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>'
    addBtn.addEventListener('click', function(){
        taskModal.style.display = "block"
    })
    tasks.appendChild(addBtn)

    //Table element
    const table = document.createElement('table')

    //Header row 
    const thead = document.createElement('thead')
    const thr = document.createElement('tr')
    const thTask = document.createElement('th')
    thTask.innerHTML = "Task"
    const thPriority = document.createElement('th')
    thPriority.innerHTML = "Priority"
    const thDue= document.createElement('th')
    thDue.innerHTML = "Due Date"
    thr.appendChild(thTask)
    thr.appendChild(thPriority)
    thr.appendChild(thDue)
    thr.appendChild(document.createElement('th'))
    thead.appendChild(thr)
    table.appendChild(thead)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvY29udGVudC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvdGFzay5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvRE9NY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RPUC1Uby1Eby8uL3NyYy9jb21wb25lbnRzL3Rhc2tzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEwQzs7QUFFMUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0QsYUFBYSxFQUFFO0FBQy9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLG1EQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQsaUVBQWUsTzs7Ozs7Ozs7Ozs7Ozs7O0FDekRlO0FBQzlCO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsdUNBQUk7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxhQUFhLEVBQUU7QUFDNUQ7QUFDQTs7QUFFQSxDOzs7Ozs7Ozs7Ozs7OztBQ3BETzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEM7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDc0M7O0FBRXRDOztBQUVBOztBQUVBLDBDOztBQUVBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0Esa0NBQWtDLGtFQUFzQjs7QUFFeEQ7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIsK0RBQW1CO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQiw2REFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBLGFBQWE7O0FBRWI7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCLDREQUFnQixDQUFDLCtEQUFtQjtBQUNuRTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsNERBQWdCLENBQUMsK0RBQW1CO0FBQzFFLGtGQUFrRixnQ0FBZ0Msa0NBQWtDLEtBQUssY0FBYyw4Q0FBOEMsa0NBQWtDLElBQUksaUJBQWlCLDhDQUE4QyxrQ0FBa0MsSUFBSSxnQkFBZ0I7QUFDaFgscUJBQXFCO0FBQ3JCLCtDQUErQyxjQUFjLFdBQVcsaUJBQWlCLFdBQVcsZ0JBQWdCO0FBQ3BIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNDQUFzQyw0REFBZ0IsQ0FBQywrREFBbUI7O0FBRTFFO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSw0QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLDREQUFnQixDQUFDLCtEQUFtQjtBQUM1RDs7QUFFQSxxQkFBcUI7O0FBRXJCO0FBQ0E7O0FBRUEsaUJBQWlCOztBQUVqQjs7QUFFQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVELGlFQUFlLGE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SDJCO0FBQ047QUFDRTtBQUNLOztBQUUzQzs7QUFFQSxJQUFJLDhEQUFrQjtBQUN0QixJQUFJLGdFQUEwQjtBQUM5QixJQUFJLDZEQUF1Qjs7QUFFM0I7O0FBRUE7O0FBRUEsdUJBQXVCLDREQUFnQixDQUFDLCtEQUFtQjtBQUMzRDtBQUNBLElBQUksNkRBQXVCOztBQUUzQjs7Ozs7Ozs7VUNuQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNKcUM7O0FBRXRCOztBQUVmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQztBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsOEVBQWtCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEMiLCJmaWxlIjoidGFza3MuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvamVjdCB9IGZyb20gXCIuLi9jbGFzcy9wcm9qZWN0XCJcblxuY29uc3QgY29udGVudCA9IChmdW5jdGlvbiBmYWN0b3J5KCkge1xuXG4gICAgbGV0IHByb2plY3RzID0gW11cbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IFwiXCJcblxuICAgIGZ1bmN0aW9uIHJldHVyblByb2plY3RzKCkge1xuICAgICAgICByZXR1cm4gcHJvamVjdHNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRBY3RpdmUoaWQpIHtcbiAgICAgICAgYWN0aXZlUHJvamVjdCA9IGlkXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFjdGl2ZUluZGV4KCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHByb2plY3RzLm1hcChmdW5jdGlvbihlKSB7IHJldHVybiBlLmlkOyB9KS5pbmRleE9mKGFjdGl2ZVByb2plY3QpXG4gICAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQWN0aXZlKGlkKSB7XG4gICAgICAgIGlmIChpZCA9PSBhY3RpdmVQcm9qZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3QobmFtZSkge1xuICAgICAgICBsZXQgcHJvaiA9IG5ldyBwcm9qZWN0KG5hbWUpXG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvailcbiAgICAgICAgaWYgKHByb2plY3RzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBzZXRBY3RpdmUocHJvai5pZClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVByb2plY3QocHJvamVjdCkge1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UocHJvamVjdHMuaW5kZXhPZihwcm9qZWN0KSwgMSlcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBhY3RpdmVQcm9qZWN0OiBhY3RpdmVQcm9qZWN0LFxuICAgICAgICBwcm9qZWN0czogcHJvamVjdHMsXG4gICAgICAgIHJldHVyblByb2plY3RzOiByZXR1cm5Qcm9qZWN0cyxcbiAgICAgICAgYWRkUHJvamVjdDogYWRkUHJvamVjdCxcbiAgICAgICAgcmVtb3ZlUHJvamVjdDogcmVtb3ZlUHJvamVjdCxcbiAgICAgICAgc2V0QWN0aXZlOiBzZXRBY3RpdmUsXG4gICAgICAgIGNoZWNrQWN0aXZlOiBjaGVja0FjdGl2ZSxcbiAgICAgICAgYWN0aXZlSW5kZXg6IGFjdGl2ZUluZGV4XG5cbiAgICB9O1xuXG59KCkpXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQiLCJpbXBvcnQgeyB0YXNrIH0gZnJvbSAnLi90YXNrJztcbi8vUHJvamVjdCBjbGFzc1xuZXhwb3J0IGNsYXNzIHByb2plY3Qge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMudGFza3MgPSBbXVxuICAgICAgICB0aGlzLmlkID0gXCJcIlxuICAgICAgICB0aGlzLmFjdGl2ZVRhc2sgPSBcIlwiXG5cbiAgICAgICAgdGhpcy5pbml0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgczQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaWQgPSBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdElkKClcblxuICAgIH1cblxuICAgIC8vTWV0aG9kc1xuICAgIGFkZFRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKSB7XG4gICAgICAgIGxldCBudGFzayA9IG5ldyB0YXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSlcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKG50YXNrKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgdGFza3Muc3BsaWNlKHRhc2tzLmluZGV4T2YodGFzayksIDEpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNldEFjdGl2ZShwYXNzZWRpZCkge1xuICAgICAgICBhY3RpdmVUYXNrID0gcGFzc2VkaWRcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY2hlY2tBY3RpdmUocGFzc2VkaWQpIHtcbiAgICAgICAgaWYgKHBhc3NlZGlkID09IGFjdGl2ZVRhc2spIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgYWN0aXZlSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGFza3MubWFwKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGUuaWQ7IH0pLmluZGV4T2YoYWN0aXZlVGFzaylcbiAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIHRhc2sge1xuXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSl7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25cbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZVxuICAgICAgICB0aGlzLmlkID0gXCJcIlxuXG4gICAgICAgIHRoaXMuaW5pdElkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHM0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlkID0gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRJZCgpXG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vTWV0aG9kc1xuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSAhdGhpcy5jb21wbGV0ZWRcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZGF5c0xlZnQoKSB7XG5cbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gICAgICAgIGNvbnN0IGRpZmYgPSB0aGlzLmR1ZURhdGUuZ2V0VGltZSgpIC0gdG9kYXkuZ2V0VGltZSgpXG4gICAgICAgIGNvbnN0IGRpZmZEYXlzID0gZGlmZiAvICgxMDAwICogMzYwMCAqIDI0KVxuXG4gICAgICAgIHJldHVybiBkaWZmRGF5c1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IGNvbnRlbnQgZnJvbSBcIi4uL2NsYXNzL2NvbnRlbnRcIlxuXG5jb25zdCBET01jb250cm9sbGVyID0gKGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHNldFByb2plY3RUaXRsZTogZnVuY3Rpb24gKG5hbWUpIHsgICAgXG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUnKVxuICAgICAgICAgICAgcHJvamVjdFRpdGxlLmlubmVyVGV4dCA9IG5hbWVcblxuICAgICAgICB9LCAgICAgICAgXG5cbiAgICAgICAgc2hvd1Byb2plY3RzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpXG4gICAgICAgICAgICBwcm9qZWN0TGlzdC5pbm5lckhUTUwgPSBcIlwiXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0c0FycmF5ID0gY29udGVudC5yZXR1cm5Qcm9qZWN0cygpXG5cbiAgICAgICAgICAgIHByb2plY3RzQXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAgICAgICAgIGxpLmlubmVyVGV4dCA9IGVsZW1lbnQubmFtZVxuXG4gICAgICAgICAgICAgICAgaWYoY29udGVudC5jaGVja0FjdGl2ZShlbGVtZW50LmlkKSl7XG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2V0UHJvamVjdFRpdGxlKGVsZW1lbnQubmFtZSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNldEFjdGl2ZShlbGVtZW50LmlkKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dQcm9qZWN0cygpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zZXRQcm9qZWN0VGl0bGUoZWxlbWVudC5uYW1lKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQobGkpXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gXG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93VGFza3M6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3QgdGFza0JvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1ib2R5JylcbiAgICAgICAgICAgIHRhc2tCb2R5LmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV1cbiAgICAgICAgICAgIGNvbnN0IHRhc2tBcnJheSA9IHByb2plY3RPYmoudGFza3NcblxuICAgICAgICAgICAgaWYgKHRhc2tBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGFza0FycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmlkID09IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS5hY3RpdmVUYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuaW5uZXJIVE1MID0gYDx0ZCBzdHlsZT1cImJvcmRlci10b3A6IDFweCBzb2xpZCAjRTRGRjc2OyBib3JkZXItbGVmdDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTRGRjc2O1wiID4ke2VsZW1lbnQudGl0bGV9PC90ZD48dGQgc3R5bGU9XCJib3JkZXItdG9wOiAxcHggc29saWQgI0U0RkY3NjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFNEZGNzY7XCI+JHtlbGVtZW50LnByaW9yaXR5fTwvdGQ+PHRkIHN0eWxlPVwiYm9yZGVyLXRvcDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTRGRjc2O1wiPiR7ZWxlbWVudC5kdWVEYXRlfTwvdGQ+YCAgIFxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5pbm5lckhUTUwgPSBgPHRkPiR7ZWxlbWVudC50aXRsZX08L3RkPjx0ZD4ke2VsZW1lbnQucHJpb3JpdHl9PC90ZD48dGQ+JHtlbGVtZW50LmR1ZURhdGV9PC90ZD5gXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHRkYClcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tib3hJbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94SW5uZXIuY2xhc3NMaXN0LmFkZChgY2hlY2tib3hgKVxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5hcHBlbmRDaGlsZChjaGVja2JveElubmVyKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmlkID09IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS5hY3RpdmVUYXNrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LnN0eWxlLmJvcmRlclRvcCA9ICcxcHggc29saWQgI0U0RkY3NidcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LnN0eWxlLmJvcmRlclJpZ2h0ID0gJzFweCBzb2xpZCAjRTRGRjc2J1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guc3R5bGUuYm9yZGVyQm90dG9tID0gJzFweCBzb2xpZCAjRTRGRjc2J1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jb21wbGV0ZWQpIHsgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94SW5uZXIuaW5uZXJIVE1MID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiaWNvbiBpY29uLXRhYmxlciBpY29uLXRhYmxlci1jaGVja1wiIHdpZHRoPVwiNDRcIiBoZWlnaHQ9XCI0NFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBmaWxsPVwibm9uZVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIHN0cm9rZT1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIvPjxwYXRoIGQ9XCJNNSAxMmw1IDVsMTAgLTEwXCIgLz48L3N2Zz48L2Rpdj48L3RkPmBcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC50b2dnbGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgICAgICAgICAgICAgICAgICB9KSAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIHJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93RGV0YWlscyhlbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2tJRCA9IGVsZW1lbnQuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS5hY3RpdmVUYXNrID0gdGFza0lEXG4gICAgICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2hlY2tib3gpXG4gICAgICAgICAgICAgICAgICAgIHRhc2tCb2R5LmFwcGVuZENoaWxkKHJvdylcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93RGV0YWlsczogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vRE9NIGVsZW1lbnQgZGVjbGFyYXRpb25zXG4gICAgICAgICAgICBjb25zdCBkZXRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtdGl0bGUnKSBcbiAgICAgICAgICAgIGNvbnN0IGRldERlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kZXNjJykgXG4gICAgICAgICAgICBjb25zdCBkZXRQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtcHJpb3JpdHknKSBcbiAgICAgICAgICAgIGNvbnN0IGRldER1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWR1ZURhdGUnKSBcblxuICAgICAgICAgICAgZGV0VGl0bGUudmFsdWUgPSBlbGVtZW50LnRpdGxlXG4gICAgICAgICAgICBkZXREZXNjcmlwdGlvbi52YWx1ZSA9IGVsZW1lbnQuZGVzY3JpcHRpb25cbiAgICAgICAgICAgIGRldFByaW9yaXR5LnZhbHVlID0gZWxlbWVudC5wcmlvcml0eVxuICAgICAgICAgICAgZGV0RHVlRGF0ZS52YWx1ZSA9IGVsZW1lbnQuZHVlRGF0ZVxuXG4gICAgICAgIH1cblxuICAgIH1cblxufSgpKVxuXG5leHBvcnQgZGVmYXVsdCBET01jb250cm9sbGVyIiwiaW1wb3J0IHsgcHJvamVjdCB9IGZyb20gXCIuLi9jbGFzcy9wcm9qZWN0XCJcbmltcG9ydCB7IHRhc2sgfSBmcm9tIFwiLi4vY2xhc3MvdGFza1wiXG5pbXBvcnQgY29udGVudCBmcm9tIFwiLi4vY2xhc3MvY29udGVudFwiXG5pbXBvcnQgRE9NY29udHJvbGxlciBmcm9tIFwiLi9ET01jb250cm9sbGVyXCJcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdExpc3RlbmVyKG5hbWUpe1xuXG4gICAgY29udGVudC5hZGRQcm9qZWN0KG5hbWUpXG4gICAgRE9NY29udHJvbGxlci5zaG93UHJvamVjdHMoKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcblxufVxuXG5mdW5jdGlvbiBjcmVhdGVUYXNrTGlzdGVuZXIobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKXtcblxuICAgIGNvbnN0IHByb2plY3RPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV1cbiAgICBwcm9qZWN0T2JqLmFkZFRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcblxufVxuXG5leHBvcnQge2NyZWF0ZVByb2plY3RMaXN0ZW5lciwgY3JlYXRlVGFza0xpc3RlbmVyfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgICBjcmVhdGVUYXNrTGlzdGVuZXJcbn0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2xpc3RlbmVycy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0YXNrcygpIHtcblxuICAgIC8vYWRkIHByb2plY3QgbW9kYWwgYXBwZW5kIHRvIGJvZHlcbiAgICBjb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHRhc2tNb2RhbC5pZCA9IFwiYWRkVGFza3NcIlxuXG4gICAgY29uc3QgbW9kYWxDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBtb2RhbENvbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpXG4gICAgdGFza01vZGFsLmFwcGVuZENoaWxkKG1vZGFsQ29udClcblxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgY2xvc2VCdG4uY2xhc3NMaXN0LmFkZCgnY2xvc2UnKVxuICAgIGNsb3NlQnRuLmlubmVySFRNTCA9ICcmdGltZXM7J1xuICAgIG1vZGFsQ29udC5hcHBlbmRDaGlsZChjbG9zZUJ0bilcblxuICAgIC8vTU9kYWwgSW5wdXRzXG4gICAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIG5hbWVJbnB1dC50eXBlID0gXCJ0ZXh0XCJcbiAgICBuYW1lSW5wdXQucGxhY2Vob2xkZXIgPSBcIkVudGVyIHRhc2sgbmFtZSBoZXJlXCJcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQobmFtZUlucHV0KVxuXG4gICAgY29uc3QgZGVzY0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKVxuICAgIGRlc2NJbnB1dC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgZGVzY3JpcHRpb25cIlxuICAgIG1vZGFsQ29udC5hcHBlbmRDaGlsZChkZXNjSW5wdXQpXG5cbiAgICBjb25zdCBwcmlvcml0eUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIHByaW9yaXR5SW5wdXQudHlwZSA9IFwidGV4dFwiXG4gICAgcHJpb3JpdHlJbnB1dC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgcHJpb3JpdHlcIlxuICAgIG1vZGFsQ29udC5hcHBlbmRDaGlsZChwcmlvcml0eUlucHV0KVxuXG4gICAgY29uc3QgZGF0ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIGRhdGVJbnB1dC50eXBlID0gXCJkYXRlXCJcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQoZGF0ZUlucHV0KVxuXG4gICAgY29uc3QgbW9kYWxTdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIG1vZGFsU3VibWl0LmlubmVyVGV4dCA9IFwiU3VibWl0XCJcbiAgICBtb2RhbFN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBsZXQgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZVxuICAgICAgICBsZXQgZGVzYyA9IGRlc2NJbnB1dC52YWx1ZVxuICAgICAgICBsZXQgcHJpb3JpdHkgPSBwcmlvcml0eUlucHV0LnZhbHVlXG4gICAgICAgIGxldCBkdWVkYXRlID0gZGF0ZUlucHV0LnZhbHVlXG5cbiAgICAgICAgY3JlYXRlVGFza0xpc3RlbmVyKG5hbWUsIGRlc2MsIHByaW9yaXR5LCBkdWVkYXRlKVxuXG4gICAgICAgIG5hbWVJbnB1dC52YWx1ZSA9IFwiXCJcbiAgICAgICAgZGVzY0lucHV0LnZhbHVlID0gXCJcIlxuICAgICAgICBwcmlvcml0eUlucHV0LnZhbHVlID0gXCJcIlxuICAgICAgICBkYXRlSW5wdXQudmFsdWUgPSBcIlwiXG4gICAgICAgIHRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuICAgIH0pXG5cbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQobW9kYWxTdWJtaXQpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0YXNrTW9kYWwpXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gPHNwYW4+ICh4KSwgY2xvc2UgdGhlIG1vZGFsXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIHRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbiAgICB9KVxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIG91dHNpZGUgb2YgdGhlIG1vZGFsLCBjbG9zZSBpdFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGFza01vZGFsKSB7XG4gICAgICAgICAgICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL01haW4gUHJvamVjdHMgY29udGFpbmVyXG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHRhc2tzLmNsYXNzTGlzdC5hZGQoJ3Rhc2stYXJlYScpXG5cbiAgICAvL0FkZCB0YXNrIGJ1dHRvblxuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgYWRkQnRuLmNsYXNzTGlzdC5hZGQoJ2FkZCcpXG4gICAgYWRkQnRuLmlubmVySFRNTCA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImljb24gaWNvbi10YWJsZXIgaWNvbi10YWJsZXItcGx1c1wiIHdpZHRoPVwiNDRcIiBoZWlnaHQ9XCI0NFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBmaWxsPVwibm9uZVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIHN0cm9rZT1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIvPjxsaW5lIHgxPVwiMTJcIiB5MT1cIjVcIiB4Mj1cIjEyXCIgeTI9XCIxOVwiIC8+PGxpbmUgeDE9XCI1XCIgeTE9XCIxMlwiIHgyPVwiMTlcIiB5Mj1cIjEyXCIgLz48L3N2Zz4nXG4gICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbiAgICB9KVxuICAgIHRhc2tzLmFwcGVuZENoaWxkKGFkZEJ0bilcblxuICAgIC8vVGFibGUgZWxlbWVudFxuICAgIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKVxuXG4gICAgLy9IZWFkZXIgcm93IFxuICAgIGNvbnN0IHRoZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKVxuICAgIGNvbnN0IHRociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcbiAgICBjb25zdCB0aFRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpXG4gICAgdGhUYXNrLmlubmVySFRNTCA9IFwiVGFza1wiXG4gICAgY29uc3QgdGhQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJylcbiAgICB0aFByaW9yaXR5LmlubmVySFRNTCA9IFwiUHJpb3JpdHlcIlxuICAgIGNvbnN0IHRoRHVlPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpXG4gICAgdGhEdWUuaW5uZXJIVE1MID0gXCJEdWUgRGF0ZVwiXG4gICAgdGhyLmFwcGVuZENoaWxkKHRoVGFzaylcbiAgICB0aHIuYXBwZW5kQ2hpbGQodGhQcmlvcml0eSlcbiAgICB0aHIuYXBwZW5kQ2hpbGQodGhEdWUpXG4gICAgdGhyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJykpXG4gICAgdGhlYWQuYXBwZW5kQ2hpbGQodGhyKVxuICAgIHRhYmxlLmFwcGVuZENoaWxkKHRoZWFkKVxuXG4gICAgLy9QbGFjZWhvbGRlciB0YWJsZSByb3dzXG4gICAgY29uc3QgdGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpXG4gICAgdGJvZHkuaWQgPSBcInRhc2stYm9keVwiXG5cbiAgICB0YWJsZS5hcHBlbmRDaGlsZCh0Ym9keSlcbiAgICB0YXNrcy5hcHBlbmRDaGlsZCh0YWJsZSlcblxuICAgIHJldHVybiB0YXNrc1xuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==