import type { FC, HTMLAttributes } from 'react'
import cn from 'clsx'

type NavbarProps = {
  className?: string
  endContent?: React.ReactNode
}

const Navbar: FC<NavbarProps & HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  title = '',
  endContent = <></>,
}) => {
  const rootClassName = cn('navbar', className)

  return (
    <div className={rootClassName}>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{title}</a>
      </div>
      <div className="flex-none">{endContent}</div>
    </div>
  )
}

export default Navbar
