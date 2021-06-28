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

    //Add project button
    const add = document.createElement('div')
    add.classList.add('add-project')
    add.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>'
    head.appendChild(add)
    add.addEventListener('click', function () {
        modal.style.display = "block"
    })

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvY29udGVudC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvdGFzay5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvRE9NY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RPUC1Uby1Eby8uL3NyYy9jb21wb25lbnRzL3Byb2plY3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEwQzs7QUFFMUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0QsYUFBYSxFQUFFO0FBQy9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLG1EQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQsaUVBQWUsTzs7Ozs7Ozs7Ozs7Ozs7O0FDekRlO0FBQzlCO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLHVDQUFJO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQzs7Ozs7Ozs7Ozs7Ozs7QUN0Q087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsQzs7Ozs7Ozs7Ozs7Ozs7O0FDMUJzQzs7QUFFdEM7O0FBRUE7O0FBRUEsMEM7O0FBRUE7QUFDQTs7QUFFQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0Msa0VBQXNCOztBQUV4RDs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQiwrREFBbUI7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLDZEQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0IsNERBQWdCLENBQUMsK0RBQW1CO0FBQ25FOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsMkNBQTJDLGNBQWMsV0FBVyxpQkFBaUIsV0FBVyxnQkFBZ0I7QUFDaEg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTs7QUFFQSxpQkFBaUI7O0FBRWpCOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLENBQUM7O0FBRUQsaUVBQWUsYTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZHMkI7QUFDTjtBQUNFO0FBQ0s7O0FBRTNDOztBQUVBLElBQUksOERBQWtCO0FBQ3RCLElBQUksZ0VBQTBCO0FBQzlCLElBQUksNkRBQXVCOztBQUUzQjs7QUFFQTs7QUFFQSx1QkFBdUIsNERBQWdCLENBQUMsK0RBQW1CO0FBQzNEO0FBQ0EsSUFBSSw2REFBdUI7O0FBRTNCOzs7Ozs7OztVQ25CQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7OztBQ0pxQzs7QUFFdEI7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRkFBcUI7QUFDN0IsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDIiwiZmlsZSI6InByb2plY3RzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb2plY3QgfSBmcm9tIFwiLi4vY2xhc3MvcHJvamVjdFwiXG5cbmNvbnN0IGNvbnRlbnQgPSAoZnVuY3Rpb24gZmFjdG9yeSgpIHtcblxuICAgIGxldCBwcm9qZWN0cyA9IFtdXG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSBcIlwiXG5cbiAgICBmdW5jdGlvbiByZXR1cm5Qcm9qZWN0cygpIHtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0QWN0aXZlKGlkKSB7XG4gICAgICAgIGFjdGl2ZVByb2plY3QgPSBpZFxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhY3RpdmVJbmRleCgpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBwcm9qZWN0cy5tYXAoZnVuY3Rpb24oZSkgeyByZXR1cm4gZS5pZDsgfSkuaW5kZXhPZihhY3RpdmVQcm9qZWN0KVxuICAgICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0FjdGl2ZShpZCkge1xuICAgICAgICBpZiAoaWQgPT0gYWN0aXZlUHJvamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KG5hbWUpIHtcbiAgICAgICAgbGV0IHByb2ogPSBuZXcgcHJvamVjdChuYW1lKVxuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2opXG4gICAgICAgIGlmIChwcm9qZWN0cy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgc2V0QWN0aXZlKHByb2ouaWQpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDFcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgcHJvamVjdHMuc3BsaWNlKHByb2plY3RzLmluZGV4T2YocHJvamVjdCksIDEpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgYWN0aXZlUHJvamVjdDogYWN0aXZlUHJvamVjdCxcbiAgICAgICAgcHJvamVjdHM6IHByb2plY3RzLFxuICAgICAgICByZXR1cm5Qcm9qZWN0czogcmV0dXJuUHJvamVjdHMsXG4gICAgICAgIGFkZFByb2plY3Q6IGFkZFByb2plY3QsXG4gICAgICAgIHJlbW92ZVByb2plY3Q6IHJlbW92ZVByb2plY3QsXG4gICAgICAgIHNldEFjdGl2ZTogc2V0QWN0aXZlLFxuICAgICAgICBjaGVja0FjdGl2ZTogY2hlY2tBY3RpdmUsXG4gICAgICAgIGFjdGl2ZUluZGV4OiBhY3RpdmVJbmRleFxuXG4gICAgfTtcblxufSgpKVxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50IiwiaW1wb3J0IHsgdGFzayB9IGZyb20gJy4vdGFzayc7XG4vL1Byb2plY3QgY2xhc3NcbmV4cG9ydCBjbGFzcyBwcm9qZWN0IHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLnRhc2tzID0gW11cbiAgICAgICAgdGhpcy5pZCA9IFwiXCJcblxuICAgICAgICB0aGlzLmluaXRJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBzNCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pZCA9IHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0SWQoKVxuXG4gICAgfVxuXG4gICAgLy9NZXRob2RzXG4gICAgYWRkVGFzayhuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpIHtcbiAgICAgICAgbGV0IG50YXNrID0gbmV3IHRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKVxuICAgICAgICB0aGlzLnRhc2tzLnB1c2gobnRhc2spXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJlbW92ZVRhc2sodGFzaykge1xuICAgICAgICB0YXNrcy5zcGxpY2UodGFza3MuaW5kZXhPZih0YXNrKSwgMSlcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3MubGVuZ3RoO1xuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyB0YXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpe1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eVxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlXG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2VcbiAgICB9XG5cbiAgICAvL01ldGhvZHNcbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGRheXNMZWZ0KCkge1xuXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKVxuICAgICAgICBjb25zdCBkaWZmID0gdGhpcy5kdWVEYXRlLmdldFRpbWUoKSAtIHRvZGF5LmdldFRpbWUoKVxuICAgICAgICBjb25zdCBkaWZmRGF5cyA9IGRpZmYgLyAoMTAwMCAqIDM2MDAgKiAyNClcblxuICAgICAgICByZXR1cm4gZGlmZkRheXNcblxuICAgIH1cblxufSIsImltcG9ydCBjb250ZW50IGZyb20gXCIuLi9jbGFzcy9jb250ZW50XCJcblxuY29uc3QgRE9NY29udHJvbGxlciA9IChmdW5jdGlvbiBmYWN0b3J5KCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBzZXRQcm9qZWN0VGl0bGU6IGZ1bmN0aW9uIChuYW1lKSB7ICAgIFxuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lJylcbiAgICAgICAgICAgIHByb2plY3RUaXRsZS5pbm5lclRleHQgPSBuYW1lXG5cbiAgICAgICAgfSwgICAgICAgIFxuXG4gICAgICAgIHNob3dQcm9qZWN0czogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKVxuICAgICAgICAgICAgcHJvamVjdExpc3QuaW5uZXJIVE1MID0gXCJcIlxuICAgICAgICAgICAgY29uc3QgcHJvamVjdHNBcnJheSA9IGNvbnRlbnQucmV0dXJuUHJvamVjdHMoKVxuXG4gICAgICAgICAgICBwcm9qZWN0c0FycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgICAgICBsaS5pbm5lclRleHQgPSBlbGVtZW50Lm5hbWVcblxuICAgICAgICAgICAgICAgIGlmKGNvbnRlbnQuY2hlY2tBY3RpdmUoZWxlbWVudC5pZCkpe1xuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNldFByb2plY3RUaXRsZShlbGVtZW50Lm5hbWUpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5zZXRBY3RpdmUoZWxlbWVudC5pZClcbiAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93UHJvamVjdHMoKVxuICAgICAgICAgICAgICAgICAgICBET01jb250cm9sbGVyLnNob3dUYXNrcygpXG4gICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2V0UHJvamVjdFRpdGxlKGVsZW1lbnQubmFtZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGxpKVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIFxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd1Rhc2tzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRhc2tCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stYm9keScpXG4gICAgICAgICAgICB0YXNrQm9keS5pbm5lckhUTUwgPSBcIlwiXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0T2JqID0gY29udGVudC5wcm9qZWN0c1tjb250ZW50LmFjdGl2ZUluZGV4KCldXG4gICAgICAgICAgICBjb25zdCB0YXNrQXJyYXkgPSBwcm9qZWN0T2JqLnRhc2tzXG5cbiAgICAgICAgICAgIGlmICh0YXNrQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRhc2tBcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcbiAgICAgICAgICAgICAgICAgICAgcm93LmlubmVySFRNTCA9IGA8dGQ+JHtlbGVtZW50LnRpdGxlfTwvdGQ+PHRkPiR7ZWxlbWVudC5wcmlvcml0eX08L3RkPjx0ZD4ke2VsZW1lbnQuZHVlRGF0ZX08L3RkPmBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGB0ZGApXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94SW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKVxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveElubmVyLmNsYXNzTGlzdC5hZGQoYGNoZWNrYm94YClcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guYXBwZW5kQ2hpbGQoY2hlY2tib3hJbm5lcilcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94SW5uZXIuaW5uZXJIVE1MID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiaWNvbiBpY29uLXRhYmxlciBpY29uLXRhYmxlci1jaGVja1wiIHdpZHRoPVwiNDRcIiBoZWlnaHQ9XCI0NFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBmaWxsPVwibm9uZVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIHN0cm9rZT1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIvPjxwYXRoIGQ9XCJNNSAxMmw1IDVsMTAgLTEwXCIgLz48L3N2Zz48L2Rpdj48L3RkPmBcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC50b2dnbGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgRE9NY29udHJvbGxlci5zaG93VGFza3MoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIHJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIERPTWNvbnRyb2xsZXIuc2hvd0RldGFpbHMoZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2hlY2tib3gpXG4gICAgICAgICAgICAgICAgICAgIHRhc2tCb2R5LmFwcGVuZENoaWxkKHJvdylcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93RGV0YWlsczogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vRE9NIGVsZW1lbnQgZGVjbGFyYXRpb25zXG4gICAgICAgICAgICBjb25zdCBkZXRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtdGl0bGUnKSBcbiAgICAgICAgICAgIGNvbnN0IGRldERlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldC1kZXNjJykgXG4gICAgICAgICAgICBjb25zdCBkZXRQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXQtcHJpb3JpdHknKSBcbiAgICAgICAgICAgIGNvbnN0IGRldER1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0LWR1ZURhdGUnKSBcblxuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudClcblxuICAgICAgICAgICAgZGV0VGl0bGUudmFsdWUgPSBlbGVtZW50LnRpdGxlXG4gICAgICAgICAgICBkZXREZXNjcmlwdGlvbi52YWx1ZSA9IGVsZW1lbnQuZGVzY3JpcHRpb25cbiAgICAgICAgICAgIGRldFByaW9yaXR5LnZhbHVlID0gZWxlbWVudC5wcmlvcml0eVxuICAgICAgICAgICAgZGV0RHVlRGF0ZS52YWx1ZSA9IGVsZW1lbnQuZHVlRGF0ZVxuXG4gICAgICAgIH1cblxuICAgIH1cblxufSgpKVxuXG5leHBvcnQgZGVmYXVsdCBET01jb250cm9sbGVyIiwiaW1wb3J0IHsgcHJvamVjdCB9IGZyb20gXCIuLi9jbGFzcy9wcm9qZWN0XCJcbmltcG9ydCB7IHRhc2sgfSBmcm9tIFwiLi4vY2xhc3MvdGFza1wiXG5pbXBvcnQgY29udGVudCBmcm9tIFwiLi4vY2xhc3MvY29udGVudFwiXG5pbXBvcnQgRE9NY29udHJvbGxlciBmcm9tIFwiLi9ET01jb250cm9sbGVyXCJcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdExpc3RlbmVyKG5hbWUpe1xuXG4gICAgY29udGVudC5hZGRQcm9qZWN0KG5hbWUpXG4gICAgRE9NY29udHJvbGxlci5zaG93UHJvamVjdHMoKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcblxufVxuXG5mdW5jdGlvbiBjcmVhdGVUYXNrTGlzdGVuZXIobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKXtcblxuICAgIGNvbnN0IHByb2plY3RPYmogPSBjb250ZW50LnByb2plY3RzW2NvbnRlbnQuYWN0aXZlSW5kZXgoKV1cbiAgICBwcm9qZWN0T2JqLmFkZFRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKVxuICAgIERPTWNvbnRyb2xsZXIuc2hvd1Rhc2tzKClcblxufVxuXG5leHBvcnQge2NyZWF0ZVByb2plY3RMaXN0ZW5lciwgY3JlYXRlVGFza0xpc3RlbmVyfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgICBjcmVhdGVQcm9qZWN0TGlzdGVuZXJcbn0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2xpc3RlbmVycy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcm9qZWN0cygpIHtcblxuICAgIC8vYWRkIHByb2plY3QgbW9kYWwgYXBwZW5kIHRvIGJvZHlcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbW9kYWwuaWQgPSBcImFkZFByb2plY3RcIlxuICAgIGNvbnN0IG1vZGFsQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbW9kYWxDb250LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKVxuICAgIG1vZGFsLmFwcGVuZENoaWxkKG1vZGFsQ29udClcbiAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGNsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJylcbiAgICBjbG9zZUJ0bi5pbm5lckhUTUwgPSAnJnRpbWVzOydcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pXG4gICAgY29uc3QgbW9kYWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBtb2RhbElucHV0LnR5cGUgPSBcInRleHRcIlxuICAgIG1vZGFsSW5wdXQucGxhY2Vob2xkZXIgPSBcIkVudGVyIHByb2plY3QgbmFtZSBoZXJlXCJcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQobW9kYWxJbnB1dClcbiAgICBjb25zdCBtb2RhbFN1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgbW9kYWxTdWJtaXQuaW5uZXJUZXh0ID0gXCJTdWJtaXRcIlxuICAgIG1vZGFsU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgbmFtZSA9IG1vZGFsSW5wdXQudmFsdWVcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBtb2RhbElucHV0LnZhbHVlID0gXCJcIlxuICAgICAgICBjcmVhdGVQcm9qZWN0TGlzdGVuZXIobmFtZSlcbiAgICB9KVxuICAgIG1vZGFsQ29udC5hcHBlbmRDaGlsZChtb2RhbFN1Ym1pdClcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsKVxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIDxzcGFuPiAoeCksIGNsb3NlIHRoZSBtb2RhbFxuICAgIGNsb3NlQnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSlcbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIG9mIHRoZSBtb2RhbCwgY2xvc2UgaXRcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBtb2RhbCkge1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL01haW4gUHJvamVjdHMgY29udGFpbmVyXG4gICAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHByb2plY3RzLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtYXJlYScpXG5cbiAgICAvL0hlYWRlciBvZiB0aGUgcHJvamVjdHMgbGlzdFxuICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGhlYWQuY2xhc3NMaXN0LmFkZCgnaGVhZCcpXG5cbiAgICAvL0hlYWRlciB0ZXh0XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ2hlYWQtdGV4dCcpXG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gJ1Byb2plY3RzJ1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQodGl0bGUpXG5cbiAgICAvL0FkZCBwcm9qZWN0IGJ1dHRvblxuICAgIGNvbnN0IGFkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgYWRkLmNsYXNzTGlzdC5hZGQoJ2FkZC1wcm9qZWN0JylcbiAgICBhZGQuaW5uZXJIVE1MID0gJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiaWNvbiBpY29uLXRhYmxlciBpY29uLXRhYmxlci1wbHVzXCIgd2lkdGg9XCI0NFwiIGhlaWdodD1cIjQ0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGZpbGw9XCJub25lXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PGxpbmUgeDE9XCIxMlwiIHkxPVwiNVwiIHgyPVwiMTJcIiB5Mj1cIjE5XCIgLz48bGluZSB4MT1cIjVcIiB5MT1cIjEyXCIgeDI9XCIxOVwiIHkyPVwiMTJcIiAvPjwvc3ZnPidcbiAgICBoZWFkLmFwcGVuZENoaWxkKGFkZClcbiAgICBhZGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbiAgICB9KVxuXG4gICAgcHJvamVjdHMuYXBwZW5kQ2hpbGQoaGVhZClcblxuICAgIC8vUHJvamVjdCBMaXN0XG4gICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBsaXN0LmlkID0gJ3Byb2plY3QtbGlzdCdcbiAgICBwcm9qZWN0cy5hcHBlbmRDaGlsZChsaXN0KVxuXG4gICAgcmV0dXJuIHByb2plY3RzXG5cbn0iXSwic291cmNlUm9vdCI6IiJ9