'use client';

import { usePresentationStore } from "@/lib/store";
import { savePresentation } from "@/lib/api";
import { useState } from 'react';

export default function SaveButton() {
    const { title, slides, setError } = usePresentationStore();
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);

        try {
            const saved = await savePresentation(title, slides);
            alert(`Presentation saved with ID ${saved.id}`);
        } catch (err: any) {
            setError(err.message); 
        } finally {
            setSaving(false);
        }
    };

    return (
        <button onClick={handleSave} disabled={saving || slides.length === 0} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Presentation'};
        </button>
    );
}