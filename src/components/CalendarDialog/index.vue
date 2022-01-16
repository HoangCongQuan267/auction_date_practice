<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-bind="attrs"
                    v-on="on"
                    label="No sale dates"
                    :value="inputValue"
                    append-icon="mdi-calendar-range"
                ></v-text-field>
            </template>
            <v-card>
                <v-container grid-list-xs>
                    <v-row>
                        <v-date-picker v-model="dates" range width="100%" color="grey darken-2"></v-date-picker>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="onCancel">Cancel</v-btn>
                    <v-btn dark @click="onSubmit()" class="submit-btn">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from '@vue/composition-api'
interface SetUp {
    dialog: Ref<boolean>
    dates: Ref<string[]>
    onSubmit: () => void
    onCancel: () => void
}
const CalendarDialog = defineComponent({
    props: {
        inputValue: {
            type: String,
        },
    },
    setup(props, { emit }): SetUp {
        const dialog = ref(false)
        const d = new Date();
        const current_date = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2)
        const dates = ref([current_date])
        const onSubmit = () => {
            dialog.value = false
            emit('on-change-date', dates.value)
            dates.value = [current_date]
        }
        const onCancel = () => {
            dialog.value = false
            dates.value = [current_date]
        }
        return {
            dialog,
            dates,
            onSubmit,
            onCancel
        }
    }
})
export default CalendarDialog
</script>
<style scoped lang="sass">

.submit-btn
    background-color: #343f4b !important
</style>
