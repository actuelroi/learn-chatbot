import React from 'react'
import Script from 'next/script'
const Page = () => {
  return (
    <div>
      <Script src={`${process.env.NEXT_PUBLIC_URI || 'http://localhost:3000'}/widget.js`} data-id="8e583d23-a6fe-4018-8e5f-c4acfc914e10" defer />
    </div>
  )
}

export default Page