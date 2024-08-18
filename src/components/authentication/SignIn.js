import { Button, CircularProgress, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import React, { useEffect, useState } from "react";
import { signInUrl } from "../../backendUrls";
import { jwtDecode } from "jwt-decode";
import style from '../Faxs/StyleImage.module.css'
import { useNavigate } from "react-router-dom";
const theme = () =>
  createTheme({
    direction: "rtl",
  });

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export default function SignIn() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [check, setCheck] = useState(false);
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    setCheck(true); // activate the loader icon which mean the data is processing
    setErr(null);   // mark there is no error
    e.preventDefault(); // prevent the normal behavior for the form
    // sending the user data to server
    const res = await fetch(signInUrl, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json();
    // if the data is correct store the token into local storage
    if (res.ok) {
      localStorage.setItem('auth', data.token);
      if (jwtDecode(data.token).role == "admin")
        navigate('/');

      navigate('/');
    } else {
      // mark there is an error 
      setErr(data.message);
    }
    setCheck(false); // stop the loader 
  }
  useEffect(() => {
    // if the user already login replace the page
    if (localStorage.getItem('auth')) {
      navigate('/');
    }
  }, [])
  return (
    <div className="flex justify-between">
      <div
        style={{
          backgroundImage: `url("/background.jpeg")`,
          backgroundSize: "cover",
        }}
        className="w-3/5 min-h-[100vh] md:block hidden"
      >
        <div
          className={`w-full h-full`}
          style={{ backgroundColor: "rgba(29, 23 ,80 , .6)" }}
        >
          <div className="relative text-center top-1/3 w-full">
            <h1 className="text-white font-mono text-3xl ">
              تسجيل الدخول للمنظومه
            </h1>
            <h2 className="text-white font-semibold text-5xl my-8">
              هيئة الاستخبارات العسكريه{" "}
            </h2>
            <h2 className="text-white font-medium text-5xl"> فرع شئون ضباط </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full md:w-2/5">
        <div className="text-center">
          <img className={`${style.slidecaption} w-28 mx-auto`} alt="logo" src="/logo.png" />
          <h1 className="font-bold mt-6 font-serif text-xs">
            هيئة الاستخبارات / شئون ضباط
          </h1>
        </div>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <form name="signin" className="w-full flex flex-col items-center mt-8" onSubmit={handelSubmit}>
              <TextField
                label="اسم المستخدم"
                variant="outlined"
                onChange={(e) => { setName(e.target.value.trim()) }}
                dir="rtl"
                required
                className="w-[70%] !mb-5"
              />
              <TextField
                label="الرقم السري"
                variant="outlined"
                type="password"
                dir="rtl"
                onChange={(e) => { setPassword(e.target.value) }}
                required
                className="w-[70%] !mb-5"
              />
              {err && <p className="text-[#ff0000] text-base mb-5">{err}</p>}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="w-[70%] mt-10"
              >
                {check ? <CircularProgress color="inherit" /> : " تسجيل الدخول"}
              </Button>
            </form>
          </ThemeProvider>
        </CacheProvider>
      </div>
    </div>
  );
}
