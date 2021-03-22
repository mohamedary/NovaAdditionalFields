export default{

    data: () => ({
        detailVisible: false
    }),

    computed: {
        toggleText() {
            return (this.detailVisible)
                ? this.__('Hide detail')
                : this.__('Show detail')
        },
        summaryText() {
            return `${this.summaryTextNumber} ${this.summaryTextLabel}`;
        },
        summaryTextNumber() {
            return (this.field.value)
                ? Object.keys(this.fields).length
                : 0;
        },
        summaryTextLabel() {
            return (this.field.summary_label)
                ? this.field.summary_label
                : 'fields';
        },
        fields() {
            return (this.field.value)
                ? JSON.parse(this.field.value)
                : [];
        }
    },

    methods: {
        toggleDetail() {
            this.detailVisible = !this.detailVisible;
        },
        debug(value) {
            console.log(value)
        }
    }

}
