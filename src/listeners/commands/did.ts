import { BaseCommandInteraction, Client, MessageEmbed, User } from 'discord.js'
import { post } from '../../firebase/task'
import { Command } from '../../command'
import { addUser, isUser } from '../../firebase/users'
import { formatPostResponse } from '../../utils/tools'

const TASK_INDEX = 0

export const Did: Command = {
  name: 'did',
  description: "Adds your '🎉 Today I Did' Statement",
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'task',
      description: 'Describe today`s task',
      type: 'STRING',
      required: true,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    try {
      let content: string | MessageEmbed = 'No Task was Received, Try Again 😬'
      const user: User | any | undefined = interaction.member && interaction.member.user
      const options: any = interaction.options.data
      if (user) {
        const exists = await isUser(user.id)
        if (!exists) await addUser(user.id, user.username)
        const task = options[TASK_INDEX]
        if (task) {
          post('did', user.id, task.value)
          content = formatPostResponse('did', user.username, task.value)
        }
      }
      console.log(`Replying to - Did Command`)
      let payload: any = typeof content === 'string' ? { content } : { embeds: [content] }
      await interaction.followUp({ ...payload })
    } catch (err) {
      console.warn(err)
      await interaction.followUp({ content: 'Something Went wrong' })
    }
  },
}
