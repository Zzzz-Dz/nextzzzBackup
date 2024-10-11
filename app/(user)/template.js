import Link from 'next/link'

export default function UserTemplate({children}){
    return(
        <>
        <div className=" grid grid-flow-col grid-cols-[1fr,60vw] h-screen overflow-clip">
        {/* 左侧图片壁纸 */}
        <div className=" bg-no-repeat bg-cover " style={{backgroundImage:`url(/YanamiWall.png)`}}></div>
        {/* 右侧登录注册 */}
        <div className="grid grid-flow-row grid-rows-[3rem,1fr] bg-gradient-to-r from-white to-blue-100 ">
            <nav className="grid grid-flow-col place-content-start content-center px-4">
                <Link className=" font-thin" href={'/'}>首页</Link>
            </nav>
            {children}
        </div>
        </div>
        </>
    )
}