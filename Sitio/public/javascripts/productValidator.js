console.log('productAdd conectado');
const $ = id => document.getElementById(id);
const extImage = /(.jpg|.jpeg|.png|.gif|.webp)$/i;

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
    $('name').focus();

    
    $('name').addEventListener('blur', function(){

        switch (true) {
            case !this.value:
                validation('name','El nombre es obligatorio')
                break;
            case this.value.length < 5 :
                this.classList.add('is-invalid')
                $('error-name').innerText = 'Se requiere minimo 5 caractereres'
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid')
                $('error-name').innerText = null
                break;
        }
       
    })

    $('price').addEventListener('blur',function(){
        validation('price','El precio es obligatorio')
    })

    $('description').addEventListener('blur',function(){
        switch (true) {

            case !this.value:
                validation('description','La descripcion es obligatoria')
                break;
            case this.value.length < 20  :
                this.classList.add('is-invalid')
               
                $('error-description').innerText = 'Se requiere por lo menos 20 caracteres'
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid')
                $('error-description').innerText = null
                break;
        }

        
    })

    $('section').addEventListener('blur',function(){
        validation('section','¿Pertenece a una sección?')
    })


    $('category').addEventListener('blur',function(){
        switch (true) {
            case !this.value:
                validation('category','debes elegir una categoria')
                this.classList.add('is-invalid')
                
                break;
        
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                $('error-categoria').innerText=null;
                break;
        }
        
    })

    $('discount').addEventListener('blur',function(){
        validation('discount','Selecciona las cuotas')
    })


    $('image').addEventListener('blur', function () {

        switch (true) {
            case !this.value:
                validation('image','la imagen es obligatoria')
                this.classList.add('is-invalid')
                break;
            case !extImage.test(this.value):
                $('error-image').innerText="el formato no es compatible"
                this.classList.add('is-invalid')
                break;
            default:
                $('error-image').innerText=null;
                this.classList.remove('is-invalid');
                this.classList.add('is-valid')
                break;
        }

        
    })
    
    $('form-add-product').addEventListener('submit',function(e){
        e.preventDefault();
    let error = false;
    for (let i = 0; i < this.elements.length - 1; i++) {
        if(this.elements[i].classList.contains('is-invalid') || !this.elements[i].value){
            error = true
            this.elements[i].classList.add('is-invalid');
            $('error-enviar').innerHTML = "Los campos indicados son obligatorios"
            if(!this.elements[5].value){
                $('btnImagen').classList.remove('btn-outline-secondary')

                $('btnImagen').classList.add('btn-outline-danger')
            } 
        }
    }
    !error && this.submit();
    })
})