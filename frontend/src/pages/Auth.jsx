import { useRef } from "react";
// import { emailSchema, passwordSchema } from "../constant/inputValidation";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { createRequest } from "../utils";
import { Link, useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  //   const [errorMessage, setErrorMessage] = useState({
  //     emailError: "",
  //     passwordError: "",
  //   });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const loginData = {
    email: emailRef?.current?.value,
    password: passwordRef?.current?.value,
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    () => createRequest("users/login", loginData),
    {
      onSuccess: (data) => {
        if (data.message === "Authentication successful") {
          // Login was successful
          toast.success("Account logged in successfully!");
          queryClient.invalidateQueries();
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("user", JSON.stringify(data));

          // Redirect the user to the "/store" page
          navigate("/store");
        } else {
          // Login failed
          //   toast.error("Invalid credentials");
        }
        // toast.success("Account logged in successfully!");
        // queryClient.invalidateQueries(),
        //   setTimeout(() => {
        //     navigate("/");
        //   }, 1000);
      },
      onError: () => {
        toast.error("Invalid credentials");
        // toast.error("An error occured while logging in your account");
      },
    }
  );

  const submitHandler = (e) => {
    e.preventDefault();
    Promise.all([
      //   emailSchema.validate(emailRef.current.value),
      //   passwordSchema.validate(passwordRef.current.value),
      true,
    ])
      .then(() => {
        // Validation succeeded, proceed with form submission logic here
        mutate({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
      })
      .catch((err) => {
        console.log("ERROR : ", err);
        toast.error("Please fill the form with valid values");
      });
  };

  return (
    <>
      <div className=" bg-slate-700">
        <h1 className="text-4xl py-8 text-center font-bold tracking-tight leading-none text-white">
          Login Account
        </h1>
        <div className="w-[380px] py-8 m-auto">
          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                placeholder="example@gmail.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                // onBlur={() =>
                //   emailSchema
                //     .validate(emailRef.current.value)
                //     .then(() => {
                //       setErrorMessage((prevErrors) => ({
                //         ...prevErrors,
                //         emailError: "", // Clear the error when input is valid
                //       }));
                //     })
                //     .catch((err) => {
                //       setErrorMessage((prevErrors) => ({
                //         ...prevErrors,
                //         emailError: err.message,
                //       }));
                //     })
                // }
              />
              {/* {errorMessage?.emailError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Error: </span>{" "}
                  {errorMessage?.emailError}
                </p>
              )} */}
            </div>
            <div className="mb-6">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                ref={passwordRef}
                id="password"
                placeholder=" ********"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                // onBlur={() =>
                //   passwordSchema
                //     .validate(passwordRef.current.value)
                //     .then(() => {
                //       setErrorMessage((prevErrors) => ({
                //         ...prevErrors,
                //         passwordError: "",
                //       }));
                //     })
                //     .catch((err) => {
                //       setErrorMessage((prevErrors) => ({
                //         ...prevErrors,
                //         passwordError: err.message,
                //       }));
                //     })
                // }
              />
              {/* {errorMessage?.passwordError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Error: </span>{" "}
                  {errorMessage?.passwordError}
                </p>
              )} */}
            </div>

            <button
              type="submit"
              className="text-white mt-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </form>
        </div>
        <p className="text-center py-4 text-gray-300 text-sm">
          Do not have an account?{" "}
          <span className=" text-blue-500 hover:underline">
            {" "}
            <Link to="/register"> Create account</Link>
          </span>
        </p>
      </div>

      <Toaster position="bottom-right" />
    </>
  );
}

export default Auth;
