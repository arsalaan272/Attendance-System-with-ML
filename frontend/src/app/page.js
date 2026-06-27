"use client"
import { useState } from "react";

export default function Home() {

  {/* form credentials */}
  const [formData, setformData] = useState({
    username: "",
    password: ""
  });

  {/* changing the input fields value */}
  const handleInput = (e) => {
    setformData((prevData) => ({...prevData, [e.target.name]: e.target.value }))
  }

  {/* handling form submission */}
  const handleSubmit = async (e) => {
    e.preventDefault();
    await postrequest();
    setformData({username: "", password:""});
  }


  {/* doing a post request to backend */}
  const postrequest = async() => {
    try {
      const response = await fetch("http://localhost:5100/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if(data){
        if(data.status === 200){
           alert("login successfull: " + data.message); 
      }else{
        alert("Login failed: " + data.message);
      }
    }
    } catch (error) {
      console.error("Login request failed:", error);
      return {
        message: "Network error",
        status: 500,
      };
    }
  }

  return (
    <div className="w-1/2 m-auto block border p-3">
      <form className="border p-3 self-center flex flex-col gap-3" onSubmit={handleSubmit}>

        {/* username field */}
        <p className="text-white">Enter username</p>
        <input type="text" name="username" required className="text-white border p-2 rounded"
          value={formData.username}
          onChange={handleInput}
        ></input>

        {/* password field */}
        <p className="text-white">Enter password</p>
        <input type="password" name="password" required className="text-white border p-2 rounded"
          value={formData.password}
          onChange={handleInput}
        ></input>

        {/* submit button */}
        <button type="submit" className="rounded px-15 py-3 my-2 border cursor-pointer hover:bg-zinc-900 transition-color duration-200 self-center">Submit</button>
      </form>
    </div>
  );
}
