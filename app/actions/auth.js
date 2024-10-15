"use client"

export async function signup(previousState, formData){
    const formType = formData.get('formType');
    const username = formData.get('username');
    const password = formData.get('password');
    
    if (formType === 'form1'){
        const result = await fetch('/api/User/login',{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username,password})})
        return await result.json()
    }
    if (formType === 'form2'){
        const result = await fetch('/api/User/enroll',{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username,password})})
        return await result.json()
    }
}