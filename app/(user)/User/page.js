'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
// import { useActionState } from "react";
import { toast,ToastContainer,Slide } from 'react-toastify'
// import { signup } from '@/app/actions/auth.js'

const handleSubmit = async ({e,setState}) => {
    e.preventDefault();

    const formType = e.target.formType.value;
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const JSONdata = JSON.stringify(data);
    let formAction;
    if (formType === 'form1'){
        formAction = '/api/User/login';    
    }
    
    if (formType === 'form2'){
        formAction = '/api/User/enroll';
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch(formAction, options);
    const result = await response.json();
    setState(result);
  };

function LoginForm({set,setState}){
    return (
        <form onSubmit={ e => handleSubmit({ e:e,setState:setState})} name="login" className="flex flex-col items-center gap-4 h-full justify-center relative z-20" method="post">
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

function EnrollForm({set,setState}){
    return (
        <form onSubmit={ e => handleSubmit({ e:e,setState:setState}) } name="enroll" className="flex flex-col items-center gap-4 h-full justify-center relative z-20" method="post">
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

function IsFrom({setState}){
    const [subState, setSubState ] = useState('login')
    function handelClick(){
        setSubState(subState === 'login' ? 'enroll' : 'login')
    }
    return (
        <>
        {subState === 'login' ? <LoginForm set={handelClick} setState={setState} /> : <EnrollForm set={handelClick} setState={setState} />}
        </>
    )
}

export default function Page(){
    const [state, setState] = useState(null)
    const router = useRouter()
    useEffect(()=>{
        if(state){
            const { code, msg=null, data=null } = state;
            if (code === "502" || code === "501"){
                console.log(data)
                toast.error(msg)
            }
            if (code === "201"){
                toast.success(msg)
                setTimeout(()=>{
                    router.replace('/')
                },2000)
            }
        }
    },[state,router])
    return(
    <>
        <ToastContainer position='top-center' autoClose={1500} closeButton={false} transition={Slide} hideProgressBar={false} pauseOnHover={false} pauseOnFocusLoss={false} closeOnClick={true} newestOnTop={true} role='alert' theme='light' />
        <div className="flex justify-center items-center relative h-screen ">
            <div className=" relative rounded-2xl z-20  border-2 lg:w-2/3 h-3/4 w-[25rem]">
                <div className={`z-10 w-full h-full absolute top-0 left-0 opacity-20 bg-[url('/YanamiLoding.png')] rounded-2xl bg-cover bg-no-repeat`}></div>
                <IsFrom setState={setState} />
            </div>
        </div>  
     </>
    )
}