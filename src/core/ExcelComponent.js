import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }

  // Настраевает наш компонент до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }
  // Уведомляем слушателей про событие event
  $emit(event, ...arg) {
    const unsub = this.emitter.emit(event, ...arg)
    this.unsubscribers.push(unsub)
  }
  // Подписываемся на событие event
  $on(event, fn) {
    this.emitter.subscribe(event, fn)
  }

  // Инициализирует компонент
  // Добовляет DOM слушателей
  init() {
    this.initDOMListeners()
  }


  // Удаляем копонент
  // Чистим слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
