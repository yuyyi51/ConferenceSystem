function changePage(page) {
    let parmString = new URLSearchParams(window.location.href.split('?')[1]);
    parmString.set('page', page);
    window.location.href = "/mymeetings?" + parmString.toString();
};
