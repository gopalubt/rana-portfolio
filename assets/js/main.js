
const formEl = document.forms.namedItem("enquiry");
const base_API_Url = "https://gp-cloud.vercel.app";
let message = ""
formEl.addEventListener("submit",  (event)=>{
    event.preventDefault();
    let formData={
      "name" :  formEl.name.value.trim(), 
      "email":  formEl.email.value.trim(), 
      "mobile":  formEl.mobile.value.trim(), 
      "message": formEl.message.value.trim() 
    }
    debugger
   fetch(`${base_API_Url}/api/v1/enquiry`, {
      method: "POST",
      headers: {apihost: 'https://gopalubt.github.io/rana-portfolio'},
      body: formData
    })
    .then(res=>JSON.parse(res))
    .then(result => {
      debugger
      console.log(result);
      formEl.reset();
    })
    .catch((error)=>console.log(error))
})
