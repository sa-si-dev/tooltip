export class Utils {
  static convertToBoolean(value, defaultValue = false) {
    if (value === true || value === 'true') {
      value = true;
    } else if (value === false || value === 'false') {
      value = false;
    } else {
      value = defaultValue;
    }

    return value;
  }
}
