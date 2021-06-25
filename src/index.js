import _ from 'lodash';
import "./style.scss";
import nav from './components/nav.js';
import projects from './components/projects.js'
import tasks from './components/tasks.js'
import details from './components/details.js'

function component() {

  const element = document.createElement('div');
  element.classList.add('container')

  element.appendChild(nav());

  
  const mainArea = document.createElement('main')
  mainArea.appendChild(projects())
  mainArea.appendChild(tasks())
  mainArea.appendChild(details())
  


  element.appendChild(mainArea)

  return element;

}

document.body.appendChild(component());