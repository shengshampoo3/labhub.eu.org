import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

// Buy Me A Coffee API
const TOKEN = process.env.BMC_TOKEN || ''
const WEBHOOK_SECRET = process.env.BMC_WEBHOOK_SECRET || ''
const API = 'https://developers.buymeacoffee.com/api/v1/supporters'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!TOKEN || !WEBHOOK_SECRET) {
    console.error('BMC_TOKEN or BMC_WEBHOOK_SECRET is not defined')
    throw new Error('BMC_TOKEN or BMC_WEBHOOK_SECRET is not defined')
  }
  const cacheFilePath = 'supporters.json'
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Check if the response has been cached and is not older than 1 hour
  if (fs.existsSync(cacheFilePath) && cacheFilePath && Date.now() - fs.statSync(cacheFilePath).mtimeMs < 3600000) {
    console.log('Returning cached supporters JSON data.')
    const supportersJson = fs.readFileSync(cacheFilePath, 'utf8')
    res.send(JSON.parse(supportersJson))
    return
  }
  fetch(API, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      // Get total number of pages
      const totalPages = data.last_page
      // Create an empty array to hold the fetches
      const fetches = [] as any
      // Fetch all pages
      for (let i = 1; i <= totalPages; i++) {
        console.log(`Fetching page ${i} of ${totalPages}...`)
        fetches.push(
          fetch(`${API}?page=${i}`, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              'Content-Type': 'application/json',
            },
          })
        )
      }
      // Wait for all fetches to complete
      Promise.all(fetches)
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(datas => {
          console.log('All pages fetched.')
          // Flatten the array of arrays into a single array
          const supporters = datas.flatMap(data => data.data)
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

          res.send(JSON.parse(supportersJson))
          try {
            // Write the supporters JSON string to a file if the response was successful
            fs.writeFile('supporters.json', JSON.stringify(JSON.parse(supportersJson)), err => {
              if (err) {
                // Catch the error if the file system is read-only
                if (err.code === 'EROFS') {
                  console.error('Skipping writing to file since the file system is read-only.')
                  return
                }
                throw err
              }
              console.log('Supporters JSON data saved to file for caching purposes (1 hour).')
            })
          } catch (error) {
            console.error(error)
          }
        })
        .catch(error => {
          console.error(error)
          res.status(500).send(error)
        })
    })
    .catch(error => {
      res.status(error?.response?.status ?? 500).json({ error: error?.response?.data ?? 'Internal server error.' })
    })
}
