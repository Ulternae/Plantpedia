import { NextApiHandler } from "next"

const credentialsAuth: NextApiHandler<User> = (request, response) => {
  if (request.method !== "POST") {
    response.status(405).end()
    return
  }

  if (request.body.password === process.env.LK3_PASSWORD) {
    const userDefault: User = {
      email: "LK3@gmail.com",
      name: "User LK3",
      image: "",
    }

    return response.status(200).json(userDefault)
  }

  response.status(401).end()
}

export default credentialsAuth