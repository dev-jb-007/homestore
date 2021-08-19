class Product{
    constructor(item,id)
    {
        this.id=item._id;
        this.title=item.title;     
        this.price=item.price;     
        this.comments=item.comments;
        this.categories=item.categories;
        this.viewsCount=item.viewsCount;
        this.purchasedCount=item.purchasedCount;
        this.discount=item.discount;    
        this.description=item.description;
        this.SKU_ID=item.SKU_ID;
        this.quantity=item.quantity;
        this.key_specs=item.key_specs;   
        this.brand=item.brand;         
        this.manufacturer=item.manufacturer;
        this.model=item.model;
        this.manufacturer_year=item.manufacturer_year;
        this.height=item.height;
        this.weight=item.weight;
        this.width=item.widht;
        this.length=item.length;
        this.country=item.country;
        this.expiry=item.expiry;
        this.self_life=item.self_life;
        this.package_height=item.package_height;
        this.package_weight=item.package_weight;
        this.package_width=item.package_widht;
        this.package_length=item.package_length;
        this.warrenty=item.warrenty;
        this.gaurentee=item.gaurentee;
        this.color=item.color;
        this.instruction=item.instruction;
        this.net_quantity=item.net_quantity;
        this.html=``;
        this.imgurl=`/product/${this.id}/images/?image=0`;
        this.product_id=id;
    }
    content()
    {
        this.html+=`
        <div class="search-content" id="product_${this.product_id}">
            <div class="pro-img" onclick="singleProduct(this)">
                <img src=${this.imgurl} alt="Product Image">
            </div>
            <div class="pro-info">
                <div class="pro-name">${this.title}</div>
                <div class="pro-desc">${this.description}</div>
                <div class="pro-price">
                    <p>${this.price}</p>
                </div>
            </div>
        </div>`
        return this.html;
    }
    cart(){
        this.html+=`<div class="cart-card">
        <div class="img-part"><img src="${this.imgurl}" alt=""></div>
        <div class="text-part">
            <p>${this.title}</p>
            <p>${this.description}</p>
            <div class="add-drop">
                <div class="curr-price"><strong>Rs. (${this.price}-(${this.discount}*${this.price})/100) <span>Rs. ${this.price}</span></strong></div>
                
                <div class="add-drop-btn">
                    <button><ion-icon name="add"></ion-icon></button>
                    <div class="curr-quantity">3</div>
                    <button><ion-icon name="remove"></ion-icon></button>
                </div>
            </div>
        </div>
        <div class="check"><input type="checkbox">
        <button class="delete"><ion-icon name="trash"></ion-icon></button></div>
    </div>    `
    }
}