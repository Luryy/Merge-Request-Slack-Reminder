export const formatMessageFromMRsArray = (mrs) => {
    const blocks = createHeader(mrs.length)
    mrs.forEach(mr => {
		const mrBlock = generateMRBlock(mr);
        blocks.push(...mrBlock)
    })
    return blocks
}

const createHeader = (mrsLength) => {
    const date = `${new Date().getDate()}/${new Date().getMonth() + 1}` //  TODO - UTC +3
	const blocks = [
        {
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": ":merged: MR's em aberto :merged:"
			}
		},
        {
			"type": "section",
			"fields": [
                {
					"text": `\*TOTAL: ${mrsLength}*`,
					"type": "mrkdwn"
				},
				{
					"text": `*${date}* | Daily review list`,
					"type": "mrkdwn"
				}
			]
		},
        {
			"type": "divider"
		}
    ]
	return blocks
}

const generateMRBlock = (mr) => {
	const mrBlock = [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `*<${mr.web_url}|${mr.title}>*\n\n\n:card_file_box: *Ref*: _${mr.references.relative}_\n\n:bust_in_silhouette: *Author*: _${mr.author.name}_`
			},
			"accessory": {
				"type": "image",
				"image_url": mr.author.avatar_url,
				"alt_text": `Avatar of ${mr.author.name}`
			}
		},
        {
			"type": "divider"
		}
	]
	return mrBlock
}