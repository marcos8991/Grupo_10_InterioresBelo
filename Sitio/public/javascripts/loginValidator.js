console.log("loginValidator success")
const $ = id => document.getElementById(id);
const formularioLogin = $('form-login')
const signosEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/




const validation = (id,texto) => {
    if(!$(id).value){
        $(id).classList.add('is-invalid')
        $('error-'+ id).innerText = texto
    } else {
        $(id).classList.remove('is-invalid');
        $(id).classList.add('is-valid')
        $('error-'+ id).innerText = null
    }
}


window.addEventListener('load',()=>{
    $('email').focus();

    $('email').addEventListener('blur',function(){

        switch (true) {
            case !this.value: 
                validation('email',"el email es obligatorio")
                this.classList.add('is-invalid')
                break;
            case !signosEmail.test(this.value.trim()):
                $('error-email').innerText="El email tiene que ser válido";
                this.classList.add('is-invalid')
                break;
            default:
                $('error-email').innerText = null;
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                break;
        }
        
    })
})

$("password").addEventListener('focus',function(){
    $("info-password").innerText="escriba su contraseña";
})

$("password").addEventListener('keydown',function(){
    $("info-password").innerText=null;
})

$("password").addEventListener("blur",function(){
    switch (true) {
        case !this.value: 
            $('error-password').innerText="la contraseña es obligatoria";
            this.classList.add('is-invalid')
            break;
        
        default:
            $('error-password').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    } 
})

formularioLogin.addEventListener('submit',function(e){
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