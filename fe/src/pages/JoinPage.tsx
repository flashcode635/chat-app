
import { useZustStore } from "../components/store/store";
import {CrossIcon} from "../components/icons/cross"
import { InputBox } from "../components/input";
export default function JoinPage(){
    const val = useZustStore((state:any)=> state.play)
    const close = useZustStore((state:any)=> state.resetPlay)
return(
    <>
        {val && <div className=" bg-[#010b14f7] text-amber-50 h-screen w-screen fixed flex items-center justify-center z-100 pb-7">
            <div className='border border-solid h-fit w-[500px] rounded-lg p-6 flex flex-col gap-2 '> 
                <div className=" w-full flex justify-end cursor-pointer " onClick={close}>
                    <CrossIcon/>
                </div>
                <span className="text-3xl text-center mb-3 "> <b> Join Room </b>   </span>
                    <span className="text-cyan-50">Enter the code </span>
                   <InputBox/>
                    <button className=" bg-sky-950 w-[28%] cursor-pointer p-2 rounded-md self-center"> Join Now </button>
            </div>
        </div> }
    </>
)
}