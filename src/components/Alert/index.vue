<template>
    <v-alert
        :type="alertContent !== '' ? 'success' : 'error'"
        transition="slide-y-transition"
        class="success-submit-sale-days-alert"
        v-model="isClicked"
    > {{alertContent !== '' ? 'Added Success: ' + alertContent : 'Select first'}}</v-alert>
</template>
<script lang="ts">
import { defineComponent} from '@vue/composition-api'

const Alert = defineComponent({
    props: {
        isClicked: {
            type: Boolean,
        },
        alertContent: {
            type: String
        }
    },
})
export default Alert
</script>
<style lang="">
</style>