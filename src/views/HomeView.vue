<template>
  <div class="site-header">
      <h1>Staff Directory</h1>
      <p>BC Government | Software Development Department</p>
  </div>
  <div class="home">
    <div v-if="staff.length">
      <OrgChart :staff="staff" />
    </div>
    <div v-else>Loading ... </div>
  </div>
</template>

<script>
import OrgChart from '@/components/OrgChart.vue'

export default {
  name: 'HomeView',
  components: { OrgChart },
  
  data() {
    return {
      staff: []
    }
  },

  methods: {
    async GetAllStaff() {
      // send get request to the api server
      try {
        let staffData = await fetch(process.env.VUE_APP_API_URL + ':' + process.env.VUE_APP_API_PORT + '/staff')
        if (!staffData.ok) {
          throw Error('Fetching Staff data from API server Failed')
        }
        this.staff = await staffData.json()
      } catch (error) {
        console.log(error)
      }
    }
  },

  created() {
    this.GetAllStaff()
  }
}
</script>
<style>
    .site-header {
        border-radius: 25px;
        background-color: lightblue;
        color: black;
        border-bottom: 3px solid black;
    }
    
    body {
      background-color: #d9e1e3;
    }
</style>