import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CreateItemForm from "../components/CreateItemForm"
function AddItem() {
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      navigate("/register")
    }
  }, [])

  return (
    <div className=" bg-slate-700">
      <h1 className="text-4xl py-8 text-center font-bold tracking-tight leading-none text-white">
        Add new Service
      </h1>
      <div className="w-[380px] py-8 m-auto">
        <CreateItemForm />
      </div>
    </div>
  )
}

export default AddItem
