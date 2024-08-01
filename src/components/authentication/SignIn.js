import { Button, CircularProgress, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import React, { useState } from "react";
import { signInUrl } from "../../backendUrls";
const theme = (outerTheme) =>
  createTheme({
    direction: "rtl",
  });

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function SignIn() {
  const [name,setName] = useState();
  const [password,setPassword] = useState();
  const [check , setCheck] = useState(false);
  const [err,setErr] = useState();
  const handelSubmit = async (e)=>{
    setCheck(true);
    setErr(null);
    e.preventDefault();
    const res = await fetch(signInUrl,{
      method:'POST',
      body:JSON.stringify({name,password}),
      headers: {
        "Content-Type": "application/json",
      },
    })    
    const data =await res.json();
    if(res.ok){
      console.log(data);
    }else{
      setErr(data.message);
    }
    setCheck(false);
  }
  return (
    <div className="flex justify-between">
      <div
        style={{
          backgroundImage: `url("/uploads/1722439590554.jpg")`,
          backgroundSize: "cover",
        }}
        className="w-3/5 h-[100vh]"
      >
        <div
          className="w-full h-full"
          style={{ backgroundColor: "rgba(29, 23 ,80 , .6)" }}
        >
          <div className="relative text-center top-1/3 w-full">
            <h1 className="text-white font-mono text-3xl ">
              تسجيل الدخول للمنظومه
            </h1>
            <h2 className="text-white font-semibold text-5xl my-8">
              هيئه الاستخبارات العسكريه{" "}
            </h2>
            <h2 className="text-white font-medium text-5xl"> فرع شئون ضباط </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-2/5">
        <div className="text-center">
          <img src="/logo.png" className="w-32 mx-auto" />
          <h1 className="font-bold pt-1 font-serif text-xs">
            هيئه الاستخبارات / شئون ضباط
          </h1>
        </div>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <form className="w-full flex flex-col items-center mt-8" onSubmit={handelSubmit}>
              <TextField
                label="اسم المستخدم"
                variant="outlined"
                onChange={(e) => {setName(e.target.value)}}
                dir="rtl"
                required
                className="w-[70%] !mb-5"
              />
              <TextField
                label="الرقم السري"
                variant="outlined"
                type="password"
                dir="rtl"
                onChange={(e) => {setPassword(e.target.value)}}
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
                 {check ? <CircularProgress color="inherit" /> :" تسجيل الدخول"}
              </Button>
            </form>
          </ThemeProvider>
        </CacheProvider>
      </div>
    </div>
  );
}
