var login_page=document.getElementsByClassName("second_container")[0];
login_page.style.visibility='visible';
const otp = document.getElementById("otp");
var button_2 = document.getElementsByClassName("btn2")[0];
button_2.addEventListener("click", async(event) => {
    event.preventDefault();
    if (otp.value === "" ) {
        showError(otp);
        alert("SOMETHING MISSING!!!");
    } else {
        showSuccess(otp);
        try {
            const response = await fetch('http://localhost:5000/home/forgot_otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    otp: otp.value
                })
            });
            const data = await response.json(); 
            if(response.status === 400)
                {
                    alert("ERROR, CHECK OTP!!")
                }
                else
                {
                    console.log('Response:', data);
                    window.location.href = "./forgot_newpassword.html"
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
