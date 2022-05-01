import { client } from '../..';
import { Command } from "../../structures/Command";
import axios from 'axios';
import { UserRequestObject } from '../../types/User';
import { UserModel } from '../../database/Schemas/User';
import { MessageEmbed } from 'discord.js';
import { Group, GroupRequest } from '../../types/Group';
import { VerifyModel } from '../../database/Schemas/Verify';
import { error_embed, warning_embed } from '../../structures/Functions';

export default new Command({
     name: 'verify',
     description: `Verify your Roblox account with the bot`,
     defaultPermission: true,
     options: [
          {
               name: 'username',
               type: 'STRING',
               description: 'The username you want to verify with',
               required: true
          }
     ],
     run: async ({ interaction }) => {
          let username = interaction.options.getString('username');

          const userValidation = await axios.get(`https://api.roblox.com/users/get-by-username?username=${username}`);
          const userRequest: UserRequestObject = userValidation.data.success === false ? null : userValidation.data;
          if (userRequest === null) return interaction.followUp({ embeds: [ error_embed(`An error has occurred. An invalid username was likely entered.`) ] });

          const verifiedCheck = await UserModel.findOne({ discordId: interaction.user.id });
          if (verifiedCheck) return interaction.followUp({ embeds: [ error_embed(`You're already verified with the bot.`) ] });
          
          const userCheck = await UserModel.findOne({ username: userRequest.Username });
          if (userCheck) return interaction.followUp({ embeds: [ error_embed(`That username is already verified to another user. If you believe this is a mistake, please contact an admin.`) ] });

          const verificationCheck = await VerifyModel.findOne({ discordId: interaction.user.id });
          if (verificationCheck) return interaction.followUp({ embeds: [ warning_embed(`You've already started the verification process. Your code is ${verificationCheck.get('code')}\n${username}`) ] });

          const tRaw = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userRequest.Id}&size=180x180&format=Png&isCircular=true`);
          const thumbnail = tRaw.data.data[0].imageUrl;

          const verificationCode = Math.floor(Math.pow(10, 5) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 5) - 1));

          const groupsData = await axios.get(`https://groups.roblox.com/v1/users/${userRequest.Id}/groups/roles`);
          const unfilteredGroups: GroupRequest[] = groupsData.data.data;

          let sanitizedGroups: Group[] = [];

          let groups: GroupRequest[] = unfilteredGroups.filter(group => {
               return (client.whitelistedGroups.indexOf(group.group.id) > -1);
          });

          groups.map(group => sanitizedGroups.push({ id: group.group.id, points: 0, rank: group.role.name, rankType: 'Standard' }));

          if (groups.length < 1) return interaction.followUp({ embeds: [ error_embed(`You aren't in any groups monitored by this bot. Please join the main group before verifying.`) ] });

          VerifyModel.create({
               channelId: interaction.channel.id,
               discordId: interaction.user.id,
               username: userRequest.Username,
               robloxId: userRequest.Id,
               groups: sanitizedGroups,
               code: verificationCode
          });
          
          const verificationEmbed = new MessageEmbed()
               .setColor('BLUE')
               .setThumbnail(thumbnail)
               .setDescription(`Enter [this place](https://www.roblox.com/games/9361801909/Imperial-Verification 'Imperial Verification') and enter the code provided below. This will verify your Roblox account with the bot.`)
               .setTitle(`Verification Process | ${userRequest.Username}`)
               .addFields([
                    { name: 'Username', value: userRequest.Username, inline: true },
                    { name: 'ID', value: `${userRequest.Id}`, inline: true },
                    { name: 'Groups', value: `${groups.map(group => `${group.group.name} | ${group.role.name}`).join('\n')}` },
                    { name: 'Verification Code', value: `${verificationCode}` }
               ])
               .setTimestamp()
               .setFooter({ text: 'Imperial Monitor | Developed by Robert (ForceAegis)' });

          return interaction.followUp({ embeds: [ verificationEmbed ] });
     }
});