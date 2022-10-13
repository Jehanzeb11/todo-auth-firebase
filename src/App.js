import { Route, Routes } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo"
import ProtectedRoute from "./ProtectedRoute";
import Login from "./ScreenComps/Login";
import SignUp from "./ScreenComps/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      {/* <TodoApp /> */}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/about" element={<h1>ABOUT PAGE</h1>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;