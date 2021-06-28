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

    size() {
        return this.tasks.length;
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
                    row.innerHTML = `<td>${element.title}</td><td>${element.priority}</td><td>${element.dueDate}</td>`
                    const checkbox = document.createElement(`td`)
                    const checkboxInner = document.createElement(`div`)
                    checkboxInner.classList.add(`checkbox`)
                    checkbox.appendChild(checkboxInner)

                    if (element.completed) {
                        checkboxInner.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg></div></td>`
                    }

                    checkbox.addEventListener('click', function () {
                        element.toggle()
                        DOMcontroller.showTasks()
                    })

                    row.addEventListener('click', function () {
                        DOMcontroller.showDetails(element)
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

            console.log(element)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvY29udGVudC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvdGFzay5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvRE9NY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RPUC1Uby1Eby8uL3NyYy9jb21wb25lbnRzL3Rhc2tzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEwQzs7QUFFMUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0QsYUFBYSxFQUFFO0FBQy9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLG1EQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQsaUVBQWUsTzs7Ozs7Ozs7Ozs7Ozs7O0FDekRlO0FBQzlCO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLHVDQUFJO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQzs7Ozs7Ozs7Ozs7Ozs7QUN0Q087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsQzs7Ozs7Ozs7Ozs7Ozs7O0FDMUJzQzs7QUFFdEM7O0FBRUE7O0FBRUEsMEM7O0FBRUE7QUFDQTs7QUFFQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0Msa0VBQXNCOztBQUV4RDs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQiwrREFBbUI7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLDZEQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0IsNERBQWdCLENBQUMsK0RBQW1CO0FBQ25FOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsMkNBQTJDLGNBQWMsV0FBVyxpQkFBaUIsV0FBVyxnQkFBZ0I7QUFDaEg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTs7QUFFQSxpQkFBaUI7O0FBRWpCOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLENBQUM7O0FBRUQsaUVBQWUsYTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZHMkI7QUFDTjtBQUNFO0FBQ0s7O0FBRTNDOztBQUVBLElBQUksOERBQWtCO0FBQ3RCLElBQUksZ0VBQTBCO0FBQzlCLElBQUksNkRBQXVCOztBQUUzQjs7QUFFQTs7QUFFQSx1QkFBdUIsNERBQWdCLENBQUMsK0RBQW1CO0FBQzNEO0FBQ0EsSUFBSSw2REFBdUI7O0FBRTNCOzs7Ozs7OztVQ25CQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7OztBQ0pxQzs7QUFFdEI7O0FBRWY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSw4RUFBa0I7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsQyIsImZpbGUiOiJ0YXNrcy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9qZWN0IH0gZnJvbSBcIi4uL2NsYXNzL3Byb2plY3RcIlxuXG5jb25zdCBjb250ZW50ID0gKGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG5cbiAgICBsZXQgcHJvamVjdHMgPSBbXVxuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gXCJcIlxuXG4gICAgZnVuY3Rpb24gcmV0dXJuUHJvamVjdHMoKSB7XG4gICAgICAgIHJldHVybiBwcm9qZWN0c1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEFjdGl2ZShpZCkge1xuICAgICAgICBhY3RpdmVQcm9qZWN0ID0gaWRcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWN0aXZlSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcHJvamVjdHMubWFwKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGUuaWQ7IH0pLmluZGV4T2YoYWN0aXZlUHJvamVjdClcbiAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBY3RpdmUoaWQpIHtcbiAgICAgICAgaWYgKGlkID09IGFjdGl2ZVByb2plY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChuYW1lKSB7XG4gICAgICAgIGxldCBwcm9qID0gbmV3IHByb2plY3QobmFtZSlcbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qKVxuICAgICAgICBpZiAocHJvamVjdHMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIHNldEFjdGl2ZShwcm9qLmlkKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0KSB7XG4gICAgICAgIHByb2plY3RzLnNwbGljZShwcm9qZWN0cy5pbmRleE9mKHByb2plY3QpLCAxKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGFjdGl2ZVByb2plY3Q6IGFjdGl2ZVByb2plY3QsXG4gICAgICAgIHByb2plY3RzOiBwcm9qZWN0cyxcbiAgICAgICAgcmV0dXJuUHJvamVjdHM6IHJldHVyblByb2plY3RzLFxuICAgICAgICBhZGRQcm9qZWN0OiBhZGRQcm9qZWN0LFxuICAgICAgICByZW1vdmVQcm9qZWN0OiByZW1vdmVQcm9qZWN0LFxuICAgICAgICBzZXRBY3RpdmU6IHNldEFjdGl2ZSxcbiAgICAgICAgY2hlY2tBY3RpdmU6IGNoZWNrQWN0aXZlLFxuICAgICAgICBhY3RpdmVJbmRleDogYWN0aXZlSW5kZXhcblxuICAgIH07XG5cbn0oKSlcblxuZXhwb3J0IGRlZmF1bHQgY29udGVudCIsImltcG9ydCB7IHRhc2sgfSBmcm9tICcuL3Rhc2snO1xuLy9Qcm9qZWN0IGNsYXNzXG5leHBvcnQgY2xhc3MgcHJvamVjdCB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdXG4gICAgICAgIHRoaXMuaWQgPSBcIlwiXG5cbiAgICAgICAgdGhpcy5pbml0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgczQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaWQgPSBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdElkKClcblxuICAgIH1cblxuICAgIC8vTWV0aG9kc1xuICAgIGFkZFRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKSB7XG4gICAgICAgIGxldCBudGFzayA9IG5ldyB0YXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSlcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKG50YXNrKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgdGFza3Muc3BsaWNlKHRhc2tzLmluZGV4T2YodGFzayksIDEpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzLmxlbmd0aDtcbiAgICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgdGFzayB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKXtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZVxuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlXG4gICAgfVxuXG4gICAgLy9NZXRob2RzXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9ICF0aGlzLmNvbXBsZXRlZFxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBkYXlzTGVmdCgpIHtcblxuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKClcbiAgICAgICAgY29uc3QgZGlmZiA9IHRoaXMuZHVlRGF0ZS5nZXRUaW1lKCkgLSB0b2RheS5nZXRUaW1lKClcbiAgICAgICAgY29uc3QgZGlmZkRheXMgPSBkaWZmIC8gKDEwMDAgKiAzNjAwICogMjQpXG5cbiAgICAgICAgcmV0dXJuIGRpZmZEYXlzXG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgY29udGVudCBmcm9tIFwiLi4vY2xhc3MvY29udGVudFwiXG5cbmNvbnN0IERPTWNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gZmFjdG9yeSgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgc2V0UHJvamVjdFRpdGxlOiBmdW5jdGlvbiAobmFtZSkgeyAgICBcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpXG4gICAgICAgICAgICBwcm9qZWN0VGl0bGUuaW5uZXJUZXh0ID0gbmFtZVxuXG4gICAgICAgIH0sICAgICAgICBcblxuICAgICAgICBzaG93UHJvamVjdHM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0JylcbiAgICAgICAgICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBjb250ZW50LnJldHVyblByb2plY3RzKClcblxuICAgICAgICAgICAgcHJvamVjdHNBcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICAgICAgbGkuaW5uZXJUZXh0ID0gZWxlbWVudC5uYW1lXG5cbiAgICAgICAgICAgICAgICBpZihjb250ZW50LmNoZWNrQWN0aXZlKGVsZW1lbnQuaWQpKXtcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zZXRQcm9qZWN0VGl0bGUoZWxlbWVudC5uYW1lKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuc2V0QWN0aXZlKGVsZW1lbnQuaWQpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Byb2plY3RzKClcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNldFByb2plY3RUaXRsZShlbGVtZW50Lm5hbWUpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChsaSlcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dUYXNrczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCB0YXNrQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWJvZHknKVxuICAgICAgICAgICAgdGFza0JvZHkuaW5uZXJIVE1MID0gXCJcIlxuICAgICAgICAgICAgY29uc3QgcHJvamVjdE9iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXVxuICAgICAgICAgICAgY29uc3QgdGFza0FycmF5ID0gcHJvamVjdE9iai50YXNrc1xuXG4gICAgICAgICAgICBpZiAodGFza0FycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0YXNrQXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXG4gICAgICAgICAgICAgICAgICAgIHJvdy5pbm5lckhUTUwgPSBgPHRkPiR7ZWxlbWVudC50aXRsZX08L3RkPjx0ZD4ke2VsZW1lbnQucHJpb3JpdHl9PC90ZD48dGQ+JHtlbGVtZW50LmR1ZURhdGV9PC90ZD5gXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgdGRgKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja2JveElubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YClcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hJbm5lci5jbGFzc0xpc3QuYWRkKGBjaGVja2JveGApXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmFwcGVuZENoaWxkKGNoZWNrYm94SW5uZXIpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY29tcGxldGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveElubmVyLmlubmVySFRNTCA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImljb24gaWNvbi10YWJsZXIgaWNvbi10YWJsZXItY2hlY2tcIiB3aWR0aD1cIjQ0XCIgaGVpZ2h0PVwiNDRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgZmlsbD1cIm5vbmVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48cGF0aCBkPVwiTTUgMTJsNSA1bDEwIC0xMFwiIC8+PC9zdmc+PC9kaXY+PC90ZD5gXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudG9nZ2xlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICByb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dEZXRhaWxzKGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGNoZWNrYm94KVxuICAgICAgICAgICAgICAgICAgICB0YXNrQm9keS5hcHBlbmRDaGlsZChyb3cpXG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd0RldGFpbHM6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAvL0RPTSBlbGVtZW50IGRlY2xhcmF0aW9uc1xuICAgICAgICAgICAgY29uc3QgZGV0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXRpdGxlJykgXG4gICAgICAgICAgICBjb25zdCBkZXREZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZGVzYycpIFxuICAgICAgICAgICAgY29uc3QgZGV0UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXByaW9yaXR5JykgXG4gICAgICAgICAgICBjb25zdCBkZXREdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kdWVEYXRlJykgXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW1lbnQpXG5cbiAgICAgICAgICAgIGRldFRpdGxlLnZhbHVlID0gZWxlbWVudC50aXRsZVxuICAgICAgICAgICAgZGV0RGVzY3JpcHRpb24udmFsdWUgPSBlbGVtZW50LmRlc2NyaXB0aW9uXG4gICAgICAgICAgICBkZXRQcmlvcml0eS52YWx1ZSA9IGVsZW1lbnQucHJpb3JpdHlcbiAgICAgICAgICAgIGRldER1ZURhdGUudmFsdWUgPSBlbGVtZW50LmR1ZURhdGVcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0oKSlcblxuZXhwb3J0IGRlZmF1bHQgRE9NY29udHJvbGxlciIsImltcG9ydCB7IHByb2plY3QgfSBmcm9tIFwiLi4vY2xhc3MvcHJvamVjdFwiXG5pbXBvcnQgeyB0YXNrIH0gZnJvbSBcIi4uL2NsYXNzL3Rhc2tcIlxuaW1wb3J0IGNvbnRlbnQgZnJvbSBcIi4uL2NsYXNzL2NvbnRlbnRcIlxuaW1wb3J0IERPTWNvbnRyb2xsZXIgZnJvbSBcIi4vRE9NY29udHJvbGxlclwiXG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RMaXN0ZW5lcihuYW1lKXtcblxuICAgIGNvbnRlbnQuYWRkUHJvamVjdChuYW1lKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Byb2plY3RzKClcbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFza0xpc3RlbmVyKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSl7XG5cbiAgICBjb25zdCBwcm9qZWN0T2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldXG4gICAgcHJvamVjdE9iai5hZGRUYXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSlcbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbn1cblxuZXhwb3J0IHtjcmVhdGVQcm9qZWN0TGlzdGVuZXIsIGNyZWF0ZVRhc2tMaXN0ZW5lcn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XG4gICAgY3JlYXRlVGFza0xpc3RlbmVyXG59IGZyb20gXCIuLi9jb250cm9sbGVycy9saXN0ZW5lcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGFza3MoKSB7XG5cbiAgICAvL2FkZCBwcm9qZWN0IG1vZGFsIGFwcGVuZCB0byBib2R5XG4gICAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0YXNrTW9kYWwuaWQgPSBcImFkZFRhc2tzXCJcblxuICAgIGNvbnN0IG1vZGFsQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbW9kYWxDb250LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKVxuICAgIHRhc2tNb2RhbC5hcHBlbmRDaGlsZChtb2RhbENvbnQpXG5cbiAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGNsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJylcbiAgICBjbG9zZUJ0bi5pbm5lckhUTUwgPSAnJnRpbWVzOydcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pXG5cbiAgICAvL01PZGFsIElucHV0c1xuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBuYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiXG4gICAgbmFtZUlucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciB0YXNrIG5hbWUgaGVyZVwiXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKG5hbWVJbnB1dClcblxuICAgIGNvbnN0IGRlc2NJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJylcbiAgICBkZXNjSW5wdXQucGxhY2Vob2xkZXIgPSBcIkVudGVyIGRlc2NyaXB0aW9uXCJcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQoZGVzY0lucHV0KVxuXG4gICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBwcmlvcml0eUlucHV0LnR5cGUgPSBcInRleHRcIlxuICAgIHByaW9yaXR5SW5wdXQucGxhY2Vob2xkZXIgPSBcIkVudGVyIHByaW9yaXR5XCJcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQocHJpb3JpdHlJbnB1dClcblxuICAgIGNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBkYXRlSW5wdXQudHlwZSA9IFwiZGF0ZVwiXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKGRhdGVJbnB1dClcblxuICAgIGNvbnN0IG1vZGFsU3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBtb2RhbFN1Ym1pdC5pbm5lclRleHQgPSBcIlN1Ym1pdFwiXG4gICAgbW9kYWxTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgbGV0IG5hbWUgPSBuYW1lSW5wdXQudmFsdWVcbiAgICAgICAgbGV0IGRlc2MgPSBkZXNjSW5wdXQudmFsdWVcbiAgICAgICAgbGV0IHByaW9yaXR5ID0gcHJpb3JpdHlJbnB1dC52YWx1ZVxuICAgICAgICBsZXQgZHVlZGF0ZSA9IGRhdGVJbnB1dC52YWx1ZVxuXG4gICAgICAgIGNyZWF0ZVRhc2tMaXN0ZW5lcihuYW1lLCBkZXNjLCBwcmlvcml0eSwgZHVlZGF0ZSlcblxuICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSBcIlwiXG4gICAgICAgIGRlc2NJbnB1dC52YWx1ZSA9IFwiXCJcbiAgICAgICAgcHJpb3JpdHlJbnB1dC52YWx1ZSA9IFwiXCJcbiAgICAgICAgZGF0ZUlucHV0LnZhbHVlID0gXCJcIlxuICAgICAgICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cbiAgICB9KVxuXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKG1vZGFsU3VibWl0KVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGFza01vZGFsKVxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIDxzcGFuPiAoeCksIGNsb3NlIHRoZSBtb2RhbFxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG4gICAgfSlcbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIG9mIHRoZSBtb2RhbCwgY2xvc2UgaXRcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IHRhc2tNb2RhbCkge1xuICAgICAgICAgICAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9NYWluIFByb2plY3RzIGNvbnRhaW5lclxuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0YXNrcy5jbGFzc0xpc3QuYWRkKCd0YXNrLWFyZWEnKVxuXG4gICAgLy9BZGQgdGFzayBidXR0b25cbiAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdhZGQnKVxuICAgIGFkZEJ0bi5pbm5lckhUTUwgPSAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLXBsdXNcIiB3aWR0aD1cIjQ0XCIgaGVpZ2h0PVwiNDRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgZmlsbD1cIm5vbmVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48bGluZSB4MT1cIjEyXCIgeTE9XCI1XCIgeDI9XCIxMlwiIHkyPVwiMTlcIiAvPjxsaW5lIHgxPVwiNVwiIHkxPVwiMTJcIiB4Mj1cIjE5XCIgeTI9XCIxMlwiIC8+PC9zdmc+J1xuICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG4gICAgfSlcbiAgICB0YXNrcy5hcHBlbmRDaGlsZChhZGRCdG4pXG5cbiAgICAvL1RhYmxlIGVsZW1lbnRcbiAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJylcblxuICAgIC8vSGVhZGVyIHJvdyBcbiAgICBjb25zdCB0aGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJylcbiAgICBjb25zdCB0aHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXG4gICAgY29uc3QgdGhUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgIHRoVGFzay5pbm5lckhUTUwgPSBcIlRhc2tcIlxuICAgIGNvbnN0IHRoUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpXG4gICAgdGhQcmlvcml0eS5pbm5lckhUTUwgPSBcIlByaW9yaXR5XCJcbiAgICBjb25zdCB0aER1ZT0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgIHRoRHVlLmlubmVySFRNTCA9IFwiRHVlIERhdGVcIlxuICAgIHRoci5hcHBlbmRDaGlsZCh0aFRhc2spXG4gICAgdGhyLmFwcGVuZENoaWxkKHRoUHJpb3JpdHkpXG4gICAgdGhyLmFwcGVuZENoaWxkKHRoRHVlKVxuICAgIHRoci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKVxuICAgIHRoZWFkLmFwcGVuZENoaWxkKHRocilcbiAgICB0YWJsZS5hcHBlbmRDaGlsZCh0aGVhZClcblxuICAgIC8vUGxhY2Vob2xkZXIgdGFibGUgcm93c1xuICAgIGNvbnN0IHRib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKVxuICAgIHRib2R5LmlkID0gXCJ0YXNrLWJvZHlcIlxuXG4gICAgdGFibGUuYXBwZW5kQ2hpbGQodGJvZHkpXG4gICAgdGFza3MuYXBwZW5kQ2hpbGQodGFibGUpXG5cbiAgICByZXR1cm4gdGFza3NcblxufSJdLCJzb3VyY2VSb290IjoiIn0=