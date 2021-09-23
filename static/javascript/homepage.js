

const li = document.querySelectorAll('#list li');
var mediaqueryipad = window.matchMedia("(max-width: 1024px) and (min-width: 500px)")
let scroll = 0;
// window.onload------------------------------------------------------------------------------------
getinput();
recentViewed();
mostviewed();
// navbar------------------------------------------------------------------------------------
function changeactive(element) {
    Array.from(li).forEach(x => {
        x.classList.remove('active');
    });
    element.classList.add('active');
}
async function mostviewed() {
    let mostViewedDiv = document.querySelector('.web-most-viewed .card-scroll');
    const response = await fetch('/product/mostviewed');
    const result = await response.json();
    console.log(result);
    let html = '';
    result.forEach(element => {
        html += `
        <div class="viewed-card">
        <img src="/product/${element._id}/images?image=0" alt="">
                <p>${element.title}</p>
                <button style="cursor:pointer;" onclick="viewProduct('${element._id}')">View Product</button>
        </div>`
    })
    mostViewedDiv.innerHTML = html;
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
    console.log('recent viewed')
    var recent, className1, className2, headerDisplay, textDisplay, fontDisplay;
    if (window.innerWidth <= 700) {
        recent = document.getElementById('mobile-recent-viewed');
        recent.style.display = 'block';
        className1 = 'mobile-most-viewed-scroll';
        className2 = 'mobile-most-viewed-card';
        headerDisplay = 'none';
        textDisplay = 'block';
        fontDisplay = 50;
    }
    else {
        recent = document.getElementById('recently-viewed');
        className1 = 'card-scroll';
        className2 = 'viewed-card';
        headerDisplay = 'block';
        textDisplay = 'none';
        fontDisplay = 100;
    }
    const response = await fetch('/users/recent');
    const result = await response.json();
    let html = '';
    console.log(result);
    if (result.error) {
        html += `<h2>Recently &nbsp Viewed</h2>;
            <button onclick='loginbtn()' class="recent-viewed-login">Log In</button>
            <button onclick='singupbtn()' class="recent-viewed-signup">Sign Up</button>;`;
    }
    else if (result.recent.length === 0) {
        html += '<h2>Recently &nbsp Viewed</h2>Your Recently viewed Products Will Appear Here'
    }
    else {
        html += `
        <h2 style="display:${headerDisplay}">RECENTLY &nbsp VIEWED</h2>
        <div class=${className1}>`
        const recent = result.recent;
        recent.slice().reverse().forEach(element => {
            let rating=0,length=0;
            element.comments.forEach(item=>{
                rating+=item.rating;
                length++;
            });
            rating=rating/length;
            rating.toFixed(1);

            let remainStar=5-rating;
            remainStar=parseInt(remainStar);
            let starHtml='';
            while(rating>=1)
            {
                starHtml+=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>`;
                rating--;
            }
            if(rating>0)
            {
                starHtml+=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
              </svg>`
              rating--;
            }
            while(remainStar>0)
            {
                starHtml+=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg>`
                remainStar--;
            }
            // console.log(rating);
            let title = (element.title.length >= fontDisplay) ? (element.title.substring(0, fontDisplay) + '...') : element.title;
            html += `<div class=${className2}>
            <img src="/product/${element._id}/images?image=0" alt="">
            <div class="most-viewed-price">${element.price}</div>
            <p style="display:${headerDisplay}"onclick="viewProduct('${element._id}')">${title}</p>
            <div style="display:${textDisplay}" class="mobile-most-viewed-card-text">
                <p style="display:${textDisplay}"onclick="viewProduct('${element._id}')">${title}</p>
            </div>
            <div class="most-viewed-star">
                ${starHtml}
            </div>
            <button style="cursor:pointer;display:${headerDisplay}" onclick="viewProduct('${element._id}')">View Product</button>
        </div>`
        });
        html += '</div>'
    }
    recent.innerHTML = html;
}
function viewProduct(id) {
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



// SearchBar------------------------------------------------------------------------------------


//Mobile functions------------------------------------------------------------------------------------
function goToCart() {
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

