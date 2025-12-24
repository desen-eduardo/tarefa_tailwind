
const formularioTarefa = document.querySelector('#formularioTarefa');
const listagem = [];
let tarefa = document.getElementsByName('tarefa')[0];
let uuid = document.getElementsByName('uuid')[0];
let completed = document.getElementsByName('completed')[0];
let error = document.querySelector('#error');


formularioTarefa.addEventListener('submit',(event)=>{
    event.preventDefault();

    if (!tarefa.value) {
        error.style.display = 'block';
        return;
    }

    if (uuid.value) {
        updatedTarefa(uuid.value,tarefa.value,completed.value);
        return;
    }

    listagem.push({
        uuid:Date.now(),
        name:tarefa.value,
        completed:false
    });

    tarefa.value = '';
    listagemTarefa();
});

const listagemTarefa = () => {
    let arrayListagem = document.querySelector('#listagem');
    arrayListagem.innerHTML = '';
    let html = '';
    for (items of listagem) {
        html += `<div class="w-2xs bg-gray-300 p-2 rounded-sm flex flex-row justify-between">
            <div class="flex items-center cursor-pointer" onclick="checked(${items.uuid})">
                ${(items.completed === true || items.completed === 'true') ? '<i class="fa-solid fa-check text-green-700 mr-1.5"></i>':''}
                <span ${(items.completed === true || items.completed === 'true') ? ' class="line-through"':''}>${items.name}</span>
            </div>
            <div>
                <i class="fa-solid fa-edit text-green-700 cursor-pointer" onclick="editaTarefa(${items.uuid})"></i>
                <i class="fa-solid fa-trash text-red-600 cursor-pointer" onclick="removeTarefa(${items.uuid})"></i>
            </div>
        </div>`;
    }

    arrayListagem.innerHTML = html;
}

tarefa.addEventListener('keyup',()=>{
    error.style.display = 'none';
});

const removeTarefa = (uuid)=>{
    let index = listagem.findIndex((item)=> {
        if (uuid == item.uuid) return item 
    });

    listagem.splice(index,1);
    listagemTarefa();
    checkedLista();
}

const editaTarefa = (id)=>{
    
    let index = listagem.findIndex((item)=> {
        if (id == item.uuid) return item 
    });
    
    uuid.value = listagem[index].uuid; 
    completed.value = listagem[index].completed
    tarefa.value = listagem[index].name
}

const updatedTarefa = (uuid,tarefa,completed) => {

    let index = listagem.findIndex((item)=> {
        if (uuid == item.uuid) return item 
    });

    listagem[index] = {
        uuid: uuid,
        completed: completed,
        name: tarefa
    }

    listagemTarefa();
    cleanInputs();
} 

const checked = (uuid)=>{
    let index = listagem.findIndex((item)=> {
        if (uuid == item.uuid) return item 
    });

    listagem[index] = {
        uuid:listagem[index].uuid,
        completed: !listagem[index].completed,
        name: listagem[index].name,
    }

    listagemTarefa();
}

const cleanInputs = ()=> {
    uuid.value = '';
    completed.value = '';
    tarefa.value = '';
}

const checkedLista = () => {
    if (listagem.length == 0) 
    document.querySelector('#listagem').innerHTML = `<div class="flex justify-center w-full"><h2 class="text-red-700">
        Sem registro encontrado</h2>
    `;
}

checkedLista();