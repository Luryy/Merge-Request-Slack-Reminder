import http from 'http';
import { sendMessage } from './src/send-slack-message.js'
import { getOpenedMergeRequests } from './src/get-merge-requests.js'
import { formatMessageFromMRsArray } from './src/format-message-from-mrs-array.js'

const port = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ name: 'MReminder', ver: '1.0.0' }));
    res.end();
  })
  .listen(port, () => {
    console.info(`Server listening on port ${port}`)
    init()
  });


async function init() {
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
