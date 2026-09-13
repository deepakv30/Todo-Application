

// // Adding item in todo list
// document.querySelector('#myTodo').addEventListener('submit', (event)=>{
//     let myValue = event.target.newTodo.textContent
//     console.log(myValue)
// })
// function addTodo(){
//     // Create a new p tag //
//     const newTodo = document.createElement('p')
//     newTodo.textcontent = document.getElementById('myTodo').value
//     document.querySelector('#list').appendChild(newTodo)
//     console.log(newTodo)
// }

// var h = document.createElement('h1')
// var myValue = document.createTextNode('Hello World!')
// h.appendChild(myValue)
// document.querySelector('h1').appendChild(h)

var ul = document.getElementById('list');
var li;
var todoIdSeq = 0;

var existingBoxes = document.querySelectorAll('#list input[type="checkbox"]');
for (var i = 0; i < existingBoxes.length; i++) {
    var match = /^todo-(\d+)$/.exec(existingBoxes[i].id);
    if (match) {
        todoIdSeq = Math.max(todoIdSeq, parseInt(match[1], 10));
    }
}

var addButton = document.getElementById('add')
addButton.addEventListener('click', addItem)

var removeButton = document.getElementById('remove')
removeButton.addEventListener('click', removeItem)

var removeAllButton = document.getElementById('removeall')
removeAllButton.addEventListener('click', removeAllItem)

function nextTodoId() {
    todoIdSeq += 1;
    return 'todo-' + todoIdSeq;
}

function addItem(){
    var input = document.getElementById('input')
    var item = input.value;
    ul = document.getElementById('list');
    var textnode = document.createTextNode(item);
    if (item === '') {
        return false;
    } else {
        var checkboxId = nextTodoId();
        li = document.createElement('li');
        var checkbox = document.createElement('input')
        checkbox.type ='checkbox';
        checkbox.setAttribute('id', checkboxId);
        var label = document.createElement('label');
        label.setAttribute('for', checkboxId);

        li.appendChild(checkbox);
        label.appendChild(textnode);
        li.appendChild(label);
        ul.insertBefore(li, ul.childNodes[0]);
    }

    setTimeout(() => {
        li.className = 'visual';
    }, 2);
    input.value ='';
}

function removeItem(){
    li = ul.children
    for (let index = 0; index < li.length; index++) {
        while(li[index] && li[index].children[0].checked){
            ul.removeChild(li[index])
        }     
    }
}

function removeAllItem(){
    li = ul.children
    for (let index = 0; index < li.length; index++) {
        while(li[index] && li[index].children[0]){
            ul.removeChild(li[index])
        }
    }
}