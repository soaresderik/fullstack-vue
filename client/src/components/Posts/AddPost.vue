<template>
    <v-container text-xs-center mt-5 pt-5>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="primary--text">Adicionar Publicação</h1>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>

                <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleAddPost">

                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field :rules="titleRules" v-model="title" label="Título" type="text" required></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field :rules="imageRules" v-model="imageUrl" label="URL da imagem" type="text" required></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex xs12>
                            <img :src="imageUrl" height="300px">
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex xs12>
                            <v-select v-model="categories" :rules="categoriesRules" :items="['Art', 'Educação', 'Comida', 'Lugares', 'Fotografia', 'Tecnologia']" multiple label="Categoria"></v-select>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex xs12>
                            <v-textarea :rules="descRules" v-model="description" model="Descrição"></v-textarea>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12>
                            <v-btn :loading="loading" :disabled="!isFormValid || loading" color="info" type="submit">
                                Enviar
                                <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                </span>
                            </v-btn>
                        </v-flex>
                    </v-layout>

                </v-form>

            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AddPost",
  data() {
    return {
      isFormValid: true,
      title: "",
      imageUrl: "",
      categories: [],
      description: "",
      titleRules: [
        title => !!title || "Título é obrigatório",
        title => title.length < 20 || "Título deve ter no máximo 20 caracteres"
      ],
      imageRules: [image => !!image || "Imagem é Obrigatória"],
      categoriesRules: [
        categories =>
          categories.length >= 1 || "Deve conter no mínimo uma categoria"
      ],
      descRules: [
        desc => !!desc || "Descrição é Obrigatoria",
        desc => desc.length < 200 || "Título deve ter no máximo 200 caracteres"
      ]
    };
  },
  computed: {
    ...mapGetters(["loading", "user"])
  },
  methods: {
    handleAddPost() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("addPost", {
          title: this.title,
          imageUrl: this.imageUrl,
          description: this.description,
          categories: this.categories,
          creatorId: this.user._id
        });

        this.$router.push("/");
      }
    }
  }
};
</script>

