import * as Yup from "yup"

export const nameSchema = Yup.string("Name must be a string")
  .required("Name is required.")
  .min(3, "Name must be at least 3 characters long.")
  .max(20, "Name must not exceed 20 characters.")

export const categorySchema = Yup.string("Category must be a string").required(
  "Category is required."
)

export const descriptionSchema = Yup.string("Description must be a string")
  .required("Description is required.")
  .min(5, "Description must be at least 5 characters long.")
  .max(50, "Description must not exceed 50 characters.")

export const priceSchema = Yup.number()
  .typeError("Price must be a valid number.")
  .positive("Price must be a positive number.")
  .required("Price is required.")

export const imageUrlSchema = Yup.string()
  .required("Url is required.")
  .matches(/^https?:\/\/.+\/.+$/, "Image url is not valid")

export const emailSchema = Yup.string()
  .email("Invalid email address.")
  .required("Email is required.")

export const phoneNumberSchema = Yup.string()
  .matches(/^[0-9]+$/, "Phone number must contain only digits.")
  .min(10, "Phone number must be at least 10 digits long.")
  .max(15, "Phone number must not exceed 15 digits.")
  .required("Phone number is required.")

export const idCardSchema = Yup.string()
  .matches(/^[0-9]+$/, "ID card must contain only digits.")
  .min(13, "ID card must be at least 13 digits long.")
  .max(13, "ID card must not exceed 13 digits.")
  .required("ID card is required.")

export const addressSchema = Yup.string()
  .min(5, "Address must be at least 5 characters long.")
  .max(100, "Address must not exceed 100 characters.")
  .required("Address is required.")

export const passwordSchema = Yup.string()
  .min(6, "Password must be at least 6 characters long.")
  .max(20, "Password must not exceed 20 characters.")
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]*$/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, and one number."
  // )
  .required("Password is required.")
