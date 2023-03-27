export function valida(input){
    const tipoInput = input.dataset.tipo;
    if (validadores[tipoInput]){
        validadores[tipoInput](input)
    }

if (input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = ""
}else{
    input.parentElement.classList.add("input.container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoInput, input)
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMisMatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError = {
    nombre:{
        valueMissing:"Este campo no puede estar vacío"
    },
    email:{
        valueMissing:"Este campo no puede estar vacío",
        typeMisMatch:"El correo no es válido"
    },
    password:{
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch:"Al menos 6 caracteres, máximo 12, una minúscula, una mayúscula, un número, sin caracteres especiales"
    },
    nacimiento:{
        valueMissing:"Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero:{
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch:"El formato requerido es XXXXXXXXXX 10 digitos"    
    },
    direccion:{
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch:"La dirección debe contener entre 10 a 40 caracteres"
    },
    ciudad:{
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch:"La ciudad debe contener entre 4 a 30 caracteres"
    },
    departamento:{
        valueMissing:"Este campo no puede estar vacío",
        patternMismatch:"El departamento debe contener entre 4 a 30 caracteres"
    },


}

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
}

function mostrarMensajeDeError(tipoInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            console.log(tipoInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoInput][error]);
            mensaje = mensajesDeError[tipoInput][error];
        }
    })

    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date (input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje)
}


function mayorDeEdad (fechaCliente){
    const fechaActual = new Date ();
    const diferenciaFechas = new Date(
        fechaCliente.getUTCFullYear() + 18,
        fechaCliente.getUTCMonth(),
        fechaCliente.getUTCDate()
        );
    return diferenciaFechas <= fechaActual;
}