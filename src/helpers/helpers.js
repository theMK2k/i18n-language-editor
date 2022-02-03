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

function unflattenObject(flattenedObject) {
  const result = {};

  for (let key of Object.keys(flattenedObject)) {
    const item = flattenedObject[key];

    if (item._type_ !== "entry") {
      continue;
    }

    console.log('unflattenObject handling', key);
    
    const keyparts = key.split(".");
    let builtkey = "";
    let currentLevel = result;

    for (let keypart of keyparts) {
      builtkey = `${builtkey}${builtkey ? '.' : ''}${keypart}`;

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
function flattenObject(sourceObject, referenceObject, targetObject, keyPrefix) {
  console.group("flattenObject");

  console.log("[flattenObject] sourceObject:", sourceObject);
  console.log("[flattenObject] referenceObject:", referenceObject);
  console.log("[flattenObject] targetObject:", targetObject);
  console.log("[flattenObject] keyPrefix:", keyPrefix);

  const result = {
    containsNecessaryEntries: false,
    flattenedObject: null,
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
      const isNecessary =
        !sourceContent || (referenceContent && (sourceContent == referenceContent));

      if (isNecessary) {
        result.containsNecessaryEntries = true;
      }

      const entryItem = {
        _type_: "entry",
        _value_: sourceContent,
        _reference_: referenceContent || keyToName(key),
        _isNecessary_: isNecessary,
      };

      targetObject[`${keyPrefix ? keyPrefix + "." : ""}${key}`] = entryItem;

      if (entryItem._isNecessary_) {
        console.log('is necessary:', entryItem);
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

      const flattenResult = flattenObject(
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

  result.flattenedObject = targetObject;
  return result;
}

export { readTextFileAsync, flattenObject, unflattenObject };
