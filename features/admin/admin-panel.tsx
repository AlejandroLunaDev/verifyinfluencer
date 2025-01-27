'use client';

import { useState } from 'react';

export const AdminPanel = () => {
  const [influencerName, setInfluencerName] = useState('');
  const [timeRange, setTimeRange] = useState('Last Month');
  const [claimsPerInfluencer, setClaimsPerInfluencer] = useState(50);
  const [selectedJournals, setSelectedJournals] = useState<string[]>([
    'PubMed Central',
    'Science',
    'The Lancet',
    'JAMA Network',
  ]);
  const [notes, setNotes] = useState('');

  const handleJournalToggle = (journal: string) => {
    setSelectedJournals((prev) =>
      prev.includes(journal)
        ? prev.filter((j) => j !== journal)
        : [...prev, journal]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      influencerName,
      timeRange,
      claimsPerInfluencer,
      selectedJournals,
      notes,
    };

    console.log('Submitting research task:', payload);

    // Aquí puedes enviar los datos al backend usando fetch
    // fetch('/api/research-task', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });
  };

  return (
    <div className="p-8 bg-gray-900 text-white rounded-md">
      <h1 className="text-2xl font-bold mb-4">Research Tasks</h1>
      <form onSubmit={handleSubmit}>
        {/* Time Range */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Time Range</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          >
            <option value="Last Week">Last Week</option>
            <option value="Last Month">Last Month</option>
            <option value="Last Year">Last Year</option>
            <option value="All Time">All Time</option>
          </select>
        </div>

        {/* Influencer Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Influencer Name</label>
          <input
            type="text"
            value={influencerName}
            onChange={(e) => setInfluencerName(e.target.value)}
            placeholder="Enter influencer name"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        {/* Claims to Analyze */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Claims to Analyze Per Influencer
          </label>
          <input
            type="number"
            value={claimsPerInfluencer}
            onChange={(e) => setClaimsPerInfluencer(Number(e.target.value))}
            min={10}
            max={100}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        {/* Scientific Journals */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Scientific Journals</label>
          <div className="space-y-2">
            {['PubMed Central', 'Science', 'The Lancet', 'JAMA Network', 'Nature'].map(
              (journal) => (
                <div key={journal} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedJournals.includes(journal)}
                    onChange={() => handleJournalToggle(journal)}
                    className="mr-2"
                  />
                  <label>{journal}</label>
                </div>
              )
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any specific instructions or focus areas"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded font-bold"
        >
          Start Research
        </button>
      </form>
    </div>
  );
};
