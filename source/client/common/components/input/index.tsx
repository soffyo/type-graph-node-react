import React from "react"

type inputType = "text" | "email" | "textarea" | "password"

interface inputArgs<T> extends React.InputHTMLAttributes<T> {
    label?: string
    type?: inputType
}

export default function Input({ name, type, style, className, onChange, children }: inputArgs<HTMLInputElement|HTMLTextAreaElement>) {
    const autoComplete = () => {
        const options = []

        if (type == "password") {
            options.push("current-password")
        }

        return {
            autoComplete: options.join(' ')
        }
    }

    return(
        <div {...{className, style}}>
            <InputType {...{name, type, onChange, ...autoComplete}} id={`${name}_input`}/>
            {children && (
                <label htmlFor={`${name}_input`}>
                    {children}
                </label>
            )}
        </div>
    )
}

function InputType({ type, id, ...props }: inputArgs<HTMLInputElement|HTMLTextAreaElement>) {
    if (type == "textarea") {
        return <textarea name={props.name} onChange={props.onChange} {...{id}} style={{ resize: "none" }}/>
    }

    return <input {...{type, id, ...props}}/>
}