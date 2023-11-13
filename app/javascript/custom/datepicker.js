document.addEventListener("turbo:load", () => {

    var now = new Date();
    const countDayOnMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // const week = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Cб', 'Вс'];

    function normalWeekDay(weekDay) {
        let result;

        if (weekDay > 0) {
            result = weekDay - 1;
        } else {
            result = 6;
        }

        return result;
    }

    function datePrev(date) {
        let result;

        if (date.getMonth() == 0) {
            result = new Date(date.getFullYear() - 1, 11, date.getDate());
        } else {
            result = new Date(date.getFullYear(), date.getMonth() - 1);
        }

        return result;
    }

    function dateNext(date) {
        let result;

        if (date.getMonth() == 12) {
            result = new Date(date.getFullYear() + 1, 0);
        } else {
            result = new Date(date.getFullYear(), date.getMonth() + 1);
        }

        return result;
    }


    function getArrDay() {
        const monthNow = now.getMonth();
        const yearNow = now.getFullYear()
        const firstDay = new Date(yearNow, monthNow, 1);
        const firstDayOfMonth = normalWeekDay(firstDay.getDay());
        const lastDay = new Date(yearNow, monthNow, countDayOnMonth[monthNow]);
        const lastDayOfMonth = normalWeekDay(lastDay.getDay());

        let arrHead = [];
        let arrBody = [];
        let arrFoot = [];

        if (firstDayOfMonth !== 0) {
            for (let i = countDayOnMonth[datePrev(now).getMonth()] + 1 - firstDayOfMonth; i < countDayOnMonth[datePrev(now).getMonth()] + 1; i++) {
                arrHead.push([i, datePrev(now).getMonth(), datePrev(now).getFullYear()])
            }
        }

        for (let i = 1; i < countDayOnMonth[monthNow] + 1; i++) {
            arrHead.push([i, monthNow, yearNow])
        }

        if (lastDayOfMonth !== 6) {
            for (let i = 1; i < lastDayOfMonth + 1; i++) {
                arrFoot.push([i, dateNext(now).getMonth(), dateNext(now).getFullYear()])
            }
        }

        let result = arrHead.concat(arrBody).concat(arrFoot);

        return result;

    }

});
