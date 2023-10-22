import { notifications } from "@mantine/notifications";
export function Notification() {
  function Success(title: string = "Success", message: string) {
    notifications.show({
      withCloseButton: true,
      autoClose: 2000,
      title,
      message,
      color: "teal",
      loading: false,
    });
  }
  function Error(title: string = "Error", message: string) {
    console.log(title);
    notifications.show({
      withCloseButton: true,
      title,
      message,
      color: "red",
      loading: false,
    });
  }
  function Info(title: string = "Info", message: string) {
    notifications.show({
      autoClose: 2000,
      withCloseButton: true,
      title,
      message,
      loading: false,
    });
  }
  function Loading(title: string = "Loading", message: string) {
    return notifications.show({
      autoClose: 2000,
      withCloseButton: true,
      title,
      message,
      loading: false,
    });
  }

  function Update(
    id: string,
    title: string = "Loading",
    message: string,
    color: "teal" | "red" | undefined
  ) {
    return notifications.update({
      id,
      autoClose: 2000,
      withCloseButton: true,
      title,
      message,
      color: color,
      loading: false,
    });
  }
  return { Success, Error, Info, Loading, Update };
}
