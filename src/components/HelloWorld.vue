<template>
  <div id="app" class="table-page">
    <div class="header">
      <h1>Таблица</h1>
      <v-dialog persistent v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-2 filter-button" v-bind="attrs" v-on="on" outlined color="blue">
            Фильтры
          </v-btn>
        </template>
        <v-card class="card">
          <v-card-title class="text-h5  lighten-2">
            Фильтры
            <v-btn class="close-button" icon color="grey" @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <div class="card-inside">Автор</div>
          <div class="card-inside">
            <v-combobox v-model="selectedAuthor" :items="authorItems" item-text="name" item-value=id
              :return-object="false" multiple outlined dense chips clearable>
            </v-combobox>
            <v-btn @click="resetAuthor"> <v-icon>
                mdi-delete
              </v-icon></v-btn>
          </div>
          <div class="card-inside">Статус</div>
          <div class="card-inside">
            <v-select v-model="selectedStatus" :items="statusItems" item-text="statusName" item-value="statusCode"
              multiple dense outlined clearable chips></v-select>
            <v-btn @click="resetStatus"> <v-icon>
                mdi-delete
              </v-icon></v-btn>
          </div>
          <v-menu v-model="date" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
            offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field class="card-inside" v-model="selectedDate" prepend-icon="mdi-calendar" readonly outlined
                dense v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="selectedDate" @input="date = false"></v-date-picker>
          </v-menu>
          <v-card-actions class="buttons">
            <v-btn color="blue" text @click="resetAll" outlined>
              <v-icon left>
                mdi-delete
              </v-icon>
              Сбросить
            </v-btn>
            <v-btn color="blue" text @click="submit" outlined>
              Применить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div>
      <div class="table">
        <v-data-table :headers="headers" :items="questions" hide-default-footer>
          <template v-slot:[`item.statusName`]="{ item }">
            <v-chip :color="getColor(item.statusName)" outlined text-color="#121212">
              {{ item.statusName }}
            </v-chip>
          </template>
          <template v-slot:[`item.startDate`]="{ item }">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>{{ item.startDate }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.startTime }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: false,
      dialog: false,
      selectedAuthor: { name: '', id: "" },
      selectedStatus: { statusName: '', statusCode: '' },
      selectedDate: '',
      authorItems: [
        { name: 'Иван Сергеевич Иванов', id: 1 },
        { name: 'Иван Иванович Иванов', id: 2 },
        { name: 'Иван Петрович Иванов', id: 3 },
      ],
      statusItems: [
        { statusName: 'Активен', statusCode: 'ACTIVE' },
        { statusName: 'Завершен', statusCode: 'COMPLETED' },
        { statusName: 'Приостановлен', statusCode: 'PAUSED' },
      ],
      headers: [
        { text: 'Название', align: 'start', sortable: false, value: 'name' },
        { text: 'Язык', align: 'start', sortable: false, value: 'language' },
        { text: 'Автор', align: 'start', sortable: false, value: 'author' },
        { text: 'Статус', align: 'center', sortable: false, value: 'statusName' },
        { text: 'Дата начала', align: 'end', sortable: false, value: 'startDate' }
      ],

      questions: [
        {
          id: 1,
          name: 'What is your favourite book?',
          language: 'RU',
          author: 'Иван Сергеевич Иванов',
          statusName: 'Активен',
          statusCode: 'ACTIVE',
          startDate: "02.03.22",
          startTime: "15:43"

        },
        {
          id: 2,
          name: 'What is your favourite movie?',
          language: 'RU',
          author: 'Иван Иванович Иванов',
          statusName: 'Завершен',
          statusCode: 'COMPLETED',
          startDate: "02.03.22",
          startTime: "15:43"
        },
        {
          id: 3,
          name: 'What is your favourite country?',
          language: 'RU',
          author: 'Иван Иванович Иванов',
          statusName: 'Приостановлен',
          statusCode: 'PAUSED',
          startDate: "02.03.22",
          startTime: "15:43"
        },
        {
          id: 4,
          name: 'What is your favourite color?',
          language: 'RU',
          author: 'Иван Петрович Иванов',
          statusName: 'Активен',
          statusCode: 'ACTIVE',
          startDate: "02.03.22",
          startTime: "15:43"
        },
        {
          id: 5,
          name: 'What is your favourite song?',
          language: 'RU',
          author: 'Иван Иванович Иванов',
          statusName: 'Завершен',
          statusCode: 'COMPLETED',
          startDate: "02.03.22",
          startTime: "15:43"
        }

      ],
    }
  },

  methods: {
    getColor(statusName) {
      if (statusName == 'Активен') return 'green'
      else if (statusName == 'Завершен') return 'blue'
      else return 'orange'
    },
    resetAuthor() {
      this.selectedAuthor = ''
    },
    resetStatus() {
      this.selectedStatus = ''
    },
    resetAll() {
      this.selectedAuthor = ''
      this.selectedStatus = ''
      this.selectedDate = ''
      this.$router.replace({ path: this.$route.path })
    },
    submit() {
      this.$router.replace({ path: this.$route.path, query: { createdby: this.selectedAuthor, status: this.selectedStatus, date: this.selectedDate } })
      this.dialog = false
      console.log(this.selectedAuthor)
    },
  },
  mounted() {
    this.selectedAuthor = this.$route.query.selectedAuthor;
    this.selectedStatus = this.$route.query.selectedStatus;
    this.selectedDate = this.$route.query.selectedDate;
  }

}
</script>
<style scoped>
.table-page {
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
}

h1 {
  margin: 0;
  margin-left: 1rem;
}

.filter-button {
  float: right;
}

:deep(.v-dialog) {
  width: 25%;
  right: 0;
  left: auto;
  margin: 0;
  height: 100%;
  max-height: 100%;
}

.card {
  height: 100%;
}

.card-inside {
  display: flex;
  flex-direction: row;
  width: 24rem;
  margin: 0 2rem;
}

.close-button {
  margin-left: 18rem;
}

.cancelled-icon {
  margin-left: 0.7rem;
  margin-bottom: 2rem;
}

.buttons {
  margin-left: 7rem;
  margin-right: auto;
}
</style>