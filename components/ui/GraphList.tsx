'use client'
import React, { useState } from 'react';
import ContributionGraph from "@/components/ui/Graph";

export default function GraphList() {
  const [graphs, setGraphs] = useState([
    { id: 1, numDays:  10, startDate: new Date('2024-08-01'), name: 'Gym', reward: 'buy protein' },
    { id: 1, numDays:  40, startDate: new Date('2024-08-01'), name: 'Gym', reward: 'buy protein' },
    { id: 1, numDays:  90, startDate: new Date('2024-08-01'), name: 'Gym', reward: 'buy protein' },
    { id: 1, numDays:  150, startDate: new Date('2024-08-01'), name: 'Gym', reward: 'buy protein' },
    { id: 1, numDays:  200, startDate: new Date('2024-08-01'), name: 'Gym', reward: 'buy protein' },
    { id: 1, numDays:  300, startDate: new Date('2024-08-01'), name: 'Gym', reward: 'buy protein' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', days: '', reward: '', startDate: new Date() });

  const handleAddGraph = () => {
    const newId = graphs.length + 1;
    const newGraph = {
      id: newId,
      name: formData.name,
      reward: formData.reward,
      numDays: parseInt(formData.days, 10),
      startDate: formData.startDate,
    };
    setGraphs([...graphs, newGraph]);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-base-200 flex flex-col items-center min-h-screen gap-8 w-full ">
         <button 
          className="btn btn-primary  "
          onClick={() => setIsModalOpen(true)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Create New Graph
        </button>
      <div className="max-w-5xl flex flex-wrap items-stretch gap-8 w-full">
        {graphs.map(graph => (
          <ContributionGraph 
            key={graph.id} 
            name={graph.name}
            reward={graph.reward}
            numDays={graph.numDays} 
            startDate={graph.startDate} 
          />
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
              </button>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input input-bordered w-full mb-2"
              />
              <input
                type="number"
                placeholder="Days"
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                className="input input-bordered w-full mb-2"
              />
              <textarea
                placeholder="Reward Text"
                value={formData.reward}
                onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                className="textarea textarea-bordered w-full mb-4"
              />
            </div>
            <div className="modal-action">
              <button 
                className="btn btn-primary"
                onClick={handleAddGraph}
              >
                Create Graph
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
    </div>
  );
}
