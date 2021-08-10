let body={};
const mainurl='https://home-store-1.herokuapp.com';
async function continuebtn()
{   
    let mainurl;
    const otp=document.getElementById('otp').value;
    if(otp.length==0)
    {
        mainurl=`${mainurl}/users/signup1`
    }
    else{
        mainurl=`${mainurl}/users/signup2/?otp=${otp}`;
    }
    window.location.href=mainurl;
}
async function sendotp(){
    const email=document.getElementById('email').value;
    localStorage.setItem('email',email);
    const data={email};
    const response=await fetch(`${mainurl}/users/otp`,{
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
    const response=await fetch(`${mainurl}/users/signup`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    });
    const result=await response.json();
    console.log(result);
}