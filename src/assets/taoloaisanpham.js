
jQuery(document).ready(function($){
                // debugger
                var add_btn= $(".add-more-info");
                var warpher= $(".field-wrapper");
                var html_field= `<div>
                       <input  class="value1" type="text"><a href="javascript:void(0);" class="remove_button"><i class="fas fa-minus"></i></a>
                       <br>
                       <textarea class="value2" type="text"></textarea>
                       <br>
                    </div>`;
                    var x=1;
                    $(add_btn).click(function(e){
                        e.preventDefault();
                        x++;
                        $(warpher).append(html_field);
                    });
                    $(warpher).click('.remove_button',function(e){
                        e.preventDefault();
                        $(this).parent('div').remove();
                        x--;
                    });
            });