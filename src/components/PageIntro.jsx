function PageIntro({ eyebrow, title, description, children, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'

  return (
    <div className={alignment}>
      <p className="mf-kicker">{eyebrow}</p>
      <h1 className="mf-heading mt-4">{title}</h1>
      {description ? <p className="mf-copy mt-5">{description}</p> : null}
      {children ? <div className="mt-7">{children}</div> : null}
    </div>
  )
}

export default PageIntro
