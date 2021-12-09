console.log('productAdd conectado');



const $ = id => document.getElementById(id);

window.addEventListener('load',()=>{
    $('input-name').focus();

    $('form-add-product').addEventListener('submit',function(e){
        e.preventDefault()
    })
    
})