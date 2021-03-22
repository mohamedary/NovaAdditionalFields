<template>
<div>

</div>
</template>
<script>
import {
    Errors,
    FormField,
    HandlesValidationErrors,
    InteractsWithDates,
} from 'laravel-nova'

export default {
    props: ['field', 'value', 'item'],
    mixins: [HandlesValidationErrors, FormField, InteractsWithDates],

    methods: {
        /**
         * Update the field's internal value when it's value changes
         */
        handleChange(value) {
            this.value = value
        },
    },

    computed: {
        firstDayOfWeek() {
            return this.field.firstDayOfWeek || 0
        },

        placeholder() {
            return this.field.placeholder || moment().format(this.format)
        },

        format() {
            return this.field.format || 'YYYY-MM-DD'
        },

        pickerFormat() {
            return this.field.pickerFormat || 'Y-m-d'
        },

        pickerDisplayFormat() {
            return this.field.pickerDisplayFormat || 'Y-m-d'
        },
    },
}
</script>
