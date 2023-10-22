import { useState } from "react";
import { ILogin } from "../../types/user";
import { Api } from "../../helpers/api";
import { Notification } from "../../helpers/notification";

export function useLoginForm() {
  const { Request, SaveToken } = Api();
  const { Error } = Notification();
  const [user, setUser] = useState<ILogin>({ email: "", password: "" });
  async function Login(user: ILogin) {
    const respone = await Request("POST", "User/login", user);
    if (respone.ok) {
      SaveToken(await respone.json());
      return true;
    }
    Error("Error", respone.statusText);
    return false;
  }

  function SetPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const password = e.target.value;
    setUser({ email: user.email, password });
  }
  function SetEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;
    setUser({ email: email, password: user.password });
  }

  async function LoginOnEnter(
    user: ILogin,
    e: React.KeyboardEvent<HTMLElement>
  ) {
    const { key } = e;
    if (key === "Enter") {
      return await Login(user);
    }
    return false;
  }

  return { Login, user, SetPassword, SetEmail, LoginOnEnter };
}
