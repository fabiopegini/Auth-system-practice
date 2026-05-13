import { useState, type ComponentPropsWithoutRef } from "react"

interface Props extends ComponentPropsWithoutRef<'input'> {
  label?: string
}


const InputField = ({label, ...props } : Props) => {
  const { type = 'text', name, id } = props
  const [value, setValue] = useState('')

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setValue(ev.target.value)
  }

  return  (
    <div className="container_input">
    { label && <label htmlFor={name} className="base_label">{label}</label> }
      <input type={type} name={name} id={id} value={value} onChange={handleChange} className="base_input" {...props}/>
      {/* Add error msg but try to make it so
      the checking depends on the validators from utils */}
    </div>
  )
}

export default InputField