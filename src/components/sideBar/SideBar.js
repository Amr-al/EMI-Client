import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import UploadDoc from "../modals/UploadDoc";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { links } from '../utils/sideBarPermissions'
import { AccountCircle } from "@mui/icons-material";
export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);      // check if the sideBar is open or not
  const [openUpload, setUpload] = useState(false);  // check if the upload Modal is open or not
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const { selected, setSelected } = useState();

  // toggel between open and close for the sideBar
  const toggelOpen = () => {
    setIsOpen(!isOpen);
  };

  // handling logout operation
  const logout = () => {
    localStorage.removeItem('auth');
    navigate('/signin')
  }

  useEffect(() => {
    // console.log(jwtDecode(localStorage.getItem('auth')))
    setType(jwtDecode(localStorage.getItem('auth')).role);
    // console.log(window.location.search);
    console.log(window.location.pathname);
    // setSelected(window.location.pathname);
  }, [])
  return (
    <>
      <div
        className={`sticky top-0 p-2 right-0 ${isOpen ? "w-fit md:w-[17%]" : "w-20"} h-[100vh] bg-slate-900 ease-* duration-200 flex flex-col overflow-auto`}
        dir="ltr"
      >
        {isOpen ? (
          <CloseIcon
            onClick={toggelOpen}
            sx={{
              fontSize: "2.5rem",
              cursor: "pointer",
              marginX: "auto",
              color: "white",
              marginBottom: "1rem",
            }}
          ></CloseIcon>
        ) : (
          <MenuIcon
            onClick={toggelOpen}
            sx={{
              fontSize: "2.5rem",
              cursor: "pointer",
              marginX: "auto",
              color: "white",
              marginBottom: "1rem",
            }}
          />
        )}
        <div className="text-white text-sm font-serif font-bold" dir="rtl">
          {links?.map((Link, key) => {
            if (Link.permission.includes(type)) {
              return <div key={key} onClick={() => { navigate(`${Link.link}`); }} className={`my-4 cursor-pointer flex flex-row-reverse gap-1 justify-center ${selected === Link.link ? "bg-slate-400" : ""} hover:bg-slate-500 rounded-full p-1`}>
                {isOpen && <p className="w-[75%] text-base">{Link.text}</p>}
                <AdfScannerIcon sx={{ color: "gold" }} />
              </div>
            }else return null
          })}
          {(!type.toLowerCase().includes('chief')) && <div onClick={() => setUpload(true)} className={`my-5 cursor-pointer flex flex-row-reverse gap-1 justify-center hover:bg-slate-500 rounded-full p-1`}>
            {isOpen && <p className="w-[75%] text-base">اضافه فاكس </p>}
            <UploadFileIcon sx={{ color: "gold" }} />
          </div>}
          {(!type.toLowerCase().includes('chief')) && <div className={`my-5 cursor-pointer flex flex-row-reverse gap-1 justify-center hover:bg-slate-500 rounded-full p-1`}>
            {isOpen && <p className="w-[75%] text-base">اضافه معلومية </p>}
            <UploadFileIcon sx={{ color: "gold" }} />
          </div>}
          {type === 'admin' && <div onClick={() => navigate('/signup')} className={`my-5 cursor-pointer flex flex-row-reverse gap-1 justify-center hover:bg-slate-500 rounded-full p-1`}>
            {isOpen && <p className="w-[75%] text-base">اضافه مستخدم </p>}
            <AccountBoxIcon sx={{ color: "gold" }} />
          </div>}
          {type === 'admin' && <div className={`my-5 cursor-pointer flex flex-row-reverse gap-1 justify-center hover:bg-slate-500 rounded-full p-1`}>
            {isOpen && <p className="w-[75%] text-base"> المستخدمين </p>}
            <AccountCircle sx={{ color: "gold" }} />
          </div>}
          <div onClick={logout} className={`my-5 cursor-pointer flex flex-row-reverse gap-1 justify-center hover:bg-slate-500 rounded-full p-1`}>
            {isOpen && <p className="w-[75%] text-base font-bold">تسجيل الخروج  </p>}
            <LogoutIcon sx={{ color: "red" }} />
          </div>
        </div>
      </div>
      <UploadDoc openUpload={openUpload} setUpload={setUpload} />
    </>
  );
}