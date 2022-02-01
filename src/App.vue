<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">i18n Language Editor</div>

      <v-spacer></v-spacer>

      <v-btn color="primary" v-on:click="onReset">RESET </v-btn>
    </v-app-bar>

    <v-main>
      <language-editor ref="languageEditor" />
    </v-main>
  </v-app>
</template>

<script>
import LanguageEditor from "./components/LanguageEditor.vue";

export default {
  name: "App",

  components: {
    LanguageEditor,
  },

  data: () => ({
    //
  }),

  methods: {
    onReset() {
      this.$refs.languageEditor.reset();
    },
  },
};
</script>
