export default function projects() {

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

    projects.appendChild(head)  


    //Project List
    const list = document.createElement('ul')

    const li1 = document.createElement('li')
    li1.classList.add('active')
    li1.innerText = "The Odin Project"
    list.appendChild(li1)

    const li2 = document.createElement('li')
    li2.innerText = "Map Tool"
    list.appendChild(li2)

    const li3 = document.createElement('li')
    li3.innerText = "OAC Report"
    list.appendChild(li3)

    const li4 = document.createElement('li')
    li4.innerText = "Church and Castle"
    list.appendChild(li4)


    projects.appendChild(list)

    return projects

}   