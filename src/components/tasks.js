export default function tasks() {

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