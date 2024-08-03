'use client'
import React, { useEffect, useState } from 'react';
import ContributionGraph from "@/components/ui/Graph";
import { handleRequest } from '@/utils/auth-helpers/client';
import { storeHabit } from '@/utils/habits/server';
import { useRouter } from 'next/navigation';
import { HabitRow } from '@/types_db';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

interface GraphListProps {
  user: User;
}

export default function GraphList({ user }: GraphListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', days: '', reward: '', startDate: new Date() });
  const [submitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [habitsList, setHabits] = useState<HabitRow[]>([])

  const fetchHabits = async (user_id: string) => {
    const { data: habits, error } = await supabase.from('habits').select().eq('user_id', user.id);
    if (error) {
      throw new Error(error.message)
    }
    setHabits(habits)
  }

  useEffect(() => {
    fetchHabits(user?.id)
  }, [user])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const reward = formData.get('reward') as string;
    const days = formData.get('days') as string;


    try {
      const response = await fetch('/api/habits', {
        method: 'post',
        body: JSON.stringify({
          name, reward, days,
        })
      })
      if (response.status === 200) {
        setIsSubmitting(false)
        setIsModalOpen(false)
        fetchHabits(user?.id)
        setFormData({ name: '', days: '', reward: '', startDate: new Date() })
      }
    } catch (e) {
      console.log(111, {e})
    }
  };

  return (
    <div className="bg-base-200 flex flex-col items-center min-h-screen gap-8 w-full ">
      <button
        className="btn btn-primary"
        onClick={() => setIsModalOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        Create New Graph
      </button>
      <div className="max-w-5xl flex flex-wrap items-stretch gap-8 w-full">
        {habitsList.map(habit => (
          <ContributionGraph key={habit.id} habit={habit} />
        ))}
      </div>

      {/* DaisyUI Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Create New Graph</h2>
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
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input input-bordered w-full mb-2"
                />
                <input
                  type="number"
                  name='days'
                  placeholder="Days"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                  className="input input-bordered w-full mb-2"
                />
                <textarea
                  name="reward"
                  placeholder="Reward Text"
                  value={formData.reward}
                  onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                  className="textarea textarea-bordered w-full mb-4"
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
