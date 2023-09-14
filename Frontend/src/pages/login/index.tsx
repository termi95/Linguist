import { useState } from "react";
import svg from "../../assets/undraw_learning_sketching.svg";
import { LoginForm } from "../../forms/login";
import styles from "./login.module.css";
import { RegisterForm } from "../../forms/register";

export function Login() {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  function toggleForm() {
    setIsRegisterForm((prev) => !prev);
  }
  return (
    <>
      <div className={`flex vw100 vh100 ${styles.background}`}>
        <div className="margin-auto">
          <img src={svg} alt="sketching" />
        </div>
        <div className={`${styles.center}`}>
          <h2 className={`text-center ${styles.header}`}>Lingüista</h2>
          {!isRegisterForm ? (
            <LoginForm toggleForm={toggleForm} />
          ) : (
            <RegisterForm toggleForm={toggleForm} />
          )}
        </div>
      </div>
    </>
  );
}
