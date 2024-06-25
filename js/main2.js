let videogame = document.getElementById('videojuego');
let logro = document.getElementById('logro');
let year = document.getElementById('year');
let form = document.querySelector('#form');
let alertValidation = document.getElementById('alertValidation');
let alertValidationInt = document.getElementById('alertValidationInt')
let tableBody = document.getElementById('tableAchievements-body');
let btnSubmit = document.getElementById('btn-register');
let btnEdit = document.getElementById('btn-edit');
let dataArray = getArrayFromLocalStorage('dataArray');
let editIndex;
const intRegex = /^-?\d+$/;

window.addEventListener('load', renderData)
form.addEventListener('submit', validateForm)

function getArrayFromLocalStorage(key) {
    let storedArray = localStorage.getItem(key);
    return storedArray ? JSON.parse(storedArray) : [];
}

function saveArrayToLocalStorage(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function renderData() {
   if (dataArray.length != 0) {
        dataArray.forEach((element,index) => {
        let row = `
        <tr>
            <th scope="row">${index}</th>
            <td>${element.videojuego}</td>
            <td>${element.logro}</td>
            <td>${element.year}</td>
            <td><button type="button" class="btn btn-warning" onclick="(() => {editForm(${index});})()">Editar</button></td>
            <td><button type="button" class="btn btn-danger" onclick="(() => {deleteData(${index});})()">Eliminar</button></td>
        </tr>

        `;

        tableBody.insertAdjacentHTML('beforeend', row);});
   }

}

function validateForm(event){
    event.preventDefault();

    if (videogame.value == '' || logro.value == '' || year.value == ''){
        alertValidation.style.display = 'flex';
    }else if (!intRegex.test(year.value)){
        alertValidationInt.style.display = 'flex';
    }
    else{
        let dataObj = {
        videojuego : videogame.value,
        logro : logro.value,
        year : year.value,
        }
        sendData(dataObj);
    }
}

function sendData(dataObj){
    if (editIndex >= 0) {
        // Si estamos editando un elemento existente
        dataArray[editIndex] = dataObj;
        editIndex = -1; // Reiniciar el índice de edición
        btnSubmit.innerText = 'Insertar registro'; // Restaurar el texto del botón
    } else {
        // Si estamos agregando un nuevo elemento
        dataArray.push(dataObj);
    }

    saveArrayToLocalStorage('dataArray', dataArray);
    location.reload();
    cleanForm();
}

function cleanForm(){
    videogame.value = '';
    logro.value = '';
    year.value = '';
    editIndex = -1; // Reiniciar el índice de edición al limpiar el formulario
    btnSubmit.innerText = 'Insertar registro'; // Restaurar el texto del botón
}

function editForm(index){
    dataArray = getArrayFromLocalStorage('dataArray');
    let dataToEdit = dataArray[index];
    videogame.value = dataToEdit.videojuego;
    logro.value = dataToEdit.logro;
    year.value = dataToEdit.year;

    editIndex = index; // Establecer el índice de edición
    btnSubmit.innerText = 'Actualizar'; // Cambiar el texto del botón
}

function deleteData(index) {
    dataArray.splice(index,1);
    saveArrayToLocalStorage('dataArray', dataArray);
    renderData();
    location.reload();
}
