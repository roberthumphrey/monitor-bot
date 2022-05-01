import { MessageEmbed } from 'discord.js';
import { client } from '../..';
import { Command } from "../../structures/Command";

export default new Command({
     name: 'ping',
     description: `Shows bot client's ping to Discord`,
     defaultPermission: true,
     run: async ({ interaction }) => {
          interaction.followUp(`Connected to Discord: ${client.ws.ping}ms`);
     }
});