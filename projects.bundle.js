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
/* harmony export */   "deleteTask": () => (/* binding */ deleteTask)
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
/*!************************************!*\
  !*** ./src/components/projects.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ projects)
/* harmony export */ });
/* harmony import */ var _controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/listeners.js */ "./src/controllers/listeners.js");


function projects() {

    //add project modal append to body
    const modal = document.createElement('div')
    modal.id = "addProject"
    const modalCont = document.createElement('div')
    modalCont.classList.add('modal-content')
    modal.appendChild(modalCont)
    const closeBtn = document.createElement('span')
    closeBtn.classList.add('close')
    closeBtn.innerHTML = '&times;'
    modalCont.appendChild(closeBtn)
    const modalInput = document.createElement('input')
    modalInput.type = "text"
    modalInput.placeholder = "Enter project name here"
    modalCont.appendChild(modalInput)
    const modalSubmit = document.createElement('button')
    modalSubmit.innerText = "Submit"
    modalSubmit.addEventListener('click', function () {
        let name = modalInput.value
        modal.style.display = "none";
        modalInput.value = ""
        ;(0,_controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__.createProjectListener)(name)
    })
    modalCont.appendChild(modalSubmit)
    document.body.appendChild(modal)
    // When the user clicks on <span> (x), close the modal
    closeBtn.onclick = function () {
        modal.style.display = "none";
    }
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    })
    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    //Main Projects container
    const projects = document.createElement('div')
    projects.classList.add('project-area')

    //Header of the projects list
    const head = document.createElement('div')
    head.classList.add('head')

    //Header text
    const title = document.createElement('div')
    title.classList.add('head-text')
    title.innerText = 'Projects'
    head.appendChild(title)

    const headControls = document.createElement('div')
    headControls.classList.add('head-control')

    //Add project button
    const add = document.createElement('div')
    add.classList.add('add-project')
    add.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>'
    headControls.appendChild(add)
    add.addEventListener('click', function () {
        modal.style.display = "block"
    })

    //Delete project button
    const deleteIcon = document.createElement('div')
    deleteIcon.classList.add('delete-project')
    deleteIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>'
    headControls.appendChild(deleteIcon)
    deleteIcon.addEventListener('click', function () {
        ;(0,_controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__.deleteProject)()
    })


    head.appendChild(headControls)
    projects.appendChild(head)

    //Project List
    const list = document.createElement('ul')
    list.id = 'project-list'
    projects.appendChild(list)

    return projects

}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvY29udGVudC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvdGFzay5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvRE9NY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RPUC1Uby1Eby8uL3NyYy9jb21wb25lbnRzL3Byb2plY3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEwQzs7QUFFMUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0QsYUFBYSxFQUFFO0FBQy9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLG1EQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQsaUVBQWUsTzs7Ozs7Ozs7Ozs7Ozs7O0FDekRlO0FBQzlCO0FBQ087O0FB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O0FBRUE7O0FBRUEsdUJBQXVCLDREQUFnQixDQUFDLCtEQUFtQjtBQUMzRDs7QUFFQTtBQUNBLElBQUksNkRBQXVCO0FBQzNCLElBQUksZ0VBQTBCOztBQUU5Qjs7Ozs7Ozs7VUM1REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNKcUM7O0FBRXRCOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUZBQXFCO0FBQzdCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHlFQUFhO0FBQ3JCLEtBQUs7OztBQUdMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQyIsImZpbGUiOiJwcm9qZWN0cy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9qZWN0IH0gZnJvbSBcIi4uL2NsYXNzL3Byb2plY3RcIlxuXG5jb25zdCBjb250ZW50ID0gKGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG5cbiAgICBsZXQgcHJvamVjdHMgPSBbXVxuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gXCJcIlxuXG4gICAgZnVuY3Rpb24gcmV0dXJuUHJvamVjdHMoKSB7XG4gICAgICAgIHJldHVybiBwcm9qZWN0c1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEFjdGl2ZShpZCkge1xuICAgICAgICBhY3RpdmVQcm9qZWN0ID0gaWRcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWN0aXZlSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcHJvamVjdHMubWFwKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGUuaWQ7IH0pLmluZGV4T2YoYWN0aXZlUHJvamVjdClcbiAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBY3RpdmUoaWQpIHtcbiAgICAgICAgaWYgKGlkID09IGFjdGl2ZVByb2plY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChuYW1lKSB7XG4gICAgICAgIGxldCBwcm9qID0gbmV3IHByb2plY3QobmFtZSlcbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qKVxuICAgICAgICBpZiAocHJvamVjdHMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIHNldEFjdGl2ZShwcm9qLmlkKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0KSB7XG4gICAgICAgIHByb2plY3RzLnNwbGljZShwcm9qZWN0cy5pbmRleE9mKHByb2plY3QpLCAxKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGFjdGl2ZVByb2plY3Q6IGFjdGl2ZVByb2plY3QsXG4gICAgICAgIHByb2plY3RzOiBwcm9qZWN0cyxcbiAgICAgICAgcmV0dXJuUHJvamVjdHM6IHJldHVyblByb2plY3RzLFxuICAgICAgICBhZGRQcm9qZWN0OiBhZGRQcm9qZWN0LFxuICAgICAgICByZW1vdmVQcm9qZWN0OiByZW1vdmVQcm9qZWN0LFxuICAgICAgICBzZXRBY3RpdmU6IHNldEFjdGl2ZSxcbiAgICAgICAgY2hlY2tBY3RpdmU6IGNoZWNrQWN0aXZlLFxuICAgICAgICBhY3RpdmVJbmRleDogYWN0aXZlSW5kZXhcblxuICAgIH07XG5cbn0oKSlcblxuZXhwb3J0IGRlZmF1bHQgY29udGVudCIsImltcG9ydCB7IHRhc2sgfSBmcm9tICcuL3Rhc2snO1xuLy9Qcm9qZWN0IGNsYXNzXG5leHBvcnQgY2xhc3MgcHJvamVjdCB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdXG4gICAgICAgIHRoaXMuaWQgPSBcIlwiXG4gICAgICAgIHRoaXMuYWN0aXZlVGFzayA9IFwiXCJcblxuICAgICAgICB0aGlzLmluaXRJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBzNCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pZCA9IHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0SWQoKVxuXG4gICAgfVxuXG4gICAgLy9NZXRob2RzXG4gICAgYWRkVGFzayhuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpIHtcbiAgICAgICAgbGV0IG50YXNrID0gbmV3IHRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKVxuICAgICAgICB0aGlzLnRhc2tzLnB1c2gobnRhc2spXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJlbW92ZVRhc2sodGFzaykge1xuICAgICAgICB0aGlzLnRhc2tzLnNwbGljZSh0aGlzLnRhc2tzLmluZGV4T2YodGFzayksIDEpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNldEFjdGl2ZShwYXNzZWRpZCkge1xuICAgICAgICBhY3RpdmVUYXNrID0gcGFzc2VkaWRcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY2hlY2tBY3RpdmUocGFzc2VkaWQpIHtcbiAgICAgICAgaWYgKHBhc3NlZGlkID09IGFjdGl2ZVRhc2spIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgYWN0aXZlSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy50YXNrcy5tYXAoZnVuY3Rpb24oZSkgeyByZXR1cm4gZS5pZDsgfSkuaW5kZXhPZih0aGlzLmFjdGl2ZVRhc2spXG4gICAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyB0YXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpe1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eVxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlXG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2VcbiAgICAgICAgdGhpcy5pZCA9IFwiXCJcblxuICAgICAgICB0aGlzLmluaXRJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBzNCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pZCA9IHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0SWQoKVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvL01ldGhvZHNcbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGRheXNMZWZ0KCkge1xuXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKVxuICAgICAgICBjb25zdCBkaWZmID0gdGhpcy5kdWVEYXRlLmdldFRpbWUoKSAtIHRvZGF5LmdldFRpbWUoKVxuICAgICAgICBjb25zdCBkaWZmRGF5cyA9IGRpZmYgLyAoMTAwMCAqIDM2MDAgKiAyNClcblxuICAgICAgICByZXR1cm4gZGlmZkRheXNcblxuICAgIH1cblxufSIsImltcG9ydCBjb250ZW50IGZyb20gXCIuLi9jbGFzcy9jb250ZW50XCJcblxuY29uc3QgRE9NY29udHJvbGxlciA9IChmdW5jdGlvbiBmYWN0b3J5KCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBzZXRQcm9qZWN0VGl0bGU6IGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUnKVxuICAgICAgICAgICAgcHJvamVjdFRpdGxlLmlubmVyVGV4dCA9IG5hbWVcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dQcm9qZWN0czogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKVxuICAgICAgICAgICAgcHJvamVjdExpc3QuaW5uZXJIVE1MID0gXCJcIlxuICAgICAgICAgICAgY29uc3QgcHJvamVjdHNBcnJheSA9IGNvbnRlbnQucmV0dXJuUHJvamVjdHMoKVxuXG4gICAgICAgICAgICBwcm9qZWN0c0FycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgICAgICBsaS5pbm5lclRleHQgPSBlbGVtZW50Lm5hbWVcblxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50LmNoZWNrQWN0aXZlKGVsZW1lbnQuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2V0UHJvamVjdFRpdGxlKGVsZW1lbnQubmFtZSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5zZXRBY3RpdmUoZWxlbWVudC5pZClcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93UHJvamVjdHMoKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2V0UHJvamVjdFRpdGxlKGVsZW1lbnQubmFtZSlcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQobGkpXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dUYXNrczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCB0YXNrQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWJvZHknKVxuICAgICAgICAgICAgdGFza0JvZHkuaW5uZXJIVE1MID0gXCJcIlxuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0T2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvamVjdE9iaiAhPT0gXCJ1bmRlZmluZWRcIikge1xuXG4gICAgICAgICAgICAgICAgbGV0IHRhc2tBcnJheSA9IHByb2plY3RPYmoudGFza3NcbiAgICAgICAgICAgICAgICBpZiAodGFza0FycmF5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICB0YXNrQXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCA9PSBwcm9qZWN0T2JqLmFjdGl2ZVRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuaW5uZXJIVE1MID0gYDx0ZCBzdHlsZT1cImJvcmRlci10b3A6IDFweCBzb2xpZCAjRTRGRjc2OyBib3JkZXItbGVmdDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTRGRjc2O1wiID4ke2VsZW1lbnQudGl0bGV9PC90ZD48dGQgc3R5bGU9XCJib3JkZXItdG9wOiAxcHggc29saWQgI0U0RkY3NjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFNEZGNzY7XCI+JHtlbGVtZW50LnByaW9yaXR5fTwvdGQ+PHRkIHN0eWxlPVwiYm9yZGVyLXRvcDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTRGRjc2O1wiPiR7ZWxlbWVudC5kdWVEYXRlfTwvdGQ+YFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuaW5uZXJIVE1MID0gYDx0ZD4ke2VsZW1lbnQudGl0bGV9PC90ZD48dGQ+JHtlbGVtZW50LnByaW9yaXR5fTwvdGQ+PHRkPiR7ZWxlbWVudC5kdWVEYXRlfTwvdGQ+YFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHRkYClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94SW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hJbm5lci5jbGFzc0xpc3QuYWRkKGBjaGVja2JveGApXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5hcHBlbmRDaGlsZChjaGVja2JveElubmVyKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCA9PSBwcm9qZWN0T2JqLmFjdGl2ZVRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5zdHlsZS5ib3JkZXJUb3AgPSAnMXB4IHNvbGlkICNFNEZGNzYnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guc3R5bGUuYm9yZGVyUmlnaHQgPSAnMXB4IHNvbGlkICNFNEZGNzYnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guc3R5bGUuYm9yZGVyQm90dG9tID0gJzFweCBzb2xpZCAjRTRGRjc2J1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveElubmVyLmlubmVySFRNTCA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImljb24gaWNvbi10YWJsZXIgaWNvbi10YWJsZXItY2hlY2tcIiB3aWR0aD1cIjQ0XCIgaGVpZ2h0PVwiNDRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgZmlsbD1cIm5vbmVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48cGF0aCBkPVwiTTUgMTJsNSA1bDEwIC0xMFwiIC8+PC9zdmc+PC9kaXY+PC90ZD5gXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudG9nZ2xlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2tJRCA9IGVsZW1lbnQuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0uYWN0aXZlVGFzayA9IHRhc2tJRFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dEZXRhaWxzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjaGVja2JveClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tCb2R5LmFwcGVuZENoaWxkKHJvdylcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd0RldGFpbHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vRE9NIGVsZW1lbnQgZGVjbGFyYXRpb25zXG5cbiAgICAgICAgICAgIGxldCB0YXNrT2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzW2NvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS5hY3RpdmVJbmRleCgpXVxuXG4gICAgICAgICAgICBpZiAoIXRhc2tPYmopIHtcbiAgICAgICAgICAgICAgICB0YXNrT2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzWzBdXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGRldFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC10aXRsZScpXG4gICAgICAgICAgICBjb25zdCBkZXREZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZGVzYycpXG4gICAgICAgICAgICBjb25zdCBkZXRQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtcHJpb3JpdHknKVxuICAgICAgICAgICAgY29uc3QgZGV0RHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtZHVlRGF0ZScpXG5cbiAgICAgICAgICAgIGRldFRpdGxlLnZhbHVlID0gdGFza09iai50aXRsZVxuICAgICAgICAgICAgZGV0RGVzY3JpcHRpb24udmFsdWUgPSB0YXNrT2JqLmRlc2NyaXB0aW9uXG4gICAgICAgICAgICBkZXRQcmlvcml0eS52YWx1ZSA9IHRhc2tPYmoucHJpb3JpdHlcbiAgICAgICAgICAgIGRldER1ZURhdGUudmFsdWUgPSB0YXNrT2JqLmR1ZURhdGVcblxuICAgICAgICB9LFxuXG4gICAgICAgIGJsYW5rRGV0YWlsczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBkZXRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtdGl0bGUnKVxuICAgICAgICAgICAgY29uc3QgZGV0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWRlc2MnKVxuICAgICAgICAgICAgY29uc3QgZGV0UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXByaW9yaXR5JylcbiAgICAgICAgICAgIGNvbnN0IGRldER1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWR1ZURhdGUnKVxuXG4gICAgICAgICAgICBkZXRUaXRsZS52YWx1ZSA9ICcnXG4gICAgICAgICAgICBkZXREZXNjcmlwdGlvbi52YWx1ZSA9ICcnXG4gICAgICAgICAgICBkZXRQcmlvcml0eS52YWx1ZSA9ICcnXG4gICAgICAgICAgICBkZXREdWVEYXRlLnZhbHVlID0gJydcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0oKSlcblxuZXhwb3J0IGRlZmF1bHQgRE9NY29udHJvbGxlciIsImltcG9ydCB7IHByb2plY3QgfSBmcm9tIFwiLi4vY2xhc3MvcHJvamVjdFwiXG5pbXBvcnQgeyB0YXNrIH0gZnJvbSBcIi4uL2NsYXNzL3Rhc2tcIlxuaW1wb3J0IGNvbnRlbnQgZnJvbSBcIi4uL2NsYXNzL2NvbnRlbnRcIlxuaW1wb3J0IERPTWNvbnRyb2xsZXIgZnJvbSBcIi4vRE9NY29udHJvbGxlclwiXG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RMaXN0ZW5lcihuYW1lKXtcblxuICAgIGNvbnRlbnQuYWRkUHJvamVjdChuYW1lKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Byb2plY3RzKClcbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFza0xpc3RlbmVyKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSl7XG5cbiAgICBjb25zdCBwcm9qZWN0T2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldXG4gICAgcHJvamVjdE9iai5hZGRUYXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSlcbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbn1cblxuZnVuY3Rpb24gY2hhbmdlRGV0YWlsKCkge1xuXG4gICAgY29uc3QgdGFza09iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1tjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0uYWN0aXZlSW5kZXgoKV1cblxuICAgIHRhc2tPYmoudGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXRpdGxlJykudmFsdWVcbiAgICB0YXNrT2JqLmRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kZXNjJykudmFsdWVcbiAgICB0YXNrT2JqLnByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1wcmlvcml0eScpLnZhbHVlXG4gICAgdGFza09iai5kdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kdWVEYXRlJykudmFsdWVcblxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICBET01jb250cm9sbGVyLnNob3dEZXRhaWxzKClcblxuICAgIC8vY29uc29sZS5sb2codGFza09iailcblxufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KCkge1xuICAgIFxuICAgIGlmIChjb250ZW50LnByb2plY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHByb2plY3RPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV1cbiAgICAgICAgY29udGVudC5yZW1vdmVQcm9qZWN0KHByb2plY3RPYmopXG4gICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Byb2plY3RzKClcbiAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgICAgICBET01jb250cm9sbGVyLmJsYW5rRGV0YWlscygpXG5cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gZGVsZXRlVGFzaygpIHtcblxuICAgIGNvbnN0IHByb2plY3RPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV1cbiAgICBjb25zdCB0YXNrT2JqID0gcHJvamVjdE9iai50YXNrc1twcm9qZWN0T2JqLmFjdGl2ZUluZGV4KCldXG5cbiAgICBwcm9qZWN0T2JqLnJlbW92ZVRhc2sodGFza09iailcbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgRE9NY29udHJvbGxlci5ibGFua0RldGFpbHMoKVxuXG59XG5cbmV4cG9ydCB7Y3JlYXRlUHJvamVjdExpc3RlbmVyLCBjcmVhdGVUYXNrTGlzdGVuZXIsIGNoYW5nZURldGFpbCwgZGVsZXRlUHJvamVjdCwgZGVsZXRlVGFza30iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XG4gICAgY3JlYXRlUHJvamVjdExpc3RlbmVyLCBkZWxldGVQcm9qZWN0XG59IGZyb20gXCIuLi9jb250cm9sbGVycy9saXN0ZW5lcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvamVjdHMoKSB7XG5cbiAgICAvL2FkZCBwcm9qZWN0IG1vZGFsIGFwcGVuZCB0byBib2R5XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIG1vZGFsLmlkID0gXCJhZGRQcm9qZWN0XCJcbiAgICBjb25zdCBtb2RhbENvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIG1vZGFsQ29udC5jbGFzc0xpc3QuYWRkKCdtb2RhbC1jb250ZW50JylcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbENvbnQpXG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBjbG9zZUJ0bi5jbGFzc0xpc3QuYWRkKCdjbG9zZScpXG4gICAgY2xvc2VCdG4uaW5uZXJIVE1MID0gJyZ0aW1lczsnXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKGNsb3NlQnRuKVxuICAgIGNvbnN0IG1vZGFsSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgbW9kYWxJbnB1dC50eXBlID0gXCJ0ZXh0XCJcbiAgICBtb2RhbElucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciBwcm9qZWN0IG5hbWUgaGVyZVwiXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKG1vZGFsSW5wdXQpXG4gICAgY29uc3QgbW9kYWxTdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIG1vZGFsU3VibWl0LmlubmVyVGV4dCA9IFwiU3VibWl0XCJcbiAgICBtb2RhbFN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IG5hbWUgPSBtb2RhbElucHV0LnZhbHVlXG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgbW9kYWxJbnB1dC52YWx1ZSA9IFwiXCJcbiAgICAgICAgY3JlYXRlUHJvamVjdExpc3RlbmVyKG5hbWUpXG4gICAgfSlcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQobW9kYWxTdWJtaXQpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbClcbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiA8c3Bhbj4gKHgpLCBjbG9zZSB0aGUgbW9kYWxcbiAgICBjbG9zZUJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0pXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgb3V0c2lkZSBvZiB0aGUgbW9kYWwsIGNsb3NlIGl0XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gbW9kYWwpIHtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9NYWluIFByb2plY3RzIGNvbnRhaW5lclxuICAgIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBwcm9qZWN0cy5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWFyZWEnKVxuXG4gICAgLy9IZWFkZXIgb2YgdGhlIHByb2plY3RzIGxpc3RcbiAgICBjb25zdCBoZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBoZWFkLmNsYXNzTGlzdC5hZGQoJ2hlYWQnKVxuXG4gICAgLy9IZWFkZXIgdGV4dFxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCdoZWFkLXRleHQnKVxuICAgIHRpdGxlLmlubmVyVGV4dCA9ICdQcm9qZWN0cydcbiAgICBoZWFkLmFwcGVuZENoaWxkKHRpdGxlKVxuXG4gICAgY29uc3QgaGVhZENvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBoZWFkQ29udHJvbHMuY2xhc3NMaXN0LmFkZCgnaGVhZC1jb250cm9sJylcblxuICAgIC8vQWRkIHByb2plY3QgYnV0dG9uXG4gICAgY29uc3QgYWRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBhZGQuY2xhc3NMaXN0LmFkZCgnYWRkLXByb2plY3QnKVxuICAgIGFkZC5pbm5lckhUTUwgPSAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLXBsdXNcIiB3aWR0aD1cIjQ0XCIgaGVpZ2h0PVwiNDRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgZmlsbD1cIm5vbmVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48bGluZSB4MT1cIjEyXCIgeTE9XCI1XCIgeDI9XCIxMlwiIHkyPVwiMTlcIiAvPjxsaW5lIHgxPVwiNVwiIHkxPVwiMTJcIiB4Mj1cIjE5XCIgeTI9XCIxMlwiIC8+PC9zdmc+J1xuICAgIGhlYWRDb250cm9scy5hcHBlbmRDaGlsZChhZGQpXG4gICAgYWRkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG4gICAgfSlcblxuICAgIC8vRGVsZXRlIHByb2plY3QgYnV0dG9uXG4gICAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdkZWxldGUtcHJvamVjdCcpXG4gICAgZGVsZXRlSWNvbi5pbm5lckhUTUwgPSAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLXRyYXNoXCIgd2lkdGg9XCI0NFwiIGhlaWdodD1cIjQ0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGZpbGw9XCJub25lXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PGxpbmUgeDE9XCI0XCIgeTE9XCI3XCIgeDI9XCIyMFwiIHkyPVwiN1wiIC8+PGxpbmUgeDE9XCIxMFwiIHkxPVwiMTFcIiB4Mj1cIjEwXCIgeTI9XCIxN1wiIC8+PGxpbmUgeDE9XCIxNFwiIHkxPVwiMTFcIiB4Mj1cIjE0XCIgeTI9XCIxN1wiIC8+PHBhdGggZD1cIk01IDdsMSAxMmEyIDIgMCAwIDAgMiAyaDhhMiAyIDAgMCAwIDIgLTJsMSAtMTJcIiAvPjxwYXRoIGQ9XCJNOSA3di0zYTEgMSAwIDAgMSAxIC0xaDRhMSAxIDAgMCAxIDEgMXYzXCIgLz48L3N2Zz4nXG4gICAgaGVhZENvbnRyb2xzLmFwcGVuZENoaWxkKGRlbGV0ZUljb24pXG4gICAgZGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVsZXRlUHJvamVjdCgpXG4gICAgfSlcblxuXG4gICAgaGVhZC5hcHBlbmRDaGlsZChoZWFkQ29udHJvbHMpXG4gICAgcHJvamVjdHMuYXBwZW5kQ2hpbGQoaGVhZClcblxuICAgIC8vUHJvamVjdCBMaXN0XG4gICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBsaXN0LmlkID0gJ3Byb2plY3QtbGlzdCdcbiAgICBwcm9qZWN0cy5hcHBlbmRDaGlsZChsaXN0KVxuXG4gICAgcmV0dXJuIHByb2plY3RzXG5cbn0iXSwic291cmNlUm9vdCI6IiJ9