<template>
  <div class="package-screen">
    <p class="text-left text-primary" @click="logout">Salir</p>
    <h1>Paquetes de {{ username }}</h1>
    <div class="table-responsive">
      <table class="table">
        <tr>
          <th>Courier</th>
          <th>no. tracking</th>
          <th>no. interno</th>
          <th>descripcion</th>
          <th>suplidor</th>
          <th>peso</th>
          <th>precio</th>
        </tr>
        <tbody>
          <tr :key="packages.internalTracking" v-for="packages in packageList">
            <td>{{packages.courier}}</td>
            <td>{{packages.courierTracking}}</td>
            <td>{{packages.internalTracking}}</td>
            <td>{{packages.description}}</td>
            <td>{{packages.supplier}}</td>
            <td>{{packages.weight}}</td>
            <td>{{packages.priceToPay}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      packageList: []
    }
  },
  methods: {
    async getPackages() {
      try {
        let { data } = await this.$axios({
          url:`https://courierdemo.azurewebsites.net/api/packages/getPending?username=${this.username}`,
          method: 'GET',
        })
        this.packageList = data.responseObject
      }
      catch(e) {
        console.log(e)
      }
    },
    logout() {
      this.$store.commit('updateUsername','')
      this.$router.push({name:'Home'})
    }
  },
  mounted () {
    if(!this.$store.state.username) {
      this.$router.push({name:'Home'})
    }
    this.username = this.$store.state.username
    this.getPackages()
  }
}
</script>

<style scoped>
  h1 {
    font-weight: 700;
    font-size: 20px;
  }
  .home {
    font-size: 10px;
  }
  @media screen and (min-width: 576px) {
    h1 {
      font-size: 24px;
    }
    .home {
      font-size: 12px;
    }
  }
  @media screen and (min-width: 768px) {
    h1 {
      font-size: 28px;
    }
    .home {
      font-size: 14px;
    }
  }
  @media screen and (min-width: 992px) {
    h1 {
      font-size: 32px;
    }
    .home {
      font-size: 16px;
    }
  }
</style>
