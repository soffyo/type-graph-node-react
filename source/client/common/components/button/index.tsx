import React from "react"

interface buttonArgs {
    onClick?: () => void
    children?: string
    type?: "button" | "submit" | "reset"
    className?: string
}

export default function Button({ onClick, children, type, className }: buttonArgs) {
    return(
        <div {...{className}}>
            <button {...{onClick, type}}>
                {children}
            </button>
        </div>
    )
}