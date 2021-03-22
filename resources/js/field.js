Nova.booting((Vue, router, store) => {
  Vue.component('index-additional-fields', require('./components/IndexField'))
  Vue.component('detail-additional-fields', require('./components/DetailField'))
  Vue.component('form-additional-fields', require('./components/FormField'))
})
