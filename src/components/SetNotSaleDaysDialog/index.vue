<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" class="home-btn">
                    <v-icon medium color="white">mdi-plus-circle-outline</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar color="grey darken-2" dense dark>
                    <b>ノート</b>
                </v-toolbar>
                <v-col cols="12">
                    <calendar-dialog :inputValue="inputValue" @on-change-date="onChangeDate" />
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        outlined
                        name="input-7-4"
                        placeholder="Notes for not sale day..."
                        height="100px"
                        v-model="noteContent"
                    ></v-textarea>
                </v-col>
                <v-card-actions>
                    <v-btn color="error" @click="onCancel()" class="cancel-btn">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn dark @click="onSubmit()" class="submit-btn">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from '@vue/composition-api'
import CalendarDialog from "../CalendarDialog/index.vue";
interface SetUp {
    dialog: Ref<boolean>
    inputValue: Ref<string>
    noteContent: Ref<string>
    onChangeDate: (value: string[]) => void
    onSubmit: () => void
    onCancel: () => void
}
const SetNotSaleDaysDialog = defineComponent({
    components: {
        CalendarDialog
    },

    setup(props, { emit }): SetUp {
        const dialog = ref(false)
        const inputValue = ref('')
        const noteContent = ref('')
        const onChangeDate = (value: string[]) => {
            if (value.length === 2) {
                inputValue.value = value[0] + '~' + value[1]
            }
            else {
                inputValue.value = value[0]
            }
        }
        const onSubmit = () => {
            dialog.value = false
            emit('confirm-set-not-sale-days', [inputValue.value, noteContent.value])
            inputValue.value = ''
            noteContent.value = ''
        }
        const onCancel = () => {
            dialog.value = false
            inputValue.value = ''
            noteContent.value = ''
        }
        return {
            dialog,
            inputValue,
            noteContent,
            onChangeDate,
            onSubmit,
            onCancel
        }
    }
})
export default SetNotSaleDaysDialog
</script>
<style scoped lang="sass">

.submit-btn
    background-color: #343f4b !important
.home-btn
    height: 50px !important
    width: 50px !important
    background-color: darkorange !important
</style>
