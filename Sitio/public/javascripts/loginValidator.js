console.log("loginValidator success")
const $= id => document.getElementById(id);
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
