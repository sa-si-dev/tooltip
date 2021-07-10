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

  static convertToFloat(value, defaultValue = 0) {
    return value !== undefined ? parseFloat(value) : defaultValue;
  }
}
