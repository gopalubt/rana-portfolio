const formEl = document.forms.namedItem("enquiry");
const base_API_Url = "https://gp-cloud.vercel.app";
let message = "";

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  
  let formData = {
    "name": formEl.name.value.trim(),
    "email": formEl.email.value.trim(),
    "mobile": formEl.mobile.value.trim(),
    "message": formEl.message.value.trim(),
  };

  fetch(`${base_API_Url}/api/v1/enquiry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
      "apihost": "https://gopalubt.github.io/rana-portfolio"
    },
    body: JSON.stringify(formData) 
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json(); 
  })
  .then(result => {
    console.log(result);
    message = "Send Successfully!"
    formEl.reset();  
  })
  .catch((error) => {
    message = "There was an error with the fetch operation!"
    console.error('There was an error with the fetch operation:', error);
  });
});
