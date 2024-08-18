import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import React, { useEffect, useState } from "react";
import { signUpUrl } from "../../backendUrls";
import style from '../Faxs/StyleImage.module.css'
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const theme = () =>
  createTheme({
    direction: "rtl",
  });

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function SignUp() {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [isSucess, setSucess] = useState(false);
  const [err, setErr] = useState();
  const [data, setData] = useState({});

  const token = localStorage.getItem('auth'); // getting the token from the local storage

  const handelSubmit = async (e) => {
    // setCheck(true);      // activate the loader which means that the data is processing
    setErr(null);        // make error equal to null value which means there is no errors
    e.preventDefault();  // prevent the normal behvior of the form
    const formData = new FormData();
    console.log(data)
    Object.entries(data).forEach(element => {
      formData.append(element[0], element[1])
    })
    // sending the new user data to server
    const res = await fetch(signUpUrl, {
      method: 'POST',
      body: formData,
      headers: {
        authorization: token
      },
    })
    const result = await res.json();
    // if there is no errors save the user data into local storage
    if (res.ok) {
      setSucess(true);
      // replace the current page after 2s
      setTimeout(() => {
        navigate(-1)
      }, 2000)

    } else {
      setErr(result.message);
    }
    setCheck(false);
  }
  useEffect(() => {
    if (jwtDecode(token).role !== 'admin') navigate(-1);
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
          className="w-full h-full"
          style={{ backgroundColor: "rgba(29, 23 ,80 , .6)" }}
        >
          <div className="relative text-center top-1/3 w-full">
            <h1 className="text-white font-mono text-3xl ">
              تسجيل مستخدم للمنظومه
            </h1>
            <h2 className="text-white font-semibold text-5xl my-8">
              هيئه الاستخبارات العسكريه
            </h2>
            <h2 className="text-white font-medium text-5xl"> فرع شئون ضباط </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full md:w-2/5">
        <div className="text-center">
          <img alt="logo" src="/logo.png" className={`${style.slidecaption} w-24 mx-auto `} />
          <h1 className="font-bold mt-6 font-serif text-xs">
            هيئه الاستخبارات / شئون ضباط
          </h1>
        </div>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <form className="w-full flex flex-col items-center mt-8" onSubmit={handelSubmit}>
              <TextField
                label="اسم المستخدم"
                variant="outlined"
                onChange={(e) => { setData({ ...data, name: e.target.value }) }}
                dir="rtl"
                required
                className="w-[70%] !mb-5"
              />
              <select onChange={(e) => { setData({ ...data, role: e.target.value }); }} className="w-[70%] !focus:border-blue-400 border-2 p-4" dir="rtl" >
                <option className="font-semibold" selected disabled>نوع الحساب</option>
                <option className="hover:bg-gray-300 font-semibold " value={"admin"}> ادمن </option>
                <option className="hover:bg-gray-300 font-semibold " value={"chief"}> رئيس الفرع </option>
                <option className="hover:bg-gray-300 font-semibold " value={"montChief"}> رئيس المعلومات </option>
                <option className="hover:bg-gray-300 font-semibold " value={"infoChief"}> رئيس المنتدبين </option>
                <option className="hover:bg-gray-300 font-semibold " value={"planChief"}> رئيس التخطيط </option>
                <option className="hover:bg-gray-300 font-semibold " value={"montadaben"} > منتدبين</option>
                <option className="hover:bg-gray-300 font-semibold " value={"info"}> معلومات </option>
                <option className="hover:bg-gray-300 font-semibold " value={"planing"}> تخطيط </option>
                <option className="hover:bg-gray-300 font-semibold " value={"retired"}> متقاعدين </option>
                <option className="hover:bg-gray-300 font-semibold " value={"affairs"}> شئون شخصيه</option>
                <option className="hover:bg-gray-300 font-semibold " value={"sec"}> سكرتاريه </option>
              </select>
              <TextField
                variant="outlined"
                type="file"
                label="صورة المستخدم"
                onChange={(e) => { setData({ ...data, file: e.target.files[0] }); console.log(e.target.files[0]) }}
                
                className="w-[70%] !my-5"
              />
              <TextField
                label="الرقم السري"
                variant="outlined"
                type="password"
                dir="rtl"
                onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                required
                className="w-[70%] !mb-5"
              />
              <TextField label="تأكيد الرقم السري" variant="outlined" type="password" dir="rtl" onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} required className="w-[70%] !mb-5" />
              {err && <p className="text-[#ff0000] text-base mb-5">{err}</p>}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="w-[70%] mt-10"
              >
                {check ? <CircularProgress color="inherit" /> : " تسجيل الدخول"}
              </Button>
              <div onClick={() => { navigate(-1) }}>
                <ArrowBack className="mt-2 cursor-pointer" />
              </div>
            </form>
          </ThemeProvider>
        </CacheProvider>
      </div>
      <div className={`fixed bottom-0 left-1 w-80 ${isSucess ? "block" : "hidden"}`}>
        <Alert variant="filled">
          <p className="pr-2 pt-[-4px] text-xl text-center"> تمت اضافه المستخدم بنجاح</p>
        </Alert>
      </div>
    </div>
  );
}
