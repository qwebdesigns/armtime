function openSort(how) {
    var new_url = '../sort/?sort=1&flag="' + how[0] + '"&category="' + how[1] + '"';
    //alert(new_url);
    window.location.href = new_url;
}