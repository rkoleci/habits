'use client'

import { getBadge } from "./Badge"

export default function LeaderBoard({ data }: any) {

  return (<div className="overflow-x-auto">
    <table className="table table-md bg-base-200 text-accent-main/80">
      <thead>
        <tr>
          <th className="hidden lg:block">Rank</th>
          <th>Fullname</th>
          <th>Badge of Honor</th>
          <th className="text-end">Streak (days)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, index: number) => (
          <tr className="bg-base-100">
            <th className={` hidden lg:block ${index <= 2 ? 'text-lg text-primary' : 'text-md text-primary'}`}>{index + 1}</th>
            <td>
              <div className="flex justify-start items-center gap-4">
                <img className="rounded-full w-[32px] lg:w-[50px]" src={item.avatar_url} alt={item.full_name || ''} />
                <p>{item.full_name}</p>
              </div>
            </td>
            <td className="font-semibold text-center lg:text-left">{getBadge(item?.streak || 0)}</td>
            <td className="text-right font-bold text-primary">
              {item.streak} days
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>)

}