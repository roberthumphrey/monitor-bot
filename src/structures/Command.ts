import { CommandType } from "../types/Command";

export class Command {
     constructor(options: CommandType) {
          Object.assign(this, options);
     }
}