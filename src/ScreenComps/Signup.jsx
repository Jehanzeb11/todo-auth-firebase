import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { auth, db } from "../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [lastName, setlastName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = localStorage.getItem("uid");

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/todo");
    }
  }, []);
  const signupHandler = (e) => {
    e.preventDefault();
    console.log("submit form");
    const dbCollection = collection(db, "users");

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (resolve) => {
        console.log("resolve", resolve);
        const obj = {
          firstName,
          lastName,
          email,
          contact,
          uid: resolve.user.uid,
        };
        // await addDoc(dbCollection, obj);
        await setDoc(doc(db, "users", resolve.user.uid), obj);
        navigate("/");
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  return (
    <section className="container mt-5 px-5" style={{maxWidth : "400px",border:"1px solid green",borderRadius : "15px",marginTop : "10rem",paddingTop: "3rem",paddingBottom:"3rem"}}>
      <h2 className="mb-5 text-success text-center">SIGNUP</h2>
      <Form onSubmit={signupHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name </Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              setfirstName(e.target.value);
            }}
            placeholder="Enter First Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name </Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            placeholder="Enter Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter email"
          />
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name </Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => {
              setcontact(e.target.value);
            }}
            placeholder="Enter contact no:"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
        </Form.Group>
        <div className="cutt text-center mt-5">

        <Button variant="btn btn-success" type="submit">
          Submit
        </Button>
        </div>
      </Form>
    </section>
  );
};

export default SignUp;