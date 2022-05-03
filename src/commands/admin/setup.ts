import { client } from '../..';
import { GuildModel } from '../../database/Schemas/Guild';
import { Command } from "../../structures/Command";
import axios from 'axios';
import { Group, GroupRole, GroupRolesRequest, Rank } from '../../types/Group';

export default new Command({
     name: 'setup',
     description: `Link current server to a group ID`,
     defaultPermission: false,
     userPermissions: ['MANAGE_GUILD'],
     commandType: "admin",
     options: [
          {
               name: 'group_id',
               type: 'INTEGER',
               description: 'The group that you want to link to the server',
               required: true
          }
     ],
     run: async ({ interaction }) => {
          let id = interaction.options.getInteger('group_id');

          let groupSearch: GroupRolesRequest = await (await axios.get(`https://groups.roblox.com/v1/groups/${id}/roles`)).data;
          let roles: GroupRole[] = groupSearch.roles.filter(role => role.rank !== 0);
          let ranks: Rank[] = [];

          roles.map(role => {
               let name = role.name;
               let rank = role.rank;

               let type = rank >= 0 && rank < 7 ? "Standard" : rank >= 7 && rank < 12 ? "Officer" : "High Command";
               let obtainable = rank >= 0 && rank < 7 ? true : false;

               ranks.push({
                    name: name,
                    rank: rank,
                    points: 0,
                    next_name: '',
                    previous_name: '',
                    obtainable,
                    type,
                    discordId: ''
               });
          });

          let config = await GuildModel.findOneAndUpdate({ id: interaction.guildId }, { robloxGroup: id, $push: { ranks } }, { new: true, returnDocument: 'after' });

          client.updateConfig(config);

          return interaction.followUp(`Got ${ranks.length} ranks`);
     }
});