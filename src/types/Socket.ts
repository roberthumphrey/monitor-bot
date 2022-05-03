import { User } from "../database/Schemas/User";

type Data = {
     channelId: string;
     server: string;
     user: User;
}

export type ServerToClient = {
     VERIFICATION_COMPLETE: (data: Data) => void;
}

export type ClientToServer = {}