
import {Link, useNavigate} from "react-router";
import axios from "axios";


export default function Login() {
    const navigate = useNavigate();
    // Verfied If The USer Has A Token Or Not
    // useEffect(() => {
    //   if (document.cookie !== '') {
    //     navigate("/");
    //   }
    // }, []);

    // Generate Token
    async function GenerateToken() {
      return await axios.get("http://127.0.0.1:3000/GenerateToken").then((res) => {
        document.cookie = `usertoken=${res.data.token}`;
      });
    }

    async function handleLoginWithGoogle(e) {
      console.log("handle log in with google" + e.target);
    }

    async function handleLogin(e) {
        e.preventDefault();

        const email = document.querySelector(".email");
        const password = document.querySelector(".password");
        if (email.value == "") {
          email.classList.toggle("InvalidInput");
        }
        if (password.value == "") {
          password.classList.toggle("InvalidInput");
        }
        if (email.value !== "" && password.value !== "") {
          await axios.get(`http://127.0.0.1:3000/CheckUser/${password.value}/${email.value}`).then((res) => {
              if (!res.data.isExit) {
                let message = document.querySelector(".message");
                message.textContent = "Email or Password Incorrect";
                email.classList.add("InvalidInput");
                password.classList.add("InvalidInput");
              } else if (document.cookie === "") {
                  // Generate User Token
                  GenerateToken().then(() => {
                    navigate("/");
                  });
                } else if (document.cookie !== "") {
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
                min="8"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full password px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
              <p className="message mb-2 text-md text-red-600"></p>
            </div>
            <button onClick={(e) => handleLogin(e)} type="submit" className="w-full mb-2 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Login</button>
            
            <button onClick={(e) => handleLoginWithGoogle(e)} className="w-full py-2 bg-zinc-600 text-white font-semibold rounded-lg hover:bg-blue-700">Login In With Google</button>

            <Link to="/">
                <p className="cursor-pointer text-center mt-2 text-blue-700 font-semibold">Do not  Have An Account ?</p>
            </Link>
          </form>
        </div>
      </div>
    );
  }
  