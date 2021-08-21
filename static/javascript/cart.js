let buyProducts=new Array;
let mrp=0;
let realPrice=0;
async function getCartData() {
    let id = window.location.href.split('=')[1];
    const mainproduct = document.querySelector('.main-product');
    const response = await fetch(`../users/cart`);
    const result = await response.json();
    result.cart.forEach(element=>{
        buyProducts.push({
            id:element._id,
            quantity:0,
            price:0
        });
    })
    const cartChecks = document.querySelector('.cart-checks');
    let html = '';
    if (result.cart.length != 0) {
        result.cart.forEach(item => {
            let currentQuantity;
            buyProducts.forEach(element=>{
                if(element._id===item.id)
                {
                    currentQuantity = element.quantity;
                }
            })

            html += `
            <div class="cart-card">
                <div class="img-part"><img src="../../product/${item._id}/images?image=0" alt=""></div>
                <div class="text-part">
                    <p>${item.title}</p>
                    <p>${item.description}</p>
                    <div class="add-drop">
                        <div class="curr-price"><strong>Rs.${item.price - (item.discount * item.price / 100)}  &nbsp;<span>Rs.${item.price}</span></strong></div>
                        
                        <div class="add-drop-btn">
                            <button disabled class="Product${item._id}" onclick="addProductToBuy('${item._id}','${item.price}','${item.price - (item.discount * item.price / 100)}')" ><ion-icon  name="add"></ion-icon></button>
                            <div class="curr-quantity" id="item${item._id}">${currentQuantity}</div>
                            <button disabled class="Product${item._id}" onclick="removeProductToBuy('${item._id}','${item.price}','${item.price - (item.discount * item.price / 100)}')"><ion-icon name="remove"></ion-icon></button>
                        </div>
                    </div>
                </div>
                <div class="check"><input onclick="checkItem(this, '${item._id}', '${item.price}','${item.price - (item.discount * item.price / 100)}')" type="checkbox">
                <button class="delete" onclick="deleteCartItem('${item._id}',this)"><ion-icon name="trash"></ion-icon></button></div>
            </div>`

        })
    }
    else {
        html += `<img src="/images/no_items_found.png">`
    }
    cartChecks.innerHTML = html;
    // let product=new Product(result);
    // mainproduct.classList.remove('loader-view');
    // mainproduct.innerHTML=product.content();
}
function addProductToBuy(id,price,realprice){
    let discountDiv=document.querySelector('.final-payment #discount');
    let mrpdiv=document.querySelector('.final-payment  #mrp');
    price=parseFloat(price);
    realprice=parseFloat(realprice);
    mrp+=price;
    realPrice+=realprice;
    let Itemquantity=document.querySelector(`.cart-card .text-part .add-drop .add-drop-btn #item${id}`);
    buyProducts.forEach(item=>{
        if(item.id===id)
        {
            item.quantity++;
            item.price+=price;
            Itemquantity.innerHTML=item.quantity;
        }
    })
    mrpdiv.innerHTML=`Rs. ${mrp}`;
    discountDiv.innerHTML=`Rs ${realPrice}`;
}
function checkItem(element,id,price,realprice){
    let quantity;
    buyProducts.forEach(item=>{
        if(item.id===id)
        {
            quantity=item.quantity;
        }
    })

    price=parseFloat(price);
    realprice=parseFloat(realprice);
    if(element.checked)
    {
        Array.from(document.querySelectorAll(`.Product${id}`)).forEach(element=>{
            element.disabled=false;
        })
        addProductToBuy(id,price,realprice);
    }
    else{
        Array.from(document.querySelectorAll(`.Product${id}`)).forEach(element=>{
            element.disabled=true;
        })

        for (let i=0;i<quantity;i++)
        {

            removeProductToBuy(id,price,realprice,true);
        }
    }
}
function removeProductToBuy(id,price,realprice,flag=false){
    let mrpdiv=document.querySelector('.final-payment  #mrp');
    let discountDiv=document.querySelector('.final-payment #discount');
    price=parseFloat(price);
    realprice=parseFloat(realprice);

    let Itemquantity=document.querySelector(`.cart-card .text-part .add-drop .add-drop-btn #item${id}`);
    buyProducts.forEach(item=>{
        if(item.id===id)
        {
            if(item.quantity==1&&flag===false)
            {
                return;
            }
            else{
                mrp-=price;
                realPrice-=realprice;
                item.quantity--;
                item.price-=price;
                Itemquantity.innerHTML=item.quantity;
            }

        }
    })
    mrpdiv.innerHTML=`Rs. ${mrp}`;
    discountDiv.innerHTML=`Rs ${realPrice}`;
}
async function deleteCartItem(id,element){
    let parent=element.parentElement.parentElement;
    let grandparent=parent.parentElement;
    grandparent.removeChild(parent);
    console.log(grandparent.innerHTML.length);
    if(grandparent.innerHTML.length==0)
    {
        grandparent.innerHTML=`<img src="/images/no_items_found.png">`
    }
    const response=await fetch('../users/cart',{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:id})
    });
    const result=await response.json();
}
async function proceedtopay(){
    let boughtProduct=new Array;
    buyProducts.forEach(item=>{
        if(item.quantity>=1)
        {
            boughtProduct.push(item);
        }
    })
    const response=await fetch('/users/cart/buy',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({item:boughtProduct})
    });
    const result=await response.json();
    console.log(result);
}
window.onload = () => {
    getCartData();
}