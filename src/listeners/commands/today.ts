import { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js'
import { getPost, getToday } from '../../firebase/task'
import { Command } from '../../command'
import { getUsername } from '../../firebase/users'
import { formatTodayUserResponse } from '../../utils/tools'
import { Entry, Post } from 'src/firebase/types'

const TYPE_INDEX = 0
const USER_INDEX = 1

const handleNoOptions = async (type: 'will' | 'did'): Promise<string | MessageEmbed> => {
  const entry: Entry | undefined = await getToday(type)
  if (entry) {
    let embed = new MessageEmbed().setTitle(`Today the following tasks are listed for - ${type === 'will' ? '🎯 Today I Will' : '🎉 Today I Did'}`)
    for (const id in entry) {
      const username: string | undefined = await getUsername(id)
      const post: Post = entry[id]
      embed.addField(`${username || 'USERNAME_MISSING'} ${type}:`, post.task, false)
    }
    return embed
  }
  return 'No Tasks Found'
}

const handleUserOptions = async (type: 'will' | 'did', id: string): Promise<string | MessageEmbed> => {
  const post: Post | undefined = await getPost(type, id)
  const username: string | undefined = await getUsername(id)
  if (post && username) return formatTodayUserResponse(type, username, post.task)
  return 'No Tasks Found'
}

export const Today: Command = {
  name: 'today',
  description: 'Summary of today`s Tasks 🎯',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'type',
      description: 'Either choose `will` or `did`',
      required: true,
      type: 'STRING',
    },
    {
      name: 'user',
      description: 'Checkout what any user is doing',
      type: 'USER',
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    try {
      let content: string | MessageEmbed = 'No Data was Found, Try Again 😬'
      const options: any = interaction.options.data
      const task = options[TYPE_INDEX]
      if (task) {
        const type = task.value
        if (type === 'will' || type === 'did') {
          const user = options[USER_INDEX]
          content = user ? await handleUserOptions(type, user.value) : await handleNoOptions(type)
        } else {
          content = 'Type has to be `will` or `did`'
        }
      }
      console.log(`Replying to - Today Command`)
      let payload: any = typeof content === 'string' ? { content } : { embeds: [content] }
      await interaction.followUp({ ...payload })
    } catch (err) {
      console.warn(err)
      await interaction.followUp({ content: 'Something went wrong' })
    }
  },
}
