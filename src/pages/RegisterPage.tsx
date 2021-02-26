import { useRef, useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";

import { AlertMessage } from "../components/Alert";

const RegisterPage: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const [err, setErr] = useState<AlertMessage>({} as AlertMessage);

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailRef.current!.value === "" && phoneRef.current!.value === "") {
      setErr({
        alertType: "danger",
        alertMessage: "Please enter Email / Password",
      });
      return;
    }

    const username = usernameRef.current!.value;
    const password = passwordRef.current!.value;
    const email = emailRef.current!.value;
    const phone = phoneRef.current!.value;
    console.log("OK")
    axios({
      method: "post",
      url: "https://eygxmyj4p5.execute-api.us-east-1.amazonaws.com/auth",
      data: {
        username,
        password,
        email,
        phone,
        type: "register",
      },
    }).then(({ data }) => {

      if (data.status === 200) {
        setErr({
          alertMessage: "Please Confirm your Email / Phone it.",
          alertType: "success",
        });

        (e.target as HTMLFormElement).reset();
      }else{
        throw new Error("Something Went Wrong...")
      }
    }).catch(err => {
      setErr({
        alertMessage: "Something Went Wrong..."
      })
    });
  };

  return (
    <section id="login" className="my-5 row justify-content-center">
      <div className="card p-5 col-sm-12 col-md-4">
        <div className="card-body">
          <h1 className="text-center">Register</h1>
          <hr />

          {err.alertMessage && <Alert {...err} />}
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
                type="email"
                className="form-control"
                placeholder="Email"
                ref={emailRef}
              />
            </div>
            <div className="form-group row">
              <input
                type="number"
                className="form-control"
                placeholder="Phone"
                ref={phoneRef}
                minLength={10}
                maxLength={10}
              />
            </div>

            <div className="form-group row">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                ref={passwordRef}
                minLength={6}
                required
              />
            </div>

            <button
              className="btn btn-danger btn-raised float-right mt-5"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
