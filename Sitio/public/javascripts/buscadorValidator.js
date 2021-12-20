console.log("BuscadorValidator success")
const $ = id => document.getElementById(id);
const inputSearch = $('input-search');
const formSearch = $('form-search')

formSearch.addEventListener('submit', function (e) {
    
    e.preventDefault();
    console.log(inputSearch.value.trim().length);
    
    if (inputSearch.value.trim().length != 0) {
        
        this.submit()
    } 
    
})
