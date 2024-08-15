import { useNavigate } from "react-router-dom"
import { fetchRequest } from "../utils"
import { useQuery } from "react-query"
import UserCard from "../components/UserCard"

const Profile = () => {
  const navigate = useNavigate()
  const userId = JSON.parse(localStorage.getItem("user"))

  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("login")
    navigate("/register")
  }

  const getAllItems = () => fetchRequest(`product/user/${userId?.user?.id}`)
  const { isLoading, data } = useQuery("allitems", getAllItems)

  return (
    <div className=" bg-slate-700 text-white px-6 py-20">
      <div className="relative overflow-x-auto">
        <h1 className="text-white text-center text-4xl p-4 font-bold tracking-tight leading-none">
          User Account
        </h1>
        {user ? (
          <div className="w-[380px] py-8 m-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Name
                  </th>
                  <td className="px-6 py-4">{user?.user?.name}</td>
                </tr>
                <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Email
                  </th>
                  <td className="px-6 py-4">{user?.user?.email}</td>
                </tr>
                <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Unique ID
                  </th>
                  <td className="px-6 py-4">{"098900" + user?.user?.id}</td>
                </tr>
                {/* <tr className='bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700'>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Gender
                </th>
                <td className='px-6 py-4'>{user?.user?.gender}</td>
              </tr> */}

                <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Address
                  </th>
                  <td className="px-6 py-4">{user?.user?.address}</td>
                </tr>
              </tbody>
            </table>
            <div className="m-auto w-full text-center">
              <button
                onClick={handleLogout}
                className="mt-4 border-2 w-full hover:bg-red-300  border-red-500 text-red-500 py-2 px-12 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-center font-thin text-4xl text-slate-500">
              <p>
                User not found. <br /> Please log in or register.
              </p>
            </div>
            <button
              onClick={() => navigate("/register")}
              className="mt-4 bg-blue-500 text-white p-2 rounded"
            >
              Register
            </button>
          </div>
        )}
      </div>
      {!user ? null : isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-center items-center">
          {data?.products?.map((product) => (
            <UserCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile
