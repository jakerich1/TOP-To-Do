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
/*!*********************************!*\
  !*** ./src/components/tasks.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tasks)
/* harmony export */ });
function tasks() {

    //Main Projects container
    const tasks = document.createElement('div')
    tasks.classList.add('task-area')

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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVE9QLVRvLURvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9UT1AtVG8tRG8vLi9zcmMvY29tcG9uZW50cy90YXNrcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOZTs7QUFFZjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTs7QUFFQSxDIiwiZmlsZSI6InRhc2tzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGFza3MoKSB7XG5cbiAgICAvL01haW4gUHJvamVjdHMgY29udGFpbmVyXG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHRhc2tzLmNsYXNzTGlzdC5hZGQoJ3Rhc2stYXJlYScpXG5cbiAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJylcblxuICAgIC8vSGVhZGVyIHJvdyBcbiAgICBjb25zdCB0aGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJylcbiAgICBjb25zdCB0aHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXG4gICAgY29uc3QgdGhUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgIHRoVGFzay5pbm5lckhUTUwgPSBcIlRhc2tcIlxuICAgIGNvbnN0IHRoUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpXG4gICAgdGhQcmlvcml0eS5pbm5lckhUTUwgPSBcIlByaW9yaXR5XCJcbiAgICBjb25zdCB0aER1ZT0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgIHRoRHVlLmlubmVySFRNTCA9IFwiRHVlIERhdGVcIlxuICAgIHRoci5hcHBlbmRDaGlsZCh0aFRhc2spXG4gICAgdGhyLmFwcGVuZENoaWxkKHRoUHJpb3JpdHkpXG4gICAgdGhyLmFwcGVuZENoaWxkKHRoRHVlKVxuICAgIHRoci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpKVxuICAgIHRoZWFkLmFwcGVuZENoaWxkKHRocilcbiAgICB0YWJsZS5hcHBlbmRDaGlsZCh0aGVhZClcblxuXG4gICAgLy9QbGFjZWhvbGRlciB0YWJsZSByb3dzXG4gICAgY29uc3QgdGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpXG4gICAgXG4gICAgY29uc3QgdGJyMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcbiAgICB0YnIxLmlubmVySFRNTCA9ICc8dGQ+SmF2YXNjcmlwdCBDaGFwdGVyPC90ZD48dGQ+SGlnaDwvdGQ+PHRkPjIwMjEtMDctMTQ8L3RkPjx0ZD48ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cImljb24gaWNvbi10YWJsZXIgaWNvbi10YWJsZXItY2hlY2tcIiB3aWR0aD1cIjQ0XCIgaGVpZ2h0PVwiNDRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgZmlsbD1cIm5vbmVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiLz48cGF0aCBkPVwiTTUgMTJsNSA1bDEwIC0xMFwiIC8+PC9zdmc+PC9kaXY+PC90ZD4nXG4gICAgdGJvZHkuYXBwZW5kQ2hpbGQodGJyMSlcblxuICAgIGNvbnN0IHRicjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXG4gICAgdGJyMi5pbm5lckhUTUwgPSAnPHRkPkphdmFzY3JpcHQgQ2hhcHRlcjwvdGQ+PHRkPkhpZ2g8L3RkPjx0ZD4yMDIxLTA3LTE0PC90ZD48dGQ+PGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PC9kaXY+PC90ZD4nXG4gICAgdGJvZHkuYXBwZW5kQ2hpbGQodGJyMilcblxuICAgIGNvbnN0IHRicjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXG4gICAgdGJyMy5pbm5lckhUTUwgPSAnPHRkPkphdmFzY3JpcHQgQ2hhcHRlcjwvdGQ+PHRkPkhpZ2g8L3RkPjx0ZD4yMDIxLTA3LTE0PC90ZD48dGQ+PGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PC9kaXY+PC90ZD4nXG4gICAgdGJvZHkuYXBwZW5kQ2hpbGQodGJyMylcblxuICAgIHRhYmxlLmFwcGVuZENoaWxkKHRib2R5KVxuXG4gICAgdGFza3MuYXBwZW5kQ2hpbGQodGFibGUpXG5cblxuICAgIHJldHVybiB0YXNrc1xuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==