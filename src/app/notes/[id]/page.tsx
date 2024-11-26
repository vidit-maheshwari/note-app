import NoteForm from '@/components/NoteForm';

export default function EditNotePage({ params }: { params: { id: string } }) {
    return (
        <div>
            <NoteForm noteId={params.id} />
        </div>
    );
}
