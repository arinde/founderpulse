

export default function Card({children,}: {children : React.ReactNode}){
    return(
        <div className="m-[10px] border border-yellow-50 flex flex-col bg-gray-200 rounded-xl shadow-md p-4">{children}</div>
    )
}