function expandSearchBar(element) {
    element.style.width = '90%';
    element.style.borderBottomLeftRadius = '0px';
    let micBtn = document.querySelector('#mic-btn');
    micBtn.style.transition='0.6s';
    let searchDrop = document.querySelector('.searchbar-dropdown');
    setTimeout(() => {
        searchDrop.style.opacity = 1;
        searchDrop.style.pointerEvents = 'auto';
    }, 300);
    setTimeout(() => {
        micBtn.style.opacity = 1;
        micBtn.style.pointerEvents = 'auto';
    }, 300);
    document.getElementById('searchbar').value = localStorage.getItem('searchbar');
    getinput();
}

function minimizeSearchBar(element) {
    
    let micBtn = document.querySelector('#mic-btn');
    micBtn.style.transition='0.1s';
    let searchDrop = document.querySelector('.searchbar-dropdown');
    if (window.innerWidth >= 500 && window.innerWidth <= 1024) {
        element.style.width = '150px';
        element.style.borderBottomLeftRadius = '20px';
        searchDrop.style.opacity = 0;
        micBtn.style.opacity = 0;
        setTimeout(() => {
            searchDrop.style.pointerEvents = 'none';
        }, 500)
        setTimeout(() => {
            micBtn.style.pointerEvents = 'none';
        }, 500)
        localStorage.setItem('searchbar', document.getElementById('searchbar').value);
        // document.getElementById('searchbar').value='';
    }
    else {
        element.style.borderBottomLeftRadius = '20px';
        searchDrop.style.opacity = 0;
        micBtn.style.opacity = 0;
        element.style.width = '200px';
        setTimeout(() => {
            searchDrop.style.pointerEvents = 'none';
        }, 500)
        setTimeout(() => {
            micBtn.style.pointerEvents = 'none';
        }, 500)
        localStorage.setItem('searchbar', document.getElementById('searchbar').value);
        setTimeout(() => {
            document.getElementById('searchbar').value = '';
        }, 500)
    }
}
const searchbar = document.getElementById('searchbar');
let searchDropdown = document.querySelector('.searchbar-dropdown');
function executeSearch() {
    console.log(searchbar.value.toLowerCase());
    window.location.href = "/products";
    localStorage.setItem('search', searchbar.value.toLowerCase());
}

async function getinput() {
    let html = ``;
    // console.log('hi');
    let value = searchbar.value.toLowerCase();
    if (value != '') {
        const response = await fetch('/product/recommandations', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ value })
        });
        const result = await response.json();
        console.log(result);
        let i = 0
        result.forEach(element => {
            html += `
            <div onclick="callonclick('${element._id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
            <p onclick="productfromsearchbar(${element._id})">${element.title}
            </p>
        </div>`
        });
    }
    else {
        const response = await fetch('/users/recentsearch');
        const result = await response.json();
        console.log(result);
        if (!result.error) {
            result.forEach(element => {
                if (element.length != 0) {
                    html += `
                <div>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         width="20px" height="20px" viewBox="0 0 510 510" style="enable-background:new 0 0 510 510;" xml:space="preserve">
    <g>
        <g id="history">
            <path style="opacity:0.9;enable-background:new    ;" d="M267.75,12.75c-89.25,0-168.3,48.45-209.1,122.4L0,76.5v165.75h165.75
                l-71.4-71.4c33.15-63.75,96.9-107.1,173.4-107.1C372.3,63.75,459,150.45,459,255s-86.7,191.25-191.25,191.25
                c-84.15,0-153-53.55-181.05-127.5H33.15c28.05,102,122.4,178.5,234.6,178.5C402.9,497.25,510,387.6,510,255
                C510,122.4,400.35,12.75,267.75,12.75z M229.5,140.25V270.3l119.85,71.4l20.4-33.15l-102-61.2v-107.1H229.5z"/>
        </g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </svg>
                <p>${element}
                </p>
            </div>`}
            });
        }

    }
    searchDropdown.innerHTML = html;
}
function callonclick(object) {
    console.log("hi");
    window.open(`/product?id=${object}`)
}
const callingfunction = (fn, d) => {
    let list;
    return function () {
        let content = this, args = arguments;
        clearTimeout(list);
        list = setTimeout(() => {
            fn.apply(content, args);
        }, d);
    }
}
const searchresult = callingfunction(getinput, 300);
window.onload = () => {
    getinput();
};