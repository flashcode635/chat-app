import JoinPage from "./JoinPage";
import { useZustStore } from "./store";

export const Home =()=>{
const style = "bg-blue-800 p-1  cursor-pointer  pl-1.5 rounded";
const open = useZustStore((state:any)=> state.setPlay)

function joinRoom(){
open()
}
    return(
    <>
    <JoinPage/>
        <div className={`text-white h-[300px] w-[500px] rounded-md border text-center p-2 border-orange-50`}> 
            <h1 className="mb-3"> What you want to try ? </h1>
            <span> </span>
            <button className={`${style} mr-3`} onClick={joinRoom} > Join Room </button>
            <button className={`${style}`} > Create Room </button>
        </div>
        
    </>
)
}