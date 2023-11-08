$(function () {

    var $uploader = $(".RUploader"),
        $input = $(".RUploader__input"),
        $filelist = $(".RUploader__filelist"),
        $action = $(".RFile__actions");

    //show text file and check type file
    $input.bind('change', function () {
        var valText = $(this).val(),
            fileName = $(this)[0].files[0].name,
            fileSize =  $(this)[0].files[0].size,
            fileHumanSize = '';

        if (fileSize/1024/1024 < 1) {
            fileHumanSize = (fileSize/1024).toFixed() + " КБ"; 
        }

        if (fileSize/1024/1024/1024 < 1) {
            fileHumanSize = (fileSize/1024/1024).toFixed(2) + " МБ"; 
        }

        if (valText != '') {
            $filelist.css("display", "block");
            $filelist.find(".RFile__title").text(fileName);
            $filelist.find(".RFile__sub-title").text(fileHumanSize);

        } else {
            $filelist.css("display", "none");
        }

        if (!$(this).parent().hasClass('has-mach')) {
            $(this).parent().addClass('error');
        }
    });

    //remove file
    $action.on('click', function () {
        $input.val("");
        $filelist.css("display", "none");

    });
});