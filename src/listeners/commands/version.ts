import { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js'
import { Command } from '../../command'

export const Version: Command = {
  name: 'version',
  description: 'Check current BookiBot version!',
  type: 'CHAT_INPUT',
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const version = process.env.npm_package_version
    const message = new MessageEmbed().setTitle(`BookiBot is running on v${version}`).setTimestamp()
    await interaction.followUp({ embeds: [message] })
  },
}
