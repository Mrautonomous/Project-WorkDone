import RegisterForm from "../components/RegisterForm"
import { Link } from "react-router-dom"
const Register = () => {
  return (
    <>
      <div className=" bg-slate-700">
        <h1 className="text-4xl py-8 text-center font-bold tracking-tight leading-none text-white">
          Create Account
        </h1>
        <div className="w-[380px] py-8 m-auto">
          <RegisterForm />
        </div>
        <p className="text-center py-4 text-gray-300 text-sm">
          Already have an account?{" "}
          <span className=" text-blue-500 hover:underline">
            {" "}
            <Link to="/auth"> Login</Link>
          </span>
        </p>
      </div>
    </>
  )
}

export default Register
