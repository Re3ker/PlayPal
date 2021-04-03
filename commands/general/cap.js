import Discord from 'discord.js';
import BotConfig from './../../config.js';
export default {
  name: 'cap',
  description: 'Stell das User-Limit für den Channel ein.',
  category: 'general',
  args: ['limit'],
  async execute(message, args) {
    if(!message.member.voice.channel) return;
    if (!args.length) return MessageToChannel(message, `:red_circle: Bitte gib ein Limit zwischen 1 und 12 an.`);
    
    const limit = parseInt(args[0]);
    if (isNaN(limit)) {
      return MessageToChannel(message, `:red_circle: Keine gültige Nummer.`);
		} else if (limit < 1 || limit > 12) {
      return MessageToChannel(message, `:red_circle: Limit muss zwischen 1 und 12 liegen.`);
		}
    
    
    let voiceChannel = message.member.voice.channel;
    if(!voiceChannel.parent) return;
    if(!voiceChannel.parent.name) return;

    let categoryName = voiceChannel.parent.name;
    let cappableCategories = ['Einsatztrupp Räume', 'PVP Räume'];
    if(!cappableCategories.includes(categoryName)) return MessageToChannel(message, 'Nur die Einsatztrupp und PVP Räume können bearbeitet werden!');

    voiceChannel.setUserLimit(limit).then(vc => {
      return MessageToChannel(message, `:green_circle: Das User-Limit von "${vc.name}" wurde auf **${vc.userLimit}** gesetzt.`);
    }).catch(error => console.error);
  }
}

function MessageToChannel(message, content){
  return message.channel.send(content).then(msg => {
    message.delete({timeout: 3500}).catch(error => console.error);
    msg.delete({timeout: 3500}).catch(error => console.error);
  }).catch(error => console.error);
}