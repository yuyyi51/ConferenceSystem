function changePage(page) {
  let parmString = new URLSearchParams(window.location.href.split('?')[1]);
  parmString.set('page', page);
  window.location.href = "/meetinfo?" + parmString.toString();
}

$('#date_form').click((e) => {
  e.stopPropagation();
});

$('#date_form').submit(() => {
  let start = $('#start_date')[0].value;
  let end = $('#end_date')[0].value;
  let parmString = new URLSearchParams(window.location.href.split('?')[1]);
  parmString.set('start', start);
  parmString.set('end', end);
  window.location.href = "/meetinfo?" + parmString.toString();
  return false;
});

$('#desc').click(() => {
  let parmString = new URLSearchParams(window.location.href.split('?')[1]);
  parmString.set('order', '-1');
  window.location.href = "/meetinfo?" + parmString.toString();
});

$('#asc').click(() => {
  let parmString = new URLSearchParams(window.location.href.split('?')[1]);
  parmString.set('order', '1');
  window.location.href = "/meetinfo?" + parmString.toString();
});