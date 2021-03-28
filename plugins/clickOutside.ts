import { onGlobalSetup, createApp } from '@nuxtjs/composition-api'

interface IHTMLElementClicketyClick extends HTMLElement {
  clickOutsideEvent?(event: MouseEvent): void;
}

export default () => {
  onGlobalSetup(() => {
    const app = createApp({})
    app.directive('click-outside', {
      bind (el: IHTMLElementClicketyClick, binding, vnode) {
        el.clickOutsideEvent = function (event: Event) {
          if (event.target && !(el === event.target || el.contains(event.target as Node))) {
            (vnode.context as any)[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind (el: IHTMLElementClicketyClick) {
        if (el.clickOutsideEvent) {
          document.body.removeEventListener('click', el.clickOutsideEvent)
        }
      },
    })
  })
}
