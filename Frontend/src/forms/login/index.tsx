import { Button, InputBase, PasswordInput } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import styles from "./index.module.css";
import { useLoginForm } from "./useLoginForm";
interface Props {
  toggleForm: () => void;
}
export function LoginForm({ toggleForm }: Props) {
  const { Login, user, SetPassword, SetEmail, LoginOnEnter, toggle, visible } =
    useLoginForm();
  return (
    <>
      <form
        className={styles.form}
        onKeyDown={async (e: React.KeyboardEvent<HTMLElement>) => {
          await LoginOnEnter(user, e);
        }}
      >
        <h1 className={styles.header}>Login</h1>
        <InputBase
          label="Login"
          leftSection={<IconAt />}
          placeholder="login"
          className={styles.pad}
          value={user?.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => SetEmail(e)}
        />
        <PasswordInput
          className={styles.pad}
          label="Password"
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => SetPassword(e)}
          value={user?.password}
          visible={visible}
          onVisibilityChange={toggle}
        />
        <div className={`text-center pointer ${styles.pad} ${styles.link}`}>
          <h4 className={`pointer ${styles.grow}`}>Forgot password?</h4>
        </div>
        <Button
          className={`${styles.submit}`}
          color="indigo"
          onClick={async () => {
            await Login(user);
          }}
        >
          Login
        </Button>
        <div className={`flex space-evenly ${styles.pad}`}>
          <h4>Don't have an account?</h4>
          <h4
            className={`pointer ${styles.grow} ${styles.link}`}
            onClick={toggleForm}
          >
            Singup
          </h4>
        </div>
      </form>
    </>
  );
}
