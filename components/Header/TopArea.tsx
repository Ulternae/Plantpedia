import { useRouter } from 'next/router'

import { Grid } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'
import { signIn, signOut, useSession } from 'next-auth/client'

export function TopArea() {


  return (
    <Grid container justify="space-between">
      <Grid item>
        <LoginLogout />
      </Grid>
      <Grid item>
        <LocaleOptions />
      </Grid>
    </Grid>
  )
}

export const LoginLogout = () => {
  const [session, loading] = useSession()

  console.log('Session:', session)

  if (loading) {
    return null
    // return <Typography>Loading...</Typography>
  }
  if (session === null) {
    return (
      <Button variant="outlined" onClick={() => signIn()}>
        Login
      </Button>
    )
  }

  return (
    <Button variant="outlined" onClick={() => signOut()}>
      {session?.user?.name} Logout
    </Button>
  )
}

export const LocaleOptions = () => {
  const { locales, locale } = useRouter()

  // Locales aren't configured
  if (locales == undefined || locale == undefined) {
    return null
  }

  return (
    <>
      {locales.map((loc) => (
        <form
          action="/api/language"
          method="POST"
          key={loc}
          className="inline-block"
        >
          <input name="preferredLocale" value={loc} type="hidden"></input>
          <Button
            variant={loc === locale ? 'outlined' : 'text'}
            className="ml-1"
            type="submit"
          >
            {loc}
          </Button>
        </form>
      ))}
    </>
  )
}