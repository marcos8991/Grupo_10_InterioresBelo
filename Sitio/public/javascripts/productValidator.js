console.log('productAdd conectado');
const $ = id => document.getElementById(id);

const formAdd = $('form-add');

formAdd.elements[0].addEventListener('blur',function () {
    switch (true) {
        case !this.value.trim():
            this.classList.add('is-invalid');
            nameError.innerHTML = "El nombre es requerido"
            
            break;
    
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            nameError.innerHTML = null;
            break;
    }
})

