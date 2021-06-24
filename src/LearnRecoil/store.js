import {
  atom,
  DefaultValue,
  selector,
  selectorFamily,
  waitForNone,
} from "recoil";
import {
  getCurrentUserAge,
  getCurrentUserCountry,
  getUserInfo,
  tableOfUsers,
} from "./state";

export const todoListState = atom({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

export const currentUserIDState = atom({
  key: "CurrentUserID",
  default: 0,
});

export const currentUserNameState = selector({
  key: "CurrentUserNameState",
  get: ({ get }) => {
    return tableOfUsers[get(currentUserIDState)].name;
  },
});

export const currentUserNameQuery = selector({
  key: "CurrentUserName",
  get: async ({ get }) => {
    const response = await getCurrentUserAge(get(currentUserIDState));
    if (response.error) {
      throw response.error;
    }
    return response.age;
  },
});

export const userCountryQuery = selectorFamily({
  key: "UserCountry",
  get: (userID) => async () => {
    const response = await getCurrentUserCountry(userID);
    if (response.error) {
      throw response.error;
    }
    return response.country;
  },
});

export const userInfoQuery = selectorFamily({
  key: "UserInfoQuery",
  get: (userID) => async () => {
    console.log("UserInfoQuery", userID);
    const response = await getUserInfo(userID);
    if (response?.error) {
      throw response.error;
    }
    return response;
  },
});

export const currentUserInfoQuery = selector({
  key: "CurrentUserInfoQuery",
  get: ({ get }) => {
    console.log("1", get(userInfoQuery(get(currentUserIDState))));
    return get(userInfoQuery(get(currentUserIDState)));
  },
});

export const friendsInfoQuery = selector({
  key: "FriendsInfoQuery",
  get: ({ get }) => {
    const { friendList } = get(currentUserInfoQuery);
    console.log("friendList", friendList);
    const friends = get(
      waitForNone(friendList.map((friendID) => userInfoQuery(friendID)))
    );
    return friends;
  },
});
