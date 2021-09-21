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
