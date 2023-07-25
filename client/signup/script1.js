const Name=document.getElementById("name");
const usrname=document.getElementById("username");
const email=document.getElementById("email");
const password=document.getElementById("password");
const role=document.getElementById("role");
const api="http://localhost:4000/api/v1/signup";
const btn=document.getElementById("signup");



formEle.onsubmit = async (e) => {
    e.preventDefault();
    var form = document.querySelector("#formEle");
   // var form = document.forms[0];

      data = {
            name:Name.value,
            email:email.value,
            username:usrname.value,
            password:password.value,
            role:role.value 
        
      }

      let response = await fetch('http://localhost:4000/api/v1/signup', {
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
      })

      let text = await response.text(); // read response body as text
      document.getElementById("decoded").style.display="block";
      //console.log(text);
  };