function *id_generator(){
    let i=0;
    while(true)
    {
        yield i++;
    }
}
let Mainhtml='';
const id=id_generator();
const items=[];
const price ={
    min:0,
    max:0
}
const brand = new Map();
let updatePriceListArray=new Array;
let priceSortHtml='';
function openFilter(){
    const filter = document.querySelector('.filter-outer-div');
    if(filter.style.height >= "35px"){
        return filter.style.height = '34px';
    }
    filter.style.height = 'max-content';
}
let topButton=document.querySelector('.top-button');
const gototopobserver5=new IntersectionObserver((entries,gototopobserver5)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting)
        {   
            topButton.style.opacity=1;
        }
    })
},{
    threshold:1
});
const gototopobserver1=new IntersectionObserver((entries,gototopobserver1)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting)
        {  
            topButton.style.opacity=0;
        }
    })
},{
    threshold:1
});
const card=document.querySelectorAll('.search-results .search-content');
if(Array.from(card).length>=5)
{
    const fifthCard=Array.from(card)[4];
    gototopobserver5.observe(fifthCard);
}
if(Array.from(card).length!=0)
{
    const firstCard=Array.from(card)[0]
    gototopobserver1.observe(firstCard);
}

function gototop(element){
    window.scrollTo(0,0);
}
async function getproduct(){
    const searchResults=document.querySelector('.search-results');
    
    const response=await fetch('../product/searchproduct',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({value:localStorage.getItem('search')})
    });
    await fetch('../users/updatesearch',{
        method:'POST',
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify({search:localStorage.getItem('search')})
    })
    const result=await response.json();
    const number=result.length;
    console.log(result);
    for(let i=0;i<number;i++)
    {   
        if(result[i].price<=price.min)
        {
            price.min=result[i].price;
        }
        if(result[i].price>=price.max)
        {
            price.max=result[i].price;
        }
        if(!brand.get(result[i].brand))
        {
            brand.set(result[i].brand,1);
        }
        else{
            let x=brand.get(result[i].brand);
            brand.set(result[i].brand,x+1);
        }
        
        items.push(new Product(result[i],id.next().value));
        // console.log(items[i].content());
        Mainhtml+=items[i].content();
        showFilter();
    }
    searchResults.classList.remove('remove-height');
    searchResults.innerHTML=Mainhtml;
    brand[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    }
    console.log(brand);
}
function showFilter(){
    const filterDiv=document.querySelector('.filter-outer-div');
    filterDiv.innerHTML=`<div class="filter">
    <p onclick="openFilter()">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" /></svg>
        FILTER
    </>
    <div class="filter-opt">
        <div class="filt-categories">
            <h3 class="filter-title">PRICE</h3>
            <div class="radio">
                <label for="price-opt1" style="width:100%""> <input type="checkbox" name="price-opt" id="price-opt1" onchange="updatePriceList('price-opt1')">${price.min}-${price.max/5 -1}
                </label>
                <label for="price-opt2" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt2" onchange="updatePriceList('price-opt2')">${price.max/5}-${price.max*2/5 -1}
                </label>
                <label for="price-opt3" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt3" onchange="updatePriceList('price-opt3')">${price.max*2/5}-${price.max*3/5 -1}
                </label>
                <label for="price-opt4" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt4" onchange="updatePriceList('price-opt4')">${price.max*3/5}-${price.max*4/5 -1}
                </label>
                <label for="price-opt5" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt5" onchange="updatePriceList('price-opt5')">&gt;${price.max*4/5}
                </label>
            </div>
        </div>
        <div class="filt-categories">
            <h3 class="filter-title">COLOR</h3>
            <div class="radio">
                <label for="price-opt1" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt1">200-300
                </label>
                <label for="price-opt2" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt2">200-300
                </label>
                <label for="price-opt3" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt3">200-300
                </label>
                <label for="price-opt4" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt4">200-300
                </label>
                <label for="price-opt5" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt5">200-300
                </label>
            </div>
        </div>
        <div class="filt-categories">
            <h3 class="filter-title">DISCOUNTS</h3>
            <div class="radio">
                <label for="price-opt1" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt1">200-300
                </label>
                <label for="price-opt2" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt2">200-300
                </label>
                <label for="price-opt3" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt3">200-300
                </label>
                <label for="price-opt4" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt4">200-300
                </label>
                <label for="price-opt5" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt5">200-300
                </label>
            </div>
        </div>
        <div class="filt-categories">
            <h3 class="filter-title">ARRIVALS</h3>
            <div class="radio">
                <label for="price-opt1" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt1">200-300
                </label>
                <label for="price-opt2" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt2">200-300
                </label>
                <label for="price-opt3" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt3">200-300
                </label>
                <label for="price-opt4" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt4">200-300
                </label>
                <label for="price-opt5" style="width:100%"> <input type="checkbox" name="price-opt" id="price-opt5">200-300
                </label>
            </div>
        </div>
    </div>
</div>`;
}
function singleProduct(element){
    const parent=element.parentElement.id.split('_');
    console.log(parent);
    window.open(`../product?id=${item[parent[1]].id}`)
}
window.onload=()=>{
    getproduct();
}

function priceSort(index,operation){
    const mainDiv=document.querySelector('.search-results');
    
    if(operation==="remove")
    {
        
        let {min,max}=updatePriceListArray[index];
        items.forEach(element=>{
            if(element.price>=parseInt(min)&&element.price<=parseInt(max))
            {
                // let html=element.content();
                // priceSortHtml-=html.slice(0,html.length/2);
                priceSortHtml-=element.content();
            }
        })
        updatePriceListArray.splice(index,1);
    }
    else{
        let {min,max}=updatePriceListArray[index];
        // console.log(items);
        items.forEach(element=>{
            if(element.price>=parseInt(min)&&element.price<=parseInt(max))
            {
                // let html=element.content();
                // html=html.slice(0,html.length/2);
                // console.log(html);
                // priceSortHtml+=html;
                priceSortHtml+=element.content();
            }
        })
    }
    if(updatePriceListArray.length===0)
    {
        mainDiv.innerHTML=Mainhtml;
    }
    else{
        if(!priceSortHtml)
        {
            priceSortHtml=`<img style="user-select: auto;
            width: 50%;
            margin: 70px auto;
            display: block;" src="../Images/noproductfound.png">`
            mainDiv.innerHTML=priceSortHtml;
            priceSortHtml='';
        }
        else{
            mainDiv.innerHTML=priceSortHtml;
        }
    }
}
function updatePriceList(elementId)
{
    let element=document.getElementById(elementId);
    let string=element.parentElement.childNodes[2].data;
    // console.log(string);
    let i;
    let operation;
    let minPrice=string.split('-')[0];
    let maxPrice=string.split('-')[1].split('\n')[0];
    if(!element.checked)
    {
        operation="remove";
        updatePriceListArray.forEach((item,index)=>{
            if(item.min===minPrice&&item.max===maxPrice)
            {
                i=index;
            }
        })
        
    }
    else{
        console.log(minPrice,maxPrice);
        operation="add";
        i=updatePriceListArray.length;
        updatePriceListArray.push({
            min:minPrice,
            max:maxPrice
        })
    }
    priceSort(i,operation);
    // console.log(updatePriceListArray);
}