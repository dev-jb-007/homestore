getData();
mostViewed();
recommandProducts();
class Product {
    constructor(item) {
        this.id = item._id;
        this.title = item.title;
        this.price = item.price;
        this.comments = item.comments;
        this.categories = item.categories;
        this.viewsCount = item.viewsCount;
        this.purchasedCount = item.purchasedCount;
        this.discount = item.discount;
        this.description = item.description.split('\n');
        this.SKU_ID = item.SKU_ID;
        this.quantity = item.quantity;
        this.key_specs = item.key_specs;
        this.brand = item.brand;
        this.manufacturer = item.manufacturer;
        this.model = item.model;
        this.manufacturer_year = item.manufacturer_year;
        this.height = item.height;
        this.weight = item.weight;
        this.width = item.width;
        this.length = item.length;
        this.country = item.country;
        this.expiry = item.expiry;
        this.self_life = item.self_life;
        this.package_height = item.package_height;
        this.package_weight = item.package_weight;
        this.package_width = item.package_width;
        this.package_length = item.package_length;
        this.warrenty = item.warrenty;
        this.guarentee = item.gaurentee;
        this.color = item.color;
        this.instruction = item.instruction;
        this.net_quantity = item.net_quantity;
        this.ratingNumber = item.ratingNumber;
        this.reviewNumber = item.reviewNumber;
        this.html = ``;
        this.imgurl = `../product/${this.id}/images/?image=0`;
        this.images = new Array(0);
        this.userCommented = this.comments.length;
        this.star1 = 0;
        this.star2 = 0;
        this.star3 = 0;
        this.star4 = 0;
        this.star5 = 0;
        this.averageRating = 0;
    }
    async getimage() {
        const response1 = await fetch(``);
        const response2 = await fetch(`../product/${this.id}/images/?image=1`);
        const response3 = await fetch(`../product/${this.id}/images/?image=2`);
        const response4 = await fetch(`../product/${this.id}/images/?image=3`);
        const result1 = await response1.json();
        const result2 = await response2.json();
        const result3 = await response3.json();
        const result4 = await response4.json();
        this.images.push(result1);
        this.images.push(result2);
        this.images.push(result3);
        this.images.push(result4);
    }
    content() {
        this.comments.forEach(element => {
            this.averageRating += element.rating;
            switch (element.rating) {
                case 1:
                    this.star1++;
                    break;
                case 2:
                    this.star2++;
                    break;
                case 3:
                    this.star3++;
                    break;
                case 4:
                    this.star4++;
                    break;
                case 5:
                    this.star5++;
                    break;
            }
        });
        this.averageRating /= this.userCommented;
        this.html += `
        <section class="product_description">
        <div class="left_description">
            <div class="product_image">
                <div class="main_image">
                    <button id="prev_img" onclick="prevImage()"><ion-icon name="arrow-back-outline"></ion-icon></button>
                    <button id="next_img" onclick="nextImage()"><ion-icon name="arrow-forward-outline"></ion-icon></button>
                    <img id="main_display_image" src="../product/${this.id}/images/?image=0">
                </div>
                <div class="all_image">
                    <img onclick="changeMainImage(this)" src="../product/${this.id}/images/?image=0">
                    <img onclick="changeMainImage(this)" src="../product/${this.id}/images/?image=1">
                    <img onclick="changeMainImage(this)" src="../product/${this.id}/images/?image=2">
                    <img onclick="changeMainImage(this)" src="../product/${this.id}/images/?image=3">
                </div>
            </div>
            <div class="buy_button">
                <button id="add_to_cart" onclick="addProductToCart(id)"><ion-icon name="cart"></ion-icon>Add To Cart</button>
                <button id="buy_product"><ion-icon name="card"></ion-icon>Buy Now</button>
            </div>
        </div>
        <div class="right_description">
            <div class="product_title">
                <h2>${this.title}</h2>
            </div>
            <div class="product_ratings">
                <div class="product_stars">
                    <div class="product_main_star">
                        <p class="product_exact_rating">${this.averageRating.toFixed(1)}</p>
                        <p>
                            <ion-icon name="star-sharp"></ion-icon>
                        </p>
                    </div>
                </div>
                <div class="product_star_text">
                    <h2>${this.ratingNumber} Ratings and ${this.reviewNumber} Reviews</h2>
                </div>
            </div>
            <div class="product_price">
                <p>MRP: Rs.${this.price}</p>
                <p>Price: Rs.${this.price - (this.price * this.discount) / 100}</p>
                <p>you save: Rs.${(this.price * this.discount) / 100}(${this.discount}%)</p>
            </div>
            <div class="product_offers">
                <h3>AVAILABLE OFFERS</h3>
                <div class="available_offers">
                    <div class="available_offers_scroll">
                        <div class="bank_offers">BANK OFFER</div>
                        <div class="bank_offers">BANK OFFER</div>
                        <div class="bank_offers">BANK OFFER</div>
                        <div class="bank_offers">BANK OFFER</div>
                        <div class="bank_offers">BANK OFFER</div>
                        <div class="bank_offers">BANK OFFER</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="product_full_info">
        <div>
        <h2>PRODUCT DESCRIPTION</h2><p><ul>`
        this.description.forEach(element=>{
            this.html+=`
                <li>${element}</li>
            `
        });
        this.html+=`</ul></p></div>`;
        this.html+=`
        <div class="all_info">
            <div class="all_info_content">
                <div class="full_content">BRAND</div>
                <div class="full_content capitalize">${this.brand}</div>
                <div class="full_content">MANUFACTURER</div>
                <div class="full_content capitalize">${this.manufacturer}</div>
                <div class="full_content">MODEL</div>
                <div class="full_content capitalize">${this.model}</div>
                <div class="full_content">MANUFACTURING YEAR</div>
                <div class="full_content capitalize">${this.manufacturer_year}</div>
                <div class="full_content">NUMBER OF ITEMS</div>
                <div class="full_content capitalize">${this.quantity}</div>
                <div class="full_content">HEIGHT</div>
                <div class="full_content capitalize">${this.height}</div>
                <div class="full_content">LENGTH</div>
                <div class="full_content capitalize">${this.length}</div>
                <div class="full_content">WIDTH</div>
                <div class="full_content capitalize">${this.width}</div>
                <div class="full_content">WEIGHT</div>
                <div class="full_content capitalize">${this.weight}</div>
                <div class="full_content">COUNTRY OF ORIGIN</div>
                <div class="full_content capitalize">${this.country}</div>
                <div class="full_content">DATE OF EXPIRY</div>
                <div class="full_content capitalize">${this.expiry}</div>
                <div class="full_content">SHELF LIFE</div>
                <div class="full_content capitalize">${this.self_life}</div>
            </div>
            <div class="all_info_content">
                <div class="full_content">ASIN</div>
                <div class="full_content capitalize">ASINLODU</div>
                <div class="full_content">CUSTOMER RATING</div>
                <div class="full_content capitalize">XXX</div>
                <div class="full_content">PACKAGE LENGTH</div>
                <div class="full_content capitalize">${this.package_length}</div>
                <div class="full_content">PACKAGE WIDTH</div>
                <div class="full_content capitalize">${this.package_width}</div>
                <div class="full_content">PACKAGE HEIGHT</div>
                <div class="full_content capitalize">${this.package_height}</div>
                <div class="full_content">PACKAGE WEIGHT</div>
                <div class="full_content capitalize">${this.package_weight}</div>
                <div class="full_content">WARRANTY PERIOD</div>
                <div class="full_content capitalize">${this.warrenty}</div>
                <div class="full_content">GUARENTEE PERIOD</div>
                <div class="full_content capitalize">${this.guarentee}</div>
                <div class="full_content">COLOR</div>
                <div class="full_content capitalize">${this.color}</div>
                <div class="full_content">SPECIAL INSTRUCTIONS</div>
                <div class="full_content capitalize">${this.instruction}</div>
                <div class="full_content">DESIGNED FOR</div>
                <div class="full_content capitalize">PRASOON</div>
                <div class="full_content">NET QUANTITY</div>
                <div class="full_content capitalize">${this.net_quantity}</div>
            </div>
        </div>
    </section>
    <section class="customer_review">
        <div class="overall_review">
        <div class="give_rating">
            <div id="stars-div">
            <ion-icon name="star" onmouseover='giveStarRating(this)' onmouseout ='takeStarRating(this)' onclick="postStarRating(this)" id="star1"></ion-icon>
            <ion-icon name="star" onmouseover='giveStarRating(this)' onmouseout ='takeStarRating(this)' onclick="postStarRating(this)" id="star2"></ion-icon>
            <ion-icon name="star" onmouseover='giveStarRating(this)' onmouseout ='takeStarRating(this)' onclick="postStarRating(this)" id="star3"></ion-icon>
            <ion-icon name="star" onmouseover='giveStarRating(this)' onmouseout ='takeStarRating(this)' onclick="postStarRating(this)" id="star4"></ion-icon>
            <ion-icon name="star" onmouseover='giveStarRating(this)' onmouseout ='takeStarRating(this)' onclick="postStarRating(this)" id="star5"></ion-icon>
        </div>
        <textarea  id="input_review"></textarea>
        <button id="submit_review" onclick="submit_review()">Submit</button>
        </div>
        
            <div class="overall_review_header">
                <div class="with_h1">
                    <h1>CUSTOMER RATINGS AND REVIEWS</h1>
                </div>
                <div class="with_btn">
                    <button onclick="showUploadRating()">RATE PRODUCT</button></div>
            </div>
            <div class="overall_review_content">
                <div class="big_rating">
                    <div class="numbers">
                        <div class="rated">${this.averageRating.toFixed(1)}/5.0</div>
                        <div class="star">
                            <ion-icon name="star-sharp"></ion-icon>
                        </div>
                    </div>
                    <div class="text">${this.ratingNumber} Ratings and ${this.reviewNumber} Reviews</div>
                </div>
                <div class="rating_stats">
                    <div class="stat_box2">
                        <div class="full_bar">
                            <div class="rating">5<ion-icon name="star-sharp"></ion-icon>
                            </div>
                            <div class="bar12">
                                <div class="down_bar">
                                    <div style="width:${(this.star5 / this.userCommented) * 100}%" class="upp_bar"></div>
                                </div>
                            </div>
                            <div class="user_rated">56</div>
                        </div>
                        <div class="full_bar">
                            <div class="rating">4<ion-icon name="star-sharp"></ion-icon>
                            </div>
                            <div class="bar12">
                                <div class="down_bar">
                                    <div style="width:${(this.star4 / this.userCommented) * 100}%" class="upp_bar"></div>
                                </div>
                            </div>
                            <div class="user_rated">56</div>
                        </div>
                        <div class="full_bar">
                            <div class="rating">3<ion-icon name="star-sharp"></ion-icon>
                            </div>
                            <div class="bar12">
                                <div class="down_bar">
                                    <div style="width:${(this.star3 / this.userCommented) * 100}%" class="upp_bar"></div>
                                </div>
                            </div>
                            <div class="user_rated">56</div>
                        </div>
                        <div class="full_bar">
                            <div class="rating">2<ion-icon name="star-sharp"></ion-icon>
                            </div>
                            <div class="bar12">
                                <div class="down_bar">
                                    <div style="width:${(this.star2 / this.userCommented) * 100}%; background-color: #ff9f00" class="upp_bar"></div>
                                </div>
                            </div>
                            <div class="user_rated">56</div>
                        </div>
                        <div class="full_bar">
                            <div class="rating">1<ion-icon name="star-sharp"></ion-icon>
                            </div>
                            <div class="bar12">
                                <div class="down_bar">
                                    <div style="width:${(this.star1 / this.userCommented) * 100}%; background-color: #ff6161" class="upp_bar"></div>
                                </div>
                            </div>
                            <div class="user_rated">56</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        this.html += `<div class="all_reviews">`;
        console.log(this.comments);
        this.comments.forEach(element => {
            this.html += `
            <div class="full_review">
                <div class="product_stars">
                    <div class="product_main_star">
                        <p class="product_exact_rating">${element.rating}</p>
                        <p>
                            <ion-icon name="star-sharp"></ion-icon>
                        </p>
                    </div>
                </div>
                
                <h3>${element.author.firstName} ${element.author.lastName}</h3>
                <div class="full_description">${element.reviews}</div>
            </div>`
        });
        this.html += '</div></section>';
        return this.html;
    }
    averageColor() {
        const avgDiv = document.querySelector('.product_stars .product_main_star');
        if (this.averageRating >= 2 && this.averageRating < 3) {
            avgDiv.style.backgroundColor = '#ff9f00';
        }
        else if(this.averageRating >= 1 && this.averageRating < 2) {
            avgDiv.style.backgroundColor = '#ff6161';
        }
        const avgStar = Array.from(document.querySelectorAll('.customer_review .all_reviews .full_review .product_stars .product_main_star'));
        avgStar.forEach(element => {
            const x = parseInt(element.children[0].innerHTML); 
            if (x >= 2 && x < 3) {
                element.style.backgroundColor = '#ff9f00';
            }
            else if(x >= 1 && x < 2) {
                element.style.backgroundColor = '#ff6161';
            }
        })
    }
};
function changeMainImage(element) {
    const url = element.getAttribute('src').split('=')[0];
    const number = element.getAttribute('src').split('=')[1];
    const mainimage = document.getElementById('main_display_image');
    mainimage.setAttribute('src', `${url}=${number}`);
}
function nextImage() {
    const mainimage = document.getElementById('main_display_image');
    let number = mainimage.getAttribute('src').split('=')[1];
    if (number == 3) {
        number = 0;
    }
    else {
        number++;
    }
    const url = mainimage.getAttribute('src').split('=')[0];
    mainimage.setAttribute('src', `${url}=${number}`);
}
function prevImage() {
    const mainimage = document.getElementById('main_display_image');
    let number = mainimage.getAttribute('src').split('=')[1];
    if (number == 0) {
        number = 3;
    }
    else {
        number--;
    }
    const url = mainimage.getAttribute('src').split('=')[0];
    mainimage.setAttribute('src', `${url}=${number}`);
}
async function getData() {
    console.log('hi');
    let id = window.location.href.split('=')[1];
    const mainproduct = document.querySelector('.main-product');
    const response = await fetch(`../product/singleproduct?id=${id}`);
    const result = await response.json();
    console.log(result);
    let product = new Product(result);
    mainproduct.classList.remove('loader-view');
    mainproduct.innerHTML = product.content();
    product.averageColor();
}
let check = 0;
function giveStarRating(element) {
    let flag = 0;
    check = 0;
    const starsDiv = document.getElementById('stars-div').children;
    Array.from(starsDiv).forEach(item => {
        item.style.color = "lightgray";
    })
    Array.from(starsDiv).forEach(item => {
        if (flag == 0) {
            if (item === element) {
                flag++;
                item.style.color = 'yellow';
            }
            else {
                item.style.color = 'yellow';
            }
        }
    })
}
function takeStarRating(element) {
    if (check == 0) {
        let flag = 0;
        const starsDiv = document.getElementById('stars-div').children;

        Array.from(starsDiv).forEach(item => {
            if (flag == 0) {
                if (item === element) {
                    flag++;
                    item.style.color = 'lightgrey';
                }
                else {
                    item.style.color = 'lightgrey';
                }
            }
        })
    }

}
function postStarRating(element) {
    let flag = 0;
    const starsDiv = document.getElementById('stars-div').children;

    Array.from(starsDiv).forEach((item, index) => {
        if (flag == 0) {
            if (item === element) {
                flag++;
                console.log(++index);
                item.style.color = 'yellow';
            }
            else {
                item.style.color = 'yellow';
            }
        }
    })
    check = 1;
}
function showUploadRating() {
    const giverating = document.querySelector('.customer_review .overall_review .give_rating');
    const ratingstat = document.querySelector('.customer_review .overall_review .overall_review_content .rating_stats');
    if (giverating.style.opacity == 0) {
        giverating.style.opacity = 1;
        giverating.style.pointerEvents = 'auto';
        ratingstat.style.opacity = 0;
        ratingstat.style.pointerEvents = 'none';
    }
    else {
        giverating.style.opacity = 0;
        giverating.style.pointerEvents = 'none';
        ratingstat.style.opacity = 1;
        atingstat.style.pointerEvents = 'auto';
    }

}
async function submit_review() {
    let url = window.location.href;
    const id = window.location.href.split('=')[1];
    console.log(id);
    const reviews = document.getElementById('input_review').value;
    let rating;
    const starsDiv = document.getElementById('stars-div').children;
    if(starsDiv[0].style.color === 'lightgray')
    {
        rating=0;
    }
    else if(starsDiv[1].style.color === 'lightgray')
    {
        rating=1;
    }
    else if(starsDiv[2].style.color === 'lightgray')
    {
        rating=2;
    }
    else if(starsDiv[3].style.color === 'lightgray')
    {
        rating=3;
    }
    else if(starsDiv[4].style.color === 'lightgray')
    {
        rating=4;
    }
    else{
        rating=5;
    }
    console.log(reviews,rating);
    const response=await fetch(`../product/uploadcomments?id=${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reviews, rating })
    });
    const result=await response.json();
    let fullReview=document.createElement('div');
    fullReview.setAttribute('class','full_reviews');
    fullReview.innerHTML=`<div class="full_review">
    <div class="product_stars">
        <div class="product_main_star">
            <p class="product_exact_rating">${rating}</p>
            <p>
                <ion-icon name="star-sharp"></ion-icon>
            </p>
        </div>
    </div>
    
    <h3>${result.firstName} ${result.lastName}</h3>
    <div class="full_description">${reviews}</div>
</div>`
    document.querySelector('.all_reviews').insertAdjacentElement('beforeend',fullReview);
    // window.location.href = url;
}
async function addProductToCart(id)
    {   
        let url=window.location.href;
        id=window.location.href.split('=')[1];
        const response=await fetch(`../users/cart?id=${id}`,{
            method: 'POST',
            headers: {'Content-Type': 'text/plain'}
        });
        const result=await response.text();
        if(result=='Added')
        {
            document.getElementById('success-popup').style.transform='translateX(0)'
        }
        setTimeout(()=>{
            document.getElementById('success-popup').style.transform='translateX(300px)'
        },2000);
    }
async function recommandProducts()
{
    let mostViewedDiv=document.querySelector('#card-scroll1');
    let url=window.location.href;
    id=window.location.href.split('=')[1];
    const response=await fetch(`/product/recommandation?id=${id}`);
    const result=await response.json();
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
async function mostViewed(){
        console.log('hello');
        let mostViewedDiv=document.querySelector('#card-scroll0');
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
window.onload = () => {}
// function getProductPrice(){
//     const productPrice=document.querySelector('.product_price');
//     const price=productPrice.children[0].innerHTML.split('.')[1];
//     const discount=productPrice.children[1].innerHTML.split(' ')[1].split('%')[0];
//     let finalPrice=price-(price*discount)/100;
//     productPrice.children[2].innerHTML=`Price: ${finalprice}`;
//     productPrice.children[3].innerHTML=`You Save: Rs.${price-finalPrice}`;
// }
