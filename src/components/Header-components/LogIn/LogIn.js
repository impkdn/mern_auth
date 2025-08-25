import "./LogIn.css"


const LogIn = () => {
    return (
        <div className="log__in__btn">
            <button onClick={formLog}>Log In</button>
        </div>
    );
}

function formLog() {
    console.log("Hi i m logged")
}
export default LogIn;