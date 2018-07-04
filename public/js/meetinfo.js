function changePage(index) {
  let keywords = getUrlParms('keywords');
  let order = getUrlParms('order');
  let start = getUrlParms('start');
  let end = getUrlParms('end');
  let url_str = '?';
  url_str += 'page=' + (index || 1) + '&';
  url_str += 'keywords=' + (keywords || "") + '&';
  url_str += 'start=' + (start || '') + '&';
  url_str += 'end=' + (end || '') + '&';
  url_str += 'order=' + (order || -1);
  window.location.href = "/meetinfo" + url_str;
}