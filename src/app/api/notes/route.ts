import { NextResponse, Request } from "next/server";
import connectDB from "@/dbConfig";
import Note from "@/model/note";
import { auth } from "@/auth";
import mongoose from "mongoose";

connectDB();

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Get user ID from email
        const user = await mongoose.models.User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const reqBody = await req.json();
        const { title, content } = reqBody;

        const newNote = new Note({
            title,
            content,
            userId: user._id
        });

        const savedNote = await newNote.save();
        
        return NextResponse.json({
            message: "Note created successfully",
            success: true,
            savedNote
        });

    } catch (error) {
        console.error('Error creating note:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create note' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Get user ID from email
        const user = await mongoose.models.User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const notes = await Note.find({ userId: user._id }).sort({ createdAt: -1 });

        return NextResponse.json({
            message: "Notes fetched successfully",
            success: true,
            notes
        });

    } catch (error) {
        console.error('Error fetching notes:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to fetch notes' }, { status: 500 });
    }
}
