import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface Rank {
     name: string;
     rank: number;
     points: number;
     next_name: string;
     previous_name: string;
     obtainable: boolean;
     type: string;
     discordId: string;
}

const Rank = new Schema<Rank>({
     name: { type: String, required: true },
     rank: { type: Number, required: true },
     points: { type: Number, required: true },
     next_name: { type: String, required: true },
     previous_name: { type: String, required: true },
     obtainable: { type: Boolean, required: true },
     type: { type: String, required: true },
     discordId: { type: String, required: true }
});

interface Guild {
     discordId: string;
     username: string;
     robloxId: number;
     ranks: Rank[]
}


interface Guild {
     id: string,
     prefix: string;
     welcomeChannel: string | null;
     robloxGroup: number | null;
     ranks: Rank[]
}

const Guild = new Schema<Guild>({
     id: { type: String, required: true, unique: true },
     prefix: { type: String, required: false, default: '!' },
     welcomeChannel: { type: String, required: false, default: null },
     robloxGroup: { type: Number, required: false, default: null },
     ranks: [Rank]
});

export const GuildModel = mongoose.model<Guild>('Guild', Guild);