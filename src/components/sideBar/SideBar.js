import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggelOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`sticky  p-2 right-0 ${
        isOpen ? "w-48" : "w-16"
      } h-[100vh] bg-slate-900 ease-* duration-300 flex flex-col overflow-hidden`}
      dir="rtl"
    >
      {isOpen ? (
        <CloseIcon
          onClick={toggelOpen}
          sx={{
            fontSize: "3rem",
            cursor: "pointer",
            marginX: "auto",
            color: "white",
            marginBottom: "3.5rem",
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
            marginBottom: "3.5rem",
          }}
        />
      )}
      <div className="text-white text-base lg:text-2xl font-serif font-semibold" dir="rtl">
        <div className={`my-5 cursor-pointer flex flex-row-reverse gap-1 justify-center bg-slate-400 hover:bg-slate-500 rounded-full p-1`}>
          {isOpen && <p className="w-[75%]"> قسم المنتدبين</p>}
          <AdfScannerIcon sx={{ color: "gold" }} />
        </div>
        <div className={`my-5 cursor-pointer flex flex-row-reverse gap-1 justify-center hover:bg-slate-500 rounded-full p-1`}>
          {isOpen && <p className="w-[75%]">قسم المعلومات</p>}
          <AdfScannerIcon sx={{ color: "gold" }} />
        </div>        <div className={`my-5 cursor-pointer flex flex-row-reverse gap-1 justify-center hover:bg-slate-500 rounded-full p-1`}>
          {isOpen && <p className="w-[75%]">قسم التخطيط</p>}
          <AdfScannerIcon sx={{ color: "gold" }} />
        </div>
        <div className={`my-5 cursor-pointer flex flex-row-reverse gap-1 justify-center hover:bg-slate-500 rounded-full p-1`}>
          {isOpen && <p className="w-[75%]">قسم المتقاعدين</p>}
          <AdfScannerIcon sx={{ color: "gold" }} />
        </div>
        <div className={`my-5 cursor-pointer flex flex-row-reverse gap-1 justify-center hover:bg-slate-500 rounded-full p-1`}>
          {isOpen && <p className="w-[75%]">قسم الشئون</p>}
          <AdfScannerIcon sx={{ color: "gold" }} />
        </div>
        <div className={`my-5 cursor-pointer flex flex-row-reverse gap-1 justify-center hover:bg-slate-500 rounded-full p-1`}>
          {isOpen && <p className="w-[75%]">اضافه فاكس </p>}
          <UploadFileIcon sx={{ color: "gold" }} />
        </div>
        <div className={`my-5 cursor-pointer flex flex-row-reverse gap-1 justify-center hover:bg-slate-500 rounded-full p-1`}>
          {isOpen && <p className="w-[75%]">اضافه مستخدم </p>}
          <AccountBoxIcon sx={{ color: "gold" }} />
        </div>
        <div className={`absolute bottom-6 px-2 cursor-pointer flex flex-row-reverse gap-1 justify-center hover:bg-slate-500 rounded-full p-1`}>
          {isOpen && <p className="w-fit">تسجيل الخروج  </p>}
          <LogoutIcon sx={{ color: "red" }} />
        </div>
      </div>
      
    </div>
  );
}
