const todoInput = document.querySelector('#todoInput');
const addBtn = document.querySelector('#addBtn');

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));
console.log(savedTodoList)

if (savedTodoList) { // 로컬에서 데이터 가져오기
    for(let i = 0; i < savedTodoList.length; i++){
        createTodo(savedTodoList[i])
        
    }
}

function keyCodeCheck () { // 엔터키로 추가
	if(window.event.keyCode === 13 && todoInput.value !== ''){
        createTodo();
    }
}

addBtn.addEventListener('click', () => { // + 버튼으로 추가
    if(todoInput.value !== ''){
        createTodo();
    }
});

function createTodo (storageData) { // 할 일 추가 기능
    let todoContents = todoInput.value;
    if (storageData) {
        todoContents = storageData.contents
    }

    const todoList = document.querySelector('#todoList');
    const newLi = document.createElement('li');
    const newBtn = document.createElement('button');
    const newDelBtn = document.createElement('delButton');
    const newSpan = document.createElement('span');
    const deleteAll = document.querySelector('.delete-btn-wrap');
    const deletOne = document.querySelector('.delete-btn-wrap');

    newLi.appendChild(newBtn);
    newLi.appendChild(newSpan);
    newLi.appendChild(newDelBtn);

    newSpan.textContent = todoContents

    todoList.appendChild(newLi);

    todoInput.value = '';

    newBtn.addEventListener('click', () => { // 체크박스 클릭
        newLi.classList.toggle('complete');

        saveItemsFn();
    });

    newDelBtn.addEventListener('click', () => { // 더블 클릭 - 리스트에서 삭제
        newLi.remove();

        saveItemsFn();
    });


    if (storageData && storageData.complete === true) {
        newLi.classList.add('complete')
    }

    saveItemsFn();
};

function deleteOne() { // 삭제 버튼
    const liList = document.querySelector('#todoList li');
    liList[i].remove();
    saveItemsFn();
};

function deleteAll() { // 전체 삭제 버튼
    const liList = document.querySelectorAll('#todoList li');
    for ( let i = 0; i < liList.length; i++){
        liList[i].remove();
    }
    saveItemsFn();
};

function saveItemsFn () { // 로컬에 데이터 저장하기
    const saveItems = [];
    for (let i = 0; i < todoList.children.length; i++){
        const todoObj = {
            contents: todoList.children[i].querySelector('span').textContent,
            complete: todoList.children[i].classList.contains('complete')
        };
        saveItems.push(todoObj);
    }

    if (saveItems.length === 0) {
        localStorage.removeItem('saved-items')
    }else{
        localStorage.setItem('saved-items', JSON.stringify(saveItems));
    }
}
