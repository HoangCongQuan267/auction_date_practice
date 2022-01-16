<template >
  <span z-index="0">
    <span elevation="1" class="add-no-sale-dates-btn">
      <set-not-sale-days-dialog @confirm-set-not-sale-days="addNotSaleDays"/>
    </span>
    <alert :isClicked="isClicked" :alertContent="alertContent" />
    <v-card elevation="2" class="mt-4 mx-2 top-card">
      <v-container>
        <v-row>
          <h4 class="ma-3">ウィークリーカレンダー</h4>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-btn
            v-for="item in datesBtn"
            :key="item.date"
            elevation="0"
            v-bind:class="['date-btn', item.isActive.value ? 'clicked-date-btn' : '',
            {
              'red-date-btn': datesBtn.indexOf(item) === 0,
              'green-date-btn': datesBtn.indexOf(item) === 5,
              'blue-date-btn': datesBtn.indexOf(item) === 6,
            }]"
            v-on:click="onClickDate(datesBtn.indexOf(item))"
          >
            <b>{{ item.date }}</b>
          </v-btn>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-btn
            dark
            height="fit-content"
            width="40vw"
            class="ma-4 add-sale-day-btn"
            v-on:click="onClickSaleDay()"
          >参加する</v-btn>
        </v-row>
      </v-container>
    </v-card>
    <v-card elevation="2" class="mt-4 mx-2 bottom-card">
      <v-container>
        <v-row>
          <h4 class="ma-4">
            <strong>セール休み</strong>
          </h4>
        </v-row>
        <v-row align="center" justify="space-around" class="mb-4">
          <v-btn
            light
            elevation="0"
            v-on:click="showMoreNoSaleDates()"
            class="show-more-no-sale-dates-btn"
          >
            <v-icon medium light>mdi-chevron-double-left</v-icon>5日前
          </v-btn>
          <v-btn
            light
            elevation="0"
            :style="{ visibility: noSaleDaysNotes.length > 5 ? 'visible' : 'hidden' }"
            v-on:click="removeNoSaleDates()"
            class="remove-no-sale-dates-btn"
          >リフレッシュ</v-btn>
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
        <v-row>
          <p
            v-if="noSaleDaysNotes.length === 0"
            style="text-align: center; width: 100%;"
          >Don't have any note for not sale dates...</p>
          <div class="no-sale-notes-content-div" v-if="noSaleDaysNotes.length !== 0">
            <v-row
              v-for="(item, index) in noSaleDaysNotes"
              :key="index"
              :style="{
                borderBottom: item.week === 1 ? '1px solid lightgrey' : '1px solid white',
                backgroundColor: item.week === 1 ? '' : '#e8ebfd',
              }"
            >
              <v-col cols="12" v-on:click="onClickNosaleDateInfo(index)">
                <v-row>
                  <v-col cols="7" class="no-sale-day-title">
                    <strong>{{ item.noSaleDays }}</strong>
                  </v-col>
                  <v-col cols="3" class="no-sale-day-content">{{ item.note }}</v-col>
                  <v-col cols="2">
                    <v-icon>{{ currentChoiceNoSaleDatesInfo === item ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon>
                  </v-col>
                </v-row>
              </v-col>
              <v-col style="padding:0" v-if="currentChoiceNoSaleDatesInfo === item">
                <v-card
                  height="150px"
                  elevation="0"
                  width="95%"
                  style="background-color: #8FB2B8; padding: 5px; margin-left: 5%;"
                  dark
                >
                  <v-card-title primary-title>
                    <v-icon>mdi-minus-circle</v-icon>
                    {{ item.noSaleDays }}
                  </v-card-title>
                  <p>{{ item.note }}</p>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-row>
      </v-container>
    </v-card>
  </span>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from '@vue/composition-api'
import SetNotSaleDaysDialog from "../SetNotSaleDaysDialog/index.vue"
import Alert from "../Alert/index.vue"

interface SetUp {
  datesBtn: Array<datesBtnType>
  noSaleDaysNotes: Ref<Array<noSaleDaysNotesType>>
  isClicked: Ref<boolean>
  alertContent: Ref<string>
  currentChoiceNoSaleDatesInfo: Ref<noSaleDaysNotesType>
  onClickDate: (index: number) => void
  onClickSaleDay: () => void
  showMoreNoSaleDates: () => void
  removeNoSaleDates: () => void
  onClickNosaleDateInfo: (index: number) => void
  addNotSaleDays: (value: string[]) => void
}
interface datesBtnType {
  date: string
  isActive: Ref<boolean>
}
interface noSaleDaysNotesType {
  note: string
  noSaleDays: string
  week: number
}
const AuctionDateSettings = defineComponent({
  components: {
    SetNotSaleDaysDialog,
    Alert
  },
  setup(): SetUp {
    const datesBtn = [
      { date: '日', isActive: ref(false) },
      { date: '月', isActive: ref(false) },
      { date: '火', isActive: ref(false) },
      { date: '水', isActive: ref(false) },
      { date: '木', isActive: ref(false) },
      { date: '金', isActive: ref(false) },
      { date: '土', isActive: ref(false) },
    ]
    //GET Props from db 
    const dateProps = [
      { note: '一生懸命頑張ってください', noSaleDays: 'Sunday 12-3-2000', week: 1 },
      { note: '一生懸命頑張ってください', noSaleDays: 'Monday 13-3-2000', week: 1 },
      { note: '一生懸命頑張ってください', noSaleDays: 'Tuesday 14-3-2000', week: 1 },
      { note: '一生懸命頑張ってください', noSaleDays: 'Wednesday~Friday 15~16-3-2000', week: 1 },
    ].reverse()
    const noSaleDaysNotes = ref(dateProps)
    const isClicked = ref(false)
    const alertContent = ref('')
    const currentChoiceNoSaleDatesInfo = ref({ note: '', noSaleDays: '', week: -1 })
    const onClickDate = (index: number) => {
      if (!datesBtn[index].isActive.value) {
        datesBtn[index].isActive.value = true
      }
      else {
        datesBtn[index].isActive.value = false
      }
    }
    const onClickSaleDay = () => {
      isClicked.value = true
      let alertCt = ''
      datesBtn.map(dateBtn => {
        if (dateBtn.isActive.value) {
          alertCt += dateBtn.date + ', '
        }
      }
      )
      if (isClicked.value) {
        alertContent.value = alertCt.slice(0, -2)
        window.setTimeout(() => {
          isClicked.value = false;
        }, 1500)
      }
      else clearTimeout()
    }
    const showMoreNoSaleDates = () => {
      noSaleDaysNotes.value = ([
        { note: '一生懸命頑張ってください', noSaleDays: '6', week: 2 },
        { note: '一生懸命頑張ってください', noSaleDays: '7', week: 3 },
        { note: '一生懸命頑張ってください', noSaleDays: '8', week: 4 },
        { note: '一生懸命頑張ってください', noSaleDays: '9', week: 5 }].reverse().concat(noSaleDaysNotes.value))
    }
    const removeNoSaleDates = () => {
      noSaleDaysNotes.value = dateProps
    }
    const onClickNosaleDateInfo = (index: number) => {
      if (currentChoiceNoSaleDatesInfo.value === noSaleDaysNotes.value[index]) {
        currentChoiceNoSaleDatesInfo.value = { note: '', noSaleDays: '', week: -1 }
      }
      else
        currentChoiceNoSaleDatesInfo.value = noSaleDaysNotes.value[index]
    }
    const addNotSaleDays = (value: string[]) => {
      let x: noSaleDaysNotesType = {note: '', noSaleDays: '', week: -1}
      x.noSaleDays = value[0]
      x.note = value[1]
      x.week = 1
      console.log(value)
      noSaleDaysNotes.value.push(x)
    }
    return {
      datesBtn,
      isClicked,
      alertContent,
      noSaleDaysNotes,
      currentChoiceNoSaleDatesInfo,
      onClickDate,
      onClickSaleDay,
      showMoreNoSaleDates,
      removeNoSaleDates,
      onClickNosaleDateInfo,
      addNotSaleDays
    }
  }
})
export default AuctionDateSettings
</script>
<style scoped lang="sass">

.top-card
  border-radius: 15px !important
  min-height: 20vh
   // border: 2px solid #8492A6 !important

.bottom-card
  border-radius: 6px !important
  min-height: 68vh
  // border: 2px solid #8492A6 !important

.add-sale-day-btn
  background-color: #343f4b !important
  border-radius: 0 !important
.add-no-sale-dates-btn
  position: fixed
  z-index: 50
  bottom: 2rem
  right: 2rem
.date-btn
  border-radius: 6px
  border: 1px solid lightgrey
  height: 40px !important
  max-width: 40px !important
  min-width: 40px !important
.clicked-date-btn
  border-radius: 6px
  border: 1px solid red
  background-color: #FFBEAA !important
  height: 40px !important
  max-width: 40px !important
  min-width: 40px !important
.red-date-btn
  color: red !important
.green-date-btn
  color: darkgreen !important
.blue-date-btn
  color: darkblue !important
.success-submit-sale-days-alert
  position: fixed
  z-index: 50
  top: 0
  left: 0
  width: 100%
.remove-no-sale-dates-btn
  height: 30px !important
  padding: 2px !important
  width: 40% !important
  background-color: lightgrey !important
.show-more-no-sale-dates-btn
  height: 30px !important
  padding: 2px !important
  width: 40% !important
  background-color: lightgrey !important
.no-sale-notes-content-div
  margin-left: 0 !important
  margin-top: 5px
  padding-top: 15px
  width: 100%
  overflow-y: scroll !important
  max-height: 51vh !important
  min-height: 51vh !important
  overflow-x: hidden
  .no-sale-day-title
    overflow: hidden
    max-height: 30px
    text-align: left
    padding-left: 20px
  .no-sale-day-content
    overflow: hidden
    max-height: 30px
</style>