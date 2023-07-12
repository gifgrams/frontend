'use client'

import { useId } from 'react'
import styles from '@/styles/ui/TextInput.module.scss'

export default function TextInput({ label, placeholder, ...inputProps }) {
  const id = useId()
  return (
    <div className={styles.container}>
      <label htmlFor={id}>
        <h3>{label ?? ''}</h3>
      </label>
      <input id={id} placeholder={placeholder ?? ''} {...inputProps}></input>
    </div>
  )
}
