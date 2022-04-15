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

interface Verify {
     channelId: string;
     discordId: string;
     username: string;
     robloxId: Number;
     groups: Group[];
     code: number;
}

const Verify = new Schema<Verify>({
     channelId: { type: String, required: true },
     discordId: { type: String, required: true, unique: true },
     username: { type: String, required: true },
     robloxId: { type: Number, required: true },
     groups: [Group],
     code: { type: Number, required: true }
}, { collection: 'verify' });

export const VerifyModel = mongoose.model<Verify>('Verify', Verify);