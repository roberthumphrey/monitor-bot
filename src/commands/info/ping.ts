import { client } from '../..';
import { Command } from "../../structures/Command";

export default new Command({
     name: 'ping',
     description: `Shows bot client's ping to Discord`,
     run: async ({ interaction }) => {
          interaction.followUp(`Connected to Discord: ${client.ws.ping}ms`);
     }
})