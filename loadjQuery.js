// JavaScript source code
function loadjQuery() {
    if (typeof ($) === 'undefined') {
        $ = parent.$;
        jQuery = parent.jQuery;
    }
}