import { NavBar } from '@ui/NavBar'
import { PreviewModeBanner } from './PreviewModeBanner'

export function Header() {
  return (
    <>
      <PreviewModeBanner />
      <div className="mx-auto" style={{ maxWidth: '98%' }}>
        <NavBar title="🌿 Plantpedia">
          <div>{/* NavLink items */}</div>
        </NavBar>
      </div>
    </>
  )
}
