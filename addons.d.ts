declare global {
    interface EventTarget {
        tagName: string
        value: string
        checked: boolean
    }
}
export {};