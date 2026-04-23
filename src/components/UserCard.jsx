import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;

  const loggedinUser = useSelector((store) => store.user);
  console.log(
    "🚀 ~ UserCard.jsx:11 ~ UserCard ~ loggedinUser:",
    loggedinUser,
    _id,
  );
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      /* const res = */ await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <p>Skills {skills?.join(",")}</p>
        {loggedinUser?.firstName !== firstName && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserCard;
