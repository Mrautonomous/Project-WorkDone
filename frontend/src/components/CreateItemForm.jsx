import { useRef, useState } from "react"
import {
  nameSchema,
  priceSchema,
  imageUrlSchema,
  descriptionSchema,
  phoneNumberSchema,
  addressSchema,
  categorySchema,
} from "../constant/inputValidation"
import toast, { Toaster } from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import { createRequest } from "../utils"
import { useNavigate } from "react-router-dom"

function CreateItemForm() {
  //  name, price,image,title,description,address,category,phoneNumber,fk_user_id,category,
  const userId = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState({
    nameError: "",
    priceError: "",
    imageUrlError: "",
    descriptionError: "",
    addressError: "",
    phoneNumberError: "",
    category: "",
  })

  const nameRef = useRef(null)
  const priceRef = useRef(null)
  const imageUrlRef = useRef(null)
  const descriptionRef = useRef(null)
  const addressRef = useRef(null)
  const phoneNumberRef = useRef(null)
  const categoryRef = useRef(null)

  const newProductData = {
    name: nameRef?.current?.value,
    price: priceRef?.current?.value,
    image: imageUrlRef?.current?.value,
    description: descriptionRef?.current?.value,
    address: addressRef?.current?.value,
    phoneNumber: phoneNumberRef?.current?.value,
    category: categoryRef?.current?.value,
    fk_user_id: userId?.user?.id,
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    () => createRequest("product/create", newProductData),
    {
      onSuccess: () => {
        toast.success("Product created successfully!")
        queryClient.invalidateQueries(),
          setTimeout(() => {
            navigate("/store")
          }, 1000)
      },
      onError: (error) => {
        console.log(error)
        toast.error("An error occured while adding a product")
      },
    }
  )

  const submitHandler = (e) => {
    e.preventDefault()
    Promise.all([
      nameSchema.validate(nameRef.current.value),
      priceSchema.validate(priceRef.current.value),
      imageUrlSchema.validate(imageUrlRef.current.value),
      descriptionSchema.validate(descriptionRef.current.value),
      addressSchema.validate(addressRef.current.value),
      phoneNumberSchema.validate(phoneNumberRef.current.value),
      categorySchema.validate(categoryRef.current.value),
    ])
      .then(() => {
        // Validation succeeded, proceed with form submission logic here
        mutate({
          name: nameRef.current.value,
          price: priceRef.current.value,
          image: imageUrlRef.current.value,
          description: descriptionRef?.current?.value,
          address: addressRef?.current?.value,
          phoneNumber: phoneNumberRef?.current?.value,
          category: categoryRef?.current?.value,
          fk_user_id: userId?.user?.id,
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
        {/* Name */}
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
            placeholder="Service name"
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
        {/* Price */}
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            ref={priceRef}
            placeholder="$99.00"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onBlur={() =>
              priceSchema
                .validate(priceRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    priceError: "", // Clear the error when input is valid
                  }))
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    priceError: err.message,
                  }))
                })
            }
          />
          {errorMessage?.priceError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error: </span>{" "}
              {errorMessage?.priceError}
            </p>
          )}
        </div>
        {/* Image */}
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image
          </label>
          <input
            type="url"
            ref={imageUrlRef}
            id="image"
            placeholder=" image url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onBlur={() =>
              imageUrlSchema
                .validate(imageUrlRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    imageUrlError: "",
                  }))
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    imageUrlError: err.message,
                  }))
                })
            }
          />
          {errorMessage?.imageUrlError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error: </span>{" "}
              {errorMessage?.imageUrlError}
            </p>
          )}
        </div>
        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="Description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            ref={descriptionRef}
            id="Description"
            placeholder="Enter Description..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onBlur={() =>
              descriptionSchema
                .validate(descriptionRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    descriptionError: "",
                  }))
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    descriptionError: err.message,
                  }))
                })
            }
          />
          {errorMessage?.descriptionError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error: </span>{" "}
              {errorMessage?.descriptionError}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="mb-6">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input
            type="text"
            ref={addressRef}
            id="address"
            placeholder="Enter address..."
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

        {/* Phone Number */}
        <div className="mb-6">
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone Number
          </label>
          <input
            type="tel"
            ref={phoneNumberRef}
            id="phoneNumber"
            placeholder="Enter phone number..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onBlur={() =>
              phoneNumberSchema
                .validate(phoneNumberRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    phoneNumberError: "",
                  }))
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    phoneNumberError: err.message,
                  }))
                })
            }
          />
          {errorMessage?.phoneNumberError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error: </span>{" "}
              {errorMessage?.phoneNumberError}
            </p>
          )}
        </div>

        {/* Condition */}
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <select
            id="category"
            ref={categoryRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onBlur={() =>
              categorySchema
                .validate(categoryRef.current.value)
                .then(() => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    categoryError: "",
                  }))
                })
                .catch((err) => {
                  setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    categoryError: err.message,
                  }))
                })
            }
          >
            <option value="" disabled>
              Select category...
            </option>
            <option value="plumber">Plumber</option>
            <option value="electrician">Electrician</option>
            <option value="carpenter">Carpenter</option>
            <option value="painter">Painter</option>
            <option value="gardener">Gardener</option>
            <option value="cleaner">Cleaner</option>
            <option value="hvacTechnician">HVAC Technician</option>
            <option value="locksmith">Locksmith</option>
            <option value="handyman">Handyman</option>
          </select>
          {errorMessage?.categoryError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Error: </span>{" "}
              {errorMessage?.categoryError}
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

export default CreateItemForm
