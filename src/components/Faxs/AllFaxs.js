import React, { useEffect, useState } from "react";
import Header from "../commons/Header";
import SideBar from "../sideBar/SideBar";
import { Checkbox } from "@mui/material";
import UploadDoc from "../modals/UploadDoc";
import { getNotSeenDocs, updateProfile } from "../../backendUrls";
import { useNavigate } from "react-router-dom";
import { heads } from '../utils/tabelHead'
import { jwtDecode } from "jwt-decode";

export default function AllFaxs() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const test = async () => {
    const token = localStorage.getItem('auth');
    let res = await fetch(getNotSeenDocs, {
      method: 'GET',
      headers: {
        authorization: token,
        role: jwtDecode(token).role
      }
    });

    // const res2 = await fetch(updateProfile, {
    //   method: 'PATCH',
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     password: "123",
    //     confirmPassword: "123",
    //     name: "test",
    //     role: "admin"
    //   }),
    // })
    if (res.ok) {
      res = await res.json();
      setData(res);
    }
  }
  useEffect(() => {
    test();
  }, [])
  return (
    <>
      <div className="flex flex-row-reverse justify-between w-full ">
        <SideBar />
        <div className="w-[85%] mx-auto flex flex-col w-full overflow-auto">
          <Header />
          <div className="mx-auto overflow-auto mt-10 w-full px-4">
            <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
              <thead className="text-base text-white bg-slate-700 shadow-md">
                <tr>
                  {heads.map((head, k) => {
                    return <th key={k} scope="col" className="px-4 text-sm py-3">
                      {head}
                    </th>
                  })}
                </tr>
              </thead>
              <tbody>
                {data?.map((doc, key) => {
                  return <tr
                    key={key}
                    onClick={() => { navigate(`/unreads/${doc._id}`) }}
                    className="hover:bg-white cursor-pointer bg-gray-100 border-b-[1px] border-gray-400 "
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={false} disabled></Checkbox></td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={false} disabled></Checkbox> </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={false} disabled></Checkbox></td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={false} disabled></Checkbox></td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={doc.chief ? true : false} color="error" disabled={data.reviewed ? false : true}></Checkbox></td>
                    <th scope="col" className="flex flex-col px-2 py-3">
                      {doc.sections?.map((sec, k) => {
                        return <p key={k}>{sec}</p>
                      })}
                    </th>
                    <td>
                      <p className="font-semibold">{doc.from} </p>
                    </td>
                    <td>13/11/2024</td>
                    <td>5621</td>
                  </tr>
                })}

              </tbody>
            </table>
            {/* <RemoveRedEye />
            <Lock /> */}
          </div>
        </div>
      </div>
      <UploadDoc />
    </>
  );
}
