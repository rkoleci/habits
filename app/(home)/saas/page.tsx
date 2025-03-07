

import ContributionGraph from "@/components/ui/Graph";
import GraphList from "@/components/ui/GraphList";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Saas() {
    const supabase = createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/signin');
    }

    const { data: userRecord } = await supabase.from('users').select('*').eq('id', user?.id).single()
    
    return (
        <div className="bg-base-200 flex flex-col items-center min-h-screen  gap-8 w-full px-4  py-8">
            <div className="max-w-5xl w-full flex flex-col  gap-8">
                <GraphList user={user} streak={userRecord?.streak || 0} />
            </div>
        </div>
    )
}
