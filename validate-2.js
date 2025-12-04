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
   else{
    errors=getSearchFormError(description.value)
   }
   
if(errors.length > 0){
   e.preventDefault()
   error_message.innerText=errors.join("! ")
}
})
//Add New Event Form errors
function getEventFormErrors(title,description,location,datetime){
   let errors=[]
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
   //Disallow current and previous date selection
   document.addEventListener('DOMContentLoaded',(e) =>{
      function getCurrentDateTime(){
         const now=new Date();

         let date=now.toISOString().slice(0,16);
         return date;
      }
      datetime.min =getCurrentDateTime();
   })

const inputs=[title,description,loc,datetime]
//Array for all inputs
inputs.forEach(input => {
   input.addEventListener('input',() => {
   error_message.innerText=''
   })
})