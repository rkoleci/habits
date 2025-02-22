'use client';

import Image from "next/image";
import shipfastAvatar2 from '../../public/shipfast_avatar_2.webp'
import { getStripe } from '@/utils/stripe/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { appName } from "@/utils/config";
import { usePlanStore } from "../context/usePlanStore";
import { ProductWithPrices } from "../server/Pricing";

interface Props {
    product: ProductWithPrices;
    basicPlan: string;
    premiumPlan: string;
}

export default function PricingUI({ product, basicPlan, premiumPlan }: Props) {
    const router = useRouter()
    const { setPlans } = usePlanStore()
    const searchParams = useSearchParams()

    const plan = searchParams.get('plan')

    if (plan === 'freemium') return null

    useEffect(() => {
        if (basicPlan && premiumPlan) {
            setPlans([basicPlan, premiumPlan])
        }
    }, [basicPlan, premiumPlan])

    const handleStripeCheckout = async (id: string) => {
        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId: id });
    }

    /* Stripe */ 
    const handleClick = (sid: string) => {
        if (sid) {
            handleStripeCheckout(sid)
        } else {
            router.push('/signin/email_signin');
        }
    }

    /* Paypal */
    const handlePaypal = (checkoutUrl: string) => {
        if (checkoutUrl) {
            window.open(checkoutUrl, `_blank`)
            return
        }
    }

    useEffect(() => {
        if (window.location.hash.includes('#pricing')) {
            const pricingView = document.getElementById('pricing');
            pricingView?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <section className="bg-base-400 py-24 px-8 flex flex-col justify-start items-center">
            <div className="max-w-5xl w-full flex flex-col items-center gap-4">
                <p id="pricing" className="font-medium text-primary mb-8">Pricing</p>
                {/** COPY 💡 - Tell how this products would save people's time and give them other benefits; Make it a 2 in 1 or even better 3 in 1 */}
                <h2 className="font-bold text-3xl lg:text-5xl tracking-tight mb-8 max-w-2xl mx-auto">Save hours of repetitive code, ship fast, get profitable!</h2>
                <p className="text-sm md:text-base flex justify-center items-center gap-2 mb-16 ">
                    <svg className="w-5 h-5 fill-accent animate-pulse" viewBox="0 0 161 154" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8_2399)"><path d="M13.9653 26.3929C13.3454 26.4007 12.7254 26.3891 12.1055 26.3781C10.9378 26.3371 9.76879 26.3561 8.60306 26.4349C4.24676 26.7979 2.47252 28.6135 2.27301 32.9093C1.97374 39.3929 1.71523 45.9857 1.46519 52.3619L1.1867 59.4195C1.16791 59.8841 1.17111 60.3506 1.19508 60.8093C1.5086 66.7514 3.74024 69.1992 9.72176 70.1639C10.2316 70.2455 10.7491 70.3031 11.2692 70.3581C13.0383 70.5522 14.7127 70.7392 16.2382 71.9142C16.2777 72.7101 16.3245 73.5092 16.3679 74.3083C16.4787 76.2165 16.594 78.1907 16.6115 80.1286C16.6931 89.1674 16.7656 98.2062 16.8291 107.245C16.9042 117.237 16.9858 127.229 17.0739 137.221C17.0748 140.34 17.2411 143.457 17.5721 146.559C18.0754 150.852 19.3133 152.078 23.5912 152.525L25.146 152.69C29.2657 153.198 33.4084 153.499 37.5585 153.589C41.9111 153.609 46.2512 153.619 50.5788 153.62C61.9284 153.62 73.155 153.55 84.092 153.41C89.9673 153.335 95.9359 153.127 101.708 152.925C105.951 152.777 110.339 152.623 114.654 152.525C118.836 152.428 123.092 152.404 127.209 152.38C130.275 152.362 133.446 152.344 136.565 152.296C140.119 152.242 142.072 150.598 142.703 147.119C142.868 146.065 142.953 145 142.954 143.934C142.969 143.427 142.982 142.921 143.015 142.416C143.274 138.382 143.541 134.348 143.817 130.316C144.41 121.479 145.023 112.341 145.517 103.346C145.675 100.462 145.978 97.5183 146.271 94.6752C147.139 86.244 148.036 77.5339 145.415 68.7281C145.632 68.6809 145.841 68.6336 146.042 68.5884C146.744 68.4156 147.456 68.2855 148.174 68.2001C149.057 68.1166 149.968 68.0707 150.848 68.0286C152.152 67.9639 153.501 67.8992 154.825 67.7051C158.372 67.1875 160.401 64.9635 160.693 61.2785C160.74 60.4115 160.722 59.5422 160.639 58.6779L160.629 58.5291C160.051 50.3348 159.463 42.1416 158.874 33.8521L158.372 26.8148C158.361 26.6623 158.298 26.5183 158.193 26.4068C158.089 26.2954 157.949 26.2233 157.798 26.2028C157.404 26.1497 157.025 26.0913 156.657 26.0337C155.871 25.912 155.129 25.7975 154.369 25.7509C151.924 25.6016 149.478 25.4588 147.032 25.3225C142.701 25.0747 138.222 24.8192 133.824 24.5118C133.078 24.4103 132.351 24.2007 131.666 23.8894C131.51 23.8286 131.352 23.7672 131.194 23.7071C131.392 23.2748 131.587 22.8627 131.777 22.4661C132.341 21.3419 132.83 20.1817 133.24 18.9932C133.855 17.1872 134.099 15.2759 133.958 13.3737C133.816 11.4715 133.292 9.61755 132.418 7.92206C131.488 6.22992 130.227 4.742 128.709 3.54746C127.192 2.35292 125.448 1.47617 123.584 0.969338C120.508 0.0439655 117.257 -0.145334 114.094 0.416744C105.064 2.00139 96.9276 6.12259 89.2191 13.0176C88.2474 13.8873 87.2758 14.7957 86.2549 15.7572C85.931 16.0633 85.5942 16.3783 85.2463 16.7032C85.0053 16.3149 84.7767 15.9475 84.5564 15.5936C83.8562 14.4638 83.2512 13.4886 82.6079 12.5232C80.6044 9.44497 77.8584 6.91879 74.6228 5.17648C65.7671 0.465246 56.2985 0.0518385 46.4808 3.94713C43.6793 5.10813 41.2785 7.0614 39.5731 9.56688C35.9624 14.6256 36.1081 18.8347 40.0615 23.6404C40.6022 24.2666 41.1769 24.8624 41.7832 25.4255C41.9724 25.6099 42.1791 25.8137 42.4078 26.035L37.0124 26.1035C28.8563 26.2057 21.4108 26.3036 13.9653 26.3929ZM27.2699 78.0781C27.1857 76.5834 27.051 75.1016 26.9091 73.5403C26.8625 73.0324 26.816 72.516 26.7698 71.9912C26.9453 71.9589 27.1138 71.9265 27.2764 71.8948C27.8156 71.768 28.3657 71.6936 28.9192 71.6703C42.4641 71.6515 56.0103 71.6515 70.0489 71.6528H78.1409C78.1376 75.3741 78.1046 79.0539 78.0729 82.6192C77.9964 91.2594 77.9239 99.4194 78.2432 107.673C78.5626 115.945 79.2622 124.015 80.0026 132.56C80.3025 136.023 80.6121 139.599 80.892 143.165C80.5474 143.265 80.2196 143.368 79.9054 143.467C79.1566 143.75 78.3715 143.924 77.5734 143.984C62.42 144.096 47.4888 144.144 29.7327 144.178H29.7249C29.1714 144.153 28.6218 144.074 28.0841 143.94C27.8801 143.896 27.667 143.852 27.4416 143.81C27.4086 143.469 27.3735 143.133 27.3385 142.8C27.2166 141.822 27.1487 140.838 27.1351 139.852C27.1917 130.616 27.2565 121.38 27.3295 112.144C27.3951 103.234 27.4571 94.3245 27.5154 85.4145C27.5297 82.9278 27.4 80.4295 27.2705 78.0781H27.2699ZM66.5289 35.6309C67.713 35.6212 68.8984 35.5831 70.0806 35.5449C72.3653 35.4725 74.7213 35.3968 76.9801 35.5449C77.7237 40.2083 78.0586 53.6179 77.5838 60.0975C74.2886 60.9096 70.81 60.8552 67.4403 60.7983C65.6408 60.7705 63.7784 60.7394 61.9452 60.8391C56.9515 61.1089 51.8535 61.1465 46.9233 61.1834L42.9532 61.2169C38.3294 61.2602 33.5475 61.3056 28.8661 61.0915C27.5919 61.0332 26.2912 61.0117 25.0338 60.9916C20.9833 60.9269 16.7993 60.8579 12.4618 59.5541L11.3768 36.0255C13.7352 35.7968 16.112 35.8364 18.4615 36.1433C19.6534 36.2559 20.886 36.3732 22.1019 36.4062C25.6594 36.502 29.3512 36.5523 33.3887 36.5588C36.9645 36.5633 40.811 36.5531 44.6821 36.4334C46.5775 36.3745 48.4988 36.26 50.3559 36.15C51.9708 36.0536 53.6407 35.9556 55.2789 35.8909C59.0691 35.7479 62.8533 35.6613 66.5289 35.6315V35.6309ZM50.6169 25.2539L46.5095 19.5205C46.8333 15.9849 48.548 13.9338 52.0512 12.8856C57.2333 11.3326 62.0133 11.3053 66.6533 12.7962C71.9171 14.4882 75.2771 18.0373 77.7684 24.5933L50.6169 25.2539ZM90.3637 23.7886C96.2908 16.8719 104.393 12.1696 113.343 10.4519C116.571 9.78863 120.24 9.57186 123.072 12.9443C123.694 19.2603 123.692 19.4647 121.892 23.5289C121.708 23.5599 121.52 23.5938 121.329 23.6293C120.645 23.7755 119.95 23.8646 119.251 23.8954C110.16 24.0248 100.595 24.1242 90.8139 24.1902C90.7161 24.1163 90.6235 24.0361 90.5367 23.9497C90.4803 23.896 90.422 23.8416 90.3637 23.7892V23.7886ZM87.3438 107.324C87.5692 99.0609 87.5174 90.9682 87.463 82.3998C87.4397 78.8721 87.4176 75.321 87.415 71.7369C94.0223 70.9456 133.713 69.1293 140.326 69.3066C140.197 69.9155 140.063 70.5237 139.929 71.13C139.514 73.0026 139.087 74.9379 138.839 76.8772C137.936 83.9948 137.235 89.9736 136.742 96.0211C136.172 103.036 135.727 110.175 135.297 117.08C135.171 119.109 135.043 121.139 134.914 123.169C134.731 126.049 134.557 128.93 134.392 131.811C134.198 135.111 134.004 138.407 133.789 141.703C133.73 142.066 133.616 142.418 133.448 142.746C133.398 142.864 133.346 142.983 133.295 143.109H85.4814C85.6758 139.563 85.8882 136.042 86.0994 132.539C86.5988 124.263 87.1151 115.705 87.3438 107.325V107.324ZM149.252 32.2648C149.299 32.3329 149.33 32.4108 149.343 32.4926C149.165 40.0276 148.979 47.5629 148.786 55.3179L148.738 57.2726C148.391 57.3412 148.051 57.4128 147.715 57.484C146.745 57.7143 145.759 57.8765 144.766 57.9693C125.98 59.2433 107.1 59.9189 88.638 59.9752C87.6975 54.7748 87.4105 41.4195 88.1198 35.5488C91.9676 34.6914 96.0227 34.602 99.954 34.5134C101.02 34.4901 102.086 34.4669 103.149 34.4281C105.584 34.3421 108.067 34.3276 110.469 34.314C113.07 34.2992 115.76 34.2837 118.406 34.1763C123.742 33.9608 128.973 33.5647 134.308 33.1409C137.82 32.864 141.33 32.5249 144.723 32.1969C146.094 32.0649 147.445 31.9357 148.777 31.8089C148.861 31.8872 148.933 31.9532 148.998 32.0108C149.089 32.0883 149.174 32.1725 149.252 32.2629V32.2648Z"></path></g></svg> <span><span className="text-accent">$40 off</span> for the first  3360 customers ( 8 left)</span></p>

                <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-8 w-full">
                    <div className="relative w-full">
                        <div className="relative flex flex-col gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-lg">
                            <div className="flex justify-between items-center gap-4">
                                <div>
                                    <p className="text-lg lg:text-xl font-bold ">Starter</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex flex-col justify-end mb-[4px] text-lg ">
                                    <p className="relative opacity-80"><span className="absolute bg-base-content h-[1.5px] inset-x-0 top-[48%]"></span><span className="text-base-content">$30</span></p>
                                </div>
                                {/** COPY 💡 - Price the Starter package very close to Premium so users think it's not worth buying Starter when Premium is a couple of dollars more */}
                                {product?.prices[0]?.unit_amount && product?.prices[0]?.currency && <p className="text-5xl tracking-tight font-extrabold">{formatPrice(product?.prices[0]?.unit_amount, product?.prices[0]?.currency)}</p>}
                            </div>
                            <ul className="space-y-2.5 leading-relaxed text-base flex-1"><li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg><span className="">NextJS boilerplate</span></li><li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg><span className="">SEO &amp; Blog</span></li><li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg><span className="">Mailgun emails</span></li><li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg><span className="">Stripe</span></li><li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg><span className="">Supabase</span></li><li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg><span className="">Google Oauth</span></li><li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg><span className="">Components &amp; animations</span></li><li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-base-content/30 shrink-0"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg><span className="text-base-content/30">ChatGPT prompts for terms &amp; privacy</span></li><li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-base-content/30 shrink-0"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg><span className="text-base-content/30">Customer support</span></li><li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-base-content/30 shrink-0"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg><span className="text-base-content/30">Lifetime updates</span></li></ul><div className="space-y-2">
                                <button onClick={() => handlePaypal(process.env.NEXT_PUBLIC_PAYPAL_CHECKOUT_LINK_1 as string)} className="btn btn-primary group btn-block plausible-event-name=Checkout" title="Go to ShipFast Checkout"><svg className="w-5 h-5 fill-primary-content group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200 ease-in-out" viewBox="0 0 375 509" xmlns="http://www.w3.org/2000/svg"><path d="M249.685 14.125C249.685 11.5046 248.913 8.94218 247.465 6.75675C246.017 4.57133 243.957 2.85951 241.542 1.83453C239.126 0.809546 236.463 0.516683 233.882 0.992419C231.301 1.46815 228.917 2.69147 227.028 4.50999L179.466 50.1812C108.664 118.158 48.8369 196.677 2.11373 282.944C0.964078 284.975 0.367442 287.272 0.38324 289.605C0.399039 291.938 1.02672 294.226 2.20377 296.241C3.38082 298.257 5.06616 299.929 7.09195 301.092C9.11775 302.255 11.4133 302.867 13.75 302.869H129.042V494.875C129.039 497.466 129.791 500.001 131.205 502.173C132.62 504.345 134.637 506.059 137.01 507.106C139.383 508.153 142.01 508.489 144.571 508.072C147.131 507.655 149.516 506.503 151.432 504.757L172.698 485.394C247.19 417.643 310.406 338.487 359.975 250.894L373.136 227.658C374.292 225.626 374.894 223.327 374.882 220.99C374.87 218.653 374.243 216.361 373.065 214.341C371.887 212.322 370.199 210.646 368.17 209.482C366.141 208.318 363.841 207.706 361.5 207.707H249.685V14.125Z"></path></svg>Get {appName}</button><p className="flex items-center justify-center gap-2 text-sm text-center text-base-content/80 font-medium relative">Pay once. Build unlimited projects!</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            <span className="badge text-xs text-primary-content font-semibold border-0 bg-primary">POPULAR</span>
                        </div>
                        <div className="absolute -inset-[1px] rounded-[8px] bg-primary z-10"></div>
                        <div className="relative flex flex-col gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-lg">
                            <div className="flex justify-between items-center gap-4"><div>
                                <p className="text-lg lg:text-xl font-bold ">All-in</p>
                            </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex flex-col justify-end mb-[4px] text-lg ">
                                    <p className="relative opacity-80">
                                        <span className="absolute bg-base-content h-[1.5px] inset-x-0 top-[48%]"></span>
                                        <span className="text-base-content">$60</span>
                                    </p>
                                </div>
                                {/**COPY 💡- Premium package should be what you should aim to sell - at whatever price you decide */}
                                {product?.prices[1]?.unit_amount && product?.prices[1]?.currency && <p className="text-5xl tracking-tight font-extrabold">{formatPrice(product?.prices[1]?.unit_amount, product?.prices[1]?.currency)}</p>}
                            </div>
                            <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>
                                    <span className="">NextJS boilerplate</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>
                                    <span className="">SEO &amp; Blog</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>
                                    <span className="">Mailgun emails</span>
                                </li>
                                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path>
                                </svg>
                                    <span className="">Stripe</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>
                                    <span className="">Supabase</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>
                                    <span className="">Google Oauth</span>
                                </li>
                                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>
                                    <span className="">Components &amp; animations</span>
                                </li>
                                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>
                                    <span className="">ChatGPT prompts for terms &amp; privacy</span>
                                </li>
                                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>
                                    <span className="">Customer support</span>
                                </li>
                                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>
                                    <span className="">Lifetime updates<span className="badge badge-accent select-none cursor-pointer ml-1" data-tooltip-id="tooltip" data-tooltip-html="<div className=&quot;text-gray-300&quot;><div className=&quot;mb-1.5 &quot;>Latest updates on ShipFast:</div><ul><li>- <span className=&quot;text-gray-50 font-medium&quot;>(new) Features Grid component 🧱</span> <span className=&quot;badge badge-sm&quot;>1 week ago</span></li><li>- <span className=&quot;text-gray-50 font-medium&quot;>(new) Compete for the Leaderboards 🥇</span> <span className=&quot;badge badge-sm&quot;>1 month ago</span></li><li>- <span className=&quot;text-gray-50 font-medium&quot;>Merge remote-tracking branch &amp;#x27;refs/remotes/ship-fast-org/main&amp;#x27;</span> <span className=&quot;badge badge-sm&quot;>1 month ago</span></li></ul></div>">Updated 1 week ago</span></span></li></ul><div className="space-y-2">
                                <button onClick={() => handlePaypal(process.env.NEXT_PUBLIC_PAYPAL_CHECKOUT_LINK_2 as string)} className="btn btn-primary group btn-block plausible-event-name=Checkout" title="Go to ShipFast Checkout"><svg className="w-5 h-5 fill-primary-content group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200 ease-in-out" viewBox="0 0 375 509" xmlns="http://www.w3.org/2000/svg"><path d="M249.685 14.125C249.685 11.5046 248.913 8.94218 247.465 6.75675C246.017 4.57133 243.957 2.85951 241.542 1.83453C239.126 0.809546 236.463 0.516683 233.882 0.992419C231.301 1.46815 228.917 2.69147 227.028 4.50999L179.466 50.1812C108.664 118.158 48.8369 196.677 2.11373 282.944C0.964078 284.975 0.367442 287.272 0.38324 289.605C0.399039 291.938 1.02672 294.226 2.20377 296.241C3.38082 298.257 5.06616 299.929 7.09195 301.092C9.11775 302.255 11.4133 302.867 13.75 302.869H129.042V494.875C129.039 497.466 129.791 500.001 131.205 502.173C132.62 504.345 134.637 506.059 137.01 507.106C139.383 508.153 142.01 508.489 144.571 508.072C147.131 507.655 149.516 506.503 151.432 504.757L172.698 485.394C247.19 417.643 310.406 338.487 359.975 250.894L373.136 227.658C374.292 225.626 374.894 223.327 374.882 220.99C374.87 218.653 374.243 216.361 373.065 214.341C371.887 212.322 370.199 210.646 368.17 209.482C366.141 208.318 363.841 207.706 361.5 207.707H249.685V14.125Z"></path></svg>
                                    Get {appName}</button>
                                <p className="flex items-center justify-center gap-2 text-sm text-center text-base-content/80 font-medium relative">Pay once. Build unlimited projects!</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col items-start gap-4 pt-16 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 fill-primary" viewBox="0 0 35 30" fill="none"><path d="M22.3838 27.6777C23.5264 28.9961 25.3721 29.6992 27.4814 29.6992C31.6123 29.6992 34.249 26.9746 34.249 22.7559C34.249 18.625 31.5244 15.6367 27.6572 15.6367C26.8662 15.6367 25.9873 15.8125 25.1084 16.0762C24.5811 9.48438 27.833 4.03516 32.2275 2.36523L31.7881 0.871094C24.2295 3.77148 19.4834 11.1543 19.4834 19.8555C19.4834 22.668 20.5381 25.7441 22.3838 27.6777ZM0.499023 19.8555C0.499023 24.6895 3.22363 29.6992 8.49707 29.6992C12.54 29.6992 15.1768 26.9746 15.1768 22.7559C15.1768 18.625 12.4521 15.6367 8.67285 15.6367C7.88184 15.6367 7.00293 15.8125 6.12402 16.0762C5.59668 9.48438 8.84863 4.03516 13.2432 2.36523L12.7158 0.871094C5.24512 3.77148 0.499023 11.1543 0.499023 19.8555Z"></path></svg>

                    <p className="md:text-lg leading-relaxed text-left max-w-lg">I was able to launch my project in just one day! I made 170$ already.</p>

                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-base-100">
                            <Image
                                className="rounded-full   "
                                height={40}
                                width={40}
                                src={shipfastAvatar2}
                                alt="Avatar"
                            />
                        </div>
                        <p>Mateus De Nardo</p>
                        <span className="badge badge-primary badge-outline">Built a SaaS</span>
                    </div>

                </div>
            </div>
        </section>
    )
}

export const formatPrice = (unit_amount: number, currency: string) => {
    if (currency === 'usd') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'usd',
            minimumFractionDigits: 0
        }).format((unit_amount || 0) / 100);
    }

    return ''
}