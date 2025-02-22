import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server';
import BillingPortal from './BillingPortalButton';

export default async function ButtonAccount() {
    const supabase = await createClient()
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) return null

    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1 bg-base-200">
                <Image width={25} height={25} src={user?.user_metadata?.picture} alt={user?.user_metadata?.full_name} className='rounded-full' />
                {user?.user_metadata?.full_name}
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </span>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <Link href='/logout' className='flex justify-start gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fill-rule="evenodd" d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z" clip-rule="evenodd" />
                            <path fill-rule="evenodd" d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z" clip-rule="evenodd" />
                        </svg>

                        <p className='text-accent-secondary font-medium leading-relaxed'>Log out</p>
                    </Link>
                </li>
            </ul>
        </div>
    )
}