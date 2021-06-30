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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvY29udGVudC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvdGFzay5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvRE9NY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RPUC1Uby1Eby8uL3NyYy9jb21wb25lbnRzL3Byb2plY3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFeUI7QUFDK0I7O0FBRXhEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsbURBQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFD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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7OztBQ0pxQzs7QUFFdEI7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRkFBcUI7QUFDN0IsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEseUVBQWE7QUFDckIsS0FBSzs7O0FBR0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDIiwiZmlsZSI6InByb2plY3RzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgcHJvamVjdFxufSBmcm9tIFwiLi4vY2xhc3MvcHJvamVjdFwiXG5pbXBvcnQgRE9NY29udHJvbGxlciBmcm9tIFwiLi4vY29udHJvbGxlcnMvRE9NY29udHJvbGxlclwiXG5cbmNvbnN0IGNvbnRlbnQgPSAoZnVuY3Rpb24gZmFjdG9yeSgpIHtcblxuICAgIGxldCBwcm9qZWN0cyA9IFtdXG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBcIlwiXG4gICAgbGV0IHNvcnRUaXRsZSA9IDBcbiAgICBsZXQgc29ydFByaW9yaXR5ID0gMFxuICAgIGxldCBzb3J0RHVlID0gMFxuICAgIGNvbnN0IG15U3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2VcblxuICAgIGZ1bmN0aW9uIHJldHVyblByb2plY3RzKCkge1xuICAgICAgICByZXR1cm4gcHJvamVjdHNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRBY3RpdmUoaWQpIHtcbiAgICAgICAgYWN0aXZlUHJvamVjdCA9IGlkXG4gICAgICAgIGNvbnRlbnQuc2V0U3RvcmFnZSgpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFjdGl2ZUluZGV4KCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHByb2plY3RzLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUuaWQ7XG4gICAgICAgIH0pLmluZGV4T2YoYWN0aXZlUHJvamVjdClcbiAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBY3RpdmUoaWQpIHtcbiAgICAgICAgaWYgKGlkID09IGFjdGl2ZVByb2plY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChuYW1lKSB7XG4gICAgICAgIGxldCBwcm9qID0gbmV3IHByb2plY3QobmFtZSlcbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qKVxuICAgICAgICBpZiAocHJvamVjdHMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIHNldEFjdGl2ZShwcm9qLmlkKVxuICAgICAgICB9XG4gICAgICAgIHNldFN0b3JhZ2UoKVxuICAgICAgICByZXR1cm4gMVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVByb2plY3QocHJvamVjdCkge1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UocHJvamVjdHMuaW5kZXhPZihwcm9qZWN0KSwgMSlcbiAgICAgICAgICAgIHNldFN0b3JhZ2UoKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRTdG9yYWdlKCkge1xuXG4gICAgICAgIG15U3RvcmFnZS5zZXRJdGVtKCdhY3RpdmUnLCBhY3RpdmVQcm9qZWN0KVxuXG4gICAgICAgIGNvbnN0IHRlbXBQcm9qZWN0cyA9IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQucHJvamVjdHMpXG4gICAgICAgIG15U3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIHRlbXBQcm9qZWN0cylcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFN0b3JhZ2UoKSB7XG5cbiAgICAgICAgY29uc3Qgc3RvcmVkQWN0aXZlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjdGl2ZScpXG5cbiAgICAgICAgaWYgKHN0b3JlZEFjdGl2ZSkge1xuXG4gICAgICAgICAgICBjb25zdCBzdG9yZWRQcm9qZWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpXG4gICAgICAgICAgICBsZXQgc1Byb2pQYXJzZWQgPSBKU09OLnBhcnNlKHN0b3JlZFByb2plY3RzKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBzUHJvalBhcnNlZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29udGVudC5hZGRQcm9qZWN0KGVsZW1lbnQubmFtZSlcbiAgICAgICAgICAgICAgICBsZXQgbGFzdEtleSA9IGNvbnRlbnQucHJvamVjdHMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgIGxldCBsYXN0UHJvamVjdCA9IGNvbnRlbnQucHJvamVjdHNbbGFzdEtleV1cblxuICAgICAgICAgICAgICAgIGVsZW1lbnQudGFza3MuZm9yRWFjaCh0YXNrTG9jYWwgPT4geyAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGFzdFByb2plY3QuYWRkVGFzayh0YXNrTG9jYWwudGl0bGUsIHRhc2tMb2NhbC5kZXNjcmlwdGlvbiwgdGFza0xvY2FsLnByaW9yaXR5LCB0YXNrTG9jYWwuZHVlRGF0ZSlcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICBcbiAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Byb2plY3RzKClcbiAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHNvcnRUaXRsZTogc29ydFRpdGxlLFxuICAgICAgICBzb3J0UHJpb3JpdHk6IHNvcnRQcmlvcml0eSxcbiAgICAgICAgc29ydER1ZTogc29ydER1ZSxcbiAgICAgICAgYWN0aXZlUHJvamVjdDogYWN0aXZlUHJvamVjdCxcbiAgICAgICAgcHJvamVjdHM6IHByb2plY3RzLFxuICAgICAgICByZXR1cm5Qcm9qZWN0czogcmV0dXJuUHJvamVjdHMsXG4gICAgICAgIGFkZFByb2plY3Q6IGFkZFByb2plY3QsXG4gICAgICAgIHJlbW92ZVByb2plY3Q6IHJlbW92ZVByb2plY3QsXG4gICAgICAgIHNldEFjdGl2ZTogc2V0QWN0aXZlLFxuICAgICAgICByZW1vdmVQcm9qZWN0OiByZW1vdmVQcm9qZWN0LFxuICAgICAgICBzZXRBY3RpdmU6IHNldEFjdGl2ZSxcbiAgICAgICAgY2hlY2tBY3RpdmU6IGNoZWNrQWN0aXZlLFxuICAgICAgICBhY3RpdmVJbmRleDogYWN0aXZlSW5kZXgsXG4gICAgICAgIHNldFN0b3JhZ2U6IHNldFN0b3JhZ2UsXG4gICAgICAgIGdldFN0b3JhZ2U6IGdldFN0b3JhZ2VcblxuICAgIH07XG5cbn0oKSlcblxuZXhwb3J0IGRlZmF1bHQgY29udGVudCIsImltcG9ydCB7IHRhc2sgfSBmcm9tICcuL3Rhc2snO1xuaW1wb3J0IGNvbnRlbnQgZnJvbSBcIi4vY29udGVudFwiXG5cbi8vUHJvamVjdCBjbGFzc1xuZXhwb3J0IGNsYXNzIHByb2plY3Qge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMudGFza3MgPSBbXVxuICAgICAgICB0aGlzLmlkID0gXCJcIlxuICAgICAgICB0aGlzLmFjdGl2ZVRhc2sgPSBcIlwiXG5cbiAgICAgICAgdGhpcy5pbml0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgczQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaWQgPSBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdElkKClcblxuICAgIH1cblxuICAgIC8vTWV0aG9kc1xuICAgIGFkZFRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKSB7XG4gICAgICAgIGxldCBudGFzayA9IG5ldyB0YXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSlcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKG50YXNrKVxuICAgICAgICBjb250ZW50LnNldFN0b3JhZ2UoKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UodGhpcy50YXNrcy5pbmRleE9mKHRhc2spLCAxKVxuICAgICAgICBjb250ZW50LnNldFN0b3JhZ2UoKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXRBY3RpdmUocGFzc2VkaWQpIHtcbiAgICAgICAgYWN0aXZlVGFzayA9IHBhc3NlZGlkXG4gICAgICAgIGNvbnRlbnQuc2V0U3RvcmFnZSgpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNoZWNrQWN0aXZlKHBhc3NlZGlkKSB7XG4gICAgICAgIGlmIChwYXNzZWRpZCA9PSBhY3RpdmVUYXNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGFjdGl2ZUluZGV4KCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMudGFza3MubWFwKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGUuaWQ7IH0pLmluZGV4T2YodGhpcy5hY3RpdmVUYXNrKVxuICAgICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbn0iLCJpbXBvcnQgY29udGVudCBmcm9tIFwiLi9jb250ZW50XCJcblxuZXhwb3J0IGNsYXNzIHRhc2sge1xuXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSl7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25cbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZVxuICAgICAgICB0aGlzLmlkID0gXCJcIlxuXG4gICAgICAgIHRoaXMuaW5pdElkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHM0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlkID0gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRJZCgpXG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vTWV0aG9kc1xuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSAhdGhpcy5jb21wbGV0ZWRcbiAgICAgICAgY29udGVudC5zZXRTdG9yYWdlKClcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZGF5c0xlZnQoKSB7XG5cbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gICAgICAgIGNvbnN0IGRpZmYgPSB0aGlzLmR1ZURhdGUuZ2V0VGltZSgpIC0gdG9kYXkuZ2V0VGltZSgpXG4gICAgICAgIGNvbnN0IGRpZmZEYXlzID0gZGlmZiAvICgxMDAwICogMzYwMCAqIDI0KVxuXG4gICAgICAgIHJldHVybiBkaWZmRGF5c1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IGNvbnRlbnQgZnJvbSBcIi4uL2NsYXNzL2NvbnRlbnRcIlxuXG5jb25zdCBET01jb250cm9sbGVyID0gKGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHNldFByb2plY3RUaXRsZTogZnVuY3Rpb24gKG5hbWUpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpXG4gICAgICAgICAgICBwcm9qZWN0VGl0bGUuaW5uZXJUZXh0ID0gbmFtZVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd1Byb2plY3RzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpXG4gICAgICAgICAgICBwcm9qZWN0TGlzdC5pbm5lckhUTUwgPSBcIlwiXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0c0FycmF5ID0gY29udGVudC5yZXR1cm5Qcm9qZWN0cygpXG5cbiAgICAgICAgICAgIHByb2plY3RzQXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAgICAgICAgIGxpLmlubmVyVGV4dCA9IGVsZW1lbnQubmFtZVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuY2hlY2tBY3RpdmUoZWxlbWVudC5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zZXRQcm9qZWN0VGl0bGUoZWxlbWVudC5uYW1lKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNldEFjdGl2ZShlbGVtZW50LmlkKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dQcm9qZWN0cygpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zZXRQcm9qZWN0VGl0bGUoZWxlbWVudC5uYW1lKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChsaSlcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd1Rhc2tzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRhc2tCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stYm9keScpXG4gICAgICAgICAgICB0YXNrQm9keS5pbm5lckhUTUwgPSBcIlwiXG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9qZWN0T2JqICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgdGFza0FycmF5ID0gcHJvamVjdE9iai50YXNrc1xuXG4gICAgICAgICAgICAgICAgaWYgKHRhc2tBcnJheS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGFza0FycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaWQgPT0gcHJvamVjdE9iai5hY3RpdmVUYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmlubmVySFRNTCA9IGA8dGQgc3R5bGU9XCJib3JkZXItdG9wOiAxcHggc29saWQgI0U0RkY3NjsgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjRTRGRjc2OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0U0RkY3NjtcIiA+JHtlbGVtZW50LnRpdGxlfTwvdGQ+PHRkIHN0eWxlPVwiYm9yZGVyLXRvcDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTRGRjc2O1wiPiR7ZWxlbWVudC5wcmlvcml0eX08L3RkPjx0ZCBzdHlsZT1cImJvcmRlci10b3A6IDFweCBzb2xpZCAjRTRGRjc2OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0U0RkY3NjtcIj4ke2VsZW1lbnQuZHVlRGF0ZX08L3RkPmBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmlubmVySFRNTCA9IGA8dGQ+JHtlbGVtZW50LnRpdGxlfTwvdGQ+PHRkPiR7ZWxlbWVudC5wcmlvcml0eX08L3RkPjx0ZD4ke2VsZW1lbnQuZHVlRGF0ZX08L3RkPmBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGB0ZGApXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja2JveElubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94SW5uZXIuY2xhc3NMaXN0LmFkZChgY2hlY2tib3hgKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guYXBwZW5kQ2hpbGQoY2hlY2tib3hJbm5lcilcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaWQgPT0gcHJvamVjdE9iai5hY3RpdmVUYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guc3R5bGUuYm9yZGVyVG9wID0gJzFweCBzb2xpZCAjRTRGRjc2J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LnN0eWxlLmJvcmRlclJpZ2h0ID0gJzFweCBzb2xpZCAjRTRGRjc2J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LnN0eWxlLmJvcmRlckJvdHRvbSA9ICcxcHggc29saWQgI0U0RkY3NidcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY29tcGxldGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hJbm5lci5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWNoZWNrXCIgd2lkdGg9XCI0NFwiIGhlaWdodD1cIjQ0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGZpbGw9XCJub25lXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PHBhdGggZD1cIk01IDEybDUgNWwxMCAtMTBcIiAvPjwvc3ZnPjwvZGl2PjwvdGQ+YFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnRvZ2dsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXNrSUQgPSBlbGVtZW50LmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLmFjdGl2ZVRhc2sgPSB0YXNrSURcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93RGV0YWlscygpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2hlY2tib3gpXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrQm9keS5hcHBlbmRDaGlsZChyb3cpXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dEZXRhaWxzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL0RPTSBlbGVtZW50IGRlY2xhcmF0aW9uc1xuXG4gICAgICAgICAgICBsZXQgdGFza09iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1tjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0uYWN0aXZlSW5kZXgoKV1cblxuICAgICAgICAgICAgaWYgKCF0YXNrT2JqKSB7XG4gICAgICAgICAgICAgICAgdGFza09iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1swXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBkZXRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtdGl0bGUnKVxuICAgICAgICAgICAgY29uc3QgZGV0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWRlc2MnKVxuICAgICAgICAgICAgY29uc3QgZGV0UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXByaW9yaXR5JylcbiAgICAgICAgICAgIGNvbnN0IGRldER1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWR1ZURhdGUnKVxuXG4gICAgICAgICAgICBkZXRUaXRsZS52YWx1ZSA9IHRhc2tPYmoudGl0bGVcbiAgICAgICAgICAgIGRldERlc2NyaXB0aW9uLnZhbHVlID0gdGFza09iai5kZXNjcmlwdGlvblxuICAgICAgICAgICAgZGV0UHJpb3JpdHkudmFsdWUgPSB0YXNrT2JqLnByaW9yaXR5XG4gICAgICAgICAgICBkZXREdWVEYXRlLnZhbHVlID0gdGFza09iai5kdWVEYXRlXG5cbiAgICAgICAgfSxcblxuICAgICAgICBibGFua0RldGFpbHM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3QgZGV0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXRpdGxlJylcbiAgICAgICAgICAgIGNvbnN0IGRldERlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kZXNjJylcbiAgICAgICAgICAgIGNvbnN0IGRldFByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1wcmlvcml0eScpXG4gICAgICAgICAgICBjb25zdCBkZXREdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kdWVEYXRlJylcblxuICAgICAgICAgICAgZGV0VGl0bGUudmFsdWUgPSAnJ1xuICAgICAgICAgICAgZGV0RGVzY3JpcHRpb24udmFsdWUgPSAnJ1xuICAgICAgICAgICAgZGV0UHJpb3JpdHkudmFsdWUgPSAnJ1xuICAgICAgICAgICAgZGV0RHVlRGF0ZS52YWx1ZSA9ICcnXG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59KCkpXG5cbmV4cG9ydCBkZWZhdWx0IERPTWNvbnRyb2xsZXIiLCJpbXBvcnQgeyBwcm9qZWN0IH0gZnJvbSBcIi4uL2NsYXNzL3Byb2plY3RcIlxuaW1wb3J0IHsgdGFzayB9IGZyb20gXCIuLi9jbGFzcy90YXNrXCJcbmltcG9ydCBjb250ZW50IGZyb20gXCIuLi9jbGFzcy9jb250ZW50XCJcbmltcG9ydCBET01jb250cm9sbGVyIGZyb20gXCIuL0RPTWNvbnRyb2xsZXJcIlxuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0TGlzdGVuZXIobmFtZSl7XG5cbiAgICBjb250ZW50LmFkZFByb2plY3QobmFtZSlcbiAgICBET01jb250cm9sbGVyLnNob3dQcm9qZWN0cygpXG4gICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2tMaXN0ZW5lcihuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpe1xuXG4gICAgY29uc29sZS5sb2coY29udGVudClcblxuICAgIGNvbnN0IHByb2plY3RPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV1cblxuXG5cbiAgICBwcm9qZWN0T2JqLmFkZFRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcblxufVxuXG5mdW5jdGlvbiBjaGFuZ2VEZXRhaWwoKSB7XG5cbiAgICBjb25zdCB0YXNrT2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzW2NvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS5hY3RpdmVJbmRleCgpXVxuXG4gICAgdGFza09iai50aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtdGl0bGUnKS52YWx1ZVxuICAgIHRhc2tPYmouZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWRlc2MnKS52YWx1ZVxuICAgIHRhc2tPYmoucHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXByaW9yaXR5JykudmFsdWVcbiAgICB0YXNrT2JqLmR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWR1ZURhdGUnKS52YWx1ZVxuXG4gICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd0RldGFpbHMoKVxuXG4gICAgLy9jb25zb2xlLmxvZyh0YXNrT2JqKVxuXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoKSB7XG4gICAgXG4gICAgaWYgKGNvbnRlbnQucHJvamVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdE9iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXVxuICAgICAgICBjb250ZW50LnJlbW92ZVByb2plY3QocHJvamVjdE9iailcbiAgICAgICAgRE9NY29udHJvbGxlci5zaG93UHJvamVjdHMoKVxuICAgICAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgICAgIERPTWNvbnRyb2xsZXIuYmxhbmtEZXRhaWxzKClcblxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrKCkge1xuXG4gICAgY29uc3QgcHJvamVjdE9iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXVxuICAgIGNvbnN0IHRhc2tPYmogPSBwcm9qZWN0T2JqLnRhc2tzW3Byb2plY3RPYmouYWN0aXZlSW5kZXgoKV1cblxuICAgIHByb2plY3RPYmoucmVtb3ZlVGFzayh0YXNrT2JqKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcbiAgICBET01jb250cm9sbGVyLmJsYW5rRGV0YWlscygpXG5cbn1cblxuZnVuY3Rpb24gc29ydFRpdGxlKCkge1xuXG4gICAgbGV0IHRhc2tBcnJheSA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1xuICAgIGNvbnRlbnQuc29ydFRpdGxlID0gIWNvbnRlbnQuc29ydFRpdGxlXG5cbiAgICBpZiAoY29udGVudC5zb3J0VGl0bGUpIHsgXG4gICAgICAgIHRhc2tBcnJheSA9IHRhc2tBcnJheS5zb3J0KChhLGIpID0+IChhLnRpdGxlID4gYi50aXRsZSkgPyAtMSA6ICgoYi50aXRsZSA+IGEudGl0bGUpID8gMSA6IDApKVxuICAgIH1lbHNle1xuICAgICAgICB0YXNrQXJyYXkgPSB0YXNrQXJyYXkuc29ydCgoYSxiKSA9PiAoYS50aXRsZSA+IGIudGl0bGUpID8gMSA6ICgoYi50aXRsZSA+IGEudGl0bGUpID8gLTEgOiAwKSlcbiAgICB9XG5cbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG5cbn1cblxuZnVuY3Rpb24gc29ydFByaW9yaXR5KCkge1xuXG4gICAgbGV0IHRhc2tBcnJheSA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1xuICAgIGNvbnRlbnQuc29ydFByaW9yaXR5ID0gIWNvbnRlbnQuc29ydFByaW9yaXR5XG5cbiAgICBpZiAoY29udGVudC5zb3J0UHJpb3JpdHkpIHsgXG4gICAgICAgIHRhc2tBcnJheSA9IHRhc2tBcnJheS5zb3J0KChhLGIpID0+IChhLnByaW9yaXR5ID4gYi5wcmlvcml0eSkgPyAtMSA6ICgoYi5wcmlvcml0eSA+IGEucHJpb3JpdHkpID8gMSA6IDApKVxuICAgIH1lbHNle1xuICAgICAgICB0YXNrQXJyYXkgPSB0YXNrQXJyYXkuc29ydCgoYSxiKSA9PiAoYS5wcmlvcml0eSA+IGIucHJpb3JpdHkpID8gMSA6ICgoYi5wcmlvcml0eSA+IGEucHJpb3JpdHkpID8gLTEgOiAwKSlcbiAgICB9XG5cbiAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgXG59XG5cbmZ1bmN0aW9uIHNvcnREdWUoKSB7XG4gICAgXG4gICAgbGV0IHRhc2tBcnJheSA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1xuICAgIGNvbnRlbnQuc29ydER1ZSA9ICFjb250ZW50LnNvcnREdWVcblxuICAgIGlmIChjb250ZW50LnNvcnREdWUpIHsgXG4gICAgICAgIHRhc2tBcnJheSA9IHRhc2tBcnJheS5zb3J0KChhLGIpID0+IChhLmR1ZURhdGUgPiBiLmR1ZURhdGUpID8gLTEgOiAoKGIuZHVlRGF0ZSA+IGEuZHVlRGF0ZSkgPyAxIDogMCkpXG4gICAgfWVsc2V7XG4gICAgICAgIHRhc2tBcnJheSA9IHRhc2tBcnJheS5zb3J0KChhLGIpID0+IChhLmR1ZURhdGUgPiBiLmR1ZURhdGUpID8gMSA6ICgoYi5kdWVEYXRlID4gYS5kdWVEYXRlKSA/IC0xIDogMCkpXG4gICAgfVxuXG4gICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuXG59XG5cbmV4cG9ydCB7Y3JlYXRlUHJvamVjdExpc3RlbmVyLCBjcmVhdGVUYXNrTGlzdGVuZXIsIGNoYW5nZURldGFpbCwgZGVsZXRlUHJvamVjdCwgZGVsZXRlVGFzaywgc29ydFRpdGxlLCBzb3J0UHJpb3JpdHksIHNvcnREdWV9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1xuICAgIGNyZWF0ZVByb2plY3RMaXN0ZW5lciwgZGVsZXRlUHJvamVjdFxufSBmcm9tIFwiLi4vY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb2plY3RzKCkge1xuXG4gICAgLy9hZGQgcHJvamVjdCBtb2RhbCBhcHBlbmQgdG8gYm9keVxuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBtb2RhbC5pZCA9IFwiYWRkUHJvamVjdFwiXG4gICAgY29uc3QgbW9kYWxDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBtb2RhbENvbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpXG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxDb250KVxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgY2xvc2VCdG4uY2xhc3NMaXN0LmFkZCgnY2xvc2UnKVxuICAgIGNsb3NlQnRuLmlubmVySFRNTCA9ICcmdGltZXM7J1xuICAgIG1vZGFsQ29udC5hcHBlbmRDaGlsZChjbG9zZUJ0bilcbiAgICBjb25zdCBtb2RhbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIG1vZGFsSW5wdXQudHlwZSA9IFwidGV4dFwiXG4gICAgbW9kYWxJbnB1dC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgcHJvamVjdCBuYW1lIGhlcmVcIlxuICAgIG1vZGFsQ29udC5hcHBlbmRDaGlsZChtb2RhbElucHV0KVxuICAgIGNvbnN0IG1vZGFsU3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBtb2RhbFN1Ym1pdC5pbm5lclRleHQgPSBcIlN1Ym1pdFwiXG4gICAgbW9kYWxTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBuYW1lID0gbW9kYWxJbnB1dC52YWx1ZVxuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIG1vZGFsSW5wdXQudmFsdWUgPSBcIlwiXG4gICAgICAgIGNyZWF0ZVByb2plY3RMaXN0ZW5lcihuYW1lKVxuICAgIH0pXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKG1vZGFsU3VibWl0KVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gPHNwYW4+ICh4KSwgY2xvc2UgdGhlIG1vZGFsXG4gICAgY2xvc2VCdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9KVxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIG91dHNpZGUgb2YgdGhlIG1vZGFsLCBjbG9zZSBpdFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IG1vZGFsKSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vTWFpbiBQcm9qZWN0cyBjb250YWluZXJcbiAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgcHJvamVjdHMuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1hcmVhJylcblxuICAgIC8vSGVhZGVyIG9mIHRoZSBwcm9qZWN0cyBsaXN0XG4gICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaGVhZC5jbGFzc0xpc3QuYWRkKCdoZWFkJylcblxuICAgIC8vSGVhZGVyIHRleHRcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnaGVhZC10ZXh0JylcbiAgICB0aXRsZS5pbm5lclRleHQgPSAnUHJvamVjdHMnXG4gICAgaGVhZC5hcHBlbmRDaGlsZCh0aXRsZSlcblxuICAgIGNvbnN0IGhlYWRDb250cm9scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaGVhZENvbnRyb2xzLmNsYXNzTGlzdC5hZGQoJ2hlYWQtY29udHJvbCcpXG5cbiAgICAvL0FkZCBwcm9qZWN0IGJ1dHRvblxuICAgIGNvbnN0IGFkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgYWRkLmNsYXNzTGlzdC5hZGQoJ2FkZC1wcm9qZWN0JylcbiAgICBhZGQuaW5uZXJIVE1MID0gJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiaWNvbiBpY29uLXRhYmxlciBpY29uLXRhYmxlci1wbHVzXCIgd2lkdGg9XCI0NFwiIGhlaWdodD1cIjQ0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGZpbGw9XCJub25lXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PGxpbmUgeDE9XCIxMlwiIHkxPVwiNVwiIHgyPVwiMTJcIiB5Mj1cIjE5XCIgLz48bGluZSB4MT1cIjVcIiB5MT1cIjEyXCIgeDI9XCIxOVwiIHkyPVwiMTJcIiAvPjwvc3ZnPidcbiAgICBoZWFkQ29udHJvbHMuYXBwZW5kQ2hpbGQoYWRkKVxuICAgIGFkZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgIH0pXG5cbiAgICAvL0RlbGV0ZSBwcm9qZWN0IGJ1dHRvblxuICAgIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGRlbGV0ZUljb24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLXByb2plY3QnKVxuICAgIGRlbGV0ZUljb24uaW5uZXJIVE1MID0gJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiaWNvbiBpY29uLXRhYmxlciBpY29uLXRhYmxlci10cmFzaFwiIHdpZHRoPVwiNDRcIiBoZWlnaHQ9XCI0NFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBmaWxsPVwibm9uZVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIHN0cm9rZT1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIvPjxsaW5lIHgxPVwiNFwiIHkxPVwiN1wiIHgyPVwiMjBcIiB5Mj1cIjdcIiAvPjxsaW5lIHgxPVwiMTBcIiB5MT1cIjExXCIgeDI9XCIxMFwiIHkyPVwiMTdcIiAvPjxsaW5lIHgxPVwiMTRcIiB5MT1cIjExXCIgeDI9XCIxNFwiIHkyPVwiMTdcIiAvPjxwYXRoIGQ9XCJNNSA3bDEgMTJhMiAyIDAgMCAwIDIgMmg4YTIgMiAwIDAgMCAyIC0ybDEgLTEyXCIgLz48cGF0aCBkPVwiTTkgN3YtM2ExIDEgMCAwIDEgMSAtMWg0YTEgMSAwIDAgMSAxIDF2M1wiIC8+PC9zdmc+J1xuICAgIGhlYWRDb250cm9scy5hcHBlbmRDaGlsZChkZWxldGVJY29uKVxuICAgIGRlbGV0ZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlbGV0ZVByb2plY3QoKVxuICAgIH0pXG5cblxuICAgIGhlYWQuYXBwZW5kQ2hpbGQoaGVhZENvbnRyb2xzKVxuICAgIHByb2plY3RzLmFwcGVuZENoaWxkKGhlYWQpXG5cbiAgICAvL1Byb2plY3QgTGlzdFxuICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgbGlzdC5pZCA9ICdwcm9qZWN0LWxpc3QnXG4gICAgcHJvamVjdHMuYXBwZW5kQ2hpbGQobGlzdClcblxuICAgIHJldHVybiBwcm9qZWN0c1xuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==