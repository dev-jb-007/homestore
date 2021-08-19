function *id_generator(){
    let i=0;
    while(true)
    {
        yield i++;
    }
}
const id=id_generator();

let item=Array(0);
console.log('Hi');
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
    let html='';
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
        item.push(new Product(result[i],id.next().value));
        html+=item[i].content();
    }
    searchResults.classList.remove('remove-height');
    searchResults.innerHTML=html;
}
function singleProduct(element){
    const parent=element.parentElement.id.split('_');
    console.log(parent);
    window.open(`../product?id=${item[parent[1]].id}`)
}
window.onload=()=>{
    getproduct();
}