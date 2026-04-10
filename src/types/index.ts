declare global {
  type PropsFrom<TComponent> = TComponent extends React.FC<infer Props>
    ? Props
    : never

  type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>

  namespace Domain {
    type Article = {
      title: string
      slug: string
      date: string
      description: string
    }
  }
}

export {}
