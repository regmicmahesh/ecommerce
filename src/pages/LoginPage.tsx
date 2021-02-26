import { useRef, useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import {UserState} from "../App";
interface LoginPageProps{
  setUserInfo: React.Dispatch<React.SetStateAction<UserState>>
}

const LoginPage: React.FC<LoginPageProps> = ({setUserInfo}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [err, setErr] = useState("");

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const username = usernameRef.current!.value;
    const password = passwordRef.current!.value;

    axios({
      method: "post",
      url: "https://eygxmyj4p5.execute-api.us-east-1.amazonaws.com/auth",
      data: {
        username,
        password,
        type: "login",
      },
    }).then(res => {
      console.log(res);
      
      if(res.data.status === 200){
        const {email, username} = (res.data as any).body[0];

        setUserInfo({email, username, isLoggedIn: true});

      }else{
        throw new Error("Invalid User name or password")
      }

      //TODO: Update Upper State

    }).catch(err => {
      console.log(err);
      setErr("Something went wrong.")
    });
  };

  return (
    <section id="login" className="my-5 row justify-content-center">
      <div className="card p-5 col-sm-12 col-md-4">
        <div className="card-body">
          <h1 className="text-center">Login</h1>
          {err && <Alert alertMessage={err} />}
          <hr />
          <form onSubmit={handleClick}>
            <div className="form-group row">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                ref={usernameRef}
                required
              />
            </div>

            <div className="form-group row">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </div>

            <button
              className="btn btn-danger btn-raised float-right mt-5"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
