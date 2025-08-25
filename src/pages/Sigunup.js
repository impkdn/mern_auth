import { useState } from "react";

function User () {
    const [user,setUser] = useState({
        fname : "",
        lname : '',
        email : '',
        mobile : '',
        password : ''
    });
}
const SignUp = () => {
    
    function CheckUser() {
        console.log('Hi');
    }
   return (
    <>
    <form className="signUpForm">
        <label>
            First Name:
            <input type="text"/>
        </label>
        <label>
            Last Name:
            <input type="text"/>
        </label>
        <label>
            Email:
            <input type="email"/>
        </label>
        <label>
            Mobile:
            <input type="number"/>
        </label>
        <label>
            Password:
            <input type="Password"/>
        </label>
        <button onClick={CheckUser}>Create Account</button>
    </form>
    </>
   )
}

export default SignUp;