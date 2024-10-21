import { createUser } from "../repositories/userRepository";

export const signupUserService = async (user) => {
  const newUser = await createUser(user);
  return newUser;
};
