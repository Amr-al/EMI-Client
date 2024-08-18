import React, { useEffect } from "react";
import Header from "../commons/Header";
import SideBar from "../sideBar/SideBar";
import { Checkbox } from "@mui/material";
import UploadDoc from "../modals/UploadDoc";
import { heads } from "../utils/tabelHead";

export default function Test() {
  useEffect(()=>{
    console.log(window.location.search)
  },[])

  return (
    <>
      <div className="flex flex-row-reverse justify-between w-full ">
        <SideBar />
        <div className="mx-auto flex flex-col w-full overflow-auto">
          <Header />
          <div className="mx-auto overflow-auto mt-10 w-full px-4">
            <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
              <thead className="text-base text-white bg-slate-700 shadow-md">
                <tr>
                  {heads?.map((head, k) => {
                    return <th scope="col" className="px-4 text-sm py-3" key={k}>
                      {head}
                    </th>
                  })}
                </tr>
              </thead>
              {true &&
                <tbody>
                  <tr
                    onClick={() => { window.location.replace('/unreads') }}
                    className="bg-gray-100 hover:bg-white cursor-pointer"
                    style={{ borderBottom: "1px solid" }}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={false} disabled></Checkbox></td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={false} disabled></Checkbox> </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={false} disabled></Checkbox></td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={false} disabled></Checkbox></td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={window.localStorage.getItem('reviewed') === "true" ? false : true} color="error" disabled={window.localStorage.getItem('reviewed') === "true" ? true : false}></Checkbox></td>
                    <th scope="col" className="flex flex-col px-2 py-3">
                      {window.localStorage.getItem('sections')?.split(',').map((sec, k) => {
                        return <p key={k}>{sec}</p>
                      })}
                    </th>
                    <td><p>مركز العمليات الدائم للهيئه </p></td>
                    <td>19/8/2024</td>
                    <td>9547</td>
                  </tr>

                  <tr
                    onClick={() => { window.location.replace('/unreads') }}
                    className="bg-gray-100 hover:bg-white cursor-pointer"
                    style={{ borderBottom: "1px solid" }}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={false} disabled></Checkbox></td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={false} disabled></Checkbox> </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={false} disabled></Checkbox></td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={false} disabled></Checkbox></td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><Checkbox defaultChecked={window.localStorage.getItem('reviewed') === "true" ? false : true} color="error" disabled={window.localStorage.getItem('reviewed') === "true" ? true : false}></Checkbox></td>
                    <th scope="col" className="flex flex-col px-2 py-3">
                      {window.localStorage.getItem('sections')?.split(',').map((sec, k) => {
                        return <p key={k}>{sec}</p>
                      })}
                    </th>
                    <td><p>مركز العمليات الدائم للهيئه </p></td>
                    <td>19/8/2024</td>
                    <td>9547</td>
                  </tr>
                </tbody>
              }
            </table>
          </div>
        </div>
      </div>
      <UploadDoc />
    </>
  );
}
