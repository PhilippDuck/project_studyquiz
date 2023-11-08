function convertMongoNumberToJSNumber(mongoNumber) {
  if (mongoNumber.$numberInt) {
    return parseInt(mongoNumber.$numberInt, 10);
  } else if (mongoNumber.$numberLong) {
    return parseInt(mongoNumber.$numberLong, 10);
  } else {
    // Wenn es kein spezieller MongoDB Number Type ist, gebe die Zahl direkt zurück
    return mongoNumber;
  }
}

export default convertMongoNumberToJSNumber;
