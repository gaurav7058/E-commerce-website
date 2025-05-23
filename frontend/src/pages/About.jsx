import React from 'react'
import Title from '../components/Title'
import {assets} from "../assets/frontend_assets/assets"
import NewLetterBox from '../components/NewLetterBox'
const About = () => {
  return (
    <div>
      
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={`ABOUT`} text2={`US`}/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi iste dolore voluptate vero minima reprehenderit facere excepturi, soluta saepe quos perspiciatis? Molestiae ipsam sed provident placeat voluptatibus, nihil dignissimos nisi.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid cumque corrupti accusamus. Praesentium nobis porro ut earum possimus ipsa, aliquam sint est doloribus! Autem, laudantium quo nihil nemo magnam quisquam.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore perspiciatis error quod voluptates debitis voluptatum, earum, similique quae maxime architecto officiis nostrum sunt quia quam at iste odit eaque cupiditate!</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={`WHY`} text2={`CHOOSE US`}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quam rerum ipsum dolorum! Doloremque, placeat nesciunt qui, delectus a, officiis quibusdam laboriosam accusantium molestias eaque alias esse ratione tenetur! Dolorum?</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quam rerum ipsum dolorum! Doloremque, placeat nesciunt qui, delectus a, officiis quibusdam laboriosam accusantium molestias eaque alias esse ratione tenetur! Dolorum?</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quam rerum ipsum dolorum! Doloremque, placeat nesciunt qui, delectus a, officiis quibusdam laboriosam accusantium molestias eaque alias esse ratione tenetur! Dolorum?</p>
        </div>
      </div>
      <NewLetterBox/>

    </div>
  )
}

export default About
