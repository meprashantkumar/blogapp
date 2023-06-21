"use client";
import { useContext, useState } from "react";
import "./auth.css";
import { Context } from "../providers";
import { redirect } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

function Auth() {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const { user } = useContext(Context);

  if (user._id) return redirect("/");
  return (
    <div>
      <div className="authContainer">
        <div className={toggle ? "authform2" : "authform"}>
          <div className="left">
            <h1>Hello</h1>
            <button onClick={toggleHandler}>
              {!toggle ? "Don't have an account" : "Have an account"}
            </button>
          </div>
          <div className="right">{toggle ? <Register /> : <Login />}</div>
        </div>
      </div>
    </div>
  );
}

export default Auth;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(Context);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      if (data.message) {
        await setUser(data.user);
        await toast.success(data.message);
        if (typeof window !== "undefined") {
          await localStorage.setItem("token", data.token);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={loginHandler}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      if (data.message) {
        await setUser(data.user);
        await toast.success(data.message);
        if (typeof window !== "undefined") {
          await localStorage.setItem("token", data.token);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="Register">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}
