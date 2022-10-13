import React from "react";
import { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { AiFillDelete } from "react-icons/ai";
import { BiEditAlt,BiLogOut } from "react-icons/bi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Todo = ({ children }) => {
  const [todoItem, setTodoItem] = useState([]);
  const [inputValue, setinputValue] = useState("");
  const [indexNumber, setIndexNumber] = useState("");
  const [updateInput, setupdateInput] = useState("");
  const [refresh, setRefresh] = useState(false);
  ///CREATE COLLECTION
  const dbCollection = collection(db, "todoCollection");
  const user = localStorage.getItem("uid");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, []);

  console.log("children", children);

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(dbCollection);
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          id: doc.id,
          value: doc.data().todoValue,
        });
      });
      setTodoItem([...arr]);
    }
    getData();
  }, [refresh]);

  const addTodo = async () => {
    const obj = {
      todoValue: inputValue,
    };
    const addTodo = await addDoc(dbCollection, obj);
    console.log(addTodo, "addTodo");
    setRefresh(!refresh);
    ///old
    // todoItem.push({ value: inputValue });
    // setTodoItem([...todoItem]);
    setinputValue("");
  };

  const deleteAll = async () => {
    setTodoItem([]);
  };

  const deleteTodo = async (ind) => {
    console.log("delete todo", ind);
    const id = todoItem[ind].id;
    const dbRef = doc(db, "todoCollection", id);
    await deleteDoc(dbRef);

    todoItem.splice(ind, 1);
    setTodoItem([...todoItem]);
  };

  const updateTodo = async (ind) => {
    ///update firebase collection
    const id = todoItem[ind].id;
    const dbRef = doc(db, "todoCollection", id);
    await updateDoc(dbRef, {
      todoValue: updateInput,
    });

    todoItem.splice(ind, 1, { value: updateInput, id });
    setTodoItem([...todoItem]);
    setIndexNumber("");
    setupdateInput("");
  };

  const editTodo = (ind) => {
    setupdateInput(todoItem[ind].value);
  };
  const logoutHandler = () => {
    localStorage.removeItem("uid");
    navigate("/");
  };
  return (
    <div className="container">
      <div className="text-black d-flex align-items-center justify-content-between p-4">
        <h1 className="">TODO APP</h1>
       <abbr title="Logout"> <button className="btn btn-danger" onClick={logoutHandler}>
          <BiLogOut />
                  </button></abbr>
      </div>

      <div className="mt-5 px-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-group form-control"
          placeholder="ENTER TODO"
          value={inputValue}
          onChange={(e) => setinputValue(e.target.value)}
        />
        <div className="mt-3 d-flex gap-3">
          <button className="btn btn-success mx-2 mb-2 p-2"  onClick={addTodo}>
            ADD
          </button>
        </div>
      </div>

      <section className="mt-5 px-4">
        {todoItem.map((todo, ind) => {
          return (
            <React.Fragment key={ind}>
              {indexNumber === ind ? (
                <div>
                  <input
                    onChange={(e) => setupdateInput(e.target.value)}
                    className="form-control form-group my-3"
                    value={updateInput}
                    autoFocus
                  />
                  <button
                    onClick={() => updateTodo(ind)}
                    className="btn btn-primary my-2"
                  >
                    UPDATE
                  </button>
                </div>
              ) : (
                <div className="alert alert-success d-flex justify-content-between">
                  {todo.value}
                  <div className="d-flex gap-2">
                    <AiFillDelete
                      color="black"
                      className="icon"
                      onClick={() => deleteTodo(ind)}
                      size={25}
                    />
                    <BiEditAlt
                      color="black"
                      className="icon"
                      onClick={() => {
                        setIndexNumber(ind);
                        editTodo(ind);
                      }}
                      size={25}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </section>
    </div>
  );
};

export default Todo;