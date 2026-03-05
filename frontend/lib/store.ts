import { create } from 'zustand';
import { Slide } from '@/types';

interface PresentationState {
    title: string;
    slides: Slide[];
    currentSlideIndex: number;
    loading: boolean;
    error: string | null;
    setTitle: (title: string) => void;
    setSlides: (slides: Slide[]) => void;
    setCurrentSlideIndex: (index: number) => void;
    updateSlide: (index: number, updatedSlide: Slide) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const usePresentationStore = create<PresentationState>((set) => ({
    title: 'Untitled presentation',
    slides: [],
    currentSlideIndex: 0,
    loading: false,
    error: null,
    setTitle: (title) => set({ title }),
    setSlides: (slides) => set({ slides, currentSlideIndex: 0 }),
    setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),
    updateSlide: (index, updatedSlide) => 
        set((state) => {
            const newSlides = [...state.slides];
            newSlides[index] = updatedSlide;
            return { slides: newSlides };
        }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    reset: () => set({ title: 'Untitled Presentation', slides: [], currentSlideIndex: 0, error: null }),
}));