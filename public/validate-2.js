//*************************************************************************
//*** Full Name: Jerome Grant
//*** Course Title: Database Management Systems
//*** Submission Date: 4 December 2025
//*** Assignment: Final Project – Hawk Events Application
//*** File Name: validate-2.js
//*** Purpose: This JavaScript file performs front-end form validations for the add.html
//***          It prevents form submission if any input is missing or invalid and displays an error message
//***          and clears error message once a new input is made.
//*************************************************************************
const title=document.getElementById('title')
const description=document.getElementById('description')
const loc=document.getElementById('location')
const datetime=document.getElementById('event-time')
const error_message=document.getElementById('error-message')
//Event listener for when form is submitted
document.getElementById('add').addEventListener('submit', (e) => {
    //Array for error messages
   let errors=[]

if(title!==null){
    errors=getEventFormErrors(title.value,description.value,loc.value,datetime.value)
   }
   /*else{
    errors=getSearchFormError(description.value)
   }*/
if(errors.length > 0){
   e.preventDefault()
    error_message.innerText='There are missing fields or invalid entries!'
   //error_message.innerText=errors.join("! ")
}
})
//Add New Event Form validation
function getEventFormErrors(title,description,location,datetime){
   let errors=[]
    //Title null error
   if(title===''||title==null){
      errors.push('Please add an event title')
   }
   //Description null error
   if(description==='' || description==null){
      errors.push('Please describe the event')
    }
    //Location null error
   if(location==='' || location==null){
      errors.push('Please enter location')
    }
    //Datetime null error
   if(datetime==='' || datetime==null){
      errors.push('Please select a valid date')
    }
   return errors;
   }
   //Date validation
   document.addEventListener('DOMContentLoaded',(e) =>{
      function getCurrentDateTime(){
         const now=new Date();

         let date=now.toISOString().slice(0,16);
         return date;
      }
      datetime.min =getCurrentDateTime();
   })

const inputs=[title,description,loc,datetime]
//***Error message clears on input
inputs.forEach(input => {
   input.addEventListener('input',() => {
   error_message.innerText=''
   })
})

