const input = document.getElementById('input');
const add = document.getElementById('add');

const todo = [];

let text = '';

input.addEventListener("change", function (event) {
    text = event.target.value;
});

add.addEventListener("submit", function (event) {
    event.preventDefault();
    const item = {
        id: new Date().getMilliseconds(),
        content: text,
        completed: false,
    };

    if (input.value.trim() != '') {
        todo.push(item);
        getItem();
        input.value = '';
    }
})

function getItem() {
    let output = '';
    todo.forEach(function (value) {
        output += `  <li>
                <label>
                  <input type="checkbox" onclick="complete(${value.id})"
                  ${value.completed && "checked"}>
                  <p id="contents">
                    ${value.completed ? `<s>${value.content}</s>` : value.content}
                  </p>  
                </label >
                <span>
                    <button onclick="edit(event , ${value.id
            })">Edit</button>
                    <button type="button" onclick="deleter(${value.id})">X</button>
                </span>
            </li > `
    });

    document.getElementById('item').innerHTML = output;
    document.getElementById('count').innerHTML = todo.length;
}

function complete(id) {
    todo.find(function (item) {
        if (item.id == id) {
            item.completed = item.completed == true ? false : true;
            getItem();
        }
    })
}

function deleter(id) {
    todo.find(function (item) {
        if (item?.id == id) {
            todo.splice(todo.indexOf(item), 1);
            getItem();
        }
    })
}

function edit(event, id) {
    todo.find(function (item) {
        if (item?.id === id) {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = item.content;

            const contents = document.querySelectorAll("#contents")[todo.indexOf(item)];

            contents.replaceChildren(editInput);
            event.target.innerText = "Save";
            editInput.addEventListener("change", function (event) {
                item.content = event.target.value;
                contents.replaceChildren(
                    item.completed ? `<s>${item.content}</s>` : item.content
                );
                getItem();
            })
        }
    })
}