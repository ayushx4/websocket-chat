export default function ChatCard({ prop}){

  return (
    <div className=" mb-2 mt-2 h-14 flex flex-row items-center bg-bue-300">
      <div className=" h-12 w-12 mr-2 ml-2 rounded-full bg-gray-500 "></div> 
      <div 
      className="">
        <p className=" text-gray-100">{prop.username}</p>
        <p className="text-gray-400">recent message</p>
      </div>

    </div>
  )
}
