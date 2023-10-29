import { Api } from "../../helpers/api";
import { Notification } from "../../helpers/notification";
import { notificationColor, Status } from "../../types/helper";
import { IRegister } from "../../types/user";

export function UseRegisterForm() {
  const { Request } = Api();
  const { Update, Loading } = Notification();
  async function Register(user: IRegister) {
    Loading("Register", "Register", "Register is procesing.");
    const respone = await Request<IRegister>("POST", "User/register", user);
    if (respone.ok) {
      Update(
        "Register",
        Status.Success,
        "Registered successfully.",
        notificationColor.Success,
        2000
      );
      return true;
    }
    Update(
      "Register",
      Status.Error,
      await respone.text(),
      notificationColor.Error,
      false
    );
    return false;
  }
  async function RegisterOnEnter(
    user: IRegister,
    e: React.KeyboardEvent<HTMLElement>
  ) {
    const { key } = e;
    console.log(key);
    if (key === "Enter") {
      return await Register(user);
    }
    return false;
  }
  return { Register, RegisterOnEnter };
}
