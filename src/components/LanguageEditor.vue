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
      style="padding-top: 16px"
    >
      <v-row>
        <h1 v-if="workflow === enmWorkflow.LOADLANGUAGEFILE">
          Step 1 of 3: Load the language file to be edited
        </h1>
        <h1 v-if="workflow === enmWorkflow.LOADREFERENCEFILE">
          Step 2 of 3: Load a reference language file if available
        </h1>
      </v-row>

      <p v-if="workflow === enmWorkflow.LOADREFERENCEFILE">
        The reference language file is optional.
      </p>

      <div
        v-if="
          workflow === enmWorkflow.LOADREFERENCEFILE &&
          !isReferenceFileAvailable
        "
      >
        <v-row>
          <v-btn
            color="success"
            class="bigbutton"
            v-on:click="isReferenceFileAvailable = true"
            >LOAD (I have a reference file)</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="primary" class="bigbutton" v-on:click="onNext"
            >SKIP (I don't have a reference file)</v-btn
          >
        </v-row>
      </div>

      <file-drop
        v-if="
          workflow === enmWorkflow.LOADLANGUAGEFILE || isReferenceFileAvailable
        "
        ref="fileDrop"
        v-bind:accept="'.json'"
        v-bind:disableLabel="true"
        v-on:update="onUpdateFile"
      />
      <v-row>
        <v-spacer />
        <v-btn
          v-if="
            workflow !== enmWorkflow.LOADREFERENCEFILE ||
            isReferenceFileAvailable
          "
          color="primary"
          v-bind:disabled="disableNext"
          v-on:click="onNext"
          >NEXT</v-btn
        >
      </v-row>
    </div>

    <!-- Workflow: 3 - edit the language file -->
    <div v-if="workflow === enmWorkflow.EDITLANGUAGE" style="margin-top: 16px">
      <v-row>
        <h1>Step 3 of 3: Edit the language file</h1>
        <v-spacer></v-spacer>
        <v-btn color="primary" v-on:click="onGenerateResult(false)"
          >DONE, GENERATE AND DOWNLOAD RESULT</v-btn
        >
      </v-row>

      <v-switch
        label="Only show necessary translations"
        v-model="onlyShowNecessaryTranslations"
      ></v-switch>

      <div v-if="editorData" style="margin-top: 16px">
        <v-row
          v-for="key of Object.keys(editorData)"
          v-bind:key="key"
          style="margin: 0px"
        >
          <div
            v-for="i in countDots(key)"
            v-bind:key="i"
            style="width: 16px"
          ></div>
          <div
            v-if="
              editorData[key]._type_ === 'category' &&
              (!onlyShowNecessaryTranslations || editorData[key]._isNecessary_)
            "
            style="margin-bottom: 8px"
          >
            <h3>{{ editorData[key]._value_ }}</h3>
          </div>
          <v-row
            v-if="
              editorData[key]._type_ === 'entry' &&
              (!onlyShowNecessaryTranslations || editorData[key]._isNecessary_)
            "
            style="margin: 0px"
          >
            <div style="width: 100%" v-bind:ref="`entry_${key}`">
              <pre>{{ editorData[key]._reference_ }}</pre>
              <!--               v-bind:label="editorData[key]._reference_" -->
              <v-textarea
                v-bind:value="editorData[key]._value_"
                auto-grow
                rows="1"
                style="margin-top: -12px; margin-bottom: 16px"
                v-bind:error-messages="editorData[key]._statusmessages_"
                v-on:change="onTextareaChange(editorData[key], $event)"
              ></v-textarea>
            </div>
          </v-row>
        </v-row>
      </div>
    </div>
    <v-dialog v-model="showDialog" persistent max-width="600">
      <v-card>
        <v-card-title class="text-h5"> Problems detected </v-card-title>
        <v-card-text
          >One or more translations have incorrect values, please check them
          before saving the result.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onGenerateResult(true)">
            Ignore the warnings and proceed
          </v-btn>
          <v-btn color="primary darken-1" text @click="showDialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

    onlyShowNecessaryTranslations: false,

    languageFile: null,

    isReferenceFileAvailable: false,
    referenceFile: null,

    editorData: null,

    showDialog: false,
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
      this.isReferenceFileAvailable = false;
      this.referenceFile = null;
      this.showDialog = false;
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
      // console.log("onUpdateFile files[0]:", files[0]);

      if (this.workflow === enmWorkflow.LOADLANGUAGEFILE) {
        this.languageFile = files[0];
      }
      if (this.workflow === enmWorkflow.LOADREFERENCEFILE) {
        this.referenceFile = files[0];
      }
    },

    async readFiles() {
      // console.log("helpers:", helpers);

      const languageContent = await helpers.readTextFileAsync(
        this.languageFile
      );

      const referenceContent = this.referenceFile
        ? await helpers.readTextFileAsync(this.referenceFile)
        : null;

      // console.log("languageContent:", languageContent);
      // console.log("referenceContent:", referenceContent);

      const flattenResult = helpers.generateEditorData(
        JSON.parse(languageContent),
        JSON.parse(referenceContent)
      );

      this.editorData = flattenResult.editorData;
    },

    countDots(text) {
      return (text.match(/\./g) || []).length;
    },

    async readFilesAndProvideEditor() {
      await this.readFiles();

      this.workflow = enmWorkflow.EDITLANGUAGE;
    },

    onTextareaChange(item, value) {
      // console.log("[onTextareaChange] item:", item);
      // console.log("[onTextareaChange] value:", value);

      item._value_ = value;

      helpers.verifyEditorDataItem(item);

      // console.log("[onTextareaChange] item (after verification):", item);
    },

    onGenerateResult(ignoreVerification) {
      this.showDialog = false;

      const verificationResult = helpers.verifyEditorData(this.editorData);

      // console.log('[onGenerateResult] verificationResult:', verificationResult);

      // show dialog if this.editorData contains errors or warnings
      if (!ignoreVerification && verificationResult.hasProblems) {
        let problemItemKey = null;

        for (let key of Object.keys(this.editorData)) {
          const item = this.editorData[key];

          if (item._statusmessages_ && item._statusmessages_.length > 0) {
            problemItemKey = key;
            break;
          }
        }

        if (problemItemKey) {
          const htmlElement = this.$refs[`entry_${problemItemKey}`][0];

          console.log("htmlElement:", htmlElement);

          if (htmlElement) {
            htmlElement.scrollIntoView({ block: "center", behavior: "smooth" });
            htmlElement.focus();
          }
        }

        this.showDialog = true;
        return;
      }

      const result = helpers.generateResultObject(this.editorData);
      // console.log('result:', JSON.stringify(result, null, 2));
      const blob = new Blob([JSON.stringify(result, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        (this.languageFile.name || "download").split(".")[0]
      }_edited.json`;
      // console.log("download filename:", a.download);

      const clickHandler = () => {
        setTimeout(() => {
          URL.revokeObjectURL(url);
          a.removeEventListener("click", clickHandler);
        }, 150);
      };

      a.addEventListener("click", clickHandler, false);
      a.click();
      return a;
    },
  },
};
</script>

<style scoped>
pre {
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}

.bigbutton {
  width: 400px;
  height: 120px !important;
}
</style>
