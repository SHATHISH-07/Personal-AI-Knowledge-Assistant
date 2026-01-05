export interface User {
    _id: string;
    name?: string;
    email: string;
    isEmailVerified: boolean;
    authProvider: "local" | "google";
    profilePictureUrl?: string;
    isActive?: boolean;
    isArchived?: boolean;
    createdAt?: string;
    updatedAt?: string;
}