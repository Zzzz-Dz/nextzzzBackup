"use client"

import { ReactReader } from "react-reader";
import { useState } from "react";

export default function Page({ params }){
    const { id } = params;
    const [ book_title, suffix ] = id.split('.');
    console.log(suffix)
    return (
        <div className=" w-full h-full" >
           <Read key={id} EpubId={id} book_title={book_title} />
        </div>
        )
}

function Read({EpubId: id, book_title: title}){
    const [location, setLocation] = useState(0)
    return (
        <ReactReader
                title={`败犬女主太多了 ${title}`}
                url={`/app/Novel/epub/${id} `}
                showToc={true}
                location={location}
                locationChanged={(epubcfi) => setLocation(epubcfi)}
                epubOptions={{
                    // flow: 'scrolled',  // 竖屏滑动
                    manager: 'continuous', // 填充模式
                  }}
            />
    )
}