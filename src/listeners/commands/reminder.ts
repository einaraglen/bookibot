import { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js'
import { getUsername, getUsers } from '../../firebase/users'
import { Command } from '../../command'
import { getToday } from '../../firebase/task'
import { Entry, Post } from '../../firebase/types'

export const Reminder: Command = {
  name: 'reminder',
  description: 'Remind your colleagues to post about their tasks!',
  type: 'CHAT_INPUT',
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    try {
      const users: string[] | undefined = await getUsers()
      const will: Entry | undefined = await getToday('will')
      const did: Entry | undefined = await getToday('did')
      let message = new MessageEmbed().setTitle('Reminder to @everyone')

      if (users) {
        for (const i in users) {
          const username: string | undefined = await getUsername(users[i])
          const hasWill: Post | undefined = will && will[users[i]]
          const hasDid: Post | undefined = did && did[users[i]]

          message.addField(`${username || 'USERNAME_MISSING'}`, `Will: ${hasWill ? '✅' : '⛔'} - Did: ${hasDid ? '✅' : '⛔'}`, false)
        }
      } else {
        message.setDescription('No Users Found')
      }

      message.setTimestamp()

      console.log(`Replying to - Reminder Command`)
      await interaction.followUp({ embeds: [message] })
    } catch (err) {
      console.warn(err)
      await interaction.followUp({ content: 'Something went wrong' })
    }
  },
}
