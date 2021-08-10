async function continueToImage(){
    const title=document.getElementById('productTitle').value;
    const description=document.getElementById('product-description').value;
    const SKU_ID=document.getElementById('seller-sku-id').value;
    const price=parseInt(document.getElementById('MRP').value);
    const discount=parseInt(document.getElementById('discount').value);
    const quantity=parseInt(document.getElementById('quantity').value);
    const weight=parseInt(document.getElementById('weight').value);
    const length=parseInt(document.getElementById('length').value);
    const height=parseInt(document.getElementById('height').value);
    const country=document.getElementById('country').value;
    const width=parseInt(document.getElementById('width').value);
    const manufacturer=document.getElementById('manufacturer').value;
    const manufacturer_year=parseInt(document.getElementById('manufacturer_year').value);
    const warrenty=parseInt(document.getElementById('warrenty').value);
    const net_quantity=parseInt(document.getElementById('net_quantity').value);
    const model=document.getElementById('model').value;
    const color=document.getElementById('color').value;
    const categories=document.getElementById('categories').value;
    const brand=document.getElementById('brand').value;
    const package_length=parseInt(document.getElementById('package_length').value);
    const package_height=parseInt(document.getElementById('package_height').value);
    const package_width=parseInt(document.getElementById('package_width').value);
    const package_weight=parseInt(document.getElementById('package_weight').value);
    const self_life=parseInt(document.getElementById('self_life').value);
    const expiry=parseInt(document.getElementById('expiry').value);
    const gaurentee=parseInt(document.getElementById('gaurentee').value);
    const body={title,description,SKU_ID,price,discount,quantity,weight,length,height,country,width,manufacturer,manufacturer_year,warrenty,net_quantity,model,color,categories,brand,package_length,package_height,package_width,package_weight,self_life,expiry,gaurentee};
    console.log(body);
    const body1={
        "title":"xyz",
        "price":12345,
        "categories":"mobiles",
        "discount":30,
        "description":"this is the description of the product",
        "SKU_ID":12345,
        "quantity":100,
        "key_specs":"insert the key specs",
        "brand":"puma",
        "manufacturer":"puma",
        "model":"x123y",
        "manufacturer_year":2002,
        "height":180,
        "width":180,
        "weight":180,
        "length":180,
        "country":"india",
        "expiry":2023,
        "self_life":2,
        "package_height":180,
        "package_width":180,
        "package_weight":180,
        "package_length":180,
        "warrenty":2,
        "gaurentee":2,
        "color":"blue",
        "instruction":"use gently",
        "net_quantity":10
    }
    console.log(body1);
    const response=await fetch('http://localhost:3000/product',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const result=await response.json();
    window.open(`http://localhost:3000/addproduct/images?id=${result._id}`);
}