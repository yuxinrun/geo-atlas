import type { ReactNode } from 'react'

interface Props {
  kicker?: string
  title: string
  description?: string
  action?: ReactNode
  id?: string
}

export default function SectionTitle({ kicker, title, description, action, id }: Props) {
  return (
    <div className="section-heading" id={id}>
      <div>
        {kicker && <p className="kicker">{kicker}</p>}
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  )
}
