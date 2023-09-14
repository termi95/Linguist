import {
  Box,
  Button,
  InputBase,
  PasswordInput,
  Popover,
  Progress,
  Text,
} from "@mantine/core";
import {
  IconAt,
  IconCheck,
  IconEyeCheck,
  IconEyeOff,
  IconX,
} from "@tabler/icons-react";
import { ArrowBackUp } from "tabler-icons-react";
import styles from "./index.module.css";
import { useValidatedState } from "@mantine/hooks";
import { useState } from "react";
interface Props {
  toggleForm: () => void;
}
function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}
export function RegisterForm({ toggleForm }: Props) {
  const [{ value, valid }, setEmail] = useValidatedState(
    "",
    (val) => /^\S+@\S+$/.test(val),
    true
  );
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [passowrd, setValue] = useState("");
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(passowrd)}
    />
  ));
  const strength = getStrength(passowrd);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  return (
    <>
      <form className={styles.form}>
        <h1 className={styles.header}>Register</h1>
        <InputBase
          value={value}
          error={!valid}
          label="Login"
          icon={<IconAt />}
          placeholder="login"
          className={styles.pad}
          withAsterisk
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <Box maw={340} mx="auto">
          <Popover
            opened={popoverOpened}
            position="bottom"
            width="target"
            transitionProps={{ transition: "pop" }}
          >
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
              >
                <PasswordInput
                  withAsterisk
                  label="Password"
                  placeholder="Password"
                  value={passowrd}
                  onChange={(event) => setValue(event.currentTarget.value)}
                  visibilityToggleIcon={({ reveal, size }) =>
                    reveal ? (
                      <IconEyeOff size={size} />
                    ) : (
                      <IconEyeCheck size={size} />
                    )
                  }
                  description="Password must include at least one letter, number and special character"
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress color={color} value={strength} size={8} mb="xs" />
              <PasswordRequirement
                label="Includes at least 6 characters"
                meets={passowrd.length > 7}
              />
              {checks}
            </Popover.Dropdown>
          </Popover>
        </Box>
        <PasswordInput
          className={styles.pad}
          label="Password"
          placeholder="Password"
          withAsterisk
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
          }
        />
        <Button className={`${styles.submit}`} color="indigo">
          Register
        </Button>
        <div className={`flex space-between ${styles.pad}`}>
          <h2 className={`pointer ${styles.grow}`} onClick={toggleForm}>
            <ArrowBackUp size={24} />
          </h2>
        </div>
      </form>
    </>
  );
}
