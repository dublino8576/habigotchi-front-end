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

export const addPet = (reqBody) => {
  return habigotchiServer.post("/pets", reqBody).then(({ data }) => {
    return data.addedPet;
  });
};


export const getPets = (username) => {
  return habigotchiServer.get(`/pets/${username}`).then(({ data }) => {
    return data;
  });
};

export const addUser = (reqBody) => {
  return habigotchiServer.post("/users", reqBody).then(({ data }) => {
    return data.addedUser[0];
  });
};

export const getAllUsernames = () => {
  return habigotchiServer.get("/users").then(({ data }) => {
    return data.allUsers;
  });
};

export const getUser = (user_id) => {
  return habigotchiServer.get(`/users/${user_id}`).then(({ data }) => {
    return data.user;
  });
};

export const addHabit = (reqBody, user_id) => {
  console.log("AXIOS HABIT BODY", reqBody);
  return habigotchiServer
    .post(`/habits/${user_id}`, reqBody)
    .then(({ data }) => {
      console.log("AXIOS CREATED HABIT");
      return data;
    });
};

export const updatePet = (reqBody, user_name) => {
  return habigotchiServer
    .patch(`/pets/${user_name}`, reqBody)
    .then(({ data }) => {
      return data.upDatedPet;
    })
    .catch((err) => {
      console.log(err, "in updatePetAxios error");
    });
};

export const getHabits = (user_id) => {
  return habigotchiServer.get(`/habits/${user_id}`).then(({ data }) => {
    return data.userHabits;
  });
};

export const deleteHabit = (habit_id) => {
  return habigotchiServer.delete(`/habits/${habit_id}`).then(({ data }) => {
    console.log("AXIOS DELETED HABIT");
  });
};

export const updateHabit = (reqBody, habit_id) => {
  console.log("AXIOS UPDATE HABIT BODY", reqBody, habit_id);
  return habigotchiServer
    .patch(`/habits/${habit_id}`, reqBody)
    .then(({ data }) => {
      console.log("AXIOS UPDATE HABIT", data.updatedHabit);
      return data.updatedHabit[0];
    })
    .catch((err) => {
      console.log("AXIOS UPDATE HABIT ERROR", err);
    });
};

export const updateUser = (reqBody, user_id) => {
  console.log("AXIOS UPDATE USER PAYLOAD", reqBody, user_id);
  return habigotchiServer
    .patch(`/users/${user_id}`, reqBody)
    .then(({ data }) => {
      console.log("AXIOS UPDATE USER SUCCESS", data.upDatedUser[0]);
      return data.upDatedUser[0];
    })
    .catch((err) => {
      console.log(err, "error in axios update user");
    });
};

export const deleteUser = (user_id) => {
  return habigotchiServer
    .delete(`/users/${user_id}`)
    .then(({ data }) => {
      return data.upDatedUser[0];
    });
};


