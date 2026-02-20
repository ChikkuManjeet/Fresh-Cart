import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Auth = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowUserLogin, setUser, axios, navigate } = useContext(AppContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/users/${state}`, { name, email, password });
      if (data.success) {
        toast.success(data.success);
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitHandler}
        className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-80 sm:w-[400px] space-y-6 flex flex-col"
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-indigo-600">
          {state === "login" ? "Login" : "Sign Up"}
        </h2>

        {state === "register" && (
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-2 border border-gray-300 rounded-md outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>

        <p className="text-sm text-gray-500 text-center">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">
                Login
              </span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">
                Sign Up
              </span>
            </>
          )}
        </p>

        <button className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-2xl transition">
          {state === "register" ? "Sign Up" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
