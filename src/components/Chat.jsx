import React from 'react'

function Chat({msg, self}) {
    if(self == msg.sender){
        return (
            <>
            <div className='flex justify-end w-full'>
                <div className="bg-gray-200 max-w-96 p-2 inline-block">
                    {msg.message}
                </div>
            </div>
        </>
          )    
    }
    return (
    <>
    <div className='flex justify-start w-full'>
        <div className="bg-gray-200 max-w-96 p-2 inline-block">
            {msg.message}
        </div>
    </div>
</>
  )
}

export default Chat