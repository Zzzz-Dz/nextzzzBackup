import { novel_data } from '../../plugins/novel';
import Link from 'next/link'

export default function Lyaout({children}){
    return (
        <div className="grid grid-flow-col grid-cols-1 md:grid-cols-[10rem,1fr] relative">
            {/* 左侧 */}
            <div className='body-left hidden md:flex absolute h-full flex-col border-t-2 border-r-2 rounded-r-xl text-black border-gray-300 gap-y-1 bg-amber-50 -translate-x-24 group hover:translate-x-0 transition duration-500 ease-in-out'>
                {novel_data.map((data) => {return <Link href={data.url} key={data.id} relative="path" className='py-4 px-4 text-transparent group-hover:text-inherit hover:bg-white w-full text-center'>{data.title}</Link>} ) }
            </div>
            {/* 操作小说 */}
            <div className='hidden md:flex flex-col w-32 justify-end gap-4 p-4 bg-gray-200 text-center border-t-2 border-gray-300'>  
                <p>喜欢</p>
                <p>收藏</p>
                <p>分享</p>
            </div>
            {/* 右侧 */}
            <div className='body-right overflow-auto p-4 w-auto'>
                {children}
            </div>
        </div>
    )
}