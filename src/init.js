import { sendMessage } from './send-slack-message.js'
import { getOpenedMergeRequests } from './get-merge-requests.js'
import { formatMessageFromMRsArray } from './format-message-from-mrs-array.js'

export async function init() {
  try {
    const openedMRsArray = await getOpenedMergeRequests()
    const blocks = formatMessageFromMRsArray(openedMRsArray)
    await sendMessage({
        channel: process.env.SLACK_CHANNEL,
        blocks,
    })
  } catch (err) {
    console.log(err)
  }
}