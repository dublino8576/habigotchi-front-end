import axios from "axios";

const habigotchiServer = axios.create({
  baseURL: "https://habigotchi-server.onrender.com/api",
});

export const getAPI = () => {
  return habigotchiServer.get("/endpoints").then(({ data }) => {
    return data;
  });
};

export const getCategories = () => {
  return habigotchiServer.get("/categories").then(({ data }) => {
    return data;
  });
};

export const getAllUsernames = () => {
  return habigotchiServer.get("/users").then(({ data }) => {
    return data.allUsers;
  });
};

export const getPets = (reqBody) => {
  return habigotchiServer.post("/pets", reqBody).then(({ data }) => {
    return data;
  });
};

export const addUser = (reqBody) => {
  return habigotchiServer.post("/users", reqBody).then(({ data }) => {
    return data.addedUser[0];
  });
};

export const addPet = (reqBody) => {
  return habigotchiServer.post("/pets", reqBody).then(({ data }) => {
    return data.addedPet;
  });
};

export const updateUser = (reqBody, user_id) => {
  return habigotchiServer
    .patch(`/users/${user_id}`, reqBody)
    .then(({ data }) => {
      return data.upDatedUser[0];
    });
};

export const getHabits = (user_id) => {
  return habigotchiServer.get(`/habits/${user_id}`).then(({ data }) => {
    return data.userHabits;
  });
};

// const reqBody = {
//   user_onboarded: true,
//   habits_tracked: 2,
//   coins_earned: 40,
//   coins_spent: 20,
//   highest_streak: 2,
//   bought_apple: 2,
//   bought_ball: 10,
//   pet_id: 2,
// };

// updateUser(reqBody, 1).then((result) => {
//   console.log(result);
// });

// export const getPetByUsername = (reqBody) => {
//   const { pet_name, pet_status } = reqBody;
//   return habigotchiServer.post("/pets", reqBody).then(({ data }) => {
//     return data;
//   });
// };

// export const getAPI = (topic, sort_by, order) => {
//   const Params = !topic
//     ? { params: { sort_by, order } }
//     : { params: { topic } };

//   return habigotchiServer.get("/endpoints").then((response) => {
//     return response.data.allArticles;
//   });
// };
