/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!***********************************!*\
  !*** ./src/components/details.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ details)
/* harmony export */ });
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
    titleContent.value = "Javascript Chapter"
    title.appendChild(titleContent)
    details.appendChild(title)

    //Task Description
    const description = document.createElement('div')
    description.classList.add('description', 'detail-cont')
    const descTitle = document.createElement('div')
    descTitle.classList.add('heading')
    descTitle.innerText = "Description"
    description.appendChild(descTitle)
    const descContent = document.createElement('textarea')
    descContent.innerText = "Enter task description here"
    description.appendChild(descContent)
    details.appendChild(description)

    //Priority area
    const priority = document.createElement('div')
    priority.classList.add('priority', 'detail-cont')
    const priorityHead = document.createElement('div')
    priorityHead.classList.add('heading')
    priorityHead.innerText = "Priority"
    priority.appendChild(priorityHead)
    const priorityContent = document.createElement('input')
    priorityContent.value = "High"
    priority.appendChild(priorityContent)
    details.appendChild(priority)

    //Due date area
    const dueDate = document.createElement('div')
    dueDate.classList.add('due-date', 'detail-cont')
    const dueHead = document.createElement('div')
    dueHead.classList.add('heading')
    dueHead.innerText = 'Due-Date'
    dueDate.appendChild(dueHead)
    const dueContent = document.createElement('input')
    dueContent.type = 'date'
    dueContent.value = "2021-06-21"
    dueDate.appendChild(dueContent)


    details.appendChild(dueDate)    

    return details

}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVE9QLVRvLURvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29tcG9uZW50cy9kZXRhaWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05lOztBQUVmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBLEMiLCJmaWxlIjoiZGV0YWlscy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRldGFpbHMoKSB7XG5cbiAgICAvL01haW4gUHJvamVjdHMgY29udGFpbmVyXG4gICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKCdkZXRhaWwtYXJlYScpXG5cbiAgICAvL0RldGFpbHMgaGVhZGluZyBhcmVhXG4gICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaGVhZC5jbGFzc0xpc3QuYWRkKCdoZWFkJylcbiAgICBoZWFkLmlubmVyVGV4dCA9IFwiRGV0YWlsc1wiXG4gICAgZGV0YWlscy5hcHBlbmRDaGlsZChoZWFkKVxuXG4gICAgLy9UYXNrIHRpdGxlIGFyZWFcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndGl0bGUnLCAnZGV0YWlsLWNvbnQnKVxuICAgIGNvbnN0IHRpdGxlSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGl0bGVIZWFkLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKVxuICAgIHRpdGxlSGVhZC5pbm5lclRleHQgPSBcIlRpdGxlXCJcbiAgICB0aXRsZS5hcHBlbmRDaGlsZCh0aXRsZUhlYWQpXG4gICAgY29uc3QgdGl0bGVDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIHRpdGxlQ29udGVudC52YWx1ZSA9IFwiSmF2YXNjcmlwdCBDaGFwdGVyXCJcbiAgICB0aXRsZS5hcHBlbmRDaGlsZCh0aXRsZUNvbnRlbnQpXG4gICAgZGV0YWlscy5hcHBlbmRDaGlsZCh0aXRsZSlcblxuICAgIC8vVGFzayBEZXNjcmlwdGlvblxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdkZXNjcmlwdGlvbicsICdkZXRhaWwtY29udCcpXG4gICAgY29uc3QgZGVzY1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkZXNjVGl0bGUuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpXG4gICAgZGVzY1RpdGxlLmlubmVyVGV4dCA9IFwiRGVzY3JpcHRpb25cIlxuICAgIGRlc2NyaXB0aW9uLmFwcGVuZENoaWxkKGRlc2NUaXRsZSlcbiAgICBjb25zdCBkZXNjQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJylcbiAgICBkZXNjQ29udGVudC5pbm5lclRleHQgPSBcIkVudGVyIHRhc2sgZGVzY3JpcHRpb24gaGVyZVwiXG4gICAgZGVzY3JpcHRpb24uYXBwZW5kQ2hpbGQoZGVzY0NvbnRlbnQpXG4gICAgZGV0YWlscy5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbilcblxuICAgIC8vUHJpb3JpdHkgYXJlYVxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScsICdkZXRhaWwtY29udCcpXG4gICAgY29uc3QgcHJpb3JpdHlIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBwcmlvcml0eUhlYWQuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpXG4gICAgcHJpb3JpdHlIZWFkLmlubmVyVGV4dCA9IFwiUHJpb3JpdHlcIlxuICAgIHByaW9yaXR5LmFwcGVuZENoaWxkKHByaW9yaXR5SGVhZClcbiAgICBjb25zdCBwcmlvcml0eUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgcHJpb3JpdHlDb250ZW50LnZhbHVlID0gXCJIaWdoXCJcbiAgICBwcmlvcml0eS5hcHBlbmRDaGlsZChwcmlvcml0eUNvbnRlbnQpXG4gICAgZGV0YWlscy5hcHBlbmRDaGlsZChwcmlvcml0eSlcblxuICAgIC8vRHVlIGRhdGUgYXJlYVxuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZHVlLWRhdGUnLCAnZGV0YWlsLWNvbnQnKVxuICAgIGNvbnN0IGR1ZUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGR1ZUhlYWQuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpXG4gICAgZHVlSGVhZC5pbm5lclRleHQgPSAnRHVlLURhdGUnXG4gICAgZHVlRGF0ZS5hcHBlbmRDaGlsZChkdWVIZWFkKVxuICAgIGNvbnN0IGR1ZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgZHVlQ29udGVudC50eXBlID0gJ2RhdGUnXG4gICAgZHVlQ29udGVudC52YWx1ZSA9IFwiMjAyMS0wNi0yMVwiXG4gICAgZHVlRGF0ZS5hcHBlbmRDaGlsZChkdWVDb250ZW50KVxuXG5cbiAgICBkZXRhaWxzLmFwcGVuZENoaWxkKGR1ZURhdGUpICAgIFxuXG4gICAgcmV0dXJuIGRldGFpbHNcblxufSJdLCJzb3VyY2VSb290IjoiIn0=