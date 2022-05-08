import { User } from "../database/Schemas/User";

export type Data = {
     channelId: string;
     server: string;
     user: User;
}

export type Pong = {
     time: number;
}

export type ServerToClient = {
     VERIFICATION_COMPLETE: (data: Data) => void;
     pong: (pong: Pong) => void;
}

export type ClientToServer = {
     ping: (data: Object) => void;
}