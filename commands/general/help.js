import Discord from 'discord.js';
import BotConfig from './../../config.js';
export default {
  name: 'help',
  description: 'returns THIS',
  category: 'general',
  aliases: ['h'],
  async execute(message, args) {
    let rich = new Discord.MessageEmbed();
    rich.setTitle(`**List of commands**`);
    let helpText = '';

    let lastCategory = '';
    let currentCategory = '';
    for(let item of global.commands){
      let command = item[1];
      if(command.disabled) continue;
      currentCategory = command.category;
      if(currentCategory !== lastCategory){
        helpText += `\n**${currentCategory.toUpperCase()}**\n`;
      }
      let args = (command.args !== undefined ? command.args.map(arg => ` [${arg}]`):'');
      let aliases = (command.aliases !== undefined ? ' Alias: ' + command.aliases.map(alias => ` ${alias}`):'');
      helpText += `**${global.prefix}${command.name}${args}** ${command.description}.${aliases}\n`;

      lastCategory = currentCategory;
    }

    rich.setDescription(helpText);
    rich.setColor(BotConfig.BOT_COLOR);
    message.channel.send(rich);
  }
}
