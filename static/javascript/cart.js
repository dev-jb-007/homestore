const URL='https://home-store-1.herokuapp.com';
async function getCartData() {
    let id = window.location.href.split('=')[1];
    const mainproduct = document.querySelector('.main-product');
    const response = await fetch(`${URL}/users/cart`);
    const result = await response.json();
    console.log(result);
    const cartChecks = document.querySelector('.cart-checks');
    let html = '';
    if (result.cart.length != 0) {
        result.cart.forEach(item => {
            html += `
            <div class="cart-card">
                <div class="img-part"><img src="${URL}/product/${item._id}/images?image=0" alt=""></div>
                <div class="text-part">
                    <p>${item.title}</p>
                    <p>${item.description}</p>
                    <div class="add-drop">
                        <div class="curr-price"><strong>Rs. 500 <span>Rs. 1000</span></strong></div>
                        
                        <div class="add-drop-btn">
                            <button><ion-icon name="add"></ion-icon></button>
                            <div class="curr-quantity">3</div>
                            <button><ion-icon name="remove"></ion-icon></button>
                        </div>
                    </div>
                </div>
                <div class="check"><input type="checkbox">
                <button class="delete" onclick="deleteCartItem('${item._id}')"><ion-icon name="trash"></ion-icon></button></div>
            </div>`

        })
    }
    else {
        html += `<p>There is no Product in Your cart</p>`
    }
    cartChecks.innerHTML = html;
    // let product=new Product(result);
    // mainproduct.classList.remove('loader-view');
    // mainproduct.innerHTML=product.content();
}
async function deleteCartItem(id){
    const response=await fetch(`${URL}/users/cart`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:id})
    });
    const result=await response.json();
    console.log(result);
}
window.onload = () => {
    getCartData();
}