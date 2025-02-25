
import {Link, useNavigate} from "react-router";
import axios from "axios";


export default function Signup() {
    console.log();
    const navigate = useNavigate();
    const handleSubmit = () => {

        if (document.cookie == "") {
            const email = document.querySelector("input.email");
            const password = document.querySelector("input.password");
            const user = {
                email: email.value,
                password: password.value,
            }
            axios.post("http://127.0.0.1:3000/AddUser", user).then((res) => {
                console.log("Data Send to Database Sucefully");
                console.log(res.data);
                // Store Token To Cookies
                document.cookie = `usertoken=${res.data}`;
            });
        } else {
            navigate("/");
        }
    }

    return (
      <div className="">
        <div className="w-96 p-6 shadow-lg rounded-2xl bg-white">
          <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-start mb-2">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-start mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
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
            </div>
            <button type="submit" onClick={() => handleSubmit()} className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Sign Up</button>
            <Link to="/login">
                <p className="cursor-pointer text-center mt-2 text-blue-700 font-semibold">Already Have An Account ?</p>
            </Link>
          </form>
        </div>
      </div>
    );
  }