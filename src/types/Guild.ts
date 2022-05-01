import { Rank } from "./Group";

export type GuildConfig = {
     id: string;
     prefix: string;
     welcomeChannel: string | null; 
     robloxGroup: number | null;
     ranks: Rank[];
}