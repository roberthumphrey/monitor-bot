import { client } from '../..';
import { GuildModel } from '../../database/Schemas/Guild';
import { Command } from "../../structures/Command";

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
                    },
                    {
                         name: 'discordId',
                         value: 'discordId'
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
          } else if (key === 'previous_name') {
               let config = await GuildModel.findOneAndUpdate({
                    id: interaction.guildId, 
                    "ranks.rank": rank
               }, { 
                    $set: {
                         'ranks.$.previous_name': value
                    }
               }, { new: true, returnDocument: 'after' });

               client.updateConfig(config);
          } else {
               let config = await GuildModel.findOneAndUpdate({
                    id: interaction.guildId, 
                    "ranks.rank": rank
               }, { 
                    $set: {
                         'ranks.$.discordId': value
                    }
               }, { new: true, returnDocument: 'after' });

               console.log(config);

               client.updateConfig(config);
          }

          return interaction.followUp('Rank Modified');
     }
});

/**
 * Cadet 966247083784957952 0
 * Trooper 966247078730801152 10
 * Corporal 966246933398163476 25
 * Sergeant 966246882676441099 50
 * Staff Sergeant 966246817878642708 100
 * Chief 966246734143561798 200
 * Master Chief 966246684596260874
 * Officer Cadet 966246600567586827
 * Lieutenant 966246555558481920
 * Captain 966246503515578399
 * Major 966246413069598760
 * Colonel 966246348481499168
 * General 966246279845912588
 * Marshal 966246208496619520
 * Joint Chiefs of Staff 966246127114534952
 * Imperial Ruling Council 966246070252351519
 * Imperial Enforcer 966246016611414056
 * His Imperial Majesty 966245829855817758
 */