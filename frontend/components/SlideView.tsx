'use client';

import { Slide } from "@/types";
import { usePresentationStore } from "@/lib/store";
import ChartRenderer from './ChartRenderer';

interface Props {
    slide: Slide;
    index: number;
}

export default function SlideView({ slide, index }: Props) {
    const { updateSlide } = usePresentationStore();

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updated = { ...slide, title: e.target.value };
        updateSlide(index, updated);
    };

    const handleBulletChange = (i: number, value: string) => {
        const newBullets =  [...slide.bullets];
        newBullets[i] = value;
        const updated = { ...slide, bullets: newBullets };
        updateSlide(index, updated);
    };

    return (
        <div className="p-4">
            <input type="text" value={slide.title} onChange={handleTitleChange} className="text-2xl font-bold w-full border-b focus:outline-none mb-4"/>
            <ul className="list-disc list-inside space-y-2">
                {slide.bullets.map((bullet, i) => (
                    <li key={i}>
                        <input type="text" value={bullet} onChange={(e) => handleBulletChange(i, e.target.value)} className="w-full border-b focues:outline-none" />
                    </li>
                ))}
            </ul>
            {slide.chart && (
                <div className="mt-4">
                    <ChartRenderer chart={slide.chart} />
                </div>
            )}
        </div>
    );
}

