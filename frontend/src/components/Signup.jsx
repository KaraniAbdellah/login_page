
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


export default function Signup() {
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        const email = document.querySelector("input.email");
        const password = document.querySelector("input.password");
        const Cpassword = document.querySelector("input.Cpassword");
        const fname = document.querySelector("input.fname");
        const lname = document.querySelector("input.lname");
        const message = document.querySelector(".message");
        const inputs = [email, password, fname, lname, password];

        // Check If The Email Already Exit
        const emailEntred = {email: email.value};
        let isExit = false;
        try {
          await axios.post("http://127.0.0.1:3000/CheckEmail", emailEntred).then((res) => {
            if (res.data.isExit) {
              console.log("This Email Already Exit");
              message.textContent = "this email already exit";
              message.classList.remove("hidden");
              message.classList.add("block");
              isExit = true;
              console.log(isExit + "inside The axios");
            }
          });
        } catch (error) {
          console.log("Error Here !!! --> " + error);
        }
        console.log("isExit = " + isExit);
        // Validation Inputs
        let check = true;
        inputs.forEach((input) => {
            if (input.value === "") {
              input.classList.add("InvalidInput"); check = false;
              input.classList.remove("ValidInput");
            } else {
              input.classList.remove("InvalidInput");
              input.classList.add("ValidInput");
            }
        });
        if (Cpassword.value !== password.value) {
          message.classList.add("block");
          message.classList.remove("hidden");
          Cpassword.classList.remove("ValidInput");
          Cpassword.classList.add("InvalidInput");
          check = false;
        } else {
          if (Cpassword.value === "") {
            Cpassword.classList.remove("ValidInput");
            Cpassword.classList.add("InvalidInput");
          } else {
            Cpassword.classList.remove("InvalidInput");
            Cpassword.classList.add("ValidInput");
          }
          if (!isExit) {
            message.textContent = "password Incorrect";
            message.classList.add("hidden");
            message.classList.remove("block");
          }
        }

        // Store The User Data to Database
        if (isExit === false && check === true) {
            const user = {
                email: email.value,
                password: password.value,
            }
            await axios.post("http://127.0.0.1:3000/AddUser", user).then((res) => {
                console.log("Data Send to Database Sucefully");
                console.log(res.data);
                // Store Token To Cookies
                document.cookie = `usertoken=${res.data.token}`;
                navigate("/login");
            });
        }
    }

    return (
      <div className="">
        <div className="w-96 p-6 shadow-lg rounded-2xl bg-white">
          <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
          <form>
            <div className="mb-2">
              <label className="block text-sm font-medium text-start mb-2">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                required
                className="w-full fname px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-start mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                required
                className="w-full lname px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-start mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full email px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-start mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="w-full password px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-start mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="confirm password"
                required
                className="w-full Cpassword px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <p className="message hidden mb-3 text-red-600">password Incorrect</p>

            <button type="submit" onClick={(e) => handleSubmit(e)} className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Sign Up</button>
            <Link to="/login">
                <p className="cursor-pointer text-center mt-2 text-blue-700 font-semibold">Already Have An Account ?</p>
            </Link>
          </form>
        </div>
      </div>
    );
  }