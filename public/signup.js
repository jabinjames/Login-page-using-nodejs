var button_1=document.getElementsByClassName("btn")[0];
button_1.addEventListener("click",async (event)=>{
event.preventDefault();
var login_page=document.getElementsByClassName("second_container")[0];
showpage(login_page);
});
function showpage(element)
{
        element.style.visibility='visible';
}
const username = document.getElementsByTagName("input")[0];
const email = document.getElementById("email");
const password = document.getElementById("password");

var button_2 = document.getElementsByClassName("btn2")[0];
var second_container=document.getElementsByTagName('div')[2];
button_2.addEventListener("click", async(event) => {
    event.preventDefault();
    if (username.value === "") {
        showError(username);
    } else {
        showSuccess(username);
    }

    if (email.value === "") {
        showError(email);
    } else {
        showSuccess(email);
    }
    if (password.value === "") {
        showError(password);
    } else {
        showSuccess(password);
        try {
         const response = await axios.post('http://localhost:5000/home/signup', {
            username: username.value,
            email:email.value,
            password: password.value
        });
        console.log('Response:', response.data);
        alert("signup successfully completed")
    } catch (error) {
        console.error('Error:', error);
        alert("error")
  }
    }
    
});

function showError(element) {
    element.style.border = "2px solid red";
}

function showSuccess(element) {
    element.style.border = "2px solid green";
}
