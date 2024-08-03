import { NextResponse } from "next/server";
import { cookies } from "next/headers"
import { createClient } from '@/utils/supabase/server';

export const dynamic = "force-dynamic";

function getSqlTimestampWithTimezone() {
    const now = new Date();

    // Get the timezone offset in minutes and format it as ±HH:MM
    const offset = now.getTimezoneOffset();
    const sign = offset > 0 ? '-' : '+';
    const absOffset = Math.abs(offset);
    const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
    const minutes = String(absOffset % 60).padStart(2, '0');
    const timezone = `${sign}${hours}:${minutes}`;

    // Use toISOString to get the date in UTC and replace the 'Z' with the timezone offset
    const isoString = now.toISOString().replace('Z', timezone);

    return isoString;
}

export async function POST(req: any) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log(111, { user })
    if (user) {
        const body = await req.json();
        console.log(111, { body })

        if (!body.name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        try {

            const { error, data: habit, status } = await supabase.from('habits').insert<any>({
                name: body.name,
                reward: body.reward,
                days: body.days,
                start_date: getSqlTimestampWithTimezone(),
                user_id: user?.id,
            });
            console.log(111, error)
            if (error) {
                return NextResponse.json({ error }, { status: 405 });
            }


            return NextResponse.json({ data: habit }, { status: 200 });
        } catch (e) {
            console.log(111, e)
            return NextResponse.json({ error: e }, { status: 401 });
        }
    } else {
        // Not Signed in
        console.log(111, 'NOt sige in')
        NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
}

export async function DELETE(req: any, res: any) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const id = req.nextUrl.searchParams.get("id")

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (user) {

        try {
            const { error } = await supabase
                .from('habits')
                .delete()
                .eq('id', id);

            if (error) {
                return NextResponse.json({ error }, { status: 405 });
            }

            return NextResponse.json({}, { status: 200 });
        } catch (e) {
            console.log(111, e)
            return NextResponse.json({ error: e }, { status: 401 });
        }
    } else {
        // Not Signed in
        NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
}

export async function PUT(req: any) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const id = req.nextUrl.searchParams.get("id")

    if (user) {

        try {
            const { data, error } = await supabase
                .from('habits')
                .update({ start_date: getSqlTimestampWithTimezone() })
                .eq('id', id);
            console.log(111,{error})
                if (error) {
                return NextResponse.json({ error }, { status: 405 });
            }


            return NextResponse.json({ data }, { status: 200 });
        } catch (e) {
            console.log(111, e)
            return NextResponse.json({ error: e }, { status: 401 });
        }
    } else {
        // Not Signed in
        NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
}