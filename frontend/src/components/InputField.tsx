import { useState, type ComponentPropsWithoutRef } from "react"
import type { ValidatorFn } from "../utils/validators"

interface Props extends ComponentPropsWithoutRef<'input'> {
  label?: string,
  validator?: ValidatorFn
  passwordRef?: React.RefObject<string>
  rePassword?: boolean
}

const InputField = ({ 
  label, 
  validator = () => ({ ok: true, msg: '' }),
  passwordRef,
  rePassword = false,
  ...props 
} : Props) => {
  const [value, setValue] = useState('')
  const [msg, setMsg] = useState('')
  const [inputStatus, setInputStatus] = useState<'' | 'error' | 'ok'>('')

  const styles = props.className ? 'base_input ' + props.className : 'base_input' 

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const value = ev.target.value
    setValue(value)

    if(typeof passwordRef?.current === 'string' && !rePassword) passwordRef.current = value

    const result = !passwordRef ? validator(value, '') : validator(value, passwordRef.current)
    setInputStatus('')
    setMsg('')

    if(rePassword && passwordRef) {
      if(value.length < passwordRef?.current.length) return
      if(!result.ok) {
        setInputStatus('error')
        setMsg(result.msg)
      }
      else { setInputStatus('ok') }
      return
    }
    else {
      if(value.length < 5) return
      if(!result.ok) {
        setInputStatus('error')
        setMsg(result.msg)
      }
      else { setInputStatus('ok') }
      return
    }
  }

  return (
    <div className="container_input">
      {label && <label htmlFor={props.name} className="base_label">{label}</label>}
      <input type={props.type ?? 'text'} value={value} onChange={handleChange} className={`${styles} ${inputStatus && ('input_' + inputStatus)}`} {...props}/>
      {msg && <div className={`input_msg msg_${inputStatus}`}>{msg}</div>}
    </div>
  )
}

export default InputField