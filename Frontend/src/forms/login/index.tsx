import { Button, InputBase, PasswordInput } from "@mantine/core";
import { IconAt, IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import styles from "./index.module.css";
interface Props {
  toggleForm: () => void;
}
export function LoginForm({ toggleForm }: Props) {
  return (
    <>
      <form className={styles.form}>
        <h1 className={styles.header}>Login</h1>
        <InputBase
          label="Login"
          icon={<IconAt />}
          placeholder="login"
          className={styles.pad}
        />
        <PasswordInput
          className={styles.pad}
          label="Password"
          placeholder="Password"
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
          }
        />
        <Button className={`${styles.submit}`} color="indigo">
          Login
        </Button>
        <div className={`flex space-between ${styles.pad}`}>
          <h2 className={`pointer ${styles.grow}`} onClick={toggleForm}>
            Register
          </h2>
          <h2 className={`pointer ${styles.grow}`}>Forgot password</h2>
        </div>
      </form>
    </>
  );
}
