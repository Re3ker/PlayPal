import Discord from 'discord.js';
import BotConfig from './../../config.js';
export default {
  name: 'prune',
  description: 'Prune up to 100 messages.',
  category: 'moderation',
  args: ['amount'],
  async execute(message, args) {
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(':no_entry: You have no permission for this command');
    if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.channel.send(':no_entry: Missing Permission MANAGE_MESSAGES');
    if (!args.length) return message.channel.send(":no_entry: Missing amount");
    let processMsg = await message.channel.send(":orange_circle: Processing...").then(msg => msg);
    const amount = parseInt(args[0]);

    if (isNaN(amount)) {
			return message.reply(':no_entry: Not a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply(':no_entry: Invalid Amount.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      processMsg.delete().catch(error => console.error);
      message.channel.send(':red_circle: There was an error trying to prune messages in this channel!').then(msg => {
        msg.delete({timeout: 3000}).catch(error => console.error);
      }).catch(error => console.error);
		}).then(messages => {
      processMsg.delete().catch(error => console.error);
      message.channel.send(`:green_circle: Deleted **${amount}** messages`).then(msg => {
        msg.delete({timeout: 3000}).catch(error => console.error);
      }).catch(error => console.error);
    });
  }
}
