import { Suspense } from 'react';
import Notes from '@/components/Notes';

export default function NotesPage() {
    return (
        <div className="container mx-auto p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <Notes />
            </Suspense>
        </div>
    );
}
