const login=async()=>{
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const body={email,password};
    console.log(body);
    const response=await fetch('http://localhost:3000/users/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    });
    const result=await response.text();
    document.location.href="http://localhost:3000";
}