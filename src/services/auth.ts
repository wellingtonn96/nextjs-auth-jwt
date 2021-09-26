import { uuid } from "uuidv4";

type SignInRequestData = {
  email: string;
  passowrd: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export const signInRequest = async ({ email, passowrd }: SignInRequestData) => {
  await delay();

  return {
    token: uuid(),
    user: {
      name: "Wellington",
      email: "wellington@gmail.com",
      avatar_url: "https://avatars.githubusercontent.com/u/36265952?v=4",
    },
  };
};

export const recoverUserInformation = async () => {
  await delay();

  return {
    user: {
      name: "Wellington",
      email: "wellington@gmail.com",
      avatar_url: "https://avatars.githubusercontent.com/u/36265952?v=4",
    },
  };
};
