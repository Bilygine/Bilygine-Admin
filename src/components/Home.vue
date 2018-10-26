<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex xs4>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="entry"
              :rules="urlRules"
              label="Youtube URL"
              required
            ></v-text-field>
            <v-btn
              :disabled="!valid || entry === ''"
              @click="submit"
            >
              submit
            </v-btn>
          </v-form>
          <v-btn
            @click="download"
          >
            Download
          </v-btn>
          <p v-if="downloading">
            Download...
          </p>
          <v-data-table
              :headers="headers"
              :items="analyzes"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-right">{{ props.item.id }}</td>
                <td class="text-xs-right">{{ props.item.status }}</td>
                <td class="text-xs-right">{{ props.item.elapsed }}</td>
              </template>
            </v-data-table>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import api from '@/api'
export default {
  data () {
    return {
      entry: '',
      valid: false,
      urlRules: [
        v => !!v || 'Youtube URL is required'
      ],
      analyzes: [],
      downloading: false,
      headers: [
          { text: 'ID', value: 'id' },
          { text: 'Status', value: 'status' },
          { text: 'Time', value: 'elapsed' }
        ],
    }
  },
  methods: {
    submit () {
      let params = {
        url: this.entry
      }
      api.post('/prod', params).then((response) => console.log(response))
    },
    download() {
      this.downloading = true
      api.get('http://35.189.78.162:5000/').then((response) => this.downloading = false)

    },
    getAnalyzes () {
      setInterval(() => {
        api.get('http://localhost:9999/api/analyze').then((response) => (this.analyzes = response.data))
      }, 1000);
    }
  },
  mounted () {
    setTimeout(this.getAnalyzes(), 1000)
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
