<template>
    <v-container text-xs-center mt-5 pt-5>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1>Seja Bem Vindo!</h1>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="secondary" dark>
                    <v-container>
                        <v-form @submit.prevent="handleSigninUser">

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field v-model="username" prepend-icon="face" label="Usuário" type="text" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field v-model="password" prepend-icon="extension" label="Senha" type="password" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn color="accent" type="submit">Entrar</v-btn>
                                    <h3>Ainda não tem uma conta?
                                        <router-link to="/signup">Cadastre-se</router-link>
                                    </h3>
                                </v-flex>
                            </v-layout>

                        </v-form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Signin",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  watch: {
    user(value) {
      if (value) this.$router.push("/");
    }
  },
  methods: {
    handleSigninUser() {
      this.$store.dispatch("signinUser", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

