import type { ComponentPropsWithoutRef, SubmitEventHandler } from "react"

interface Props extends Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  title?: string,
  onSubmit: SubmitEventHandler,
  children: React.ReactNode
}

const Form = ({ title, onSubmit, children, ...props} : Props) => {

  return <form onSubmit={onSubmit} className="base_form" {...props}>
    {title && <h2 className="title_lv2 margin_b">{title}</h2>}
    {children}
  </form>
}

export default Form