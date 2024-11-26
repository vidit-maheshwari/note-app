import { auth } from "@/auth";

export const getDataFromToken = async () => {
    try {
        const session = await auth();
        if (!session || !session.user) {
            throw new Error("Not authenticated");
        }
        return session.user.id;
    } catch (error) {
        console.error('Failed to get data from token:', error);
        throw new Error("Not authenticated");
    }
}
