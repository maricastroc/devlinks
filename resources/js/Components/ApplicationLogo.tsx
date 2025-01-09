import { SVGAttributes } from 'react'
import Logo from '/public/assets/logo.svg'

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
  return <img src={Logo} alt="" />
}
