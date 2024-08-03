'use client'
import { HabitRow } from '@/types_db';
import React, { useState, useEffect } from 'react';

interface ContributionGraphProps {
  habit: HabitRow;
  handleDelete: (id: string) => void
  handleReset: (id: string) => void
}

const ContributionGraph = ({ habit: { days, start_date, id, name, reward }, handleDelete, handleReset  }: ContributionGraphProps) => {
  const totalDays = 130
  const [contributions, setContributions] = useState<boolean[]>(Array(totalDays).fill(false));
  const [dates, setDates] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModal2Open] = useState(false);
  const [daysLeft, setDaysLeft] = useState(-1)

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

  return (
    <div className="card bg-base-100 shadow-xl p-4 w-full">
      <div className='flex'>
        <div>
          <div className='flex justify-between items-center w-full'>
            <div className="flex flex-start gap-4 items-center mb-6">
              <div className='bg-accent p-2 rounded-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-dumbbell"><path d="M14.4 14.4 9.6 9.6" /><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" /><path d="m21.5 21.5-1.4-1.4" /><path d="M3.9 3.9 2.5 2.5" /><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" /></svg>
              </div>
              <p className="text-lg">{name}</p> {/* Label below the graph */}
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
            <p className='text-sm md:text-md lg:text-lg'> <span className='text-primary'>{daysLeft}</span> days left until you can <span className='text-primary'> {reward}</span></p>
            <button
              className="btn btn-accent  w-fit"
              onClick={() => setIsModalOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
            </button>
            <button
              className="btn btn-error  w-fit mr-8"
              onClick={() => setIsModal2Open(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
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




      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Confirm Reset</h2>
              <button
                className="btn btn-square btn-sm"
                onClick={() => setIsModalOpen(false)}
              >
                x
              </button>
            </div>
            <p className="mt-2">Are you sure you want to reset the contribution graph? This action cannot be undone.</p>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleReset(id)
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
              <h2 className="text-lg font-bold">Confirm Delete</h2>
              <button
                className="btn btn-square btn-sm"
                onClick={() => setIsModal2Open(false)}
              >
                x
              </button>
            </div>
            <p className="mt-2">Are you sure you want to delete the contribution graph? This action cannot be undone.</p>
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