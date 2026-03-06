'use client';

import { usePresentationStore } from "@/lib/store";
import SlideView from './SlideView';

export default function SlideCarousel() {
    const { slides, currentSlideIndex, setCurrentSlideIndex } = usePresentationStore();

    if (slides.length == 0) return null;

    const handlePrev = () => {
        setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1));
    };
    const handleNext = () => {
        setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1));
    };

    return (
        <div className="relative">
            <div className="overflow-hidden border rounded-1g p-4 min-h-[300px]">
                <SlideView slide={slides[currentSlideIndex]} index={currentSlideIndex}/>
            </div>
            <div className="flex justify-between mt-2">
                <button onClick={handlePrev} disabled={currentSlideIndex === slides.length-1} className="px-3 py-1 bg-gray-200 rounded">Previous</button>
                <span>Slide {currentSlideIndex + 1} of {slides.length}</span>
                <button onClick={handleNext} disabled={currentSlideIndex === slides.length - 1} className="px-3 py-1 bg-gray-200 rounded">Next</button>
            </div>
        </div>
    );
}