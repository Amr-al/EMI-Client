import { Box, Checkbox, FormControlLabel, Modal } from '@mui/material'
import React from 'react'
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    p: 4,
  };
export default function Temp() {
  return (
    <div dir="rtl">
      <Modal open={false} >
        <Box sx={style} className="rounded-xl bg-white border-none">
          <form >
            <h1 className="font-semibold italic text-center text-lg py-2 bg-slate-600 rounded-lg text-white">
               عرض الطلب
            </h1>
            <hr></hr>
            <div className="flex flex-col py-2" dir="rtl">
              <label class="block mb-2 text-sm font-medium">اسم العميل</label>
              <input
                type="text"
                class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5  "
              />
            </div>
            <div className="flex flex-col py-2" dir="rtl">
              <label class="block mb-2 text-sm font-medium">العنوان</label>
              <input
                type="text"
                class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5  "
              />
            </div>
            <div className="flex flex-col py-2" dir="rtl">
              <label class="block mb-2 text-sm font-medium">الحساب</label>
              <input
                type="number"
                class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5  "
              />
            </div>
            <div className="flex flex-col py-2" dir="rtl">
              <label class="block mb-2 text-sm font-medium">
              </label>
              <textarea
                class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 "
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => {
                    }}
                  />
                }
                label="تم الدفع..؟"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 rounded-lg p-2 w-[60%] text-white mx-auto ml-16"
            >
              تعديل
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
