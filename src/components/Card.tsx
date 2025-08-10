

export default function Card({children,}: {children : React.ReactNode}){
    return(
        <div className="m-[10px] border border-yellow-50 bg-white flex flex-col dark:bg-gray-800 rounded-xl shadow-md p-4">{children}</div>
    )
}