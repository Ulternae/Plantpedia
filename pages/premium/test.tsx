import { Layout } from "@components/Layout"
import { GetServerSideProps } from "next"
import { useSession } from "next-auth/client"

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