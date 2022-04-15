import { client } from "..";
import { Event } from "../structures/Event";

export default new Event('guildMemberAdd', member => {
     const config = client.configs.get(member.guild.id);

     if (!config) return;
     if (config.welcomeChannel || config.welcomeChannel !== null) {
          const channel = member.guild.channels.cache.get(config.welcomeChannel);

          if (!channel) member.guild.fetchOwner().then(owner => owner.user.send('There was an error with the way your Welcome Channel is set up. Please fix this on the dashboard.'));
          if (channel.type === 'GUILD_TEXT') return channel.send(`Welcome ${member}!`);
     }
});