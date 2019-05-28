import { LitElement } from 'lit-element';
export * from 'lit-element';
export class WiredBase extends LitElement {
    fireEvent(name, detail, bubbles = true, composed = true) {
        if (name) {
            const init = {
                bubbles: (typeof bubbles === 'boolean') ? bubbles : true,
                composed: (typeof composed === 'boolean') ? composed : true
            };
            if (detail) {
                init.detail = detail;
            }
            const CE = (window.SlickCustomEvent || CustomEvent);
            this.dispatchEvent(new CE(name, init));
        }
    }
}
