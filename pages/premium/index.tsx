import { Layout } from "@components/Layout"
import { GetServerSideProps } from "next"
import { useSession, getSession } from "next-auth/client"

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context)

  if (session === null) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}

const PremiumPage = () => {
  const [session, loading] = useSession()

  if (loading) {
    return <Layout>Loading...</Layout>
  }

  if (session === null) {
    return <Layout>Please log in to access the Premium Page.</Layout>
  }

  return <Layout>Premium Page</Layout>
}

export default PremiumPage