import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

// Buy Me A Coffee API
const TOKEN = process.env.BMC_TOKEN || ''
const WEBHOOK_SECRET = process.env.BMC_WEBHOOK_SECRET || ''

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!TOKEN || !WEBHOOK_SECRET) {
    console.error('BMC_TOKEN or BMC_WEBHOOK_SECRET is not defined')
    throw new Error('BMC_TOKEN or BMC_WEBHOOK_SECRET is not defined')
  }
  const cacheFilePath = 'supporters.json'

  // Check if the response has been cached and is not older than 1 hour
  if (fs.existsSync(cacheFilePath) && cacheFilePath && Date.now() - fs.statSync(cacheFilePath).mtimeMs < 3600000) {
    console.log('Returning cached supporters JSON data.')
    const supportersJson = fs.readFileSync(cacheFilePath, 'utf8')
    res.send(JSON.parse(supportersJson) as any)
    return
  }
  fetch(`https://developers.buymeacoffee.com/api/v1/supporters/?slug=sudoalex`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      // Get the list of supporters from the response data
      const supporters = data.data

      // Create an empty array to hold the supporter JSON objects
      let supportersJsonArray = [] as any

      // Generate JSON for each supporter and push it to the array
      supporters.forEach(supporter => {
        supporter.payer_name = supporter.payer_name != 'Someone' ? supporter.payer_name : 'Anonymous'
        supporter.support_note = supporter.support_note != null ? supporter.support_note : 'No note'
        let donation = '$' + supporter.support_coffees * supporter.support_coffee_price + ' USD'
        let date = supporter.support_created_on
        const supporterJson = {
          supporter_name: supporter.payer_name,
          supporter_note: supporter.support_note,
          supporter_donation: donation as any,
          supporter_date: date,
        }
        supportersJsonArray.push(supporterJson as any)
      })

      // Convert the array to a JSON string
      let supportersJson = JSON.stringify(supportersJsonArray)

      res.send(JSON.parse(supportersJson) as any)
      try {
        // Write the supporters JSON string to a file if the response was successful
        fs.writeFile('supporters.json', JSON.stringify(JSON.parse(supportersJson)), err => {
          if (err) throw err
          console.log('Supporters JSON data saved to file.')
        })
      } catch (error) {
        console.error(error)
      }
    })
    .catch(error => {
      res.status(error?.response?.status ?? 500).json({ error: error?.response?.data ?? 'Internal server error.' })
    })
}
