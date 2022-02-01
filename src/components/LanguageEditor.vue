<template>
  <v-container>
    <!-- Workflow: 1 - load language file
                   2 - load reference file
    -->
    <div
      v-if="
        workflow === enmWorkflow.LOADLANGUAGEFILE ||
        workflow === enmWorkflow.LOADREFERENCEFILE
      "
    >
      <h1 v-if="workflow === enmWorkflow.LOADLANGUAGEFILE">
        Step 1 of 3: Load the language file to be edited
      </h1>
      <h1 v-if="workflow === enmWorkflow.LOADREFERENCEFILE">
        Step 2 of 3: Load a reference language file if available
      </h1>
      <p v-if="workflow === enmWorkflow.LOADREFERENCEFILE">
        The reference language file is optional.
      </p>
      <file-drop
        ref="fileDrop"
        v-bind:accept="'.json'"
        v-bind:disableLabel="true"
        v-on:update="onUpdateFile"
      />
      <v-row>
        <v-spacer />
        <v-btn color="primary" v-bind:disabled="disableNext" v-on:click="onNext"
          >NEXT</v-btn
        >
      </v-row>
    </div>

    <!-- Workflow: 3 - edit the language file -->
    <div v-if="workflow === enmWorkflow.EDITLANGUAGE">
      <h1>Step 3 of 3: Edit the language file</h1>
    </div>
  </v-container>
</template>

<script>
import FileDrop from "@/components/FileDrop.vue";

import * as helpers from "@/helpers/helpers";

const enmWorkflow = {
  LOADLANGUAGEFILE: 1,
  LOADREFERENCEFILE: 2,
  EDITLANGUAGE: 3,
};

export default {
  name: "LanguageEditor",
  components: {
    FileDrop,
  },

  data: () => ({
    workflow: enmWorkflow.LOADLANGUAGEFILE,

    languageFile: null,
    referenceFile: null,
  }),

  computed: {
    enmWorkflow() {
      return enmWorkflow;
    },

    disableNext() {
      if (this.workflow === enmWorkflow.LOADLANGUAGEFILE) {
        if (!this.languageFile) {
          return true;
        }
      }

      return false;
    },
  },

  methods: {
    reset() {
      this.workflow = enmWorkflow.LOADLANGUAGEFILE;
      this.languageFile = null;
      this.referenceFile = null;
    },

    async onNext() {
      if (this.workflow === enmWorkflow.LOADLANGUAGEFILE) {
        this.$refs.fileDrop.reset();
        this.workflow = enmWorkflow.LOADREFERENCEFILE;
      } else if (this.workflow === enmWorkflow.LOADREFERENCEFILE) {
        await this.readFilesAndProvideEditor();
      }
    },

    onUpdateFile(files) {
      console.log("onUpdateFile files[0]:", files[0]);

      if (this.workflow === enmWorkflow.LOADLANGUAGEFILE) {
        this.languageFile = files[0];
      }
      if (this.workflow === enmWorkflow.LOADREFERENCEFILE) {
        this.referenceFile = files[0];
      }
    },

    async readFiles() {
      console.log("helpers:", helpers);

      const languageContent = await helpers.readTextFileAsync(
        this.languageFile
      );

      const referenceContent = this.referenceFile
        ? await helpers.readTextFileAsync(this.referenceFile)
        : null;

      console.log("languageContent:", languageContent);
      console.log("referenceContent:", referenceContent);
    },

    async readFilesAndProvideEditor() {
      await this.readFiles();

      // TODO: build up internal structures for editing

      this.workflow = enmWorkflow.EDITLANGUAGE;
    },
  },
};
</script>
