<template>

  <v-container class="text-xs-center">
    <v-flex
      sm6
      offset-sm3
    >
      <v-card
        class="white--text"
        color="secondary"
      >
        <v-layout>
          <v-flex sx5>
            <v-img
              height="125px"
              contain
              :src="user.avatar"
            >

            </v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{user.username}}</div>
                <div>Desde {{formatJoinDate(user.joinDate)}}</div>
                <div class="hidden-xs-only font-weight-thin">{{user.favorites.length}} Favoritos</div>
                <div class="hidden-xs-only font-weight-thin">{{ userPosts.length}} Posts Adicionados</div>
              </div>
            </v-card-title>
          </v-flex>

        </v-layout>
      </v-card>
    </v-flex>

    <v-container v-if="!userFavorites.length">
      <v-layout
        row
        wrap
      >
        <v-flex sx-12>
          <h1>Você ainda não possui favoritos. Adicione alguns.</h1>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container
      class="mt-3"
      v-else
    >
      <v-flex xs12>
        <h2 class="font-weight-light">Favoritos
          <span class="font-weight-regular">({{userFavorites.length}})</span>
        </h2>
      </v-flex>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm6
          v-for="favorite in userFavorites"
          :key="favorite._id"
        >
          <v-card class="mt-3 ml-1 mr-2">
            <v-img
              @click="goToPost(favorite._id)"
              height="30vh"
              :src="favorite.imageUrl"
            >

            </v-img>
            <v-card-text>{{favorite.title}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="!userPosts.length">
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <h2>Você ainda não adicionou nenhum Post.</h2>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container
      class="mt-3"
      v-else
    >
      <v-flex xs12>
        <h2 class="font-weight-light">Suas Publicações
          <span class="font-weight-regular">({{userPosts.length}})</span>
        </h2>
      </v-flex>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm6
          v-for="post in userPosts"
          :key="post._id"
        >
          <v-card
            class="mt-3 ml-1 mr-2"
            hover
          >
            <v-btn
              @click="loadPost(post)"
              color="info"
              floating
              fab
              small
              dark
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
              @click="handleDeleteUserPost(post)"
              color="error"
              floating
              fab
              small
              dark
            >
              <v-icon>delete</v-icon>
            </v-btn>

            <v-img
              @click="goToPost(post._id)"
              height="30vh"
              :src="post.imageUrl"
            ></v-img>
            <v-card-text>{{post.title}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog
      xs12
      sm6
      offset-sm3
      persistent
      v-model="editPostDialog"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">Atualizar Post</v-card-title>
        <v-container>
          <v-form
            v-model="isFormValid"
            lazy-validation
            ref="form"
            @submit.prevent="handleUpdateUserPost"
          >

            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  :rules="titleRules"
                  v-model="title"
                  label="Título"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  :rules="imageRules"
                  v-model="imageUrl"
                  label="URL da imagem"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12>
                <img
                  :src="imageUrl"
                  height="300px"
                >
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12>
                <v-select
                  v-model="categories"
                  :rules="categoriesRules"
                  :items="['Art', 'Educação', 'Comida', 'Lugares', 'Fotografia', 'Tecnologia']"
                  multiple
                  label="Categoria"
                ></v-select>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex xs12>
                <v-textarea
                  :rules="descRules"
                  v-model="description"
                  model="Descrição"
                ></v-textarea>
              </v-flex>
            </v-layout>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!isFormValid"
                type="submit"
                class="success--text"
                flat
              >Atualizar</v-btn>
              <v-btn
                class="error--text"
                flat
                @click="editPostDialog = false"
              >Cancelar</v-btn>
            </v-card-actions>

          </v-form>

        </v-container>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "Perfil",
  data() {
    return {
      editPostDialog: false,
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
    ...mapGetters(["user", "userFavorites", "userPosts"])
  },
  created() {
    this.handleGetUserPosts();
  },
  methods: {
    goToPost(postId) {
      this.$router.push(`/posts/${postId}`);
    },
    formatJoinDate(date) {
      return moment(new Date(date)).format("ll");
    },
    handleGetUserPosts() {
      this.$store.dispatch("getUserPosts", {
        userId: this.user._id
      });
    },
    handleUpdateUserPost() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("updateUserPost", {
          postId: this.postId,
          userId: this.user._id,
          title: this.title,
          imageUrl: this.imageUrl,
          categories: this.categories,
          description: this.description
        });
        this.editPostDialog = false;
      }
    },
    handleDeleteUserPost(post) {
      this.loadPost(post, false);
      const deletePost = window.confirm(
        "Você tem certeza que deseja excluir este post?"
      );
      if (deletePost)
        this.$store.dispatch("deleteUserPost", { postId: this.postId });
    },
    loadPost(
      { _id, title, imageUrl, categories, description },
      editPostDialog = true
    ) {
      this.editPostDialog = editPostDialog;
      this.postId = _id;
      this.title = title;
      this.imageUrl = imageUrl;
      this.categories = categories;
      this.description = description;
    }
  }
};
</script>

