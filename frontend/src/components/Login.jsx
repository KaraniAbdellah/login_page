
import {Link, useNavigate} from "react-router";
import axios from "axios";


export default function Login() {
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        let email = document.querySelector(".email");
        let password = document.querySelector(".password");
        const inputs = [email, password];
        let check = true;
        inputs.forEach((input) => {
            if (input.value == "") {
                input.classList.add("InvalidInput"); check = false;
            }
            else input.classList.add("ValidInput");
        });

        // Check If User Exit In Database or No
        if (check) {
            axios.get(`http://127.0.0.1:3000/GetUser/${password.value}/${email.value}`).then((res) => {
                if (!res.data.isExit) {
                    let message = document.querySelector(".message");
                    message.textContent = "Email or Password Incorrect";
                } else {
                    navigate("/");
                }
            });
        }

    }
    return (
      <div className="">
        <div className="w-96 p-6 shadow-lg rounded-2xl bg-white">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-start mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full email px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-start mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="w-full password px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
              <p className="message mb-2 text-md text-red-600"></p>
            </div>
            <button onClick={(e) => handleLogin(e)} type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Login</button>
            <Link to="/signup">
                <p className="cursor-pointer text-center mt-2 text-blue-700 font-semibold">Do not  Have An Account ?</p>
            </Link>
          </form>
        </div>
      </div>
    );
  }
  