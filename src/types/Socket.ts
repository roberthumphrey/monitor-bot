import { User } from "../database/Schemas/User";

type Data = {
     channelId: string;
     server: string;
     user: User;
}

type Pong = {
     time: number;
}

export type ServerToClient = {
     VERIFICATION_COMPLETE: (data: Data) => void;
     pong: (pong: Pong) => void;
}

export type ClientToServer = {
     ping: () => void;
}