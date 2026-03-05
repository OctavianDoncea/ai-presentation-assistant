export interface ChartData {
    type: string;
    data: any;
}

export interface Slide {
    title: string;
    bullets: string[];
    chart?: ChartData;
}

export interface Presentation {
    id: number;
    title: string;
    content: Slide[];
    created_at: string;
    updated_at?: string;
}