import Image from "next/image";
import shipfastTechstack from '../../public/hero.webp'
import shipfastAvatar from '../../public/shipfast_avatar.webp'
import shipfastAvatar2 from '../../public/shipfast_avatar_2.webp'
import Rating from '@components/ui/Rating'
import PricingCTA from "../server/PricingCTA";
import av1 from '../../public/av1.webp'
import av2 from '../../public/av2.webp'
import av3 from '../../public/av3.webp'
import av4 from '../../public/av4.webp'
import av5 from '../../public/av5.webp'

export default function Hero() {
    return (
        <section className="w-full bg-base-100 flex justify-center">
            <div className="bg-base-100 flex flex-between gap-4 md:gap-16 lg:gap-36 flex-col lg:flex-row max-w-7xl px-8 py-16">
                <div className="gap-12 flex flex-col items-center  lg:items-start  ">
                    <Rating />
                     {/* COPY 💡 - Make it big; Font size should be somewhere between 36px and 60px; Describe what problem the product solves in one short sentence */}
                    <h1 className="text-accent-main  font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4 flex flex-col gap-3 items-center lg:items-start"><span className="relative ">Don't give up good</span><span className="whitespace-nowrap relative "><span className="mr-3 sm:mr-4 md:mr-5">habits,</span><span className=" relative whitespace-nowrap"><span className="absolute bg-[#d2cbc6] -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span><span className=" relative text-base-600">reward yourself</span></span></span></h1>
                   
                    {/* COPY 💡 - Smaller font for a sentence of description; How this product works in high level */}
                    <p className="text-accent text-lg text-center lg:text-left opacity-80 leading-relaxed my-3">Motivation only lasts 3 days.. Instead Reward yourself for trying to quit.</p>
                    <PricingCTA  extraClasses="items-center lg:items-start" />
                    <div className="flex flex-col lg:flex-row flex-start gap-16 lg:gap-4 bg-base-100 ">
                        <div className="relative  w-[160px]  bg-base-100">
                            <div className="rounded-full absolute left-0 top-0 bg-base-100  pl-1 ">
                                <Image
                                    className="rounded-full   "
                                    height={40}
                                    width={40}
                                    src={av1}
                                    alt="Avatar"
                                />
                            </div>
                            <div className="rounded-full pl-1 absolute left-7 top-0 bg-base-100">
                                <Image
                                    className="rounded-full  "
                                    height={40}
                                    width={40}
                                    src={av2}
                                    alt="Avatar"
                                />
                            </div>
                            <div className="rounded-full absolute left-14 top-0 bg-base-100  pl-1 ">
                                <Image
                                    className="rounded-full   "
                                    height={40}
                                    width={40}
                                    src={av3}
                                    alt="Avatar"
                                />
                            </div>
                            <div className="rounded-full absolute left-[84px] top-0 bg-base-100  pl-1 ">
                                <Image
                                    className="rounded-full   "
                                    height={40}
                                    width={40}
                                    src={av4}
                                    alt="Avatar"
                                />
                            </div>
                            <div className="rounded-full absolute left-[112px] top-0 bg-base-100  pl-1 ">
                                <Image
                                    className="rounded-full   "
                                    height={40}
                                    width={40}
                                    src={av5}
                                    alt="Avatar"
                                />
                            </div>

                        </div>

                        <div className="flex flex-col items-center lg:items-start  ">
                            <div className="flex flex-start gap-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-500"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-500"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-500"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-500"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-500"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path></svg>
                            </div>
                            <div className="text-base text-base-content/80"><span className="font-semibold text-base-content">3154</span> formed good habits</div>
                        </div>
                    </div>
                </div>
                <div className="relative max-md:-m-4 lg:w-full flex justify-center ">
                    <Image
                        src={shipfastTechstack}
                        alt="Hero"
                        height={400}
                        width={300}
                    />
                </div>
            </div>
        </section>
    )
}