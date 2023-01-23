import React from 'react'

type Props = {
    message: string
}

const OutGoingMessage = (props: Props) => {
  return (
    <div className='bg-green-700 self-end max-w-3xl my-1 rounded-lg p-2 text-sm text-white'>
        {props.message}
    </div>
  )
}

export default OutGoingMessage