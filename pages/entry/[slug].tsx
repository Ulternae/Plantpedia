import fs from "fs"
import path from "path"
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'

import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Grid } from '@ui/Grid'

import { RichText } from '@components/RichText'
import { AuthorCard } from '@components/AuthorCard'
import { getCategoryList, getPlant, getPlantList } from '@api/index'
import { PlantEntryInline } from '@components/PlantCollection'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

// export const getStaticPaths: GetStaticPaths = async () => {
//   const plants = await getPlantList({ limit: 10 })
//   const paths = plants.map((plant) => ({
//     params: { slug: plant.slug }
//   }))

//   return {
//     paths,
//     // fallback: 'blocking', "false"
//     fallback: true,

//   }
// }

export const getStaticPaths: GetStaticPaths = async () => {
  const plantEntriesFromFS = fs.readFileSync(path.join(process.cwd(), 'paths.txt'), "utf-8").toString()
  const plantEntriesToGenerate = plantEntriesFromFS.split("\n").filter(Boolean)

  const paths = plantEntriesToGenerate.map((plant) => ({
    params: { slug: plant }
  }))

  return {
    paths,
    // fallback: 'blocking', "false"
    fallback: 'blocking',

  }
}

type PlantEntryProps = {
  plant: Plant | null
  otherEntries?: Plant[] | null
  categories?: Category[] | null
}

export const getStaticProps: GetStaticProps<PlantEntryProps> = async ({ params }) => {
  const slug = params?.slug

  if (typeof slug !== 'string') {
    return {
      notFound: true
    }
  }

  try {
    const plant = await getPlant(slug)
    const categories = await getCategoryList()
    const otherEntries = await getPlantList({ limit: 5 })

    return {
      props: {
        plant,
        categories,
        otherEntries
      },
      revalidate:  5 * 60
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

const PlantEntryPage = ({ plant, categories, otherEntries }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  if (router.isFallback) { 
    return <Layout><Typography variant="h4">Loading...</Typography></Layout>
  }

  if (!plant) {
    return <Layout><Typography variant="h4">Plant not found</Typography></Layout>
  }

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9} component="article">
          <figure>
            <img src={plant.image.url} alt={plant.plantName} />
          </figure>
          <div className="px-12 pt-8">
            <Typography variant="h2">{plant.plantName}</Typography>
          </div>
          <div className="p-10">
            <RichText richText={plant.description} />
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={3} component="aside">
          <section>
            <Typography variant="h5" component="h3" className="mb-4">
              Recent Posts
              <div className='flex flex-col gap-3'>
                {otherEntries?.map((entry) => (
                  <PlantEntryInline key={entry.slug} {...entry} />
                ))}

              </div>
            </Typography>
          </section>
          <section className="mt-10">
            <Typography variant="h5" component="h3" className="mb-4">
              Categories
              <div className='ml-6 mt-4'>
                {categories?.map((category) => (
                  <li key={category.id}>
                    <Link href={`/category/${category.slug}`} >
                      <Typography component={"a"} variant="h6">{category.title}</Typography>
                    </Link>
                  </li>
                ))
                }
              </div>
            </Typography>
          </section>
        </Grid>
      </Grid>
      <section className="my-4 border-t-2 border-b-2 border-gray-200 pt-12 pb-7">
        <AuthorCard {...plant.author} />
      </section>
    </Layout>
  )
}

export default PlantEntryPage