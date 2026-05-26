import type { ComponentPropsWithoutRef } from "react"

interface Props extends ComponentPropsWithoutRef<'form'> {
  title?: string,
}

const Form = ({ title, children, ...props} : Props) => {

  return <form className="base_form" {...props}>
    {title && <h2 className="title_lv2 margin_b">{title}</h2>}
    {children}
  </form>
}

export default Form