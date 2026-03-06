'use client';

import { useState } from 'react';
import { usePresentationStore } from '@/lib/store';
import { generateFromText, generateFromFile } from '@/lib/api';

export default function TopicInput() {
    const [topic, setTopic] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const { setSlides, setLoading, setError, setTitle } = usePresentationStore();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let slides;
            if (file) {
                slides = await generateFromFile(file);
                setTitle(`Presentation from ${file.name}.`);
            } else if (topic.trim()) {
                slides = await generateFromText(topic);
                setTitle(`Presentation on "${topic}"`);
            } else {
                throw new Error('Please enter a topic or upload a file.');
            }
            setSlides(slides);
        } catch (err: any) {
            setError(err.message || 'Failed to generate presentation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
            <div>
                <label htmlFor="topic" className="block text-sm font-medium">Topic or outline</label>
                <textarea id="topic" 
                    value={topic} 
                    onChange={(e) => setTopic(e.target.value)} 
                    rows={3} 
                    className="mt-1 block w-full border rounded p-2"
                    placeholder='Enter your topic or outline'></textarea>
            </div>
            <div>
                <label htmlFor="file" className='block text-sm font-medium'>Or upload a file (PFD, DOCX, CSV)</label>
                <input type="file" id="file" accept=".pdf,.docx,.csv" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mt-1 block w-full" />
            </div>
            <button
                type="submit"
                disabled={(!topic.trim() && !file) || usePresentationStore.getState().loading}
                className='px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50'>
                    Generate presentation
            </button>
        </form>
    );
}