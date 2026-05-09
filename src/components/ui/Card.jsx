function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`mf-editorial-card rounded-[28px] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

function CardContent({ className = '', children, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export { Card, CardContent }
