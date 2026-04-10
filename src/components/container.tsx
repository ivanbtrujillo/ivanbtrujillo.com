import * as React from 'react'
import clsx from 'clsx'

type OuterContainerProps = React.ComponentPropsWithoutRef<'div'>

type OuterContainerType = React.ForwardRefExoticComponent<
  OuterContainerProps & React.RefAttributes<HTMLDivElement>
>

const OuterContainer: OuterContainerType = React.forwardRef(function OuterContainer(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  )
})

type InnerContainerProps = React.ComponentPropsWithoutRef<'div'>
type InnerContainerType = React.ForwardRefExoticComponent<
  InnerContainerProps & React.RefAttributes<HTMLDivElement>
>
const InnerContainer: InnerContainerType = React.forwardRef(function InnerContainer(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-3xl lg:max-w-6xl">{children}</div>
    </div>
  )
})

type ContainerProps = React.ComponentPropsWithoutRef<'div'>
type Container = React.ForwardRefExoticComponent<
  ContainerProps & React.RefAttributes<HTMLDivElement>
> & {
  Outer: OuterContainerType
  Inner: InnerContainerType
}

export const Container: Container = React.forwardRef(function Container(
  { children, ...props },
  ref
) {
  return (
    <OuterContainer ref={ref} {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  )
})

Container.Outer = OuterContainer
Container.Inner = InnerContainer
