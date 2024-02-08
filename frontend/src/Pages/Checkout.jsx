import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
   deleteBasketAsync,
  updateBasketAsync,
} from "../features/cart/CartSlice";
import { useForm } from "react-hook-form";
import { selectLoggedUser, updateUserAsync } from "../features/auth/AuthSlice";
import { useState } from "react";
import {
  addToOrderAsync,
  selectOrderPlace,
} from "../features/order/OrderSlice";

export const Checkout = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [userPaymentMethod, setUserPaymentMethod] = useState("cash");
  const products = useSelector((state) => state.Cart.items);
  const totalAmounts = products.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = products.reduce((total, item) => item.quantity + total, 0);
  const dispatch = useDispatch();

  const handleQuantity = (e, product) => {
    dispatch(updateBasketAsync({ ...product, quantity: +e.target.value }));
  };
  const handleDeleteItems = (e, id) => {
    dispatch(deleteBasketAsync(id));
  };
  const user = useSelector(selectLoggedUser);
  const orderPlace = useSelector(selectOrderPlace);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleUserPaymentMethod = (e) => {
    // console.log(e.target.value);
    setUserPaymentMethod(e.target.value);
  };

  const handleOrder = (e) => {
    console.log(e.target.value);
    // jab user click karega is order now pe to first order place hona chaiye api me  :

    // isme or ek condition order dispatch tabhi karna jab hamare pass paymentMethod and address pada ho :

    if (userAddress && userPaymentMethod) {
      const order = {
        products,
        totalAmounts,
        totalItems,
        userAddress,
        user,
        userPaymentMethod,
        status: "pending", // order status can be delivered and recieved
      };
      dispatch(addToOrderAsync(order));
    } else {
      alert("please enter address and Payment method");
    }

  

    // ab jese hee user ne order place kiya :
    //! todo :  kuch cheeze honi chaiye :
    //! todo :  cart me se sari items remove ho jani chaiye agar user ne order place  kar diya : phir vahi items add to cart me nahi honi chaiye :
    //! todo :  user order ke success page par redirect ho jana chaiye :
    //! todo :  on server change the stock number of items
  };
  return (
    <>
      {!products.length && <Navigate to="/" replace={true}></Navigate>}
      {orderPlace && (
        <Navigate
          to={`/order-success/${orderPlace.id}`}
          replace={true}
        ></Navigate>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  -mt-5 p-6 rounded-md">
        {" "}
        <div className="grid lg:grid-cols-5 gap-x-8 gap-y-10 grid-cols-1 ">
          <div className="lg:col-span-3 rounded-md">
            <form
              className="bg-white p-6 rounded-md"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log("Personal data", data);
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [data],
                  })
                );
                setUserAddress(data);
                // reset function provided by react-hook-form when user click on button all input placeholder clean after clicking save button:
                // reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h1 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h1>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("fullname", {
                            required: "fullname is required",
                          })}
                          id="fullname"
                          // autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          // autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="phoneNo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone No
                      </label>
                      <div className="mt-2">
                        <input
                          id="phoneNo"
                          {...register("phoneNo", {
                            required: "phoneNo is required",
                          })}
                          type="tel"
                          // autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          {...register("country", {
                            required: "country is required",
                          })}
                          // autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option value="USA">USA</option>
                          <option value="Canada">Canada</option>
                          <option value="Mexico">Mexico</option>
                          <option value="India">India</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="streetAddress"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("streetAddress", {
                            required: "streetAddress is required",
                          })}
                          id="streetAddress"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("region", {
                            required: "region is required",
                          })}
                          id="region"
                          // autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Pincode
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          id="pinCode"
                          autoComplete="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One{" "}
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            value="cash"
                            checked={userPaymentMethod === "cash"}
                            onChange={handleUserPaymentMethod}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="push-everything"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash on Delivery{" "}
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            value="upi"
                            checked={userPaymentMethod === "upi"}
                            onChange={handleUserPaymentMethod}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="push-email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            UPI{" "}
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          {/* basket part */}

          <div className="lg:col-span-2">
            <div className="mx-auto max-w-7xl px-4 sm:px-0 lg:px-0 -mt-4 bg-white">
              <div className="mt-4 px-10 py-10">
                <h1 className="mb-6 text-4xl">Cart</h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {products.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.title}</a>
                              </h3>
                              <p className="ml-4">${product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm mt-5">
                            <div className="flex gap-10 items-center">
                              {" "}
                              <p className="text-gray-500">Qty </p>
                              <select
                                onChange={(e) => handleQuantity(e, product)}
                                name=""
                                id=""
                                className="rounded w-15 h-10 -ml-4 mr-4"
                                value={product.quantity}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                onClick={(e) =>
                                  handleDeleteItems(e, product.id)
                                }
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500 mb-2"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Amounts</p>
                  <p>${totalAmounts}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total items in Basket</p>
                  <p>{totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now{" "}
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/" className="text-blue-800">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
