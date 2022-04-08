const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'guildMemberRemove',
    async execute(client, member) {
        try {
            const embed = new MessageEmbed()
                .setAuthor(member.user.username + '#' + member.user.discriminator, `${member.user.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setDescription(`:airplane: <@!${member.user.id}> has left the server.`)
                .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setColor('BLUE')
                .setFooter(`${member.guild.name}`)
                .setTimestamp();
            const logChannel = client.channels.cache.get(client.data.get(`guild.${member.guild.id}.logChannel`));
            logChannel.send({embeds: [embed]});
        } catch (err) {
        }
    }
};