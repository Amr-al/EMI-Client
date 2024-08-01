import React from "react";
import Header from "../commons/Header";
import SideBar from "../sideBar/SideBar";

export default function AllFaxs() {
  return (
    <div className="flex flex-row-reverse justify-between ">
      <SideBar />
      <div className="flex flex-col border-2 border-black w-full">
        <Header />
        <table class=" text-sm text-center text-gray-500 dark:text-gray-400">
          <thead class="text-base text-gray-700 uppercase bg-gray-200 shadow-md">
            <tr>
              <th scope="col" class="px-6 py-3">
              </th>
              <th scope="col" class="px-6 py-3">
              </th>
              <th scope="col" class="px-6 py-3">
              </th>
              <th scope="col" class="px-6 py-3">
              </th>
              <th scope="col" class="px-2 py-3">
              </th>
              <th scope="col" class="px-2 py-3">
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              onClick={() => {}}
              className="bg-gray-50 hover:bg-gray-100 cursor-pointer"
              style={{ borderBottom: "1px solid" }}
            >
              {/* <th
                    scope="row"
                    class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {order.orderNumber}
                  </th> */}
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"></td>
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"></td>
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"></td>
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"></td>
              <th scope="col" class="px-2 py-3"></th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
