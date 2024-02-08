import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../auth/AuthSlice";
import { fetchLoggedInUsersOrdersAsync, selectUserOrders } from "../UserSlice";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedUser);
  const UserOrders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUsersOrdersAsync(user.id));
  }, []);
  return (
    <div>
      <h1 className="text-4xl mb-10 font-bold justify-center flex ">
        My Orders
      </h1>
      {UserOrders.map((e) => (
        <div key={e.id}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-4 bg-white">
            <div className="mt-4 px-10 py-10">
              <h1 className="mb-6 text-4xl">order #{e.id}</h1>
              <h3 className="mb-6 text-2xl text-red-900">
                order status : {e.status}
              </h3>

              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {e.products.map((product) => (
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
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex gap-10 items-center">
                            {" "}
                            <p className="text-gray-500">
                              Qty : {product.quantity}
                            </p>
                          </div>

                          <div className="flex"></div>
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
                <p>${e.totalAmounts}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total items in Basket</p>
                <p>{e.totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
          </div>{" "}
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
