import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addSentRequests /* removeSentRequest */,
} from "../utils/sentRequestSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SentRequests = () => {
  const sentRequests = useSelector((store) => store.sentRequest);
  const dispatch = useDispatch();

  const fetchSentRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/sentRequests", {
        withCredentials: true,
      });
      console.log("res", res);
      dispatch(addSentRequests(res.data));
    } catch (err) {
      console.log("ERROR in Sent Requests", err);
    }
  };

  // const handleSendRequest = async (status, userId) => {
  //   try {
  //     /* const res = */ await axios.post(
  //       BASE_URL + "/request/send/" + status + "/" + userId,
  //       {},
  //       { withCredentials: true },
  //     );
  //     dispatch(removeSentRequest(userId));
  //   } catch (err) {
  //     throw new Error(err.message);
  //   }
  // };

  useEffect(() => {
    fetchSentRequests();
  }, []);

  if (!sentRequests) return;

  if (sentRequests.length === 0)
    return (
      <div className="flex flex-col items-center justify-center my-10">
        <div className="block">
          <h1 className="flex justify-center">No Sent Requests</h1>
        </div>
        <div className="flex p-2 w-auto border-1 text-center my-5 bg-secondary">
          <Link to="/" className="font-bold">
            Go To Feed
          </Link>
        </div>
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">Sent Requests</h1>
      {sentRequests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.toUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 w-[60vw] rounded-lg bg-base-300  mx-auto"
          >
            <div className="flex">
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
              </div>
            </div>

            {/* 
            //Pending BE
            <div>
              <button
                className="btn btn-warning w-auto"
                onClick={() => handleSendRequest("ignored", _id)}
              >
                Revoke Request
              </button>
            </div> */}
          </div>
        );
      })}
    </div>
  );
};
export default SentRequests;
