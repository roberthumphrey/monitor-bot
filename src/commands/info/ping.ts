import { MessageEmbed } from 'discord.js';
import { Command } from "../../structures/Command";
import * as tcpp from 'tcp-ping';
import { client } from '../..';

export default new Command({
     name: 'ping',
     description: `Shows bot client's ping to Discord`,
     run: async ({ interaction }) => {
          client.socket.emit('ping');

          client.socket.on('pong', async (pong) => {
               let clientTime = new Date().getTime();
               let serverTime = pong.time;
               let gatewayLatency: number = serverTime - clientTime;
               
               tcpp.ping({ address: 'imperialmonitor-api.herokuapp.com', port: 80 }, (error, data) => {
                    let pingEmbed = new MessageEmbed()
                         .setColor('ORANGE')
                         .setTitle(`Requested by ${interaction.member.user.username}#${interaction.member.user.discriminator}`)
                         .addField('Discord Gateway Latency', `${client.ws.ping}ms`, true)
                         .addField('Astral Gateway Latency', `${gatewayLatency}ms`, true)
                         .addField('Astral API Latency', `${Math.ceil(data.avg)}ms`, true)
                         .setTimestamp()
                         .setFooter({ text: 'Imperial Monitor | Developed by Robert (ForceAegis)' });

                    interaction.followUp({ embeds: [ pingEmbed ], ephemeral: true });
               });
          });
     }
});