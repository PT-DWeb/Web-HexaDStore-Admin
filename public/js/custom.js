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

function formatDate(dateStr) {
    const [day, month, year] = dateStr.split("-");
    document.getElementById('admin-dob').innerHTML = "aaaaa";
    console.log(new Date(year, month - 1, day));
    return new Date(year, month - 1, day);
}

$(function () {
    setNavigation();
});

$( document).ready(setNavigation());

function setNavigation() {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    //console.log("path:" + path + ".");
    //if (path == "") alert("null");
    $(".nav-main a").each(function () {
        var href = $(this).attr('href');
        
        //alert(href);
        //alert("href:" + href + ".");
        if (path == ""){
            path = "/";
            //console.log("path2:" + path + ".");
        } else {
            //console.log("path:" + path + ".");
        } 
        if (path.substring(0) === href) {
            
            $(this).closest('li').addClass('active');
           // console.log("href:"+ href + ".");
            if(href === '/list-accounts/list-active-accounts' || href === '/list-accounts/list-locked-accounts'){
                //console.log("hello");
                $("#collapse-user-acc").addClass("show");
                $(".user-acc a").each(()=>{
                    $(this).closest('a').addClass('active');
                });
            }
        }
    });
}

function setCollapseItem(){
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);
    //console.log("path:" + path + ".");
    //if (path == "") alert("null");
    $(".nav-main a").each(function () {
        var href = $(this).attr('href');
        
        //alert(href);
        //alert("href:" + href + ".");
        if (path == ""){
            path = "/";
            //console.log("path2:" + path + ".");
        } else {
            //console.log("path:" + path + ".");
        } 
        if (path.substring(0) === href) {
            
            $(this).closest('li').addClass('active');
            //console.log("href:"+ href + ".");
            if(href === '/list-accounts' || href === '/list-locked-accounts'){
                //console.log("hello");
                $(href).addClass('active');
            }
        }
    });
}

$( "tr.row-manufacturer" ).click(function (){
    const index = $(this).index();
    console.log("clicked " + $('td.manufacturerID')[index].innerHTML);
    const id = $('td.manufacturerID')[index].innerHTML;
    $('#manufacturerId').val(id);
});

//Password
window.onload = function () {
    document.getElementById("password").onchange = validatePassword;
    document.getElementById("confirm_password").onchange = validatePassword;
}

function validatePassword(event) {
    var pass2 = document.getElementById("confirm_password").value;
    var pass1 = document.getElementById("password").value;
    if (pass1 != pass2) {
        event.preventDefault();
        document.getElementById("warning_password").style.display = "block";
    }
    else
        document.getElementById("warning_password").style.display = "none";
    //empty string means no validation error
}
