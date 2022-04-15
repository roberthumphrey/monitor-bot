import { GuildModel } from "../database/Schemas/Guild";
import { Event } from "../structures/Event";

export default new Event('guildCreate', async guild => {
     try {
          const guildConfig = await GuildModel.findOne({ id: guild.id });

          if (guildConfig) return;

          await GuildModel.create({ id: guild.id });
     } catch (error) {
          console.log(error);
     }
});