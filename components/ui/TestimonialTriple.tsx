import Image from 'next/image'
import shipfastAvatar from '../../public/shipfast_avatar.webp'
import nico from '../../public/nicotroia.jpeg'
import terri from '../../public/terrip.jpeg'
import ar from '../../public/arsalan_najm.jpeg'
import Link from 'next/link'

export default function TestimonialTriple() {

    return (
        <section className="bg-base-100 py-24 px-8 flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8">
            
            <div className="flex-1 relative w-full lg:max-w-lg h-full p-6 md:p-10 bg-base-200 rounded-2xl max-md:text-sm flex flex-col">
                <div className="text-accent-main/80 leading-relaxed whitespace-pre-wrap pb-8">"This app helped me quit smoking and build a daily exercise habit by keeping me motivated with progress tracking and rewards."</div>
                <div className="bg-base-100 h-0.5"></div>
                <div className="flex justify-between items-center pt-8">
                    <div>
                        <div className="font-medium text-accent-main md:mb-0.5 text-left">Terri P</div>
                        <p className="text-accent-main/80 text-sm  text-center">Quit smoking</p>

                    </div>
                    <Image
                        className="rounded-full   "
                        height={48}
                        width={48}
                        src={terri}
                        alt="Avatar"
                    />
                </div>
            </div>
            <div className="flex-1 relative w-full lg:max-w-lg h-full p-6 md:p-10 bg-base-200 rounded-2xl max-md:text-sm flex flex-col">
                <div className="text-accent-main/80 leading-relaxed whitespace-pre-wrap pb-8">"Thanks to this app, I broke my late-night snacking habit and established a consistent morning routine, all while enjoying the rewarding streaks."</div>
                <div className="bg-base-100 h-0.5"></div>
                <div className="flex justify-between items-center pt-8">
                    <div>
                        <div className="font-medium text-accent-main md:mb-0.5 text-left">Arsalan Najm</div>
                        <p className="text-accent-main/80 text-sm  text-center">Created healthy morning routine </p>
                    </div>
                    <Image
                        className="rounded-full   "
                        height={48}
                        width={48}
                        src={ar}
                        alt="Avatar"
                    />
                </div>
            </div>
            <div className="flex-1 relative w-full lg:max-w-lg h-full p-6 md:p-10 bg-base-200 rounded-2xl max-md:text-sm flex flex-col">
                <div className="text-accent-main/80 leading-relaxed whitespace-pre-wrap pb-8">"This app turned my procrastination into productivity and helped me develop a new reading habit by making progress tracking and rewards."</div>
                <div className="bg-base-100 h-0.5"></div>
                <div className="flex justify-between items-center pt-8">
                    <div>
                        <div className="font-medium text-accent-main md:mb-0.5 text-left">Nico Troia </div>
                        <p className="text-accent-main/80 text-sm  text-center">Fixed procastination </p>

                    </div>
                    <Image
                        className="rounded-full   "
                        height={48}
                        width={48}
                        src={nico}
                        alt="Avatar"
                    />
                </div>
            </div>

        </section>
    )
}
