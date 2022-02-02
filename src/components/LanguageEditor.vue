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
            <v-textarea
              v-bind:label="editorData[key]._reference_"
              v-bind:value="editorData[key]._value_"
              auto-grow
              rows="1"
              style="margin-top: 8px"
              v-on:change="onTextareaChange(editorData[key], $event)"
            ></v-textarea>
          </v-row>
        </v-row>
      </div>
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

    onlyShowNecessaryTranslations: false,

    languageFile: null,
    referenceFile: null,

    editorData: null,

    // we're deadling with a hiearchical object where a key can only have a string value or an Object
    mockData: {
      global: {
        id: {
          _value_: "de",
          _reference_: "en",
        },
        lang: {
          _value_: "Deutsch",
          _reference_: "English",
        },
        idLocale: {
          _value_: "de-DE",
          _reference_: "en-EN",
        },
        generalHelpTextWithPhoneNumber: {
          _value_:
            "Bitte kontaktiere die Service Hotline {serviceHotline}, wenn Du Unterstützung benötigst.",
          _reference_:
            "Contact the service hotline at {serviceHotline} if you need assistance.",
        },
      },

      authMethod: {
        pleaseSelectAuthMethod: {
          _value_: "Wie möchtest Du Dich anmelden?",
          _reference_: "How do you want to login?",
        },
        pin: {
          name: {
            _value_: "PIN",
            _reference_: "PIN",
          },
          caption: {
            _value_: "Anmelden um zu laden",
            _reference_: "Login to charge",
          },
        },
      },
    },

    mockDataFlat: {
      global: {
        _type_: "category",
        _value_: "global",
        _isNecessary_: false,
      },
      "global.id": {
        _type_: "entry",
        _value_: "de",
        _reference_: "en",
        _isNecessary_: false,
      },
      "global.lang": {
        _type_: "entry",
        _value_: "Deutsch",
        _reference_: "English",
        _isNecessary_: false,
      },
      "global.idLocale": {
        _type_: "entry",
        _value_: "de-DE",
        _reference_: "en-EN",
        _isNecessary_: false,
      },
      "global.generalHelpTextWithPhoneNumber": {
        _type_: "entry",
        _value_:
          "Bitte kontaktiere die Service Hotline {serviceHotline}, wenn Du Unterstützung benötigst.",
        _reference_:
          "Contact the service hotline at {serviceHotline} if you need assistance.",
        _isNecessary_: false,
      },

      authMethod: {
        _type_: "category",
        _value_: "authMethod",
        _isNecessary_: true,
      },
      "authMethod.pleaseSelectAuthMethod": {
        _type_: "entry",
        _value_: "Wie möchtest Du Dich anmelden?",
        _reference_: "How do you want to login?",
        _isNecessary_: false,
      },
      "authMethod.pin": {
        _type_: "category",
        _value_: "pin",
        _isNecessary_: true,
      },
      "authMethod.pin.name": {
        _type_: "entry",
        _value_: "PIN",
        _reference_: "PIN",
        _isNecessary_: false,
      },
      "authMethod.pin.caption": {
        _type_: "entry",
        _value_: "Anmelden um zu laden",
        _reference_: "Login to charge",
        _isNecessary_: true,
      },
    },
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

      const flattenResult = helpers.flattenObject(
        JSON.parse(languageContent),
        JSON.parse(referenceContent)
      );

      this.editorData = flattenResult.flattenedObject;
    },

    countDots(text) {
      return (text.match(/\./g) || []).length;
    },

    async readFilesAndProvideEditor() {
      await this.readFiles();

      this.workflow = enmWorkflow.EDITLANGUAGE;
    },

    onTextareaChange(item, value) {
      console.log('[onTextareaChange] item:', item);
      console.log('[onTextareaChange] value:', value);

      item._value_ = value;

      console.log('[onTextareaChange] this.editorData:', this.editorData)
    }
  },
};
</script>

<style scoped>
/* https://stackoverflow.com/questions/60400194/how-to-create-a-multi-line-label-for-a-v-checkbox */

.v-label {
  flex-direction: column;
  align-items: flex-start;
}


/* .v-input--selection-controls .v-input__slot > .v-label {
  flex-direction: column;
  align-items: flex-start;
} */
</style>
