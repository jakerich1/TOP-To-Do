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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvY29udGVudC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvdGFzay5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvRE9NY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RPUC1Uby1Eby8uL3NyYy9jb21wb25lbnRzL3Rhc2tzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEwQzs7QUFFMUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0QsYUFBYSxFQUFFO0FBQy9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLG1EQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQsaUVBQWUsTzs7Ozs7Ozs7Ozs7Ozs7O0FDekRlO0FBQzlCO0FBQ087O0FBRVA7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QUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNKcUM7O0FBRXRCOztBQUVmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQztBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsOEVBQWtCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEMiLCJmaWxlIjoidGFza3MuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvamVjdCB9IGZyb20gXCIuLi9jbGFzcy9wcm9qZWN0XCJcblxuY29uc3QgY29udGVudCA9IChmdW5jdGlvbiBmYWN0b3J5KCkge1xuXG4gICAgbGV0IHByb2plY3RzID0gW11cbiAgICBsZXQgYWN0aXZlUHJvamVjdCA9IFwiXCJcblxuICAgIGZ1bmN0aW9uIHJldHVyblByb2plY3RzKCkge1xuICAgICAgICByZXR1cm4gcHJvamVjdHNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRBY3RpdmUoaWQpIHtcbiAgICAgICAgYWN0aXZlUHJvamVjdCA9IGlkXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFjdGl2ZUluZGV4KCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHByb2plY3RzLm1hcChmdW5jdGlvbihlKSB7IHJldHVybiBlLmlkOyB9KS5pbmRleE9mKGFjdGl2ZVByb2plY3QpXG4gICAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQWN0aXZlKGlkKSB7XG4gICAgICAgIGlmIChpZCA9PSBhY3RpdmVQcm9qZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3QobmFtZSkge1xuICAgICAgICBsZXQgcHJvaiA9IG5ldyBwcm9qZWN0KG5hbWUpXG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvailcbiAgICAgICAgaWYgKHByb2plY3RzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBzZXRBY3RpdmUocHJvai5pZClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVByb2plY3QocHJvamVjdCkge1xuICAgICAgICBwcm9qZWN0cy5zcGxpY2UocHJvamVjdHMuaW5kZXhPZihwcm9qZWN0KSwgMSlcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBhY3RpdmVQcm9qZWN0OiBhY3RpdmVQcm9qZWN0LFxuICAgICAgICBwcm9qZWN0czogcHJvamVjdHMsXG4gICAgICAgIHJldHVyblByb2plY3RzOiByZXR1cm5Qcm9qZWN0cyxcbiAgICAgICAgYWRkUHJvamVjdDogYWRkUHJvamVjdCxcbiAgICAgICAgcmVtb3ZlUHJvamVjdDogcmVtb3ZlUHJvamVjdCxcbiAgICAgICAgc2V0QWN0aXZlOiBzZXRBY3RpdmUsXG4gICAgICAgIGNoZWNrQWN0aXZlOiBjaGVja0FjdGl2ZSxcbiAgICAgICAgYWN0aXZlSW5kZXg6IGFjdGl2ZUluZGV4XG5cbiAgICB9O1xuXG59KCkpXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQiLCJpbXBvcnQgeyB0YXNrIH0gZnJvbSAnLi90YXNrJztcbi8vUHJvamVjdCBjbGFzc1xuZXhwb3J0IGNsYXNzIHByb2plY3Qge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMudGFza3MgPSBbXVxuICAgICAgICB0aGlzLmlkID0gXCJcIlxuICAgICAgICB0aGlzLmFjdGl2ZVRhc2sgPSBcIlwiXG5cbiAgICAgICAgdGhpcy5pbml0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgczQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaWQgPSBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdElkKClcblxuICAgIH1cblxuICAgIC8vTWV0aG9kc1xuICAgIGFkZFRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKSB7XG4gICAgICAgIGxldCBudGFzayA9IG5ldyB0YXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSlcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKG50YXNrKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgdGFza3Muc3BsaWNlKHRhc2tzLmluZGV4T2YodGFzayksIDEpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNldEFjdGl2ZShwYXNzZWRpZCkge1xuICAgICAgICBhY3RpdmVUYXNrID0gcGFzc2VkaWRcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY2hlY2tBY3RpdmUocGFzc2VkaWQpIHtcbiAgICAgICAgaWYgKHBhc3NlZGlkID09IGFjdGl2ZVRhc2spIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgYWN0aXZlSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy50YXNrcy5tYXAoZnVuY3Rpb24oZSkgeyByZXR1cm4gZS5pZDsgfSkuaW5kZXhPZih0aGlzLmFjdGl2ZVRhc2spXG4gICAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyB0YXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpe1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eVxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlXG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2VcbiAgICAgICAgdGhpcy5pZCA9IFwiXCJcblxuICAgICAgICB0aGlzLmluaXRJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBzNCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pZCA9IHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0SWQoKVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvL01ldGhvZHNcbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGRheXNMZWZ0KCkge1xuXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKVxuICAgICAgICBjb25zdCBkaWZmID0gdGhpcy5kdWVEYXRlLmdldFRpbWUoKSAtIHRvZGF5LmdldFRpbWUoKVxuICAgICAgICBjb25zdCBkaWZmRGF5cyA9IGRpZmYgLyAoMTAwMCAqIDM2MDAgKiAyNClcblxuICAgICAgICByZXR1cm4gZGlmZkRheXNcblxuICAgIH1cblxufSIsImltcG9ydCBjb250ZW50IGZyb20gXCIuLi9jbGFzcy9jb250ZW50XCJcblxuY29uc3QgRE9NY29udHJvbGxlciA9IChmdW5jdGlvbiBmYWN0b3J5KCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBzZXRQcm9qZWN0VGl0bGU6IGZ1bmN0aW9uIChuYW1lKSB7ICAgIFxuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lJylcbiAgICAgICAgICAgIHByb2plY3RUaXRsZS5pbm5lclRleHQgPSBuYW1lXG5cbiAgICAgICAgfSwgICAgICAgIFxuXG4gICAgICAgIHNob3dQcm9qZWN0czogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKVxuICAgICAgICAgICAgcHJvamVjdExpc3QuaW5uZXJIVE1MID0gXCJcIlxuICAgICAgICAgICAgY29uc3QgcHJvamVjdHNBcnJheSA9IGNvbnRlbnQucmV0dXJuUHJvamVjdHMoKVxuXG4gICAgICAgICAgICBwcm9qZWN0c0FycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgICAgICBsaS5pbm5lclRleHQgPSBlbGVtZW50Lm5hbWVcblxuICAgICAgICAgICAgICAgIGlmKGNvbnRlbnQuY2hlY2tBY3RpdmUoZWxlbWVudC5pZCkpe1xuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNldFByb2plY3RUaXRsZShlbGVtZW50Lm5hbWUpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5zZXRBY3RpdmUoZWxlbWVudC5pZClcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93UHJvamVjdHMoKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2V0UHJvamVjdFRpdGxlKGVsZW1lbnQubmFtZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGxpKVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIFxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd1Rhc2tzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRhc2tCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stYm9keScpXG4gICAgICAgICAgICB0YXNrQm9keS5pbm5lckhUTUwgPSBcIlwiXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0T2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHByb2plY3RPYmopXG4gICAgICAgICAgICBjb25zdCB0YXNrQXJyYXkgPSBwcm9qZWN0T2JqLnRhc2tzXG5cbiAgICAgICAgICAgIGlmICh0YXNrQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRhc2tBcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCA9PSBwcm9qZWN0T2JqLmFjdGl2ZVRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5pbm5lckhUTUwgPSBgPHRkIHN0eWxlPVwiYm9yZGVyLXRvcDogMXB4IHNvbGlkICNFNEZGNzY7IGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0U0RkY3NjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFNEZGNzY7XCIgPiR7ZWxlbWVudC50aXRsZX08L3RkPjx0ZCBzdHlsZT1cImJvcmRlci10b3A6IDFweCBzb2xpZCAjRTRGRjc2OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0U0RkY3NjtcIj4ke2VsZW1lbnQucHJpb3JpdHl9PC90ZD48dGQgc3R5bGU9XCJib3JkZXItdG9wOiAxcHggc29saWQgI0U0RkY3NjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFNEZGNzY7XCI+JHtlbGVtZW50LmR1ZURhdGV9PC90ZD5gICAgXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93LmlubmVySFRNTCA9IGA8dGQ+JHtlbGVtZW50LnRpdGxlfTwvdGQ+PHRkPiR7ZWxlbWVudC5wcmlvcml0eX08L3RkPjx0ZD4ke2VsZW1lbnQuZHVlRGF0ZX08L3RkPmBcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgdGRgKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja2JveElubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YClcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hJbm5lci5jbGFzc0xpc3QuYWRkKGBjaGVja2JveGApXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmFwcGVuZENoaWxkKGNoZWNrYm94SW5uZXIpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaWQgPT0gcHJvamVjdE9iai5hY3RpdmVUYXNrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LnN0eWxlLmJvcmRlclRvcCA9ICcxcHggc29saWQgI0U0RkY3NidcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LnN0eWxlLmJvcmRlclJpZ2h0ID0gJzFweCBzb2xpZCAjRTRGRjc2J1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guc3R5bGUuYm9yZGVyQm90dG9tID0gJzFweCBzb2xpZCAjRTRGRjc2J1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jb21wbGV0ZWQpIHsgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94SW5uZXIuaW5uZXJIVE1MID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiaWNvbiBpY29uLXRhYmxlciBpY29uLXRhYmxlci1jaGVja1wiIHdpZHRoPVwiNDRcIiBoZWlnaHQ9XCI0NFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBmaWxsPVwibm9uZVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIHN0cm9rZT1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIvPjxwYXRoIGQ9XCJNNSAxMmw1IDVsMTAgLTEwXCIgLz48L3N2Zz48L2Rpdj48L3RkPmBcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC50b2dnbGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgICAgICAgICAgICAgICAgICB9KSAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIHJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2tJRCA9IGVsZW1lbnQuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS5hY3RpdmVUYXNrID0gdGFza0lEXG4gICAgICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dEZXRhaWxzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjaGVja2JveClcbiAgICAgICAgICAgICAgICAgICAgdGFza0JvZHkuYXBwZW5kQ2hpbGQocm93KVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dEZXRhaWxzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL0RPTSBlbGVtZW50IGRlY2xhcmF0aW9uc1xuXG4gICAgICAgICAgICBsZXQgdGFza09iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1tjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV0uYWN0aXZlSW5kZXgoKV1cblxuICAgICAgICAgICAgaWYgKCF0YXNrT2JqKSB7XG4gICAgICAgICAgICAgICAgdGFza09iaiA9IGNvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS50YXNrc1swXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBkZXRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtdGl0bGUnKSBcbiAgICAgICAgICAgIGNvbnN0IGRldERlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kZXNjJykgXG4gICAgICAgICAgICBjb25zdCBkZXRQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtcHJpb3JpdHknKSBcbiAgICAgICAgICAgIGNvbnN0IGRldER1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWR1ZURhdGUnKSBcblxuICAgICAgICAgICAgZGV0VGl0bGUudmFsdWUgPSB0YXNrT2JqLnRpdGxlXG4gICAgICAgICAgICBkZXREZXNjcmlwdGlvbi52YWx1ZSA9IHRhc2tPYmouZGVzY3JpcHRpb25cbiAgICAgICAgICAgIGRldFByaW9yaXR5LnZhbHVlID0gdGFza09iai5wcmlvcml0eVxuICAgICAgICAgICAgZGV0RHVlRGF0ZS52YWx1ZSA9IHRhc2tPYmouZHVlRGF0ZVxuXG4gICAgICAgIH1cblxuICAgIH1cblxufSgpKVxuXG5leHBvcnQgZGVmYXVsdCBET01jb250cm9sbGVyIiwiaW1wb3J0IHsgcHJvamVjdCB9IGZyb20gXCIuLi9jbGFzcy9wcm9qZWN0XCJcbmltcG9ydCB7IHRhc2sgfSBmcm9tIFwiLi4vY2xhc3MvdGFza1wiXG5pbXBvcnQgY29udGVudCBmcm9tIFwiLi4vY2xhc3MvY29udGVudFwiXG5pbXBvcnQgRE9NY29udHJvbGxlciBmcm9tIFwiLi9ET01jb250cm9sbGVyXCJcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdExpc3RlbmVyKG5hbWUpe1xuXG4gICAgY29udGVudC5hZGRQcm9qZWN0KG5hbWUpXG4gICAgRE9NY29udHJvbGxlci5zaG93UHJvamVjdHMoKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcblxufVxuXG5mdW5jdGlvbiBjcmVhdGVUYXNrTGlzdGVuZXIobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKXtcblxuICAgIGNvbnN0IHByb2plY3RPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV1cbiAgICBwcm9qZWN0T2JqLmFkZFRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcblxufVxuXG5mdW5jdGlvbiBjaGFuZ2VEZXRhaWwoKSB7XG5cbiAgICBjb25zdCB0YXNrT2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldLnRhc2tzW2NvbnRlbnQucHJvamVjdHNbY29udGVudC5hY3RpdmVJbmRleCgpXS5hY3RpdmVJbmRleCgpXVxuXG4gICAgdGFza09iai50aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtdGl0bGUnKS52YWx1ZVxuICAgIHRhc2tPYmouZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWRlc2MnKS52YWx1ZVxuICAgIHRhc2tPYmoucHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LXByaW9yaXR5JykudmFsdWVcbiAgICB0YXNrT2JqLmR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWR1ZURhdGUnKS52YWx1ZVxuXG4gICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd0RldGFpbHMoKVxuXG4gICAgLy9jb25zb2xlLmxvZyh0YXNrT2JqKVxuXG59XG5cbmV4cG9ydCB7Y3JlYXRlUHJvamVjdExpc3RlbmVyLCBjcmVhdGVUYXNrTGlzdGVuZXIsIGNoYW5nZURldGFpbH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XG4gICAgY3JlYXRlVGFza0xpc3RlbmVyXG59IGZyb20gXCIuLi9jb250cm9sbGVycy9saXN0ZW5lcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGFza3MoKSB7XG5cbiAgICAvL2FkZCBwcm9qZWN0IG1vZGFsIGFwcGVuZCB0byBib2R5XG4gICAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0YXNrTW9kYWwuaWQgPSBcImFkZFRhc2tzXCJcblxuICAgIGNvbnN0IG1vZGFsQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbW9kYWxDb250LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKVxuICAgIHRhc2tNb2RhbC5hcHBlbmRDaGlsZChtb2RhbENvbnQpXG5cbiAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGNsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJylcbiAgICBjbG9zZUJ0bi5pbm5lckhUTUwgPSAnJnRpbWVzOydcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pXG5cbiAgICAvL01PZGFsIElucHV0c1xuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBuYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiXG4gICAgbmFtZUlucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciB0YXNrIG5hbWUgaGVyZVwiXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKG5hbWVJbnB1dClcblxuICAgIGNvbnN0IGRlc2NJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJylcbiAgICBkZXNjSW5wdXQucGxhY2Vob2xkZXIgPSBcIkVudGVyIGRlc2NyaXB0aW9uXCJcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQoZGVzY0lucHV0KVxuXG4gICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBwcmlvcml0eUlucHV0LnR5cGUgPSBcInRleHRcIlxuICAgIHByaW9yaXR5SW5wdXQucGxhY2Vob2xkZXIgPSBcIkVudGVyIHByaW9yaXR5XCJcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQocHJpb3JpdHlJbnB1dClcblxuICAgIGNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBkYXRlSW5wdXQudHlwZSA9IFwiZGF0ZVwiXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKGRhdGVJbnB1dClcblxuICAgIGNvbnN0IG1vZGFsU3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBtb2RhbFN1Ym1pdC5pbm5lclRleHQgPSBcIlN1Ym1pdFwiXG4gICAgbW9kYWxTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgbGV0IG5hbWUgPSBuYW1lSW5wdXQudmFsdWVcbiAgICAgICAgbGV0IGRlc2MgPSBkZXNjSW5wdXQudmFsdWVcbiAgICAgICAgbGV0IHByaW9yaXR5ID0gcHJpb3JpdHlJbnB1dC52YWx1ZVxuICAgICAgICBsZXQgZHVlZGF0ZSA9IGRhdGVJbnB1dC52YWx1ZVxuXG4gICAgICAgIGNyZWF0ZVRhc2tMaXN0ZW5lcihuYW1lLCBkZXNjLCBwcmlvcml0eSwgZHVlZGF0ZSlcblxuICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSBcIlwiXG4gICAgICAgIGRlc2NJbnB1dC52YWx1ZSA9IFwiXCJcbiAgICAgICAgcHJpb3JpdHlJbnB1dC52YWx1ZSA9IFwiXCJcbiAgICAgICAgZGF0ZUlucHV0LnZhbHVlID0gXCJcIlxuICAgICAgICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG5cbiAgICB9KVxuXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKG1vZGFsU3VibWl0KVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGFza01vZGFsKVxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIDxzcGFuPiAoeCksIGNsb3NlIHRoZSBtb2RhbFxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG4gICAgfSlcbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIG9mIHRoZSBtb2RhbCwgY2xvc2UgaXRcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IHRhc2tNb2RhbCkge1xuICAgICAgICAgICAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9NYWluIFByb2plY3RzIGNvbnRhaW5lclxuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0YXNrcy5jbGFzc0xpc3QuYWRkKCd0YXNrLWFyZWEnKVxuXG4gICAgLy9BZGQgdGFzayBidXR0b25cbiAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdhZGQnKVxuICAgIGFkZEJ0bi5pbm5lckhUTUwgPSAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLXBsdXNcIiB3aWR0aD1cIjQ0XCIgaGVpZ2h0PVwiNDRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgZmlsbD1cIm5vbmVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48bGluZSB4MT1cIjEyXCIgeTE9XCI1XCIgeDI9XCIxMlwiIHkyPVwiMTlcIiAvPjxsaW5lIHgxPVwiNVwiIHkxPVwiMTJcIiB4Mj1cIjE5XCIgeTI9XCIxMlwiIC8+PC9zdmc+J1xuICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG4gICAgfSlcbiAgICB0YXNrcy5hcHBlbmRDaGlsZChhZGRCdG4pXG5cbiAgICAvL1RhYmxlIGVsZW1lbnRcbiAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJylcblxuICAgIC8vSGVhZGVyIHJvdyBcbiAgICBjb25zdCB0aGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJylcbiAgICBjb25zdCB0aHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXG4gICAgY29uc3QgdGhUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgIHRoVGFzay5pbm5lckhUTUwgPSBcIlRhc2tcIlxuICAgIGNvbnN0IHRoUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpXG4gICAgdGhQcmlvcml0eS5pbm5lckhUTUwgPSBcIlByaW9yaXR5XCJcbiAgICBjb25zdCB0aER1ZT0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgIHRoRHVlLmlubmVySFRNTCA9IFwiRHVlIERhdGVcIlxuICAgIHRoci5hcHBlbmRDaGlsZCh0aFRhc2spXG4gICAgdGhyLmFwcGVuZENoaWxkKHRoUHJpb3JpdHkpXG4gICAgdGhyLmFwcGVuZENoaWxkKHRoRHVlKVxuICAgIHRoci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKVxuICAgIHRoZWFkLmFwcGVuZENoaWxkKHRocilcbiAgICB0YWJsZS5hcHBlbmRDaGlsZCh0aGVhZClcblxuICAgIC8vUGxhY2Vob2xkZXIgdGFibGUgcm93c1xuICAgIGNvbnN0IHRib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKVxuICAgIHRib2R5LmlkID0gXCJ0YXNrLWJvZHlcIlxuXG4gICAgdGFibGUuYXBwZW5kQ2hpbGQodGJvZHkpXG4gICAgdGFza3MuYXBwZW5kQ2hpbGQodGFibGUpXG5cbiAgICByZXR1cm4gdGFza3NcblxufSJdLCJzb3VyY2VSb290IjoiIn0=