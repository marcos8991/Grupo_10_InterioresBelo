console.log('registerValidator success');
const $ = id => document.getElementById(id);

const formulario = $('form-register')

/* Expresiones */
const regExLetras = /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/
const regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/ 
const regExPassword = /^\S{8,16}$/

const inputName = $('name')
const inputEmail = $('email')
const inputPassword = $('pass')
const inputPassword2 = $('pass2')

inputName.addEventListener('focus', function() {
    $('info-name').innerText = "El nombre es obligatorio y debe tener almenos 2 caracteres"
    $('error-name').innerText = null;
})


inputName.addEventListener('blur', function() {
    $('info-name').innerText = null;
})

inputName.addEventListener('blur', function() {
    switch (true) {
        case !this.value :
            $('error-name').innerText = "El nombre es requerido";
            break;
        case !regExLetras.test(this.value) :
            $('error-name').innerText = "Solo se permiten letras";
            break;
        default:
            $('error-name').innerText = null;
            break;
    }
})

inputEmail.addEventListener('focus', function() {
    $('info-email').innerText = "Escriba un email válido"
    $('error-email').innerText = null;
})

inputEmail.addEventListener('blur', function() {
    $('info-email').innerText = null;
})

inputEmail.addEventListener('blur', async function() {
    switch (true) {
        case !this.value :
            $('error-email').innerText = "El email es requerido";
            break;
        case !regExEmail.test(this.value) :
            $('error-email').innerText = "Email inválido";
            break;
        default:
            $('error-email').innerText = null;
            break;
    }
})

inputPassword.addEventListener('focus', function() {
    $('info-password').innerText = "Deberá tener al menos 8 caracteres"
    $('error-password').innerText = null;
})

inputPassword.addEventListener('blur', function() {
    $('info-password').innerText = null;
})

inputPassword.addEventListener('blur', function() {
    switch (true) {
        case !this.value :
            $('error-password').innerText = "La contraseña es requerida";
            break;
            case !regExPassword.test(this.value) :
            $('error-password').innerText = "Debe tener almenos 8 caracteres";
            break;
        default:
            $('error-password').innerText = null;
            break;
    }
})

inputPassword2.addEventListener('blur', function() {
    if(this.value === inputPassword.value){
     console.log(this.value)
    }else{
     $('error-password2').innerText = null;
    }
 })
 
 inputPassword2.addEventListener('blur', function() {
     switch (true) {
         case !this.value :
             $('error-password2').innerText = "Debe confirmar su contraseña";
             break;
         case this.value !== inputPassword.value :
             $('error-password2').innerText = "Las contraseñas no coinciden";
             break;
         default:
             $('error-password2').innerText = null;
             break;
     }
 });