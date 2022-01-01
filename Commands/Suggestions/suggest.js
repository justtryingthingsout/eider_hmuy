const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'suggest',
	description: 'Suggest something!',
	cooldown: 10,
	usage: 'suggest <suggestion>',
	args: 'full',
	async execute(client, message, args) {
		client.data.ensure(`guild.${message.guild.id}.suggestTotal`, 0);
		client.data.set(`guild.${message.guild.id}.suggestTotal`, client.data.get(`guild.${message.guild.id}.suggestTotal`) + 1);
		const suggestionnum = client.data.get(`guild.${message.guild.id}.suggestTotal`);

		if (!client.data.get(`guild.${message.guild.id}.suggestChannel`)) {
			message.reply('Suggestions are disabled in this guild!');
		}

		const embed = new MessageEmbed()
			.setTitle(`Suggestion #${suggestionnum}`)
			.setDescription(args)
			.setColor('BLUE')
			.setAuthor(message.author.tag, message.author.avatarURL());
		client.data.set('guild.${message.guild.id}.suggestion.' + suggestionnum, args);
		const channel = client.channels.cache.get(client.data.get(`guild.${message.guild.id}.suggestChannel`));
		channel.send({ embeds: [embed] }).then(embedMessage => {
			embedMessage.react('⬆️');
			embedMessage.react('⬇️');
		});
		message.delete();
		const sent = await message.channel.send(`Suggestion #${suggestionnum} submitted!`);
		setTimeout(function(){
			sent.delete();
		}, 4000);
	},
};