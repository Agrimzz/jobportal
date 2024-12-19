import { ButtonProps } from "@/types"
import React from "react"

const Button = ({ title, onClick, className, disabled }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded font-semibold  text-xs sm:text-base ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
}

export default Button
