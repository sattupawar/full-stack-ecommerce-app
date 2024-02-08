import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../../auth/AuthSlice";
import { selectUserOrders } from "../UserSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedUser);

  return (
    <div>
      <h1 className="text-4xl mt-10 mb-10 font-bold justify-center flex ">
        My Profile :{" "}
        <p className="text-gray-700 text-base mt-3 ml-2">
          Email : {user.email}
        </p>
      </h1>

      <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Address Details</div>
          {user.addresses &&
            user.addresses.map((e) => (
              <div key={e}>
                <p className="text-gray-700 text-base">
                  Full Name: {e.fullname}
                </p>
                <p className="text-gray-700 text-base">Email: {e.email}</p>
                <p className="text-gray-700 text-base">
                  Phone Number: {e.phoneNo}
                </p>
                <p className="text-gray-700 u-base">Country: {e.country}</p>
                <p className="text-gray-700 text-base">
                  Street Address: {e.streetAddress}
                </p>
                <p className="text-gray-700 text-base">City: {e.city}</p>
                <p className="text-gray-700 text-base">Region: {e.region}</p>
                <p className="text-gray-700 text-base">Pin Code: {e.pinCode}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
