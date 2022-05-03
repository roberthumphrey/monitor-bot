import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface Group {
     id: number;
     points: number;
     rankType: string;
     rank: string;
}

const Group = new Schema<Group>({
     id: { type: Number, required: true },
     points: { type: Number, required: true },
     rankType: { type: String, required: true },
     rank: { type: String, required: true }
});

export interface User {
     discordId: string;
     username: string;
     robloxId: number;
     groups: Group[]
}

const User = new Schema<User>({
     discordId: { type: String, required: true },
     username: { type: String, required: true },
     robloxId: { type: Number, required: true },
     groups: [Group]
});

export const UserModel = mongoose.model<User>('User', User);