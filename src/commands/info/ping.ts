import { MessageEmbed } from 'discord.js';
import { Command } from "../../structures/Command";
import * as tcpp from 'tcp-ping';
import { client } from '../..';

export default new Command({
     name: 'ping',
     description: `Shows bot client's ping to Discord`,
     run: async ({ interaction }) => {
          let time = new Date().getTime();

          client.socket.emit('ping', { time });

          client.socket.on('pong', (pong) => {               
               tcpp.ping({ address: 'imperialmonitor-api.herokuapp.com', port: 80 }, async (error, data) => {
                    let pingEmbed = new MessageEmbed()
                         .setColor('ORANGE')
                         .setTitle(`Requested by ${interaction.member.user.username}#${interaction.member.user.discriminator}`)
                         .addField('Discord Gateway Latency', `${client.ws.ping}ms`, true)
                         .addField('Astral Gateway Latency', `${pong.time}ms`, true)
                         .addField('Astral API Latency', `${Math.ceil(data.avg)}ms`, true)
                         .setTimestamp()
                         .setFooter({ text: 'Imperial Monitor | Developed by Robert (ForceAegis)' });

                    return await interaction.reply({ embeds: [ pingEmbed ], ephemeral: true });
               });
          });
     }
});