var login_page=document.getElementsByClassName("second_container")[0];
login_page.style.visibility='visible';
const newpassword = document.getElementById("new_password");
const confirmpassword = document.getElementById("confirm_password");
var button_2 = document.getElementsByClassName("btn2")[0];
button_2.addEventListener("click", async(event) => {
    event.preventDefault();
    if (newpassword.value === "" ) {
        showError(newpassword);
    } 
    else{
        showSuccess(newpassword);
    }
    if(confirmpassword.value === "")
    {
        showError(confirmpassword);
    }
    else {
        showSuccess(confirmpassword );
        try {
            const response = await fetch('http://localhost:5000/home/forgot_newpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newpassword:newpassword.value,
                    confirmpassword:confirmpassword.value
                })
            });
            const data = await response.json(); 
            if(response.status === 400)
                {
                    alert("ERROR, PASSWORD MISMATCH !!")
                }
                else
                {
                    console.log('Response:', data);
                    alert("!!! password is successfully changed !!!")
                    window.location.href = "../../login.html"
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
