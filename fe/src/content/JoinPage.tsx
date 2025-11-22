
import { useZustStore } from "./store";
import {CrossIcon} from "../icons/cross"
export default function JoinPage(){
    const val = useZustStore((state:any)=> state.play)
    const close = useZustStore((state:any)=> state.resetPlay)
return(
    <>
        {val && <div className=" bg-[#01060a] text-amber-50 h-screen w-screen fixed flex items-center justify-center z-100">
            <div className='border border-solid h-fit w-[500px] rounded-lg p-6 flex flex-col gap-2 '> 
                <CrossIcon/>
                <span className="text-3xl text-center mb-3 "> <b> Join Room </b>   </span>
                    <span className="text-cyan-50">Enter the code </span>
                    <input className=" p-1 pl-2 bg-gray-900 mb-3 focus:outline-none 
         focus:ring-2 
         focus:ring-cyan-800 
         focus:border-cyan-800 
         focus-visible:outline-none  rounded-md" placeholder="enter the title"/>
                    <button className=" bg-sky-950 w-[28%] cursor-pointer p-2 rounded-md self-center"> Join Now </button>
            </div>
        </div> }
    </>
)
}