import { NextApiHandler } from "next"
import { getSession } from "next-auth/client"

const getPremiumContent: NextApiHandler = async (req, res) => {
  console.log('API Request:', req)
  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  res.status(200).json({
    data: `https://randomfox.ca/images/${Math.floor(Math.random() * 122) + 1}.jpg`,
    time: new Date().toISOString()
  })
}

export default getPremiumContent