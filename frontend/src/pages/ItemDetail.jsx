import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { fetchRequest } from "../utils"
import useStore from "../store/zustandStore"
import { getImageSrc } from "../utils/imageUtils"
function ItemDetail() {
  const addItemToCart = useStore((state) => state.addItemToCart)

  const navigate = useNavigate()
  const { id } = useParams()
  // const queryClient = useQueryClient();

  const getItemDetail = () => fetchRequest(`product/${id}`)
  const { isLoading, data } = useQuery("itemDetail", getItemDetail, {
    onError: () => {
      navigate("/store")
    },
  })
  console.log(data)

  const imgSrc = getImageSrc(data?.product?.image)

  // delete product
  // const { mutate } = useMutation(() => deleteRequest(`items/${id}`), {
  //   onSuccess: () => {
  //     toast.success("Product deleted successfully!");
  //     queryClient.invalidateQueries(),
  //       setTimeout(() => {
  //         navigate("/store");
  //       }, 700);
  //   },
  //   onError: () => {
  //     toast.error("An error occured while deleting a product");
  //   },
  // });

  // const deleteHandler = () => {
  //   mutate();
  // };

  return (
    <>
      {isLoading ? (
        "Loading...."
      ) : (
        <div className="flex flex-col justify-around items-center bg-white border border-gray-200  py-16 shadow sm:flex-row   dark:border-gray-700 dark:bg-gray-800 ">
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data?.product?.name}
            </h5>
            <p className=" w-96  mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio id
              eius similique natus obcaecati culpa!
            </p>
            <h3 className="text-5xl font-extrabold text-white">
              ${data?.product?.price}/-
            </h3>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-4">
              <tbody>
                <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Product id
                  </th>
                  <td className="px-6 py-4">{data?.product?.id}</td>
                </tr>
                <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Name
                  </th>
                  <td className="px-6 py-4">{data?.product?.name}</td>
                </tr>
                <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Description
                  </th>
                  <td className="px-6 py-4">{data?.product?.description}</td>
                </tr>
                <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Phone Number
                  </th>
                  <td className="px-6 py-4">{data?.product?.phoneNumber}</td>
                </tr>
                <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Address
                  </th>
                  <td className="px-6 py-4">{data?.product?.address}</td>
                </tr>
                <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    User id
                  </th>
                  <td className="px-6 py-4">{data?.product?.fk_user_id}</td>
                </tr>
                <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Condition
                  </th>
                  <td className="px-6 py-4">
                    {" "}
                    <span className="px-2 py-1 font-bold bg-gray-500 rounded-full">
                      {data?.product?.condition.toUpperCase()}
                    </span>
                  </td>
                </tr>
                <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Category
                  </th>
                  <td className="px-6 py-4">{data?.product?.category}</td>
                </tr>
                <tr className="bg-white flex justify-between border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Created at
                  </th>
                  <td className="px-6 py-4">
                    {new Date(data?.product?.createdAt).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <img
              className="object-cover w-96 rounded h-72   "
              src={imgSrc}
              alt=""
            />
            <div className="mt-8 flex flex-col items-center justify-between ">
              <div className="flex items-center justify-around w-full">
                <button
                  type="button"
                  onClick={() =>
                    (window.location.href = `tel:${data?.product?.phoneNumber}`)
                  }
                  className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 inline-flex items-center focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-telephone mr-2"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />{" "}
                  </svg>
                  Call Dealer
                </button>
                <button
                  type="button"
                  onClick={() =>
                    (window.location.href = `https://wa.me/${data?.product?.phoneNumber}`)
                  }
                  className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 inline-flex items-center focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chat mr-2"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />{" "}
                  </svg>
                  Chat with Dealer
                </button>
              </div>
              <div className="flex items-center justify-around w-full">
                <button
                  type="button"
                  onClick={() => {
                    addItemToCart({
                      id: data?.product?.id,
                      name: data?.product?.name,
                      price: data?.product?.price,
                      image: data?.product?.image,
                    })
                    toast.success("Product added to favourite list!")
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    width="16"
                    height="16"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="mr-2"
                  >
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                  </svg>
                  Add to F. list
                </button>
                <button
                  type="button"
                  onClick={() => toast.success("Product reported to admin!")}
                  className=" text-white border bg-red-600 border-red-700 hover:bg-red-800 focus:ring-4 inline-flex items-center focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500  dark:hover:text-white dark:hover:bg-red-800 dark:focus:ring-red-900"
                >
                  {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg> */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    {" "}
                    <path
                      d="M12 6C12.5523 6 13 6.44772 13 7V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V7C11 6.44772 11.4477 6 12 6Z"
                      fill="currentColor"
                    />{" "}
                    <path
                      d="M12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16Z"
                      fill="currentColor"
                    />{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
                      fill="currentColor"
                    />{" "}
                  </svg>
                  Report to admin
                </button>
              </div>
            </div>
          </div>
          <Toaster position="bottom-right" />
        </div>
      )}
    </>
  )
}

export default ItemDetail
