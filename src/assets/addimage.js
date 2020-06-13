jQuery("#files").on("change", "input", function(event){
    jQuery('#files').append('<input type="file" name="file[]"/>')
});