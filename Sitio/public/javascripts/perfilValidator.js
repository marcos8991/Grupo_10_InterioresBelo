console.log("perfilValidator success")
const $ = id => document.getElementById(id);

const formularioPerfil = $('form-perfil')

const regExLetras = /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/
const regExPassword = /^\S{8,16}$/

const inputName = $('name')
const inputPassword = $('password')
const inputFile = $('avatar')

window.addEventListener('load', () => {
    $('name').focus();

})

inputName.addEventListener('focus', function () {
    $('info-name').innerText = "El nombre es obligatorio y debe tener almenos 2 caracteres"
    $('error-name').innerText = null;
    this.classList.remove('is-invalid');
})

inputName.addEventListener('blur', function () {
    $('info-name').innerText = null;
})

inputName.addEventListener('blur', function () {
    switch (true) {
        case !this.value:
            $('error-name').innerText = "El nombre es requerido y debe tener almenos 2 caracteres";
            this.classList.add('is-invalid')
            break;
        case !regExLetras.test(this.value):
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


inputPassword.addEventListener('focus', function () {
    $('info-password').innerText = "Deberá tener al menos 8 caracteres"
    $('error-password').innerText = null;
    this.classList.remove('is-invalid');
})

inputPassword.addEventListener('blur', function () {
    $('info-password').innerText = null;
})


inputPassword.addEventListener('blur', function () {
    switch (true) {
        case !this.value:
            $('error-password').innerText = "La contraseña es requerida";
            this.classList.add('is-invalid')
            break;
        case !regExPassword.test(this.value):
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

formularioPerfil.addEventListener('submit', function (e) {
    e.preventDefault();
    let error = false;
    for (let i = 0; i < this.elements.length - 1; i++) {
        if (this.elements[i].classList.contains('is-invalid') || !this.elements[i].value) {
            error = true
            this.elements[i].classList.add('is-invalid');
            $('error-enviar').innerHTML = "Los campos indicados son obligatorios"
            if (!this.elements[5].value) {
                $('btnImagen').classList.remove('btn-outline-secondary')

                $('btnImagen').classList.add('btn-outline-danger')
            }
        }
    }
    !error && this.submit();
})
inputFile.addEventListener('change', function (e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
        $('image-perfil').src = reader.result
    }

})
