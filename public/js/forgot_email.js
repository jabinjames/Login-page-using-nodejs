// var button_1=document.getElementsByClassName("btn")[0];
// button_1.addEventListener("click",async (event)=>{
// event.preventDefault();
var login_page=document.getElementsByClassName("second_container")[0];
// showpage(login_page);



// });
// function showpage(element)
// {
//         element.style.visibility='visible';
// }
login_page.style.visibility='visible';
const username = document.getElementsByTagName("input")[0];
const email = document.getElementById("email");
// const password = document.getElementById("password");

var button_2 = document.getElementsByClassName("btn2")[0];
var second_container=document.getElementsByTagName('div')[2];
button_2.addEventListener("click", async(event) => {
    event.preventDefault();
    if (username.value === "" && email.value === "" ) {
        showError(username);
        showError(email);
        // showError(password);
        alert("SOMETHING MISSING!!!");
    } else {
        showSuccess(username);
        showSuccess(email);
        // showSuccess(password);
        try {
            const response = await fetch('http://localhost:5000/home/forgot_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.value,
                    email: email.value
                })
            });
            const data = await response.json(); // Parse the JSON from the response
            if(response.status === 400)
                {
                    alert("ERROR, CHECK EMAIL !!")
                }
                else
                {
                    console.log('Response:', data);
                    alert("!!!OTP IS SENDED !!!")
                    window.location.href = "./forgot_otp.html"
                }
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
