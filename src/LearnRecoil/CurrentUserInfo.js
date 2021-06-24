import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentUserNameState,
  friendsInfoQuery,
  userCountryQuery,
} from "./store";

export default function CurrentUserInfo({ userID }) {
  const userName = useRecoilValue(currentUserNameState);
  const userCountry = useRecoilValue(userCountryQuery(userID));
  const friends = useRecoilValue(friendsInfoQuery);
  const setFriends = useSetRecoilState(friendsInfoQuery)
  console.log(1, friends);
  return (
    <>
      <div onClick={() => setFriends()}>{userName}</div>
      <div>{userCountry}</div>
    </>
  );
}
