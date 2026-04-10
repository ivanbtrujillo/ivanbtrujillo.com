declare module '*.css'
declare module '*.mdx' {
  const MDXComponent: React.ComponentType
  export const meta: Record<string, unknown>
  export default MDXComponent
}
