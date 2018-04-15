<template>
  <div class="selectform">
    <HeaderMe />
    <div v-bind:class="{ hider: !isLoading }">
        <center><ring-loader ></ring-loader></center>
    </div>
    <div v-bind:class="{ hider: isLoading }" style="padding-left: 20px; padding-right: 20px">
                <div class="card hovercard">
                <div class="cardheader">
                </div>
                <div class="avatar">
                    <img :src="'http:' + credentials.avatarUrl" />
                </div>
                <div class="info">
                    <div class="title">
                        {{ credentials.username }}
                    </div>
                    <div class="desc">{{ credentials.email}}</div>
                    <div class="desc">Created: {{ credentials.created_at}}</div>
                    <div class="desc" style="width:70px; margin:0 auto" ><p class="text-danger" v-on:click="logout" style="cursor:pointer">Logout</p></div>
                </div>
            </div>
      <small class="form-text text-muted" style="text-align:left; font-weight: bold;">Select form to see statistics.</small>
        <select id="ddown1" v-model="select" @change="changeCurrID()" class="m-md-2 form-control" right>
            <option :value="formids" v-for="formids in formIds" :key="formids.id">
              {{ formids.title }} - ({{ formids.count }})
            </option>
      </select>
    </div>
  </div>
</template>

<script>
import HeaderMe from './Head'
import Router from 'vue-router'
import RingLoader from 'vue-spinner/src/RingLoader.vue'

export default {
  name: 'selectform',
  data: function () {
    return {
      'select': ''
    }
  },
  computed: {
    selectOptions () {
      let ids = this.$store.state.formIds.data
      let selid = []
      for (let key in ids) {
        selid.push({
          label: ids[key].title,
          value: ids[key].title
        })
      }
      return selid
    },
    credentials: function () {
      return this.$store.state.account
    },
    formIds: function () {
      return this.$store.state.formIds.data
    },
    formId: function () {
      return this.$store.state.formId
    },
    isLoading: function () {
      return this.$store.state.isLoading
    }
  },
  methods: {
    logout: function () {
      var storage = window.localStorage
      storage.removeItem('apikey')
      this.$store.commit('logout')
      this.$router.push('/')
    },
    getAcc: function () {
      this.$store.commit('getUser')
    },
    getIDs: function () {
      this.$store.commit('getFormIDs')
    },
    changeCurrID () {
      let param = [this.select.id, this.select.title]
      this.$store.commit('changeID', param)
      this.select = ''
      this.$router.push('statistics')
    }
  },
  mounted () {
    this.$store.state.isLoading = true
    this.getAcc()
    this.getIDs()
    this.$store.state.lastActiveTab = 0
  },
  components: {
    HeaderMe,
    Router,
    RingLoader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control {
    margin: 0px !important;
    margin-bottom: 5px !important;
}
.hider {
  display: none;
}
.loader {
  background: white;
}

.card {
    padding-top: 20px;
    margin: 10px 0 20px 0;
    background-color: rgba(214, 224, 226, 0.2);
    border-top-width: 0;
    border-bottom-width: 2px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.card.hovercard {
    position: relative;
    padding-top: 0;
    overflow: hidden;
    text-align: center;
    background-color: rgba(214, 224, 226, 0.2);
}

.card.hovercard .cardheader {
    background: url("http://space.airbus.com/wp-content/uploads/2016/09/earth-view-from-satellite-space-systems-cover.jpg");
    background-size: cover;
    height: 135px;
}

.card.hovercard .avatar {
    position: relative;
    top: -50px;
    margin-bottom: -50px;
}

.card.hovercard .avatar img {
    width: 100px;
    height: 100px;
    max-width: 100px;
    max-height: 100px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 5px solid rgba(255,255,255,0.5);
}

.card.hovercard .info {
    padding: 4px 8px 10px;
}

.card.hovercard .info .title {
    margin-bottom: 4px;
    font-size: 24px;
    line-height: 1;
    color: #262626;
    vertical-align: middle;
}

.card.hovercard .info .desc {
    overflow: hidden;
    font-size: 12px;
    line-height: 20px;
    color: #737373;
    text-overflow: ellipsis;
}

.card.hovercard .bottom {
    padding: 0 20px;
    margin-bottom: 17px;
}
</style>
