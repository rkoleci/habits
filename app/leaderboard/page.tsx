

import ContributionGraph from "@/components/ui/Graph";
import GraphList from "@/components/ui/GraphList";
import LeaderBoardUi from "@/components/ui/LeaderBoard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LeaderBoard() {
    const supabase = createClient();

    const {
        data
    } = await supabase.from('users').select().order('streak', { ascending: false });


    return (
        <div className="bg-base-400 flex justify-center  min-h-screen  gap-8 w-full  px-4  py-8">
            <div className="w-full w-full lg:w-8/12">
                <div className="flex justify-start items-center gap-3 mb-6">
                    <p className="text-2xl font-bold text-primary font-bold">Leaderboard</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-primary lucide lucide-trophy"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>

                </div>
                <LeaderBoardUi data={data} />
            </div>
        </div>
    )
}
