import { NavBar } from '@ui/NavBar'
import { PreviewModeBanner } from './PreviewModeBanner'
import { TopArea } from './TopArea'

export function Header() {
  return (
    <>
      <PreviewModeBanner />

      <div className="mx-auto" style={{ maxWidth: '98%' }}>
        <NavBar title="🌿 Plantpedia">
          <TopArea />
        </NavBar>
      </div>
    </>
  )
}
