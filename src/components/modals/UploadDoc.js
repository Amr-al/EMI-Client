import { Box, CircularProgress, MenuItem, Modal, Select } from '@mui/material'
import React, { useState } from 'react'
import { getSuperDocs, uploadDoc } from '../../backendUrls';
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    p: 4,
};
export default function UploadDoc({ openUpload, setUpload }) {
    const [data, setData] = useState({ type: 'outcome' });      // set default value for doc type as outcome
    const [isUploading, setUploading] = useState();             // state for indicating if the data is processing 
    const [err, setErr] = useState();                           // state for saving errors

    let token = localStorage.getItem('auth'); // getting token from local Storage

    const handelClose = () => {
        setErr(null);           // set error with null which means there are no error
        setUploading(false);    // stop spinner 
        setUpload(false)        // close the modal
    }

    const handelSubmit = async (e) => {
        e.preventDefault();  // Prevent the normal behavior of the form
        setUploading(true);  // set the loader which means that the data is processing
        setErr(null);        // set the error with null which means there is no error

        // save the data into formData format
        const formData = new FormData();
        for (let index = 0; index < data?.files?.length; ++index)
            formData.append('files', data.files[index]);
        Object.entries(data).forEach(element => {
            formData.append(element[0], element[1])
        })
        // sending the data to server
        let res = await fetch(uploadDoc, {
            method: 'POST',
            headers: {
                authorization: token
            },
            body: formData
        })
        // if the status is sent ok then close the modal and stop the loader
        if (res.status === 200) {
           // window.location.reload();
        } else {
            // if something went wrong print the error message and stop the loader 
            // res = await res.json();
            // setUploading(false);
            setErr(res.message);
        }
    }
    return (
        <div dir="rtl">
            <Modal open={openUpload || false} sx={{ overflow: 'auto' }}>
                <Box sx={style} className="rounded-lg bg-white">
                    <form name='uploadForm' onSubmit={handelSubmit} >
                        <h1 className="font-semibold italic text-center text-lg py-1 bg-slate-700 rounded-lg text-white">
                            اضافه فاكس
                        </h1>
                        <hr></hr>
                        <div className="flex flex-col py-1" dir="rtl">
                            <label class="block mb-2 text-sm font-medium">رفع صور الفاكس</label>
                            <input required type='file' onChange={(e) => { setData({ ...data, files: e.target.files }); }} multiple className='border-2 border-gray-300 p-3' />
                        </div>
                        <div className="flex flex-col py-1" dir="rtl">
                            <label class="block mb-2 text-sm font-medium"> نوع الفاكس </label>
                            <Select displayEmpty onChange={(e) => setData({ ...data, type: e.target.value })} renderValue={() => { return data?.type === 'income' ? 'وارد' : 'صادر' }} fullWidth  >
                                <MenuItem value={"income"} dir="rtl">
                                    وارد
                                </MenuItem>
                                <MenuItem value={"outcome"} dir="rtl">
                                    صادر
                                </MenuItem>
                            </Select>
                        </div>
                        <div className="flex flex-col py-1" dir="rtl">
                            <label class="block mb-2 text-sm font-medium"> الجهه {data?.type === 'income'?"الوارد منها":"الصادر اليها"}  </label>
                            <input required type='text' onChange={(e) => setData({ ...data, from: e.target.value })} className='border-2 border-gray-300 p-3' />
                        </div>
                        <div className="flex flex-col py-1" dir="rtl">
                            <label class="block mb-2 text-sm font-medium">  الشأن  </label>
                            <input required type='text' onChange={(e) => setData({ ...data, object: e.target.value })} className='border-2 border-gray-300 p-3' />
                        </div>
                        {data?.type === 'income' && <div className="flex flex-col py-2" dir="rtl">
                            <label class="block mb-2 text-sm font-medium"> رقم القيد </label>
                            <input type='text' onChange={(e) => setData({ ...data, faxNo: e.target.value })} className='border-2 border-gray-300 p-3' />
                        </div>}
                        {err && <p className='!text-red-500 mt-2 mb-3 text-center font-bold'>{err}</p>}
                        <button
                            type="submit"
                            className="bg-blue-800 rounded-lg p-2 w-[60%] text-white mx-auto ml-16"
                            disabled={isUploading}
                            onClick={handelSubmit}
                        >
                            {isUploading ? <CircularProgress color="inherit" /> : "رفع"}
                        </button>
                    </form>
                    <button
                        type="submit"
                        className="bg-red-500 rounded-lg p-2 w-[60%] text-white mx-auto ml-16 mt-2"
                        onClick={handelClose}
                    >
                        الغاء
                    </button>
                </Box>
            </Modal>
        </div>
    )
}
