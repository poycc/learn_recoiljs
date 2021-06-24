export const tableOfUsers = [
  {
    name: "recoil0",
    age: 18,
    country: "China",
    error: false,
    friendList: [1, 2],
  },
  {
    name: "recoil2",
    age: 28,
    country: "UA",
    error: false,
  },
  {
    name: "recoil3",
    age: 22,
    country: "UK",
    error: false,
  },
];

export const getCurrentUserAge = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tableOfUsers[userId]);
    }, 100);
  });
};

export const getCurrentUserCountry = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tableOfUsers[userId]);
    }, 200);
  });
};

export const getUserInfo = (userId) => {
  console.log("getUserInfo", userId);
  console.log(tableOfUsers[userId]);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tableOfUsers[userId]);
    }, 1000);
  });
};
