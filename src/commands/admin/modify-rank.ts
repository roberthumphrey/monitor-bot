import { client } from '../..';
import { GuildModel } from '../../database/Schemas/Guild';
import { Command } from "../../structures/Command";
import axios from 'axios';
import { GuildConfig } from '../../types/Guild';

export default new Command({
     name: 'modify-rank',
     description: `Modifies a specific rank's properties`,
     commandType: "admin",
     defaultPermission: false,
     userPermissions: ['MANAGE_GUILD'],
     options: [
          {
               name: 'rank',
               type: 'INTEGER',
               description: 'The number of the rank you wish to modify',
               required: true
          },
          {
               name: 'key',
               type: 'STRING',
               description: 'The property of the rank you wish to modify',
               choices: [
                    {
                         name: 'points',
                         value: 'points'
                    },
                    {
                         name: 'next_name',
                         value: 'next_name',
                    },
                    {
                         name: 'previous_name',
                         value: 'previous_name'
                    }
               ],
               required: true
          },
          {
               name: 'value',
               type: 'STRING',
               description: 'The new value you want to set for the property',
               required: true
          }
     ],
     run: async ({ interaction }) => {
          const rank = interaction.options.getInteger('rank');
          const key = interaction.options.getString('key');
          const value = interaction.options.getString('value');

          if (key === 'points') {
               let config = await GuildModel.findOneAndUpdate({
                    id: interaction.guildId, 
                    "ranks.rank": rank
               }, { 
                    $set: {
                         'ranks.$.points': Number(value)
                    }
               }, { new: true, returnDocument: 'after' });

               client.updateConfig(config);
          } else if (key === 'next_name') {
               let config = await GuildModel.findOneAndUpdate({
                    id: interaction.guildId, 
                    "ranks.rank": rank
               }, { 
                    $set: {
                         'ranks.$.next_name': value
                    }
               }, { new: true, returnDocument: 'after' });

               client.updateConfig(config);
          } else {
               let config = await GuildModel.findOneAndUpdate({
                    id: interaction.guildId, 
                    "ranks.rank": rank
               }, { 
                    $set: {
                         'ranks.$.previous_name': value
                    }
               }, { new: true, returnDocument: 'after' });

               client.updateConfig(config);
          }

          return interaction.followUp('Rank Modified');
     }
});