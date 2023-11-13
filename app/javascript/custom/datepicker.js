document.addEventListener("turbo:load", () => {

    var now = new Date();
    const countDayOnMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const week = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Cб', 'Вс'];

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

    const dropdowns = document.querySelectorAll(".RDatePicker");

    // Check if Dropdowns are Exist
    // Loop Dropdowns and Create Custom Dropdown for each Select Element
    if (dropdowns.length > 0) {
       dropdowns.forEach((dropdown) => {
          createCustomDropdown(dropdown);
       });
    }

    function createCustomDropdown(dropdown) {

        const label = document.querySelectorAll(".RDatePicker__label")[0];
  
        // Get All Select Options
        // And Convert them from NodeList to Array
        const options = dropdown.querySelectorAll("option");
        const optionsArr = Array.prototype.slice.call(options);
  
        // Create Custom Dropdown Element and Add Class Dropdown
        const customDropdown = document.createElement("div");
        customDropdown.classList.add("RDatePicker");
        customDropdown.classList.add("RDatePicker_show");
        dropdown.insertAdjacentElement("afterend", customDropdown);
  
        // Create Element for Selected Option
  
        const RDatePicker__input_main = document.createElement("div");
        RDatePicker__input_main.classList.add("RDatePicker__input");
  
        const RInput_main = document.createElement("label");
        RInput_main.classList.add("RInput", "default", "eluno", "readonly");
        RDatePicker__input_main.appendChild(RInput_main);
  
        const RInput__before_main = document.createElement("a");
        RInput__before_main.classList.add("RInput__after");
        RInput_main.appendChild(RInput__before_main);
  
        const RIcon_main = document.createElement("i");
        RIcon_main.classList.add("RIcon", "rir-arrow-down_16");
        RInput__before_main.appendChild(RIcon_main);
  
        const RInput__body_main = document.createElement("div");
        RInput__body_main.classList.add("RInput__body", "is-label");
        RInput_main.appendChild(RInput__body_main);
  
        const RInput__input_main = document.createElement("label");
        RInput__input_main.classList.add("RInput__input");
        RInput__body_main.appendChild(RInput__input_main);
  
        const RInput__label_main = document.createElement("label");
        RInput__label_main.classList.add("RInput__label");
        RInput__label_main.innerHTML += label.textContent;
        RInput__label_main.htmlFor = label.htmlFor;
        RInput__input_main.appendChild(RInput__label_main);
  
        const selected = document.createElement("input");
        selected.type = "text";
        selected.disabled = "disabled";
        //selected.id = dropdown.id;
        selected.name = dropdown.getAttribute("name");
  
        try {
           selected.value = optionsArr[0].textContent;
        } catch (error) {
           selected.value = "";
        };
  
        //selected.value = optionsArr[0].textContent;
        RInput__input_main.appendChild(selected);
  
        customDropdown.appendChild(RDatePicker__input_main);
    }
  
     // Filter the Items  
     function closeIfClickedOutside(menu, e) {
        if (
           e.target.closest(".RDatePicker") === null &&
           e.target !== this &&
           menu.offsetParent !== null
        ) {
           menu.style.display = "none";
           isOpen(document.querySelector('.RDatePicker_show').firstChild.children[0]);
        }
  
     }


});
