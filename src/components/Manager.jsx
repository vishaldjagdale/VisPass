import React from 'react'
import { useRef, useState, useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
        console.log(passwords)

    }
    useEffect(() => {
        getPasswords()

    }, [])

    const copyText = (text) => {
        toast('copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
        navigator.clipboard.writeText(text)
    }
    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        }
        else {

            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "password"
        }
    }
    const savePassword = async (id) => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            console.log(id)
            // setPasswordArray([...passwordArray,{...form}])


            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))

            // console.log([...passwordArray, form])


            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            setform({ site: "", username: "", password: "" })
            toast('Password Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
        else {
            toast('Error: length is less than 3')

        }
    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id ", id);
        let c = confirm("Do you want to delete your password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))

            // localStorage.setItem("passwords", JSON.stringify(passwordArray, filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id }) })

            toast('Successfully Deleted!', {
                position: 'Password Deleted',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });

        }
    }
    const editPassword = (id) => {
        console.log("Edit password with id ", id);

        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))



    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light">



            </ToastContainer>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
            <div className="p-2 md:p-0 md: mycontainer min-h-[88.5vh]">
                <h1 className='text-4x1 text font-bold text-center'> <span className='text-green-700 text-3xl'>&lt;</span>
                    <span className='text-4xl'>vis</span><span className='text-green-700 text-3xl'>Pass/&gt;</span></h1>
                <p className='text-green-800 text-lg text-center'>Your Own Password Manager</p>
                <div className=' flex flex-col p-4 text-black gap-6 items-center '>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-6 ">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />
                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={25} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-300  border border-green-700 rounded-full px-4 py-2 w-fit hover:bg-green-500'>
                        <lord-icon
                            src="https://cdn.lordicon.com/hqymfzvj.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100s'>
                                {passwordArray.map((item, index) => {

                                    return <tr key={index}>
                                        <td className='   py-2 border-white text-center '>
                                            <div className='flex items-center justify-center '>
                                                < a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover">
                                                    </lord-icon></div>
                                            </div>
                                        </td>
                                        <td className=' py-2 border-white  text-center '>
                                            <div className='flex items-center justify-center '>
                                                <span>{item.username}</span>

                                                <div className=' lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover">
                                                    </lord-icon></div>
                                            </div>
                                        </td>
                                        <td className='  justify-center py-2 border-white text-center '>
                                            <div className='flex items-center justify-center '>
                                                <span>{"*".repeat(item.password.length)}</span>

                                                <div className=' lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }} >
                                                    <lord-icon
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover">
                                                    </lord-icon></div>
                                            </div>
                                        </td>
                                        <td className=' justify-center py-2 border-white text-center ' >
                                            <span className='cursor-pointer mx-1 ' onClick={() => { editPassword(item.id) }}><lord-icon
                                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></span>

                                            <span className='cursor-pointer mx-1 ' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/drxwpfop.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon></span>



                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
