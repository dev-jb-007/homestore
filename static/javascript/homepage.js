

const li = document.querySelectorAll('#list li');
var mediaqueryipad = window.matchMedia("(max-width: 1024px) and (min-width: 500px)")
let scroll = 0;
// window.onload------------------------------------------------------------------------------------


// navbar------------------------------------------------------------------------------------

function changeactive(element) {
    Array.from(li).forEach(x => {
        x.classList.remove('active');
    });
    element.classList.add('active');
}
async function mostviewed(){
    let mostViewedDiv=document.querySelector('.card-scroll');
    const response=await fetch('/product/mostviewed');
    const result=await response.json();
    console.log(result);
    let html='';
    result.forEach(element=>{
        html+=`
        <div class="viewed-card">
        <img src="/product/${element._id}/images?image=0" alt="">
                <p>${element.title}</p>
                <button style="cursor:pointer;" onclick="viewProduct('${element._id}')">View Product</button>
        </div>`
    })
    mostViewedDiv.innerHTML=html;
}
function showmobilenav() {
    let hamburger = document.querySelector('#mobile-header #nav-hamburger #hamburger');
    let nav = document.querySelector('.mobile-navbar');
    if (nav.style.width == '75%') {
        hamburger.style.backgroundColor = 'black';
        document.styleSheets[0].addRule('#mobile-header #nav-hamburger #hamburger::after', 'transform:translateY(0px) rotate(0deg)')
        document.styleSheets[0].addRule('#mobile-header #nav-hamburger #hamburger::before', 'transform:translateY(0px) rotate(0deg)');
        return nav.style.width = '0%'
    }
    hamburger.style.backgroundColor = 'transparent';
    document.styleSheets[0].addRule('#mobile-header #nav-hamburger #hamburger::after', 'transform:translateY(+8px) rotate(45deg)');
    document.styleSheets[0].addRule('#mobile-header #nav-hamburger #hamburger::before', 'transform:translateY(-8px) rotate(-45deg)');
    nav.style.width = '75%';
}

async function recentViewed() {
    const recent = document.getElementById('recently-viewed');
    const response = await fetch('/users/recent');
    const result = await response.json();
    let html='';
    console.log(result);
    if (result.error) {
        html+= `<h2>Recently &nbsp Viewed</h2>;
            <button onclick='loginbtn()' id="recent-viewed-login">Log In</button>
            <button onclick='singupbtn()' id="recent-viewed-signup">Sign Up</button>;`;
    }
    else if(result.recent.length === 0){
        html+='<h2>Recently &nbsp Viewed</h2>Your Recently viewed Products Will Appear Here'
    }
    else{
        html+=`
        <h2>RECENT &nbsp VIEWED</h2>
        <div class="card-scroll">`
        const recent=result.recent;
        recent.slice().reverse().forEach(element=>{
            html+=`<div class="viewed-card">
            <img src="/product/${element._id}/images?image=0" alt="">
            <p>${element.title}</p>
            <button style="cursor:pointer" onclick="viewProduct('${element._id}')">View Product</button>
        </div>`
        });
        html+='</div>'
    }
    recent.innerHTML=html;
}
function viewProduct(id){
    window.open(`/product?id=${id}`);
}
// Buttons to scroll ------------------------------------------------------------------------------------

function prevOffer() {
    if (scroll == 0) {
        scroll = -300;
    }
    else {
        scroll += 100;
    }
    document.querySelector('.web-offer .scroll-image').style.marginLeft = `${scroll}%`;
}
function nextOffer() {
    if (scroll == -300) {
        scroll = 0;
    }
    else {
        scroll -= 100;
    }
    document.querySelector('.web-offer .scroll-image').style.marginLeft = `${scroll}%`;
}
function prevView() {
    if (scroll == 0) {
        scroll = -200;
    }
    else {
        scroll += 100;
    }
    document.querySelector('.web-most-viewed .card-scroll').style.marginLeft = `${scroll}%`;
}
function nextView() {
    if (scroll == -200) {
        scroll = 0;
    }
    else {
        scroll -= 100;
    }
    document.querySelector('.web-most-viewed .card-scroll').style.marginLeft = `${scroll}%`;
}

function prevRate() {
    if (scroll == 0) {
        scroll = -200;
    }
    else {
        scroll += 100;
    }
    document.querySelector('.web-most-viewed .card-scroll').style.marginLeft = `${scroll}%`;
}
function nextRate() {
    if (scroll == -200) {
        scroll = 0;
    }
    else {
        scroll -= 100;
    }
    document.querySelector('.web-most-viewed .card-scroll').style.marginLeft = `${scroll}%`;
}
// Image scroller------------------------------------------------------------------------------------

setInterval(() => {
    if (scroll == -300) {
        scroll = 0;
    }
    else {
        scroll -= 100;
    }
    document.querySelector('.web-offer .scroll-image').style.marginLeft = `${scroll}%`;
}, 10000);


// Users Functions------------------------------------------------------------------------------------

function loginbtn() {
    window.location.href = '/users/login';
}
function singupbtn() {
    window.location.href = '/users/signup1';
}

async function signout() {
    const response = await fetch('/users/signout');
    const result = await response.text();
    if (result == 'done') {
        window.location.href = "/"
    }
    else {
        alert('Please Authenticate');
    }
}



// SearchBar------------------------------------------------------------------------------------

window.onload = ()=>{
    getinput();
    recentViewed();
    mostviewed();
};

//Mobile functions------------------------------------------------------------------------------------
function goToCart(){
    window.location.href = '/cart'
}
// function expandMobileSearch(){
//     console.log('Hi');
//     const dropdown=document.querySelector('.mobile-search-dropdown');
//     console.log(dropdown.style.height);
//     if(dropdown.style.height==='')
//     {
//         dropdown.style.height='100%';
//     }
//     else{
//         dropdown.style.height='';
//     }
// }
function DropdownSearch(element){
    const dropdown=document.querySelector('.mobile-search-dropdown');
    if(element.value==='')
    {
        dropdown.style.height='';
        enableScroll();
    }
    else{
        dropdown.style.height='718px';
        disableScroll();
    }
}
function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
  
function enableScroll() {
    window.onscroll = function() {};
}
function minimizesearchbar(){
    const dropdown=document.querySelector('.mobile-search-dropdown');
    dropdown.style.height='';
    enableScroll();
}
function opensearchbar(element){
    const dropdown=document.querySelector('.mobile-search-dropdown');
    if(element.value==='')
    {
        dropdown.style.height='';
        enableScroll();
    }
    else{
        dropdown.style.height='718px';
        disableScroll();
    }
}