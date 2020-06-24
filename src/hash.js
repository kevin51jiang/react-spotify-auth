const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce((initial, item) => {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});


export default hash;
