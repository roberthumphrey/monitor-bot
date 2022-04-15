import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface Guild {
     id: string,
     prefix: string;
     welcomeChannel: string | null;
     robloxGroup: number | null;
}

const Guild = new Schema<Guild>({
     id: { type: String, required: true, unique: true },
     prefix: { type: String, required: false, default: '!' },
     welcomeChannel: { type: String, required: false, default: null },
     robloxGroup: { type: Number, required: false, default: null }
});

export const GuildModel = mongoose.model<Guild>('Guild', Guild);