import React from "react"
import { btnProp } from "../models"

export const Button = (props: btnProp) => (
  <button type={props.type} className={props.className} onClick={props.cb}>
    {props.title}
  </button>
)
