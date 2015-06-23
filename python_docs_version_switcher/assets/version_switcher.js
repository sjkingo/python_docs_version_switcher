var url_pattern = new RegExp("docs.python.org/([.0-9]+)/*");
var change_selector = "span.version_switcher_placeholder select";
var storage_key = "preferred_version";

/* Set version of docs from dropdown to local storage and return the
 * new value.
 */
function setVersionToStorage()
{
    var v = $(change_selector).val();
    localStorage.setItem(storage_key, v);
    return v;
}

(function() {
    var preferred_version, match;
    
    /* Pick up previously set version, or if we haven't set one yet, whatever
     * Python redirects us to.
     */
    preferred_version = localStorage.getItem("preferred_version");
    if (!preferred_version) {
        preferred_version = setVersionToStorage();
    }

    /* Handle changing the version with the version dropdown box */
    $(change_selector).change(function() {
        preferred_version = setVersionToStorage();
    });

    /* Check if we are on a non-preferred version of the docs and redirect */
    match = url_pattern.exec(window.location);
    if (match && match[1] != preferred_version) {
        var new_url = window.location.href.replace(match[1], preferred_version);
        window.location.replace(new_url);
    }
}).call(this);
