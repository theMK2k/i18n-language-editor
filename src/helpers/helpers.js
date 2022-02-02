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
  return key.replace(/_/g, ".")
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
    
    const referenceItem = referenceObject ? referenceObject[key] : null;
    const sourceItem = sourceObject[key];

    if (
      referenceObject
        ? typeof referenceItem === "string"
        : typeof sourceItem === "string"
    ) {
      targetObject[`${keyPrefix ? keyPrefix + "." : ""}${key}`] = {
        _type_: "entry",
        _value_: sourceItem,
        _reference_: referenceItem || keyToName(key),
        _isNecessary_: true, // TODO: determine if this is a necessary entry
      };
    } else if (
      referenceObject
        ? typeof referenceItem === "object"
        : typeof sourceItem === "object"
    ) {
      const categoryItem = {
        _type_: "category",
        _value_: key,
        _isNecessary_: true,
      };
      targetObject[`${keyPrefix ? keyPrefix + "." : ""}${key}`] = categoryItem;

      const flattenResult = flattenObject(
        sourceItem,
        referenceItem,
        targetObject,
        `${keyPrefix ? keyPrefix + "." : ""}${key}`
      );

      categoryItem._isNecessary_ = flattenResult.containsNecessaryEntries;
    } else {
      throw new Error(
        `type not allowed:`,
        referenceObject ? typeof referenceItem : typeof sourceItem
      );
    }
  }

  console.groupEnd();

  result.flattenedObject = targetObject;
  result.containsNecessaryEntries = true; // TODO: determine this
  return result;
}

export { readTextFileAsync, flattenObject };
