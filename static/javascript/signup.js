let body={};
async function continuebtn()
{   
    let url;
    const otp=document.getElementById('otp').value;
    if(otp.length==0)
    {
        url=window.location.href;
    }
    else{
        url=`../signup2/?otp=${otp}`;
    }
    console.log(url);
    window.location.href=url;
}
async function sendotp(){
    const email=document.getElementById('email').value;
    localStorage.setItem('email',email);
    const data={email};
    const response=await fetch('/users/otp',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    });
    const result=await response.json();
    console.log(result);
}
async function submitdata(){
    const firstName=document.getElementById('firstname').value;
    const lastName=document.getElementById('lastname').value;
    const phone=document.getElementById('phonenumber').value;
    const primaryAddress=document.getElementById('ship').value;
    const password=document.getElementById('password').value;
    body.email=localStorage.getItem('email');
    body.firstName=firstName;
    body.lastName=lastName;
    body.phone=phone;
    body.primaryAddress=primaryAddress;
    body.password=password;
    console.log(body);
    const response=await fetch('../signup',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    });
    const result=await response.json();
    console.log(result);
}