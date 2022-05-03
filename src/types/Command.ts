import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember, PermissionResolvable } from "discord.js";
import { ImperialClient } from "../structures/Client";

export interface Interaction extends CommandInteraction {
     member: GuildMember;
}

interface RunOptions {
     client: ImperialClient;
     interaction: Interaction;
     args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
     userPermissions?: PermissionResolvable[];
     commandType?: string;
     run: RunFunction;
} & ChatInputApplicationCommandData;