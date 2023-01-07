let logros=[];

const objlogros={
    videojuego:'',
    logro:'',
    años:'',
    id:''
}

let edit = false;

const formulario = document.querySelector('#form');
const videojuegoinput=document.querySelector('#videojuego');
const logroinput=document.querySelector('#logro');
const añoinput=document.querySelector('#año');
const btnRegister=document.querySelector('#btn-register');

formulario.addEventListener('submit',validarForm);

function validarForm(e){
    e.preventDefault();

    if (videojuegoinput.value === '' || logroinput.value === '' || añoinput.value ===''){
    alert('Es necesario rellenar todos los campos')
    return;
    }
    if (edit){
        editarRegistro()
        edit=false;
    } 
    else {
        objlogros.videojuego=videojuegoinput.value;
        objlogros.logro=logroinput.value;
        objlogros.años=añoinput.value;
        objlogros.id=Date.now();
        
        agregarregistro();
    }
}
function agregarregistro(){
    logros.push({...objlogros})
    mostrarlogros();
    formulario.reset();
    limpiarobjeto();
}
function limpiarobjeto(){
    objlogros.videojuego='';
    objlogros.logro='';
    objlogros.años='';
}
function mostrarlogros(){
limpiarHTML();
const divRegistros=document.querySelector('.listform')


logros.forEach(achieve => {
    const {videojuego, logro, años,id}=achieve;

    const registro = document.createElement('p');
    registro.textContent=`Videojuego: ${videojuego} - Jugando hace ${años} años \n
    Logros o insignias: ${logro} \n`;
    registro.dataset.id=id;

    const editbtn=document.createElement('button');
    editbtn.onclick=()=>cargarlogro(logro);
    editbtn.textContent='Editar';
    editbtn.classList.add('btn', 'btn-warning');
    registro.append(editbtn);
    
    const deletebtn=document.createElement('button');
    deletebtn.onclick=()=>eliminarlogro(id)
    deletebtn.textContent='Eliminar'
    deletebtn.classList.add('btn','btn-danger')
    registro.append(deletebtn);

    const hr = document.createElement('hr');
    divRegistros.appendChild(registro)
    divRegistros.appendChild(hr)

})
}
function cargarlogro(logro){
    const {id,videojuego, logroo, años} = logro;
    videojuegoinput.value=videojuego;
    logroinput.value=logroo;
    añoinput.value=años;
    objlogros.id=id;
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar'
    edit=true;
  }
  function editarRegistro(){
    objlogros.videojuego=videojuegoinput.value;
    objlogros.logro=logroinput.value;
    objlogros.años=añoinput.value;
    logros.map(logro => {
        if (logro.id===objlogros.id){
            logro.id=objlogros.id;
            logro.videojuego=objlogros.videojuego;
            logro.logro=objlogros.logro;
            logro.años=objlogros.años;
            
        }
    })
  }
  function eliminarlogro(id) {

    logros = logros.filter(logro => logro.id !== id);

    limpiarHTML();
    mostrarEmpleados();
}
function limpiarHTML(){
    const divRegistros=document.querySelector('.listform')
    while (divRegistros.firstChild){
        divRegistros.removeChild(divRegistros.firstChild);
    }
}