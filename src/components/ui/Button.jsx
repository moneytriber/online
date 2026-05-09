function Button({
  as = 'button',
  className = '',
  variant = 'default',
  children,
  ...props
}) {
  const Component = as
  const variantClass =
    variant === 'secondary' ? 'mf-button-secondary' : 'mf-button-primary'

  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold transition duration-300 hover:-translate-y-0.5 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Button
