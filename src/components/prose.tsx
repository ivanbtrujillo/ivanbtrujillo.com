import clsx from 'clsx'

type ProseProps = {
  children: React.ReactNode
  className?: string
}

type Prose = React.FC<ProseProps>
export const Prose: Prose = ({ children, className }) => {
  return (
    <div className={clsx(className, 'prose prose-invert')}>{children}</div>
  )
}
