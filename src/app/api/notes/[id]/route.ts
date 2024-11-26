import { NextResponse } from "next/server";
import connectDB from "@/dbConfig";
import Note from "@/model/note";
import { auth } from "@/auth";
import mongoose from "mongoose";

connectDB();

interface RouteParams {
    id: string;
}

export async function PUT(
    request: Request,
    { params }: { params: RouteParams }
) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const user = await mongoose.models.User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const { id } = params;
        const reqBody = await request.json();
        const { title, content } = reqBody;

        const note = await Note.findOne({ _id: id, userId: user._id });
        
        if (!note) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        note.title = title;
        note.content = content;
        await note.save();

        return NextResponse.json({
            message: "Note updated successfully",
            success: true,
            note
        });

    } catch (error) {
        console.error('Error updating note:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to update note' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: RouteParams }
) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const user = await mongoose.models.User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const { id } = params;
        const note = await Note.findOne({ _id: id, userId: user._id });
        
        if (!note) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        await note.deleteOne();

        return NextResponse.json({
            message: "Note deleted successfully",
            success: true
        });

    } catch (error) {
        console.error('Error deleting note:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to delete note' }, { status: 500 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: RouteParams }
) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const user = await mongoose.models.User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const { id } = params;
        const note = await Note.findOne({ _id: id, userId: user._id });
        
        if (!note) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Note fetched successfully",
            success: true,
            note
        });

    } catch (error) {
        console.error('Error fetching note:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to fetch note' }, { status: 500 });
    }
}
