'use client'
import React, { useEffect, useMemo, useState } from 'react';
import ContributionGraph from "@/components/ui/Graph";
import { handleRequest } from '@/utils/auth-helpers/client';
import { storeHabit } from '@/utils/habits/server';
import { useRouter } from 'next/navigation';
import { HabitRow } from '@/types_db';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { getRandomMotivationalQuote } from '@/utils/constants';
import BadgeUi from './Badge';
import * as Icons from 'lucide-react';

interface GraphListProps {
  user: User;
  streak: number;
}

export default function GraphList({ user, streak }: GraphListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', days: '', reward: '', startDate: new Date(), icon: '' });
  const [submitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const [showQuote, setShowQuote] = useState(true)
  const [habitsList, setHabits] = useState<HabitRow[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuote(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const quote = useMemo(() => getRandomMotivationalQuote(), [showQuote])

  const fetchHabits = async (user_id: string) => {
    const { data: habits, error } = await supabase.from('habits').select().eq('user_id', user.id);
    if (error) {
      throw new Error(error.message)
    }
    setHabits(habits)
  }
  console.log(111, { habitsList})

  useEffect(() => {
    fetchHabits(user?.id)
  }, [user])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataEvent = new FormData(e.currentTarget);
    const name = formDataEvent.get('name') as string;
    const reward = formDataEvent.get('reward') as string;
    const days = formDataEvent.get('days') as string;
    const icon = formData.icon as string;
 
    try {
      const response = await fetch('/api/habits', {
        method: 'post',
        body: JSON.stringify({
          name, reward, days, icon
        })
      })
      if (response.status === 200) {
        setIsSubmitting(false)
        setIsModalOpen(false)
        fetchHabits(user?.id)
        setFormData({ name: '', days: '', reward: '', startDate: new Date(), icon: '' })
      }
    } catch (e) {
      console.log(111, { e })
    }
  };

  const handleReset = async (id: string, daysCompleted: number, deleted?: boolean) => {
    try {
      const response = await fetch(`/api/habits?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          daysCompleted,
          deleted
        })
      })
      if (response.status === 200) {
        fetchHabits(user?.id)

      }
    } catch (e) {
      console.log(111, { e })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/habits?id=${id}`, {
        method: 'DELETE',
      })
      if (response.status === 200) {
        fetchHabits(user?.id)
      }
    } catch (e) {
      console.log(111, { e })
    }
  }

  const onSelectIcon = (icon: string) => {
    setFormData({...formData, icon})
  }

  console.log(111, { formData})

  return (
    <div className="bg-base-200 flex flex-col items-center min-h-screen gap-8 w-full ">
      <BadgeUi streak={streak} />
      {!habitsList.length || showQuote && (
        <div>
          <p className='text-accent-main text-2xl text-center w-full'>{quote}</p>
        </div>
      )}

      {!showQuote && (
        <>
          <div className="max-w-5xl flex flex-wrap items-stretch gap-8 w-full">
            {habitsList.map(habit => (
              <ContributionGraph key={habit.id} habit={habit} handleDelete={handleDelete} handleReset={handleReset} handleComplete={(id, daysCompleted) => handleReset(id, daysCompleted, true)} />
            ))}
          </div>

          <button
            className="btn btn-primary "
            onClick={() => setIsModalOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Create New Graph
          </button>
        </>
      )}

      {/* DaisyUI Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold  text-accent-main">Create New Graph</h2>
              <button
                className="btn btn-square btn-sm"
                onClick={() => setIsModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-x">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </button>
            </div>
            <form id='create-new-habit' onSubmit={handleSubmit}>
              <div className="mt-4 ">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px',   padding: '10px' , justifyContent: 'center'}} className='mb-4'>
                  <div className={`${formData.icon === 'HandPlatter' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.HandPlatter size={34} onClick={() => onSelectIcon('HandPlatter')} />
                  </div>
                  <div className={`${formData.icon === 'Dumbbell' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.Dumbbell size={34}  onClick={() => onSelectIcon('Dumbbell')} />
                  </div>
                  <div className={`${formData.icon === 'Briefcase' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.Briefcase size={34}  onClick={() => onSelectIcon('Briefcase')} />
                  </div>
                  <div className={`${formData.icon === 'Play' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.Play size={34}  onClick={() => onSelectIcon('Play')} />
                  </div>
                  <div className={`${formData.icon === 'Medal' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.Medal size={34}  onClick={() => onSelectIcon('Medal')} />
                  </div>
                  <div className={`${formData.icon === 'Luggage' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.Luggage size={34}  onClick={() => onSelectIcon('Luggage')} />
                  </div>
                  <div className={`${formData.icon === 'Coffee' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.Coffee size={34}  onClick={() => onSelectIcon('Coffee')} />
                  </div>
                  <div className={`${formData.icon === 'CupSoda' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.CupSoda size={34} onClick={() => onSelectIcon('CupSoda')}  />
                  </div>
                  <div className={`${formData.icon === 'Circle' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.Circle size={34} onClick={() => onSelectIcon('Circle')}  />
                  </div>
                  <div className={`${formData.icon === 'Clock' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.Clock size={34}  onClick={() => onSelectIcon('Clock')} />
                  </div>
                  <div className={`${formData.icon === 'Cigarette' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.Cigarette size={34}  onClick={() => onSelectIcon('Cigarette')} />
                  </div>
                  <div className={`${formData.icon === 'Citrus' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.Citrus size={34}  onClick={() => onSelectIcon('Citrus')} />
                  </div>
                  <div className={`${formData.icon === 'DollarSign' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.DollarSign size={34} onClick={() => onSelectIcon('DollarSign')}  />
                  </div>
                  <div className={`${formData.icon === 'Activity' ? 'bg-primary': 'bg-accent'}  p-2 rounded-md`} >
                    <Icons.Activity size={34} onClick={() => onSelectIcon('Activity')}  />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input input-bordered w-full mb-2  text-accent-main"
                />
                <input
                  type="number"
                  name='days'
                  placeholder="Days"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                  className="input input-bordered w-full mb-2  text-accent-main"
                />
                <textarea
                  name="reward"
                  placeholder="Reward Text"
                  value={formData.reward}
                  onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                  className="textarea textarea-bordered w-full mb-4  text-accent-main"
                />
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-primary"
                  type='submit'
                >
                  Create Graph
                  {submitting && <span className="loading loading-spinner"></span>}
                </button>
                <button
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  );
}
