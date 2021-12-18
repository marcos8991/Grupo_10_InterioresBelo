console.log('registerValidator success');
const $ = id => document.getElementById(id);

const formularioRegister = $('form-register')


/* Expresiones */
const regExLetras = /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/
const regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/ 
const regExPassword = /^\S{8,16}$/

const inputName = $('name')
const inputEmail = $('email')
const inputPassword = $('pass')
const inputPassword2 = $('pass2')

window.addEventListener('load',()=>{
    $('name').focus();

})

inputName.addEventListener('focus', function() {
    $('info-name').innerText = "El nombre es obligatorio y debe tener almenos 2 caracteres"
    $('error-name').innerText = null;
    this.classList.remove('is-invalid');
})


inputName.addEventListener('blur', function() {
    $('info-name').innerText = null;
})

inputName.addEventListener('blur', function() {
    switch (true) {
        case !this.value :
            $('error-name').innerText = "El nombre es requerido y debe tener almenos 2 caracteres";
            this.classList.add('is-invalid')
            break;
        case !regExLetras.test(this.value) :
            $('error-name').innerText = "Solo se permiten letras";
            this.classList.add('is-invalid');
            break;
        default:
            $('error-name').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})

inputEmail.addEventListener('focus', function() {
    $('info-email').innerText = "Escriba un email válido"
    $('error-email').innerText = null;
    this.classList.remove('is-invalid');
})

inputEmail.addEventListener('blur', function() {
    $('info-email').innerText = null;
})

inputEmail.addEventListener('blur', async function() {
    switch (true) {
        case !this.value :
            $('error-email').innerText = "El email es requerido";
            this.classList.add('is-invalid')
            break;
        case !regExEmail.test(this.value) :
            $('error-email').innerText = "Email inválido";
            this.classList.add('is-invalid');
            break;
        default:
            $('error-email').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})

inputPassword.addEventListener('focus', function() {
    $('info-password').innerText = "Deberá tener al menos 8 caracteres"
    $('error-password').innerText = null;
    this.classList.remove('is-invalid');
})

inputPassword.addEventListener('blur', function() {
    $('info-password').innerText = null;
})

inputPassword.addEventListener('blur', function() {
    switch (true) {
        case !this.value :
            $('error-password').innerText = "La contraseña es requerida";
            this.classList.add('is-invalid')
            break;
            case !regExPassword.test(this.value) :
            $('error-password').innerText = "Debe tener almenos 8 caracteres";
            this.classList.add('is-invalid');
            break;
        default:
            $('error-password').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})

inputPassword2.addEventListener('blur', function() {
    if(this.value === inputPassword.value){
     console.log(this.value)
        this.classList.remove('is-invalid')
        this.classList.add('is-valid')
    }else{
        this.classList.remove('is-valid')
     $('error-password2').innerText = null;
    }
 })
 
 inputPassword2.addEventListener('blur', function() {
     switch (true) {
         case !this.value :
             $('error-password2').innerText = "Debe confirmar su contraseña";
             this.classList.add('is-invalid')
             break;
         case this.value !== inputPassword.value :
             $('error-password2').innerText = "Las contraseñas no coinciden";
             this.classList.add('is-invalid');
             break;
         default:
             $('error-password2').innerText = null;
             this.classList.remove('is-invalid');
            this.classList.add('is-valid');
             break;
     }
 })

formularioRegister.addEventListener('submit',function(e){
    e.preventDefault()

    let error = false;

    for (let i = 0; i < this.elements.length -1; i++) {
        if(this.elements[i].classList.contains('is-invalid')){
            error = true;
            $('error-enviar').innerText = "Los campos son obligatorios"
        }
        
    }
    !error && this.submit();
})

