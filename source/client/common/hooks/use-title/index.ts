import { useEffect, useCallback } from "react"

export function useTitle(title: string, options = { prefix: true }) {
    const getMainTitle: () => string | boolean = useCallback(() => {
        const metaTag = document.querySelector("meta[name='use-main-title']")

        if (metaTag) {
            const metaTitle = metaTag.getAttribute("content")

            if (metaTitle) {
                return metaTitle
            }
        }

        return false
    }, [])

    useEffect(() => {
        const prev = document.title

        const mainTitle = getMainTitle()

        if (title != prev) {
            if (mainTitle) {
                if (options.prefix) {
                    document.title = `${title} - ${mainTitle}`
                } else {
                    document.title = title
                }
            } else {
                document.title = title
            }
        }

        return () => {
            document.title = prev
        }
    }, [title, options.prefix, getMainTitle])
}