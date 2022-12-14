import React, { FC, useState, ChangeEvent, MouseEvent, useEffect } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { addjwtToken } from "../../store/reducers/UserSlice";
import { loginUser } from "../../api/todoApi";
import { ILogedUser, IUser } from "../../models/ITodo";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import s from "./Auth.module.scss";

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { login } = useAuth();
  const [errorArr, setErrorArr] = useState<any>(null);
  const [form, setForm] = useState<IUser>({
    userName: "",
    password: "",
  });
  const [checker, setChecker] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getToken = (token: string, refreshToken: string, user: ILogedUser): void => {
    login(token, refreshToken, user);
    dispatch(addjwtToken(token));
  };

  const loginHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!form.userName && !form.password) {
        return;
      }
      setChecker(true);
      await loginUser(form).then(({ data: { token, refreshToken, user } }) => getToken(token, refreshToken, user));
      setChecker(false);
    } catch (error) {
      setChecker(false);
      console.error(error);
      setErrorArr(error);
    }
    setForm({
      userName: "",
      password: "",
    });
  };

  useEffect(() => {
    setTimeout(() => setErrorArr(null), 2000);
  }, [errorArr]);

  return (
    <>
      {errorArr && <Alert msg={errorArr.response.data.msg} />}
      <div className="form-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-offset-3 col-lg-8 col-md-offset-2 ">
              <div className={s.authBlock}>
                <div className={s.authBlock__formIcon}>
                  <i className="fa fa-user-circle" />
                  <span className={s.authBlock__signup}>
                    <Link to="/register">Don't have account? SignUp</Link>
                  </span>
                </div>
                <form className={s.authForm}>
                  <h3 className={s.authForm__title}>Member Login</h3>
                  <div className={s.authForm__formGroup}>
                    <span className={s.authForm__inputIcon}>
                      <i className="fa fa-user"></i>
                    </span>
                    <input
                      className={s.authForm__formControl}
                      value={form.userName}
                      type="text"
                      placeholder="UserName"
                      onChange={handleChange}
                      name="userName"
                    />
                  </div>
                  <div className={s.authForm__formGroup}>
                    <span className={s.authForm__inputIcon}>
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      className={s.authForm__formControl}
                      value={form.password}
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      name="password"
                    />
                  </div>
                  <button className={s.authForm__btn} onClick={loginHandler} disabled={checker}>
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
