export default {
  name: 'ping',
  description: 'pong!',
  category: 'general',
  cooldown: 5,
  async execute(message, args){
    message.channel.send("Pong! `" + `${Date.now() - message.createdTimestamp}` + " ms`");
  }
}