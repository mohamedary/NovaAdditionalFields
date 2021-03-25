<template>
  <default-field :field="field" :errors="errors" :show-help-text="showHelpText">
  <template slot="field">
    <div v-if="fields.length === 0">Choose a category to find it's relevant fields</div>
    <div v-for="(item, index) in fields" class="flex border-b border-40">
        <button
            class="row-delete"
            type="button"
            @click="deleteRow(index)">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="22" height="28" viewBox="0 0 22 28">
                <title>Clear value</title>
                <path d="M20.281 20.656c0 0.391-0.156 0.781-0.438 1.062l-2.125 2.125c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-4.594-4.594-4.594 4.594c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-2.125-2.125c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l4.594-4.594-4.594-4.594c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l2.125-2.125c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l4.594 4.594 4.594-4.594c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l2.125 2.125c0.281 0.281 0.438 0.672 0.438 1.062s-0.156 0.781-0.438 1.062l-4.594 4.594 4.594 4.594c0.281 0.281 0.438 0.672 0.438 1.062z"></path>
            </svg>
        </button>
        <div class="w-1/5 px-8 py-6"><label class="inline-block text-80 pt-2 leading-tight"> {{ item.text}}</label></div>
        <div class="py-6 px-8 w-full" v-if="item.type !== 'select'">
            <input
                v-if="item.type === 'number' || item.type === 'text' || item.type === 'checkbox'"
                v-bind:class="item.type !== 'checkbox' ? 'w-full form-control form-input form-input-bordered' : 'checkbox'"
                :type="item.type"
                @input="buildObject(inputs, index, item.id, item.text, item.type, $event.target.value)"
                :placeholder="item.text"
            />
          <textarea
              class="w-full form-control form-input form-input-bordered py-3 h-auto"
              v-if="item.type === 'textarea'"
              @input="buildObject(inputs, index, item.id, item.text, item.type, $event.target.value)"
          />
        </div>
        <div v-if="item.type === 'select'" class="flex flex-wrap ml-8">
            <label class="flex items-center select-none mr-2"  v-for="option in item.options">
                <input
                    type="checkbox"
                    class="checkbox mr-1"
                    :value="option"
                    v-model="checkedOptions"
                    @input="buildObject(inputs, index, item.id, item.text, item.type, $event.target.value)"
                />
                {{ option }}
            </label>
        </div>
    </div>
    </div>
  </template>
  </default-field>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova'

export default {
  mixins: [FormField, HandlesValidationErrors],

  props: ['resourceName', 'resourceId', 'field'],

    data() {
      return {
          parentValue: null,
          fields: [],
          inputs: {},
          checkedOptions: []
      }
    },
    mounted() {
        this.watchedComponents.forEach(component => {
            let attribute = 'value'

            if(component.field.component === 'belongs-to-field') {
                attribute = 'selectedResource';
            }

            component.$watch(attribute, (value) => {
                this.parentValue = (value && attribute === 'selectedResource') ? value.value : value;
                this.updateResults();
            }, { immediate: true });
        });
    },

    computed: {
        watchedComponents() {
            if(!this.field.parent_value) {
                return [];
            }

            return this.$parent.$children.filter(component => {
                return this.isWatchingComponent(component);
            })
        },
        endpoint() {
            return this.field.endpoint
                .replace('{resource-name}', this.resourceName)
                .replace('{resource-id}', this.resourceId ? this.resourceId : '')
                .replace('{'+ this.field.parent_value +'}', this.parentValue ? this.parentValue : '')
        },
    },

  methods: {
    buildObject(obj, index, id, text, type, value) {
      this.$set(obj, index, {
          id: id,
          type: type,
          text: text,
          value: type === 'select' ? this.checkedOptions : value
      })
    },
    deleteRow(index) {
        this.$delete(this.inputs, index)
    },
    isWatchingComponent(component) {
      return component.field !== undefined
          && component.field.attribute === this.field.parent_value;
    },
    updateResults() {
        this.fields = [];
        this.loaded = false;

        if(this.notWatching() || (this.parentValue != null && this.parentValue !== '')) {
            Nova.request().get(this.endpoint)
            .then(response => {
                this.fields = response.data;
                this.loaded = true;
            })
        }
    },

    notWatching() {
      return this.field.parent_value === undefined;
    },
    /*
     * Set the initial, internal value for the field.
     */
    setInitialValue() {
        this.inputs = JSON.parse(this.field.value) || []
    },

    /**
     * Fill the given FormData object with the field's internal value.
     */
    fill(formData) {
        formData.append(this.field.attribute, JSON.stringify(this.inputs))
    },
  },
}
</script>
