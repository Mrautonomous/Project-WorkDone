import { useRef, useState } from "react"
import {
  nameSchema,
  emailSchema,
  passwordSchema,
  phoneNumberSchema,
  addressSchema,
  idCardSchema,
} from "../constant/inputValidation"
import toast, { Toaster } from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import { createRequest } from "../utils"
import { useNavigate } from "react-router-dom"

function RegisterForm() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    phoneError: "",
    addressError: "",
    idCardError: "",
  })

  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const addressRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const idCardRef = useRef(null)

  const newProductData = {
    name: nameRef?.current?.value,
    email: emailRef?.current?.value,
    password: passwordRef?.current?.value,
    phone: phoneRef?.current?.value,
    address: addressRef?.current?.value,
    idCard: idCardRef?.current?.value,
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    () => createRequest("users/register", newProductData),
    {
      onSuccess: (data) => {
        toast.success("Account created successfully!")
        localStorage.setItem("user", JSON.stringify(data))
        queryClient.invalidateQueries(),
          setTimeout(() => {
            navigate("/auth")
          }, 1000)
      },
      onError: (data) => {
        console.log(data)
        toast.error(data.response.data.message)
      },
    }
  )

  const submitHandler = (e) => {
    e.preventDefault()
    Promise.all([
      nameSchema.validate(nameRef.current.value),
      emailSchema.validate(emailRef.current.value),
      passwordSchema.validate(passwordRef.current.value),
      phoneNumberSchema.validate(phoneRef.current.value),
      addressSchema.validate(addressRef.current.value),
      idCardSchema.validate(idCardRef.current.value),
    ])
      .then(() => {
        // Validation succeeded, proceed with form submission logic here
        mutate({
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          phoneNumber: phoneRef.current.value,
          address: addressRef.current.value,
          idCard: idCardRef.current.value,
        })
      })
      .catch((err) => {
        console.log("ERROR : ", err)
        toast.error("Please fill the form with valid values")
      })
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Product name"
            required
            onBlur={() =>
              nameSchema
                .validate(nameRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    nameError: "", // Clear the error when input is valid
                  }))
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    nameError: err.message,
                  }))
                })
            }
          />
          {errorMessage?.nameError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error: </span>{" "}
              {errorMessage?.nameError}
            </p>
          )}
        </div>
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
            onBlur={() =>
              emailSchema
                .validate(emailRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    emailError: "", // Clear the error when input is valid
                  }))
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    emailError: err.message,
                  }))
                })
            }
          />
          {errorMessage?.emailError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error: </span>{" "}
              {errorMessage?.emailError}
            </p>
          )}
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
            onBlur={() =>
              passwordSchema
                .validate(passwordRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    passwordError: "",
                  }))
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    passwordError: err.message,
                  }))
                })
            }
          />
          {errorMessage?.passwordError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error: </span>{" "}
              {errorMessage?.passwordError}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone Number
          </label>
          <input
            type="tel"
            ref={phoneRef}
            id="phoneNumber"
            placeholder=" +92 333 1234567"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onBlur={() =>
              phoneNumberSchema
                .validate(phoneRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    phoneError: "",
                  }))
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    phoneError: err.message,
                  }))
                })
            }
          />
          {errorMessage?.phoneError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error: </span>{" "}
              {errorMessage?.phoneError}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Id Card Number
          </label>
          <input
            type="text"
            ref={idCardRef}
            id="idCard"
            placeholder=" ********"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onBlur={() =>
              idCardSchema
                .validate(idCardRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    idCardError: "",
                  }))
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    idCardError: err.message,
                  }))
                })
            }
          />
          {errorMessage?.idCardError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error: </span>{" "}
              {errorMessage?.idCardError}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input
            type="text"
            ref={addressRef}
            id="address"
            placeholder=" ********"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onBlur={() =>
              addressSchema
                .validate(addressRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    addressError: "",
                  }))
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    addressError: err.message,
                  }))
                })
            }
          />
          {errorMessage?.addressError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error: </span>{" "}
              {errorMessage?.addressError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="text-white mt-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
      </form>
      <Toaster position="bottom-right" />
    </>
  )
}

export default RegisterForm
