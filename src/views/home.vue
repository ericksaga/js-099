<template>
  <div class="home row justify-content-center align-items-center">
    <h1 class="col-12">Courier Login</h1>
    <validation-observer v-slot="{ invalid }" class="col-8 col-sm-6 col-md-4">
      <form @submit.prevent="login">
        <validation-provider rules="alpha_num|required|max_length10" v-slot="{ errors }">
          <input v-model="form.username" class="form-control" type="text" placeholder="usuario" />
          <div>{{ errors[0] }}</div>
        </validation-provider>
        <validation-provider rules="alpha_num|required" v-slot="{ errors }">
          <input v-model="form.password" class="form-control" type="password" placeholder="contraseña" />
          <div>{{ errors[0] }}</div>
        </validation-provider>
        <button :disabled="invalid" type="submit" class="btn btn-primary"> Entrar </button>
      </form>
      <p>{{ error }}</p>
    </validation-observer>
  </div>
</template>

<script>
// @ is an alias to /src
import { ValidationProvider, ValidationObserver} from 'vee-validate'
export default {
  name: 'Home',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      form : {
        username: '',
        password: '' 
      },
      tries: 0,
      error: ''
    }
  },
  methods: {
    async login() {
      if(this.tries < 3) {
        this.tries++;
        try {
          this.error = ''
          let { data } = await this.$axios({
            url:'https://courierdemo.azurewebsites.net/api/membership/login',
            data: `username=${this.form.username}&password=${this.form.password}`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          if(!data.success) {
            throw({message: "usuario o contraseña incorrectos"})
          }
          this.$store.commit('updateUsername', this.form.username)
          this.$router.push({name:'package-screen'})
        } catch(e) {
          this.error = e.message
        }
        //fetch
      } else {
        this.error = "limite de intentos excedidos, favor intentarlo mas tarde"
      }
    }
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
