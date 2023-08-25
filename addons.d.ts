declare global {
    interface HTMLElement {
        value: string | number
        style: CSSStyleDeclaration
    }
    interface MathMLElement {
        style: CSSStyleDeclaration
    }
    interface SVGElement {
        style: CSSStyleDeclaration
    }
    interface Element {
        style: CSSStyleDeclaration
    }
    interface EventTarget {
        tagName: string
    }
}
export {};