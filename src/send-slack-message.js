import axios from 'axios'

const slackEndpoint = axios.create({
    baseURL: process.env.SLACK_WEBHOOK,
})

export const sendMessage = async (message) => {
    return slackEndpoint.post('', message)
}
