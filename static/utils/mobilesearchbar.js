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
    let searchDropdown = document.querySelector('.mobile-search-dropdown');
    let value = document.getElementById('mobile-searchbar').value;
    const response = await fetch('/product/recommandations', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ value })
    });
    const result = await response.json();
    console.log(result);
    let html = '';
    if (result.length != 0) {
        result.forEach(element => {
            html +=
                `<div class="mobile-recommandation">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
        <p>${element.title}</p>
    </div>`
        });
    }
    searchDropdown.innerHTML=html;
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
function mobileexecuteSearch() {
    let searchbar=document.getElementById('mobile-searchbar');
    window.location.href = "/products";
    localStorage.setItem('search', searchbar.value.toLowerCase());
}

