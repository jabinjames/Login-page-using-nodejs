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
    if (username.value === "" && email.value === "" && password.value === "") {
        showError(username);
        showError(email);
        showError(password);
        alert("SOMETHING MISSING!!!");
    } else {
        showSuccess(username);
        showSuccess(email);
        showSuccess(password);
        try {
            const response = await fetch('http://localhost:5000/home/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value
                })
            });
            const data = await response.json(); // Parse the JSON from the response
            console.log('Response:', data);
            alert("!!!user successfully logined !!!")
        } catch (error) {
            console.log('Error:', error);
            alert("error");
        }
    }    
});

function showError(element) {
    element.style.border = "2px solid red";
}

function showSuccess(element) {
    element.style.border = "2px solid green";
}
