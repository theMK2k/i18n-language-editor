function readTextFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsText(file);
  });
}

function keyToName(key) {
  return key.replace(/_/g, ".");
}

function generateResultObject(editorData) {
  const result = {};

  for (let key of Object.keys(editorData)) {
    const item = editorData[key];

    if (item._type_ !== "entry") {
      continue;
    }

    // console.log("unflattenObject handling", key);

    const keyparts = key.split(".");
    let builtkey = "";
    let currentLevel = result;

    for (let keypart of keyparts) {
      builtkey = `${builtkey}${builtkey ? "." : ""}${keypart}`;

      if (builtkey === key) {
        currentLevel[keypart] = item._value_;
      } else {
        if (!currentLevel[keypart]) {
          currentLevel[keypart] = {};
        }

        currentLevel = currentLevel[keypart];
      }
    }
  }

  return result;
}

/**
 *
 * @param {Object} sourceObject
 * @param {Object} referenceObject
 * @param {Object} targetObject
 * @param {Object} keyPrefix
 * @returns
 */
function generateEditorData(
  sourceObject,
  referenceObject,
  targetObject,
  keyPrefix
) {
  console.group("generateEditorData");

  // console.log("[generateEditorData] sourceObject:", sourceObject);
  // console.log("[generateEditorData] referenceObject:", referenceObject);
  // console.log("[generateEditorData] targetObject:", targetObject);
  // console.log("[generateEditorData] keyPrefix:", keyPrefix);

  const result = {
    containsNecessaryEntries: false,
    editorData: null,
  };

  if (!targetObject) {
    targetObject = {};
  }
  for (let key of referenceObject
    ? Object.keys(referenceObject)
    : Object.keys(sourceObject)) {
    if (key.includes(".")) {
      throw new Error(`The key '${key}' contains dots, which is not allowed!`);
    }

    const referenceContent = referenceObject ? referenceObject[key] : null;
    const sourceContent = sourceObject[key];

    if (
      referenceObject
        ? typeof referenceContent === "string"
        : typeof sourceContent === "string"
    ) {
      const isNecessary = !sourceContent; //  || (referenceContent && (sourceContent == referenceContent))

      if (isNecessary) {
        result.containsNecessaryEntries = true;
      }

      const entryItem = {
        _type_: "entry",
        _value_: sourceContent,
        _reference_: referenceContent || keyToName(key),
        _isNecessary_: isNecessary
      };

      targetObject[`${keyPrefix ? keyPrefix + "." : ""}${key}`] = entryItem;

      if (entryItem._isNecessary_) {
        // console.log("is necessary:", entryItem);
      }
    } else if (
      referenceObject
        ? typeof referenceContent === "object"
        : typeof sourceContent === "object"
    ) {
      const categoryItem = {
        _type_: "category",
        _value_: key,
        _isNecessary_: true,
      };
      targetObject[`${keyPrefix ? keyPrefix + "." : ""}${key}`] = categoryItem;

      const flattenResult = generateEditorData(
        sourceContent,
        referenceContent,
        targetObject,
        `${keyPrefix ? keyPrefix + "." : ""}${key}`
      );

      categoryItem._isNecessary_ = flattenResult.containsNecessaryEntries;

      if (categoryItem._isNecessary_) {
        result.containsNecessaryEntries = true;
      }
    } else {
      throw new Error(
        `type not allowed:`,
        referenceObject ? typeof referenceContent : typeof sourceContent
      );
    }
  }

  console.groupEnd();

  result.editorData = targetObject;
  return result;
}

function verifyEditorDataItem(editorDataItem) {
  // console.log('[verifyEditorDataItem] editorDataItem:', editorDataItem);
  
  // reset warning and error
  editorDataItem._statusmessages_ = [];

  if (editorDataItem._type_ !== "entry") {
    return;
  }

  if (!editorDataItem._value_) {
    // console.log('[verifyEditorDataItem]   ERROR: Empty translation');
    editorDataItem._statusmessages_.push("ERROR: Empty translation");
    return;
  }

  const referenceVariables = editorDataItem._reference_.match(/\{.*?\}/g);

  if (referenceVariables) {
    for (let referenceVariable of referenceVariables) {
      if (!editorDataItem._value_.includes(referenceVariable)) {
        // console.log(`[verifyEditorDataItem]   WARNING: Missing variable "${referenceVariable}" in translation`);
        editorDataItem._statusmessages_.push(`WARNING: Missing variable "${referenceVariable}" in translation`);
      }
    }
  }

  const valueVariables = editorDataItem._value_.match(/\{.*?\}/g);

  // console.log('[verifyEditorDataItem] referenceVariables:', referenceVariables, 'valueVariables:', valueVariables);

  if (valueVariables) {
    for (let valueVariable of valueVariables) {
      if (!referenceVariables || !referenceVariables.find(referenceVariable => referenceVariable == valueVariable)) {
        // console.log(`[verifyEditorDataItem]   WARNING: Variable "${valueVariable}" not found in reference text (please do not introduce new variables)`);
        editorDataItem._statusmessages_.push(`WARNING: Variable "${valueVariable}" not found in reference text (please do not introduce new variables)`);
      }
    }
  }
}

function verifyEditorData(editorData) {
  let hasProblems = false;
  
  for (let key of Object.keys(editorData)) {
    const item = editorData[key];

    verifyEditorDataItem(item);

    if (item._statusmessages_ && item._statusmessages_.length > 0) {
      hasProblems = true;
    }
  }

  return {
    hasProblems
  }
}

export {
  readTextFileAsync,
  generateEditorData,
  generateResultObject,
  verifyEditorData,
  verifyEditorDataItem,
};
