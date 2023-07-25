const usrname=document.getElementById("username");
const password=document.getElementById("password");
const api="http://localhost:4000/api/v1/login"


// console.log(usrname.value);
formlogin.onsubmit = async (e) => {
    e.preventDefault();
    var form = document.querySelector("#formlogin");
   // var form = document.forms[0];

      data = {
            
            username:usrname.value,
            password:password.value,
        
      }

      let response = await fetch('http://localhost:4000/api/v1/login', {
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
      })

      let text = await response.text(); // read response body as text

    //   document.getElementById("decoded").style.display="block";
   
    window.localStorage.setItem("user", text);

    console.log(text);
    window.location.href="http://localhost:5500/client/user/user.html"
      
  };