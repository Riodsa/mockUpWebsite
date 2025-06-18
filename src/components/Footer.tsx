import React from 'react'

const address = "เลขที่ 2 ชั้น 3 อาคารเพลินจิตเซ็นเตอร์ \nถนนสุขุมวิท แขวงคลองเตย \nเขตคลองเตย กรุงเทพฯ 10110"

const Footer = () => {
  return (
    <div className='absolute bottom-0 h-100 w-screen bg-(--footer-blue) flex'>
        <div className='flex flex-row'>
          <p className='text-white whitespace-pre-line'>{address}</p>
        </div>
    </div>
  )
}

export default Footer