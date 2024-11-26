'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NoteFormProps {
    noteId?: string;
}

export default function NoteForm({ noteId }: NoteFormProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(!!noteId);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (noteId) {
            fetchNote();
        }
    }, [noteId]);

    const fetchNote = async () => {
        try {
            const response = await axios.get(`/api/notes/${noteId}`);
            const note = response.data.note;
            setTitle(note.title);
            setContent(note.content);
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Failed to fetch note';
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive',
            });
            router.push('/notes');
        } finally {
            setFetchLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (noteId) {
                await axios.put(`/api/notes/${noteId}`, { title, content });
                toast({
                    title: 'Success',
                    description: 'Note updated successfully',
                });
            } else {
                await axios.post('/api/notes', { title, content });
                toast({
                    title: 'Success',
                    description: 'Note created successfully',
                });
            }
            router.push('/notes');
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Failed to save note';
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="container mx-auto p-4">
                <div className="flex justify-center items-center min-h-[200px]">
                    <p>Loading note...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>{noteId ? 'Edit Note' : 'Create New Note'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                type="text"
                                placeholder="Note Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <Textarea
                                placeholder="Note Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows={10}
                                disabled={loading}
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/notes')}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Note'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
