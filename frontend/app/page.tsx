'use client';

import TopicInput from "@/components/TopicInput";
import SlideCarousel from "@/components/SlideCarousel";
import SaveButton from "@/components/SaveButton";
import { usePresentationStore } from "@/lib/store";

export default function Home() {
  const { slides, loading, error } = usePresentationStore();

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">AI Presentation Assistant</h1>
      <TopicInput />
      {loading && <p className="mt-4">Generating slides...</p>}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}
      {slides.length > 0 && (
        <>
          <SlideCarousel />
          <div className="mt-4 flex gap-2">
            <SaveButton />
          </div>
        </>
      )}
    </main>
  );
}