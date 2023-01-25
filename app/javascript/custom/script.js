document.addEventListener("turbo:load", () => {

    $(document).ready(function () {
        $('#dttb').dataTable({
            "order": [0, "asc"],
            "lengthMenu": [
                [10, 15, 25, -1],
                [10, 15, 25, 'Все'],
            ],
            "language": {
                "sProcessing": "Подождите...",
                "sLengthMenu": "Показать _MENU_ записей",
                "sZeroRecords": "Записи отсутствуют.",
                "sEmptyTable": "<i>В таблице отсутствуют данные",
                "sInfo": "Записи с _START_ до _END_ из _TOTAL_ записей",
                "sInfoEmpty": "Записи с 0 до 0 из 0 записей",
                "sInfoFiltered": "(отфильтровано из _MAX_ записей)",
                "sInfoPostFix": "",
                "sSearch": "Поиск:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Загрузка записей...",
                "paginate": {
                    "first": '<i class="fa fa-angle-double-left"></i>',
                    "next": '<i class="fa fa-angle-right"></i>',
                    "previous": '<i class="fa fa-angle-left"></i>',
                    "last": '<i class="fa fa-angle-double-right"></i>',
                },
                "oAria": {
                    "sSortAscending": ": активировать для сортировки столбца по возрастанию",
                    "sSortDescending": ": активировать для сортировки столбца по убыванию"
                }

            },
            "createdRow": function (row, data, dataIndex) {
                if (data[7] == "<b>Не начат</b>") {
                    $(row).addClass('red-row');
                }
                if (data[7] == "<b>Не действующий</b>") {
                    $(row).addClass('red-row');
                }
                if (data[7] == "<b>В процессе</b>") {
                    $(row).addClass('yellow-row');
                }
                if (data[7] == "<b>Закончен</b>") {
                    $(row).addClass('green-row');
                }
                if (data[7] == "<b>Действующий</b>") {
                    $(row).addClass('green-row');
                }
            },
            "autoWidth": true
        });
        $('.dataTables_paginate').addClass("btn-group datatable-pagination");
        $('.dataTables_paginate > a').wrapInner('<span />');

    });


    $(function () {
        $('.widget-menu-li').click(function () {
            if ($(this).hasClass("active")) {
                $(this).children('ul').animate({ 'height': 0 }, 100);
                $(this).removeClass("active");
                $(this).children().children('.right').addClass("fa-chevron-down").removeClass("fa-chevron-up");
            } else {
                var len = $(this).children(".collapse").children().length
                var heig = (len) * 40 + 1
                $(this).addClass("active");
                $(this).children('ul').css('height', heig);
                $(this).children().children('.right').addClass("fa-chevron-up").removeClass("fa-chevron-down");
            };
        });
    });

    $(function () {
        $('.dropdown').click(function () {
            if ($(this).hasClass("open")) {
                $(this).removeClass("open");
                $(this).children('ul').animate({ 'height': 0 }, 100);
                $(this).children('ul').animate({ 'opacity': 0 }, 300);
            } else {

                var len = $(this).children("ul").children().length
                var heig = (len - 2) * 50 + 5
                $(this).addClass("open");
                $(this).children('ul').css('height', heig);
                $(this).children('ul').animate({ 'opacity': 1 }, 300);
                $(this).children().children('dropdown-toggle').children('nav-avatar').addClass("fa-chevron-up").removeClass("fa-chevron-down");
            };
        });
    });

    console.log("turbo loaded");
});