'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState,useContext } from "react";
// import { UserDispatchContext } from '/src/globalContext.js'
import { toast,ToastContainer,Slide } from 'react-toastify'

function LoginForm({set}){
    return (
        <form action='' name="login" className="flex flex-col items-center gap-4 h-full justify-center relative z-20" method="post">
            <input type="hidden" name="formType" value="form1" />
            <label className="tracking-widest"><span className="px-2">账户</span><input type="text" className="form-input rounded-md py-1" name="username"></input></label>
            <label className="tracking-widest"><span className="px-2">密码</span><input type="text" className='form-input rounded-md py-1' name="password"></input></label>
            <div className="flex gap-4">
                <button type="submit">提交</button>
                <button onClick={(e)=>{e.preventDefault();set()}}>注册</button>
            </div>
        </form>
    )
}

function EnrollForm({set}){
    return (
        <form action='' name="enroll" className="flex flex-col items-center gap-4 h-full justify-center relative z-20" method="post">
            <input type="hidden" name="formType" value="form2" />
            <label className="tracking-widest"><span className="px-2">账户</span><input type="text" className='form-input rounded-md py-1' name="username"></input></label>
            <label className="tracking-widest"><span className="px-2">密码</span><input type="text" className='form-input rounded-md py-1' name="password"></input></label>
            <div className="flex gap-4">
                <button type="submit">提交</button>
                <button onClick={(e)=>{e.preventDefault();set()}}>返回</button>
            </div>
        </form>
    )
}

function IsFrom(){
    const [state, setState ] = useState('login')
    function handelClick(){
        setState(state === 'login' ? 'enroll' : 'login')
    }
    return (
        <>
        {state === 'login' ? <LoginForm set={handelClick} /> : <EnrollForm set={handelClick} />}
        </>
    )
}

export default function Page(){
    // const stateDispatch = useContext(UserDispatchContext)
    const router = useRouter()
    useEffect(()=>{
        const actionData = null;
        if(actionData){
            console.log(actionData)
            const { code ,msg=null ,data=null } = actionData;
            if (code === "500"){
                toast.error('服务器未响应')
            }
            if (code === "502" || code === "501"){
                console.log(msg)
                toast.error(data)
            }
            if (code === "201"){
                toast.success('登录成功')
                setTimeout(()=>{
                    localStorage.setItem('token',data);
                    // stateDispatch({type:'islogined'})
                    router.replace('/')
                },2000)
            }
        }
    },[])
    return(
    <>
        <ToastContainer position='top-center' autoClose={1500} closeButton={false} transition={Slide} hideProgressBar={false} pauseOnHover={false} pauseOnFocusLoss={false} closeOnClick={true} newestOnTop={true} role='alert' theme='light' />
        <div className="flex justify-center items-center relative h-screen ">
            <div className=" relative rounded-2xl z-20  border-2 lg:w-2/3 h-3/4 w-[25rem]">
                <div className={`z-10 w-full h-full absolute top-0 left-0 opacity-20 bg-[url('/YanamiLoding.png')] rounded-2xl bg-cover bg-no-repeat`}></div>
                <IsFrom />
            </div>
        </div>  
     </>
    )
}