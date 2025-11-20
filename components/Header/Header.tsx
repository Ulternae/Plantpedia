import { NavBar } from '@ui/NavBar'
import { PreviewModeBanner } from './PreviewModeBanner'
import { TopArea } from './TopArea'
import { useTranslation } from 'next-i18next'
import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'
import { Button } from '@material-ui/core'

export function Header() {
  const { t } = useTranslation(['common'])

  return (
    <>
      <PreviewModeBanner />
      <div className="px-8 py-3">
        <TopArea />
      </div>
      <div className="mx-auto" style={{ maxWidth: '98%' }}>
        <NavBar title="🌿 Plantpedia">
          <div className='flex w-fit gap-2'>
            <NavLink href="/top-stories">{t('topStories')}</NavLink>
            <NavLink href="/search">{t('search')}</NavLink>
            <NavLink href="/premium">{t('premium')}</NavLink>
            <NavLink href="/wall">{t('wall')}</NavLink>
          </div>
        </NavBar>
      </div>
    </>
  )
}

function NavLink({ children, ...linkProps }: PropsWithChildren<LinkProps>) {
  return (
    <Link {...linkProps} passHref>
      <Button color="inherit" variant="text" className='truncate' component="a">
        {children}
      </Button>
    </Link>
  )
}