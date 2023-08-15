function navslide() {
    // add active link if visited
    var url = window.location;
    var element = $('.toggledAnother ul li a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();

    window.toggle = function() {
    jQuery(".toggledAnother")
        .stop(true, true)
        .animate({ width: "toggle" }, 400);
    };

     
}

document.addEventListener('DOMContentLoaded', function(){
    Code.photoSwipe('a', '#Gallery', { captionAndToolbarHideOnSwipe: false } );
}, false);

async function downloadFile(fileName) {
    const url = 'https://rickryan-portfolio.web.app/assets/rickryanmedillo-resume.docx';

    const link = document.createElement('a');
    link.href = await toDataURL(url);
    link.setAttribute('download', fileName ? fileName : url.split('/').pop());
    link.setAttribute('target', 'blank');
    document.body.appendChild(link);
    link.click();
}

 
function toDataURL(url) {
    return fetch(url)
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            return URL.createObjectURL(blob);
        });
} 

$('#datatableexample').DataTable( {
    responsive: true
} );

// $(document).ready(function () {
    function toggleNav() {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
}

function countBirth() {
    var calcNewYear = setInterval(function(){
        date_future = new Date(new Date().getFullYear(), 8, 1);
        //date_future = new Date(new Date().getFullYear() +1, 0, 1);
        date_now = new Date();
 
        seconds = Math.floor((date_future - (date_now))/1000);
        minutes = Math.floor(seconds/60);
        hours = Math.floor(minutes/60);
        days = Math.floor(hours/24);
        
        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
        

        $("#clock-c").html(''
        + '<span class="font-weight-bold">' + days + '</span> Day'
        + '<span class="font-weight-bold">' + hours + '</span> Hr'
        + '<span class="font-weight-bold">' + minutes + '</span> Min'
        + '<span class="font-weight-bold">' + seconds + '</span> Sec');
        // $("#clock-c").text("Days: " + days + " Hours: " + hours + " Minutes: " + minutes + " Seconds: " + seconds);
        // $("#clock-c").text(''
        // + '<span class="h1 font-weight-bold">%D</span> Day%!d'
        // + '<span class="h1 font-weight-bold">%H</span> Hr'
        // + '<span class="h1 font-weight-bold">%M</span> Min'
        // + '<span class="h1 font-weight-bold">%S</span> Sec'
        // );
    },1000);

    
}

// function whitespaceChecker(value) {
//     var re = new RegExp(String.fromCharCode(160), "gi");
//     $(value).each(function(){
//           $(this).html($(this)[0].textContent.replace(re, " "));
//     });
// }