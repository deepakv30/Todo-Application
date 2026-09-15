var STORAGE_KEY = 'todo-application-items';
var ul = document.getElementById('list');
var todoIdCounter = 0;

var addButton = document.getElementById('add');
addButton.addEventListener('click', addItem);

var removeButton = document.getElementById('remove');
removeButton.addEventListener('click', removeItem);

var removeAllButton = document.getElementById('removeall');
removeAllButton.addEventListener('click', removeAllItem);

ul.addEventListener('change', function (event) {
    if (event.target && event.target.matches('input[type="checkbox"]')) {
        saveTodos();
    }
});

function nextTodoId() {
    todoIdCounter += 1;
    return 'todo-' + todoIdCounter;
}

function ensureCounterPast(id) {
    var match = /^todo-(\d+)$/.exec(id || '');
    if (match) {
        var n = parseInt(match[1], 10);
        if (n > todoIdCounter) {
            todoIdCounter = n;
        }
    }
}

function createTodoElement(todo) {
    var id = todo.id || nextTodoId();
    ensureCounterPast(id);

    var li = document.createElement('li');
    li.className = 'mycheck visual';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.checked = !!todo.checked;

    var label = document.createElement('label');
    label.setAttribute('for', id);
    label.appendChild(document.createTextNode(todo.text));

    li.appendChild(checkbox);
    li.appendChild(label);
    return li;
}

function readTodosFromDom() {
    var items = [];
    var children = ul.children;
    for (var i = 0; i < children.length; i++) {
        var li = children[i];
        var checkbox = li.querySelector('input[type="checkbox"]');
        var label = li.querySelector('label');
        if (!checkbox || !label) {
            continue;
        }
        ensureCounterPast(checkbox.id);
        items.push({
            id: checkbox.id || nextTodoId(),
            text: label.textContent,
            checked: checkbox.checked
        });
    }
    return items;
}

function renderTodos(todos) {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    for (var i = 0; i < todos.length; i++) {
        ul.appendChild(createTodoElement(todos[i]));
    }
}

function saveTodos() {
    try {
        var todos = readTodosFromDom();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (err) {
        // Quota or private mode — keep UI working without persistence.
    }
}

function loadTodos() {
    try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return null;
        }
        var parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            return null;
        }
        return parsed.map(function (item, index) {
            return {
                id: item.id || ('todo-' + (index + 1)),
                text: String(item.text != null ? item.text : ''),
                checked: !!item.checked
            };
        }).filter(function (item) {
            return item.text !== '';
        });
    } catch (err) {
        return null;
    }
}

function initTodos() {
    var stored = loadTodos();
    if (stored !== null) {
        // Explicit empty array is a valid saved state after Remove All.
        todoIdCounter = 0;
        renderTodos(stored);
        return;
    }
    // First visit: keep static markup defaults, normalize ids, then persist.
    var seeded = readTodosFromDom();
    if (seeded.length === 0) {
        seeded = [
            { id: 'todo-1', text: 'Wake up early', checked: false },
            { id: 'todo-2', text: 'Go to gym', checked: true },
            { id: 'todo-3', text: 'Complete javascript tutorial', checked: false }
        ];
    }
    renderTodos(seeded);
    saveTodos();
}

function addItem() {
    var input = document.getElementById('input');
    var item = input.value;
    if (item === '') {
        return false;
    }

    var li = createTodoElement({
        id: nextTodoId(),
        text: item,
        checked: false
    });
    ul.insertBefore(li, ul.firstChild);
    input.value = '';
    saveTodos();
}

function removeItem() {
    var children = ul.children;
    for (var index = 0; index < children.length; index++) {
        while (children[index] && children[index].children[0] && children[index].children[0].checked) {
            ul.removeChild(children[index]);
        }
    }
    saveTodos();
}

function removeAllItem() {
    if (!window.confirm('Remove all todos? This cannot be undone.')) {
        return;
    }
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    saveTodos();
}

initTodos();
