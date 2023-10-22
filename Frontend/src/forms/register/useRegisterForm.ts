import { Api } from "../../helpers/api";
import { Notification } from "../../helpers/notification";
import { IRegister } from "../../types/user";

export function UseRegisterForm() {
  const { Request } = Api();
  const { Error, Success } = Notification();
  async function Register(user: IRegister) {
    const respone = await Request<IRegister>("POST", "User/register", user);
    if (respone.ok) {
      Success(undefined, "Registered successfully.");
      return true;
    }
    Error(undefined, await respone.text());
    return false;
  }
  async function RegisterOnEnter(user: IRegister, e: React.KeyboardEvent<HTMLElement>) {
    const { key } = e;
    if (key === "Enter") {
      return await Register(user);
    }
    return false;
  }
  return { Register, RegisterOnEnter };
}
