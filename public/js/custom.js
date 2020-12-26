$(".custom-file-input").on("change", function() {
    var filename = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(filename);
});

// $(".input-files").on("change", function() {
//     //var filename = $(this).val().split("\\").pop();
//     //$(this).siblings(".upload-files").addClass("selected").html($(".input-files", this)[0].files.length);
//     $('.input-files').attr('src', $(".input-files", this)[0].files.length);
// });

function readOneURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            $('#previewMainImg').attr('src', e.target.result);
            $('#previewMainImg').show();
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#previewMainImg').hide();
    }
}

function readMultipleURL(input) {
    if (input.files && input.files[0]) {
        //console.log("inputfile = " + input.files)
        $("img").remove(".detailImg");
        const l = input.files.length;

        for (let i = 0; i < l; i++){
            const reader = new FileReader();

            reader.onload = function (e) {
                $($.parseHTML("<img width='100px' height='150px' class='mr-3'>")).attr("src", e.target.result).appendTo('#previewDetailImg').addClass("detailImg");
            };
    
            reader.readAsDataURL(input.files[i]);
        }
        
    }
    else {    	
        //alert($('.detailImg').length)
        $("img").remove(".detailImg");
    }
}

// function createImgTag(arrLinkImg) {
//     alert ("Call " + arrLinkImg);
//     if (arrLinkImg.length > 0) {
//         const l = arrLinkImg.length;
//         console.log(arrLinkImg.length);
//         for (let i = 0; i < l; i++){
//             $($.parseHTML("<img width='100px' height='150px' class='mr-3'>")).attr("src", arrLinkImg[i]).appendTo('#previewDetailImg').addClass("detailImg");
//         }
//     }
//     else {    	
//         $("img").remove(".detailImg");
//     }
// }




// $(".nav-link").on("click", function(){
//     $(".nav-item").find(".active").removeClass("active");
//     $(this).addClass("active");
//  });

// when any a link click
// $('.nav-link').click(function(){
//     // if already any element in active status remove it
//     $('.nav-item').removeClass('active');
//     // add active status to this one only
//     $(this).addClass('active');
    
// })

// $(function() {
//     $( 'ul.navbar-nav a.nav-link' ).on( 'click', function() {
//           $( this ).parent().find( 'li.active' ).removeClass( 'active' );
//           $( this ).addClass( 'active' );
//     });
// });