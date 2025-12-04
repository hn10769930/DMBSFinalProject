//For login and signup
const fname=document.getElementById('fname')
const lname=document.getElementById('lname')
const email=document.getElementById('email')
const passwd=document.getElementById('password')
const cpasswd=document.getElementById('copypassword')
const role=document.getElementById('role')
const error_message=document.getElementById('error-message')
const emailRegex= /^[a-z0-9._%=-]+@[a-z]+\.[a-z]{2,4}$/

//Event listener for when the form is submitted
document.getElementById('form').addEventListener('submit',(e) => {

//Array for error messages
let errors=[]

//If firstname input exists use signup form
if(fname!==null) 
{
   errors=getSignupFormErrors(fname.value,lname.value,email.value,passwd.value,cpasswd.value,role.value)
}
//Else use login form
else{ 
   errors=getLoginFormErrors(email.value,passwd.value)
}
//If there is any error prevent form submisstion and display errors
if(errors.length>0){
   e.preventDefault()
   error_message.innerText='There are missing fields or invalid entries!'
   //error_message.innerText=errors.join("! ")
}
})

//Sign up form error validation
function getSignupFormErrors(firstname,lastname,email,password,repeatpassword,role){
    let errors=[]
   //First Name null error
    if(firstname==='' || firstname==null){
      errors.push('First Name is required')
      //fname.parentElement.classList.add('incorrect')
    }
    //Last name null error
   if(lastname==='' || lastname==null){
      errors.push('Last Name is required')
     //lname.parentElement.classList.add('incorrect')
    }
    //Email null error
   if(email==='' || email==null){
      errors.push('Email is required')
      //email.parentElement.classList.add('incorrect')
    }
   //Email Regex validation
   if(!emailRegex.test(email)){
   errors.push('Email is invalid')
   }
    //Password null error
   if(password==='' || password==null){
      errors.push('Password is required')
      //passwd.parentElement.classList.add('incorrect')
    }
    //Password length error
   if(password.length<8){
      errors.push('Password must have atleast 8 characters')
      //passwd.parentElement.classList.add('incorrect')
    }
    //Repeated Password null error
   if(repeatpassword==='' || repeatpassword==null){
      errors.push('Passwords do not match')
      //cpasswd.parentElement.classList.add('incorrect')
    }
    //Password match error
   if(password !== repeatpassword){
      errors.push('Passwords do not match')
      //passwd.parentElement.classList.add('incorrect')
      //cpasswd.parentElement.classList.add('incorrect')
    }
    //Role null error
    if(role===''||role==null){
      errors.push('Select your role')
      //role.parentElement.classList.add('incorrect')
    }
    return errors;
}

//Login form error validation
function getLoginFormErrors(email,password){
   let errors=[]
   if(email==='' || email==null){
   //Login email null error
      errors.push('Email is required')
      //email.parentElement.classList.add('incorrect')
    }
    //Password null error
   if(password==='' || password==null){
      errors.push('Password is required')
      //passwd.parentElement.classList.add('incorrect')
    }
    return errors;
}
//Array for all inputs
const inputs=[fname,lname,email,passwd,cpasswd,role].filter(input => input!=null)//.filter -if input element is not present it is null and filtered out the array-useful for login page

inputs.forEach(input => {
   input.addEventListener('input',() => {
     /* if(input.parentElement.classList.contains('incorrect')){
         input.parentElement.classList.remove('incorrect')
          error_message.innerText=''
      }*/
     error_message.innerText=''
   })
})







