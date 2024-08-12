'use client'
import badges from './list.json'

type Badge = {
    title: string;
};

type BadgeKey = keyof typeof badges

export function getBadge(streak: number): string {
    const badgeDays = Object.keys(badges).map(Number).sort((a, b) => b - a);

    for (const days of badgeDays) {
        if (streak >= days) {
            // Convert the number `days` back to a string for indexing
            return badges[days.toString() as unknown as BadgeKey].title;
        }
    }

    return "No Badge Yet";
}

export default function BadgeUi({ streak }: { streak: number }) {
    const title = getBadge(streak)

    return (
        <div className='flex flex-col justify-end items-end w-full gap-0'>
          <p className='text-xl font-semibold text-primary/80 '>{title}</p>
          <p className='font-thin text-accent-main'>{streak} days</p>
        </div>
    )
}