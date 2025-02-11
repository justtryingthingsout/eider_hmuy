const {MessageEmbed} = require('discord.js');
const moment = require('moment');
module.exports = {
    name: 'guildMemberAdd',
    async execute(client, member) {
        try {
            console.log(member);
            const embed = new MessageEmbed()
                .setAuthor(member.user.username + '#' + member.user.discriminator, `${member.user.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setDescription(`:airplane_arriving: <@!${member.user.id}> has joined the server.`)
                .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}?size=1024`)
                .addField(`Age of account`, `**${moment(member.user.createdAt).format('LLLL')}\n${moment().diff(member.user.createdAt, 'years')} years ago**`, true)
                .setColor('BLUE')
                .setFooter(`${member.guild.name}`)
                .setTimestamp();
            const logChannel = client.channels.cache.get(client.data.get(`guild.${member.guild.id}.logChannel`));
            logChannel.send({embeds: [embed]});
        } catch (err) {
        }
    }
};