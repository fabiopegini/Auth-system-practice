import type { ComponentPropsWithoutRef } from "react"

interface Props extends ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode
}

const Button = ({ children, ...props }: Props) => {
  return <button className="base_button margin_t" {...props}>{children}</button>
}

export default Button