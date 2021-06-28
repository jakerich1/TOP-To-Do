/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/class/project.js":
/*!******************************!*\
  !*** ./src/class/project.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "project": () => (/* binding */ project)
/* harmony export */ });
//Project class
class project {

    constructor(name) {
        this.name = name
        this.tasks = []
    }

    //Methods
    addTask(task) {
        this.tasks.push(task)
        return
    }

    removeTask(task) {
        tasks.splice(tasks.indexOf(task), 1)
        return
    }

    tasks() {
        return this.tasks
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



function createProjectListener(name){

    let proj = new _class_project__WEBPACK_IMPORTED_MODULE_0__.project(name)
    console.log(`Created new project ${proj.name}`)

}

function createTaskListener(name, description, priority, dueDate){

    let nTask = new _class_task__WEBPACK_IMPORTED_MODULE_1__.task(name, description, priority, dueDate)
    console.log(`Created new task ${nTask.title}`)

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

        console.log(duedate)
        ;(0,_controllers_listeners_js__WEBPACK_IMPORTED_MODULE_0__.createTaskListener)(name, desc, priority, duedate)
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
    
    const tbr1 = document.createElement('tr')
    tbr1.innerHTML = '<td>Javascript Chapter</td><td>High</td><td>2021-07-14</td><td><div class="checkbox"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg></div></td>'
    tbody.appendChild(tbr1)

    const tbr2 = document.createElement('tr')
    tbr2.innerHTML = '<td>Javascript Chapter</td><td>High</td><td>2021-07-14</td><td><div class="checkbox"></div></td>'
    tbody.appendChild(tbr2)

    const tbr3 = document.createElement('tr')
    tbr3.innerHTML = '<td>Javascript Chapter</td><td>High</td><td>2021-07-14</td><td><div class="checkbox"></div></td>'
    tbody.appendChild(tbr3)

    table.appendChild(tbody)

    tasks.appendChild(table)


    return tasks

}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY2xhc3MvdGFzay5qcyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1RPUC1Uby1Eby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1RPUC1Uby1Eby8uL3NyYy9jb21wb25lbnRzL3Rhc2tzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQzNCTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFCMEM7QUFDTjs7QUFFcEM7O0FBRUEsbUJBQW1CLG1EQUFPO0FBQzFCLHVDQUF1QyxVQUFVOztBQUVqRDs7QUFFQTs7QUFFQSxvQkFBb0IsNkNBQUk7QUFDeEIsb0NBQW9DLFlBQVk7O0FBRWhEOzs7Ozs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7OztBQ0pxQzs7O0FBR3RCOztBQUVmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQztBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLDhFQUFrQjtBQUMxQixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7O0FBRUEsQyIsImZpbGUiOiJ0YXNrcy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1Byb2plY3QgY2xhc3NcbmV4cG9ydCBjbGFzcyBwcm9qZWN0IHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLnRhc2tzID0gW11cbiAgICB9XG5cbiAgICAvL01ldGhvZHNcbiAgICBhZGRUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJlbW92ZVRhc2sodGFzaykge1xuICAgICAgICB0YXNrcy5zcGxpY2UodGFza3MuaW5kZXhPZih0YXNrKSwgMSlcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGFza3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzXG4gICAgfVxuXG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3MubGVuZ3RoO1xuICAgIH1cblxufVxuIiwiZXhwb3J0IGNsYXNzIHRhc2sge1xuXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSl7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25cbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZVxuICAgIH1cblxuICAgIC8vTWV0aG9kc1xuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSAhdGhpcy5jb21wbGV0ZWRcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZGF5c0xlZnQoKSB7XG5cbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gICAgICAgIGNvbnN0IGRpZmYgPSB0aGlzLmR1ZURhdGUuZ2V0VGltZSgpIC0gdG9kYXkuZ2V0VGltZSgpXG4gICAgICAgIGNvbnN0IGRpZmZEYXlzID0gZGlmZiAvICgxMDAwICogMzYwMCAqIDI0KVxuXG4gICAgICAgIHJldHVybiBkaWZmRGF5c1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IHsgcHJvamVjdCB9IGZyb20gXCIuLi9jbGFzcy9wcm9qZWN0XCJcbmltcG9ydCB7IHRhc2sgfSBmcm9tIFwiLi4vY2xhc3MvdGFza1wiXG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RMaXN0ZW5lcihuYW1lKXtcblxuICAgIGxldCBwcm9qID0gbmV3IHByb2plY3QobmFtZSlcbiAgICBjb25zb2xlLmxvZyhgQ3JlYXRlZCBuZXcgcHJvamVjdCAke3Byb2oubmFtZX1gKVxuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2tMaXN0ZW5lcihuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpe1xuXG4gICAgbGV0IG5UYXNrID0gbmV3IHRhc2sobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKVxuICAgIGNvbnNvbGUubG9nKGBDcmVhdGVkIG5ldyB0YXNrICR7blRhc2sudGl0bGV9YClcblxufVxuXG5cbmV4cG9ydCB7Y3JlYXRlUHJvamVjdExpc3RlbmVyLCBjcmVhdGVUYXNrTGlzdGVuZXJ9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1xuICAgIGNyZWF0ZVRhc2tMaXN0ZW5lclxufSBmcm9tIFwiLi4vY29udHJvbGxlcnMvbGlzdGVuZXJzLmpzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGFza3MoKSB7XG5cbiAgICAvL2FkZCBwcm9qZWN0IG1vZGFsIGFwcGVuZCB0byBib2R5XG4gICAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0YXNrTW9kYWwuaWQgPSBcImFkZFRhc2tzXCJcblxuICAgIGNvbnN0IG1vZGFsQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbW9kYWxDb250LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKVxuICAgIHRhc2tNb2RhbC5hcHBlbmRDaGlsZChtb2RhbENvbnQpXG5cbiAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGNsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJylcbiAgICBjbG9zZUJ0bi5pbm5lckhUTUwgPSAnJnRpbWVzOydcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pXG5cbiAgICAvL01PZGFsIElucHV0c1xuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBuYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiXG4gICAgbmFtZUlucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciB0YXNrIG5hbWUgaGVyZVwiXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKG5hbWVJbnB1dClcblxuICAgIGNvbnN0IGRlc2NJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJylcbiAgICBkZXNjSW5wdXQucGxhY2Vob2xkZXIgPSBcIkVudGVyIGRlc2NyaXB0aW9uXCJcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQoZGVzY0lucHV0KVxuXG4gICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBwcmlvcml0eUlucHV0LnR5cGUgPSBcInRleHRcIlxuICAgIHByaW9yaXR5SW5wdXQucGxhY2Vob2xkZXIgPSBcIkVudGVyIHByaW9yaXR5XCJcbiAgICBtb2RhbENvbnQuYXBwZW5kQ2hpbGQocHJpb3JpdHlJbnB1dClcblxuICAgIGNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBkYXRlSW5wdXQudHlwZSA9IFwiZGF0ZVwiXG4gICAgbW9kYWxDb250LmFwcGVuZENoaWxkKGRhdGVJbnB1dClcblxuICAgIGNvbnN0IG1vZGFsU3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBtb2RhbFN1Ym1pdC5pbm5lclRleHQgPSBcIlN1Ym1pdFwiXG4gICAgbW9kYWxTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBuYW1lID0gbmFtZUlucHV0LnZhbHVlXG4gICAgICAgIGxldCBkZXNjID0gZGVzY0lucHV0LnZhbHVlXG4gICAgICAgIGxldCBwcmlvcml0eSA9IHByaW9yaXR5SW5wdXQudmFsdWVcbiAgICAgICAgbGV0IGR1ZWRhdGUgPSBkYXRlSW5wdXQudmFsdWVcblxuICAgICAgICBjb25zb2xlLmxvZyhkdWVkYXRlKVxuICAgICAgICBjcmVhdGVUYXNrTGlzdGVuZXIobmFtZSwgZGVzYywgcHJpb3JpdHksIGR1ZWRhdGUpXG4gICAgfSlcblxuICAgIG1vZGFsQ29udC5hcHBlbmRDaGlsZChtb2RhbFN1Ym1pdClcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRhc2tNb2RhbClcbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiA8c3Bhbj4gKHgpLCBjbG9zZSB0aGUgbW9kYWxcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgIH0pXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgb3V0c2lkZSBvZiB0aGUgbW9kYWwsIGNsb3NlIGl0XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0YXNrTW9kYWwpIHtcbiAgICAgICAgICAgIHRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vTWFpbiBQcm9qZWN0cyBjb250YWluZXJcbiAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGFza3MuY2xhc3NMaXN0LmFkZCgndGFzay1hcmVhJylcblxuICAgIC8vQWRkIHRhc2sgYnV0dG9uXG4gICAgY29uc3QgYWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZCgnYWRkJylcbiAgICBhZGRCdG4uaW5uZXJIVE1MID0gJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwiaWNvbiBpY29uLXRhYmxlciBpY29uLXRhYmxlci1wbHVzXCIgd2lkdGg9XCI0NFwiIGhlaWdodD1cIjQ0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGZpbGw9XCJub25lXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PGxpbmUgeDE9XCIxMlwiIHkxPVwiNVwiIHgyPVwiMTJcIiB5Mj1cIjE5XCIgLz48bGluZSB4MT1cIjVcIiB5MT1cIjEyXCIgeDI9XCIxOVwiIHkyPVwiMTJcIiAvPjwvc3ZnPidcbiAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgIH0pXG4gICAgdGFza3MuYXBwZW5kQ2hpbGQoYWRkQnRuKVxuXG4gICAgLy9UYWJsZSBlbGVtZW50XG4gICAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpXG5cbiAgICAvL0hlYWRlciByb3cgXG4gICAgY29uc3QgdGhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpXG4gICAgY29uc3QgdGhyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuICAgIGNvbnN0IHRoVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJylcbiAgICB0aFRhc2suaW5uZXJIVE1MID0gXCJUYXNrXCJcbiAgICBjb25zdCB0aFByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgIHRoUHJpb3JpdHkuaW5uZXJIVE1MID0gXCJQcmlvcml0eVwiXG4gICAgY29uc3QgdGhEdWU9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJylcbiAgICB0aER1ZS5pbm5lckhUTUwgPSBcIkR1ZSBEYXRlXCJcbiAgICB0aHIuYXBwZW5kQ2hpbGQodGhUYXNrKVxuICAgIHRoci5hcHBlbmRDaGlsZCh0aFByaW9yaXR5KVxuICAgIHRoci5hcHBlbmRDaGlsZCh0aER1ZSlcbiAgICB0aHIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKSlcbiAgICB0aGVhZC5hcHBlbmRDaGlsZCh0aHIpXG4gICAgdGFibGUuYXBwZW5kQ2hpbGQodGhlYWQpXG5cblxuICAgIC8vUGxhY2Vob2xkZXIgdGFibGUgcm93c1xuICAgIGNvbnN0IHRib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKVxuICAgIFxuICAgIGNvbnN0IHRicjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXG4gICAgdGJyMS5pbm5lckhUTUwgPSAnPHRkPkphdmFzY3JpcHQgQ2hhcHRlcjwvdGQ+PHRkPkhpZ2g8L3RkPjx0ZD4yMDIxLTA3LTE0PC90ZD48dGQ+PGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWNoZWNrXCIgd2lkdGg9XCI0NFwiIGhlaWdodD1cIjQ0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGZpbGw9XCJub25lXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PHBhdGggZD1cIk01IDEybDUgNWwxMCAtMTBcIiAvPjwvc3ZnPjwvZGl2PjwvdGQ+J1xuICAgIHRib2R5LmFwcGVuZENoaWxkKHRicjEpXG5cbiAgICBjb25zdCB0YnIyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuICAgIHRicjIuaW5uZXJIVE1MID0gJzx0ZD5KYXZhc2NyaXB0IENoYXB0ZXI8L3RkPjx0ZD5IaWdoPC90ZD48dGQ+MjAyMS0wNy0xNDwvdGQ+PHRkPjxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjwvZGl2PjwvdGQ+J1xuICAgIHRib2R5LmFwcGVuZENoaWxkKHRicjIpXG5cbiAgICBjb25zdCB0YnIzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuICAgIHRicjMuaW5uZXJIVE1MID0gJzx0ZD5KYXZhc2NyaXB0IENoYXB0ZXI8L3RkPjx0ZD5IaWdoPC90ZD48dGQ+MjAyMS0wNy0xNDwvdGQ+PHRkPjxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjwvZGl2PjwvdGQ+J1xuICAgIHRib2R5LmFwcGVuZENoaWxkKHRicjMpXG5cbiAgICB0YWJsZS5hcHBlbmRDaGlsZCh0Ym9keSlcblxuICAgIHRhc2tzLmFwcGVuZENoaWxkKHRhYmxlKVxuXG5cbiAgICByZXR1cm4gdGFza3NcblxufSJdLCJzb3VyY2VSb290IjoiIn0=