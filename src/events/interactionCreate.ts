import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";
import { Interaction } from "../types/Command";

export default new Event('interactionCreate', async interaction => {
     if (interaction.isCommand()) {
          const command = client.commands.get(interaction.commandName);

          if (!command) return;

          command.run({
               args: interaction.options as CommandInteractionOptionResolver,
               client,
               interaction: interaction as Interaction
          });
     }
});