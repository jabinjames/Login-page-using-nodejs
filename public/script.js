var button_1=document.getElementsByClassName("btn")[0];
button_1.addEventListener("click",async(event)=>{
event.preventDefault();
var login_page=document.getElementsByClassName("second_container")[0];
showpage(login_page);

try {
    const response = await axios.post('http://localhost:5000/home/login', data);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }




});
function showpage(element)
{
        element.style.visibility='visible';
}
var username = document.getElementsByTagName("input")[0];
let email = document.getElementById("email");
var password = document.getElementById("password");

var button_2 = document.getElementsByClassName("btn2")[0];
var second_container=document.getElementsByTagName('div')[2];
button_2.addEventListener("click", (event) => {
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
    }
    if(username.value !== ""&& email.value !== ""&&password.value !== "")
    {
        second_container.remove();
    }
    else
    {
        alert("SOMETHING MISSING!!!");
    }
});

function showError(element) {
    element.style.border = "2px solid red";
}

function showSuccess(element) {
    element.style.border = "2px solid green";
}
