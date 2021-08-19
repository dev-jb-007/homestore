function expandMobileSearch() {
    searchDrop.style.height="100vh";
    setTimeout(()=>{
        let searchDrop=document.querySelector('.mobile-search-dropdown');
        
        searchDrop.style.pointerEvents='auto';
    },300);
    document.getElementById('searchbar').value=localStorage.getItem('searchbar');
    getinput();
}

function minimizeMobileSearch(){
    let searchDrop=document.querySelector('.mobile-search-dropdown');
    searchDrop.style.height="";
    setTimeout(()=>{
        let searchDrop=document.querySelector('.mobile-search-dropdown');
        
        searchDrop.style.pointerEvents='auto';
    },300);
    document.getElementById('searchbar').value=localStorage.getItem('searchbar');
}
const searchbar = document.getElementById('searchbar');
let searchDropdown = document.querySelector('.searchbar-dropdown');
function executeSearch() {
    window.location.href = "http://localhost:3000/products";
    localStorage.setItem('search',searchbar.value.toLowerCase());
}

