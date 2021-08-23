// function expandMobileSearch() {
//     searchDrop.style.height="100vh";
//     setTimeout(()=>{
//         let searchDrop=document.querySelector('.mobile-search-dropdown');
        
//         searchDrop.style.pointerEvents='auto';
//     },300);
//     document.getElementById('searchbar').value=localStorage.getItem('searchbar');
//     getinput();
// }

// function minimizeMobileSearch(){
//     let searchDrop=document.querySelector('.mobile-search-dropdown');
//     searchDrop.style.height="";
//     setTimeout(()=>{
//         let searchDrop=document.querySelector('.mobile-search-dropdown');
        
//         searchDrop.style.pointerEvents='auto';
//     },300);
//     document.getElementById('searchbar').value=localStorage.getItem('searchbar');
// }
// const searchbar = document.getElementById('searchbar');
async function getinputmobile() {
    let value=document.getElementById('mobile-searchbar').value;
    const response = await fetch('/product/recommandations', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ value })
    });
    const result = await response.json();
    console.log(result);
}
const mobilecallingfunction = (fn, d) => {
    let list;
    return function () {
        let content = this, args = arguments;
        clearTimeout(list);
        list = setTimeout(() => {
            fn.apply(content, args);
        }, d);
    }
}
const mobilesearchresult = mobilecallingfunction(getinputmobile, 300);
window.onload = () => {
    getinput();
};
// let searchDropdown = document.querySelector('.searchbar-dropdown');
function executeSearch() {
    window.location.href = "http://localhost:3000/products";
    localStorage.setItem('search',searchbar.value.toLowerCase());
}

