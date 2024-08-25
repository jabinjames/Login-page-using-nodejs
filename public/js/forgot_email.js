var login_page=document.getElementsByClassName("second_container")[0];
login_page.style.visibility='visible';
const username = document.getElementsByTagName("input")[0];
const email = document.getElementById("email");
var button_2 = document.getElementsByClassName("btn2")[0];
var second_container=document.getElementsByTagName('div')[2];
button_2.addEventListener("click", async(event) => {
    event.preventDefault();
    if (username.value === "") {
        showError(username);
    }
    else
    {
        showSuccess(username);
    }
    if(email.value === ""){
        showError(email);
    }
    else {
        showSuccess(email);
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
            const data = await response.json(); 
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
