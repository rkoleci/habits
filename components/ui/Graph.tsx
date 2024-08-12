'use client'
import { HabitRow } from '@/types_db';
import { getRandomSupportiveQuote } from '@/utils/constants';
import * as Icons from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface ContributionGraphProps {
  habit: HabitRow;
  handleDelete: (id: string) => void
  handleReset: (id: string, daysCompleted: number) => void
  handleComplete: (id: string, daysCompleted: number) => void
}

const ContributionGraph = ({ habit: { days, start_date, id, name, reward, icon }, handleDelete, handleReset, handleComplete }: ContributionGraphProps) => {
  const totalDays = 130
  const [contributions, setContributions] = useState<boolean[]>(Array(totalDays).fill(false));
  const [dates, setDates] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModal2Open] = useState(false);
  const [daysLeft, setDaysLeft] = useState(-1)
  const [showReward, setShowReward] = useState(true)
  const [quote, setQuote] = useState('')

  if (!days || !start_date) return null

  useEffect(() => {
    const today = new Date();
    const startDateObj = new Date(start_date);

    // Generate the dates for the boxes
    const dateArray = Array.from({ length: totalDays }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toDateString(); // Format as desired
    }).reverse(); // Reverse to have the most recent date at the start
    setDates(dateArray);

    // Calculate the number of days passed since startDate
    const daysPassed = Math.abs(Math.floor((today.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)));
    setDaysLeft(days - daysPassed)
    // Automatically tick boxes from startDate to the end of the previous day
    setContributions(prev => {
      const newContributions = [...prev];

      for (let i = totalDays - 1; i >= 0; i--) {
        if (i >= totalDays - 1 - daysPassed) {
          newContributions[i] = true
        } else {
          newContributions[i] = false
        }
      }

      return newContributions;
    });


  }, [days, start_date]);

  useEffect(() => {
    // Calculate progress
    const filledBoxes = contributions.filter(Boolean).length;
    if (filledBoxes >= days) {
      setProgress(100)
    } else {
      setProgress((filledBoxes / days) * 100);
    }
  }, [contributions])

  const HabitIcon = habitIcons[icon as unknown as habitKey]
  
  return (
    <div className="card bg-base-100 shadow-xl p-4 w-full">
      {showReward && (
        <div className='text-primary '>{quote}</div>
      )}
      {!showReward && (
        <>
          {
            daysLeft > 0 ? (
              <div className='flex'>
                <div>
                  <div className='flex justify-between items-center w-full'>
                    <div className="flex flex-start gap-4 items-center mb-6">
                      <div className='bg-accent p-2 rounded-lg'>
                       {HabitIcon}
                      </div>
                      <p className="text-lg text-accent-main">{name}</p> {/* Label below the graph */}
                    </div>

                  </div>


                  <div className="flex mb-6">
                    <div className="flex-grow mr-4">
                      <div className="flex flex-wrap gap-1">
                        {Array.from({ length: totalDays }).map((_, index) => (
                          <div
                            key={index}
                            className={`h-[9px] w-[9px] rounded-sm ${contributions[index] ? 'bg-yellow-500' : 'bg-base-300'
                              } sm:h-[15px] sm:w-[15px]`} // Adjust size for larger screens
                            title={`Date: ${dates[index]}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-start md:justify-center items-center gap-4'>
                    <p className='text-sm md:text-md lg:text-lg  text-accent-main'> <span className='text-primary'>{daysLeft}</span> days left until you can <span className='text-primary'> {reward}</span></p>
                    <button
                      className="btn btn-accent  w-fit"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-rotate-ccw text-accent-main"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                    </button>
                    <button
                      className="btn btn-error  w-fit mr-8"
                      onClick={() => setIsModal2Open(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                    </button>
                  </div>
                </div>


                <div className="relative" style={{ width: '15%', minWidth: '25px' }}>
                  <div className="absolute inset-x-0 bottom-0 w-full h-full bg-base-300 rounded-full overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-b from-primary to-accent transition-all duration-500 ease-out rounded-full"
                      style={{ height: `${progress}%` }}
                    >
                      {progress === 100 && (
                        <div className="absolute inset-0 flex items-center justify-center animate-bounce">
                          <span className="text-2xl">🎉</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='min-h-[120px] w-full text-center'>
                <div className="relative" style={{ width: '100%', minWidth: '25px' }}>
                  <p>Congratulations!</p>
                  <p>You completed  <span className='text-primary'>{days}</span> days of  <span className='text-primary'>{name}</span></p>
                  <div className='flex justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trophy text-primary"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
                  </div>
                  <p> <span className='text-primary'>You</span> can now <span className='text-primary'>{reward}</span></p>
                  <button onClick={() => {
                    setShowReward(true)
                    setQuote(getRandomSupportiveQuote())
                    handleComplete(id, days)
                  }} className='btn'>Press for Reward</button>
                </div>
              </div>
            )
          }</>
      )}




      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold  text-accent-main">Confirm Reset</h2>
              <button
                className="btn btn-square btn-sm"
                onClick={() => setIsModalOpen(false)}
              >
                x
              </button>
            </div>
            <p className="mt-2  text-accent-main">Are you sure you want to reset the contribution graph? This action cannot be undone.</p>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleReset(id, calcDaysCompleted(start_date))
                  setIsModalOpen(false)
                }}
              >
                Yes, Reset
              </button>
              <button
                className="btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)} />
        </div>
      )}

      {isModalOpen2 && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold  text-accent-main">Confirm Delete</h2>
              <button
                className="btn btn-square btn-sm"
                onClick={() => setIsModal2Open(false)}
              >
                x
              </button>
            </div>
            <p className="mt-2  text-accent-main">Are you sure you want to delete the contribution graph? This action cannot be undone.</p>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleDelete(id)
                  setIsModal2Open(false)
                }}
              >
                Yes, Delete
              </button>
              <button
                className="btn"
                onClick={() => setIsModal2Open(false)}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setIsModal2Open(false)} />
        </div>
      )}
    </div>
  );
};

export default ContributionGraph;


const calcDaysCompleted = (startDate: string) => {
  const today = new Date()
  const startDateObj = new Date(startDate);

  return Math.abs(Math.floor((today.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)));
}

const habitIcons = {
  Dumbbell: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-dumbbell"><path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/><path d="m21.5 21.5-1.4-1.4"/><path d="M3.9 3.9 2.5 2.5"/><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/></svg>,
  HandPlatter: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-briefcase"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>,
  Briefcase:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-briefcase"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>,
  Play: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-luggage"><path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"/><path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/><path d="M10 20h4"/><circle cx="16" cy="20" r="2"/><circle cx="8" cy="20" r="2"/></svg>,
  Medal: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-luggage"><path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"/><path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/><path d="M10 20h4"/><circle cx="16" cy="20" r="2"/><circle cx="8" cy="20" r="2"/></svg>,
  Luggage: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-luggage"><path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"/><path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/><path d="M10 20h4"/><circle cx="16" cy="20" r="2"/><circle cx="8" cy="20" r="2"/></svg>,
  Coffee: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>,
  CupSoda:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-cup-soda"><path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"/><path d="M5 8h14"/><path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/><path d="m12 8 1-6h2"/></svg>,
  Circle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>,
  Clock:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Cigarette: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-cigarette-off"><path d="M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13"/><path d="M18 8c0-2.5-2-2.5-2-5"/><path d="m2 2 20 20"/><path d="M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866"/><path d="M22 8c0-2.5-2-2.5-2-5"/><path d="M7 12v4"/></svg>,
  Citrus : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-citrus"><path d="M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z"/><path d="M19.65 15.66A8 8 0 0 1 8.35 4.34"/><path d="m14 10-5.5 5.5"/><path d="M14 17.85V10H6.15"/></svg>,
  DollarSign: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Activity: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-activity"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
}

type habitKey = keyof typeof habitIcons