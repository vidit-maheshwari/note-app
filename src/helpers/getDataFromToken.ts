import { NextRequest } from "next/server";
import { auth } from "@/auth";

export const getDataFromToken = async (request: NextRequest) => {
    try {
        const session = await auth();
        if (!session || !session.user) {
            throw new Error("Not authenticated");
        }
        return session.user.id;
    } catch (error: any) {
        throw new Error("Not authenticated");
    }
}
