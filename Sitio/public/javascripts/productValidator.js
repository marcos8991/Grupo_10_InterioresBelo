console.log('productAdd conectado');
const $ = id => document.getElementById(id);


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
       validation('name','El nombre es obligatorio')
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

    $('discount').addEventListener('blur',function(){
        validation('discount','Selecciona las cuotas')
    })

})