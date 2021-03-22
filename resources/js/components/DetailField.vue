<template>
    <panel-item :field="field">
        <div slot="value">
            <p class="mb-4"><strong v-text="summaryText"></strong></p>
            <ul v-show="detailVisible" class="list-reset">
                <li v-for="(value, key) in fields">
                    <ul class="list-reset mb-4">
                        <li class="flex items-top mb-1">
                            <span class="block w-1/6 mr-2">{{ key }}:</span>
                            <span class="block"><strong>{{ value }}</strong></span>
                        </li>
                    </ul>
                </li>
            </ul>
            <a @click.prevent="toggleDetail"
               aria-role="button"
               class="cursor-pointer dim inline-block text-primary font-bold"
               v-text="toggleText"
            ></a>
        </div>
    </panel-item>
</template>

<script>
import AdditionalFieldsDisplay from '../mixins/AdditionalFieldsDisplay';
export default {
    mixins: [ AdditionalFieldsDisplay ],
    props: ['resource', 'resourceName', 'resourceId', 'field'],
}
</script>
