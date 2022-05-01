import { client } from '../..';
import { GuildModel } from '../../database/Schemas/Guild';
import { Command } from "../../structures/Command";
import axios from 'axios';

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
                         name: 'Points',
                         value: 'points'
                    },
                    {
                         name: 'Next Name',
                         value: 'next_name',
                    },
                    {
                         name: 'Previous Name',
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

          console.log('rank:key VALUE', `${rank}:${key} ${value}`);

          return interaction.followUp('Rank Modified');
     }
});