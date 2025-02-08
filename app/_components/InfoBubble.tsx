import Image from 'next/image'
import React from 'react'

const InfoBubbleInfo = [
  {
    image: '/online-test1.webp',
    heading: 'Learn The Latest Skills',
    subheading: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a BC, making it over 2000 years old.',
    backgroundIcon: 'custom-infobubble-icons-gray'
  },
  {
    image: '/exam1.webp',
    heading: 'Get Ready For a Career',
    subheading: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a BC, making it over 2000 years old.',
    backgroundIcon: 'custom-infobubble-icons-gray'
  },
  {
    image: '/certification1.webp',
    heading: 'Earn a Certificate',
    subheading: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a BC, making it over 2000 years old.',
    backgroundIcon: 'custom-infobubble-icons-gray'
  }
]

export default function InfoBubble() {
  return (      
    <section className='custom-infobubble'>
        {
          InfoBubbleInfo && InfoBubbleInfo.map((info, index) => (
            <article className='custom-infobubble-container' key={index}>
                  <div className={info.backgroundIcon}>
                      <Image 
                          src={info.image} 
                          alt='Image of the people'
                          height="50"
                          width="50"
                          className='custom-infobubble-icon-image'
                      />
                  </div>
                  
                  <div className='custom-infobubble-info'>
                      <h3 className='custom-h3-bold'>
                          {info.heading}
                      </h3>
                      <p className='custom-p-extrasmall text-white'>
                          {info.subheading}
                      </p>
                  </div>
              </article>
          ))
        }
    </section>
  )
}