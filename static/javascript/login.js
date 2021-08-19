const login=async()=>{
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const body={email,password};
    console.log(body);
    const response=await fetch(window.location.href,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    });
    const result=await response.text();
    window.location.href="../../";
}