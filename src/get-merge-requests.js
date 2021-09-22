import axios from 'axios'

const gitlabEndpoint = axios.create({
    baseURL: process.env.GITLAB_URL,
})

export const getOpenedMergeRequests = async () => {
    const res = await gitlabEndpoint.get(
        `/groups/${process.env.GITLAB_PROJECT_ID}/merge_requests?state=opened`, {
        headers: {
            Authorization: `Bearer ${process.env.GITLAB_PROJECT_ACCESS_TOKEN}`
        }
    })
    return res.data
}
