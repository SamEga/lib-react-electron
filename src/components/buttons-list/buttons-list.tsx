import React from "react"
import { Button } from "../Button/Button"
import { btnProp } from "../models"

export const ButtonsList = (prop: { data: Array<btnProp> }) => {
  return (
    <>
      {prop.data.map((el, index) => (
        <Button key={index} type={el.type} title={el.title} className={el.className} cb={el.cb} />
      ))}
    </>
  )
}
