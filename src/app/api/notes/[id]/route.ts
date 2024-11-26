import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig";
import Note from "@/model/note";
import { auth } from "@/auth";
import mongoose from "mongoose";

connectDB();

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const { id } = params;

        const note = await Note.findOneAndDelete({ _id: id, userId: user._id });
        
        if (!note) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Note deleted successfully",
            success: true
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
