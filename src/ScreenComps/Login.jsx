import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"
import {  NavLink } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = localStorage.getItem("uid");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/todo");
    }
  }, []);

  const loginHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resolve) => {
        console.log("resolve", resolve);
        localStorage.setItem("uid", resolve.user.uid);
        navigate("/todo");
      })
      .catch((err) => {
        alert(err, "error");
      });
  };

  return (
    <section className="container px-5 " style={{maxWidth : "400px",border:"1px solid green",borderRadius : "15px",marginTop : "10rem",paddingTop: "3rem",paddingBottom:"3rem"}}>
      <Form onSubmit={loginHandler}>
        <h2 className="text-center mb-5" style={{color: "#007E33"}}><strong>Login</strong> </h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email : </Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter email"
          />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password : </Form.Label>
          <Form.Control
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
        </Form.Group>



        <div className="sign mt-5 text-center w-100">
<NavLink
                className={({ isActive }) => {
                  return isActive ? "activeLink" : undefined;
                }}
                to="/signup"
              >
                New Here? SignUp Now
              </NavLink>
        </div>




         <div className="cutt w-100 text-center mt-5">

        <Button variant="btn btn-success" type="submit">
          Submit
        </Button>
         </div>
      </Form>
    </section>
  );
}

export default Login;