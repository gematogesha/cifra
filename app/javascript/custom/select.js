document.addEventListener("turbo:load", () => {

    const RSelect__input = document.querySelectorAll(".RSelect__input"),
        selected = document.createElement("input");
    var mainInput = '';
    var rInput = '';
    var arrData = [];
    selected.type = "text";
    selected.setAttribute("disabled", "disabled");
    selected.autocomplete = "new-password";

    if (RSelect__input.length > 0) {
        RSelect__input.forEach((item) => {
            const menu = item.nextElementSibling;
            rInput = item.querySelector(".RInput");
            mainInput = item.querySelector("input");
            mainInput.style.display = 'none';
            item.querySelector(".RInput__input").appendChild(selected);
            activateDropdown(item, menu);
            setNullSelected(item, menu);
        });
    }

    function activateDropdown(input, menu) {
        mainInput.addEventListener("click", toggleDropdown.bind(menu));
        let optionsArr = menu.querySelectorAll(".RListItem");

        optionsArr.forEach((item) => {
            arrData.push(item.querySelector(".RListItem__title").textContent)
            item.addEventListener(
                "click",
                setSelected.bind(item, selected, menu)
            );
        });

        const search = menu.querySelector("input");
        search.addEventListener("input", filterItems.bind(search, arrData, menu));
        document.addEventListener(
            "click",
            closeIfClickedOutside.bind(input, menu)
        );
    }

    function toggleDropdown() {
        if (this.nextElementSibling !== null) {
            this.style.display = "none";
            isOpen(rInput);
        } else {
            this.style.display = "block";
            this.querySelector("input").focus();
            isOpen(rInput);
        }

    }

    function isOpen(input) {
        if (input.classList.contains('isOpen')) {
            input.classList.remove("isOpen");
        } else {
            input.classList.add("isOpen");
        }
    }

    function setNullSelected(item, menu) {
        if (selected.value == '' && mainInput.value != '') {
            const value = item.querySelectorAll("input")[0].value;
            const label = menu.querySelector("[data-value='" + value + "']").querySelector(".RListItem__title").textContent;

            selected.value = label.trim();
        }
    }

    function setSelected(selected, menu) {

        const value = this.dataset.value;
        const label = this.querySelector(".RListItem__title").textContent;

        selected.value = label;
        mainInput.value = value;
        rInput.classList.add("active")
        rInput.querySelector(".RInput__label").classList.add("active")

        menu.style.display = "none";

        isOpen(rInput);
        menu.querySelector("input").value = "";
        menu.querySelectorAll(".RListItem").forEach((div) => {
            if (div.classList.contains("active")) {
                div.classList.remove("active");
            }
            if (div.offsetParent === null) {
                div.style.display = "flex";
            }
        });
        this.classList.add("active");
    }


    function filterItems(itemsArr, menu) {

        const Not_found = document.querySelector('.RSelect__not-list');
        const RListGroup = menu.querySelector(".RListGroup");
        const customOptions = menu.querySelectorAll(".RListItem");
        var value = this.value.toLowerCase();

        const clear = menu.querySelector(".RInput__clear");

        if (value != 0) {
            clear.style.visibility = "visible";
        } else {
            clear.style.visibility = "hidden";
        }

        const filteredItems = arrData.filter((item) =>
            item.toLowerCase().includes(value),
        );

        const indexesArr = filteredItems.map((item) => itemsArr.indexOf(item));

        itemsArr.forEach((option) => {
            const originalOptions = option;
            if (indexesArr == '') {
                RListGroup.style.display = "none";
                Not_found.style.display = "flex";
            } else {
                RListGroup.style.display = "flex";
                Not_found.style.display = "none";
                if (!indexesArr.includes(itemsArr.indexOf(option))) {
                    customOptions[itemsArr.indexOf(option)].style.display = "none";
                } else {
                    if (customOptions[itemsArr.indexOf(option)].offsetParent === null) {
                        customOptions[itemsArr.indexOf(option)].style.display = "flex";
                    }
                    const optionText = option.toLowerCase();
                    const searchWords = value.split(' ');
                    searchWords.forEach((word) => {
                        const regex = new RegExp(word, 'g');
                        if (optionText.match(regex)) {
                            let start = '<span class="RSelect__query">';
                            let end = '</span>';
                            let highlightedWord = option.slice(optionText.indexOf(word), optionText.indexOf(word) + word.length);
                            customOptions[itemsArr.indexOf(option)].querySelector(".RListItem__title").innerHTML = option.replace(highlightedWord, start + highlightedWord + end);
                        }
                        if (value == '') {
                            customOptions[itemsArr.indexOf(option)].querySelector(".RListItem__title").innerHTML = originalOptions;
                        }
                    });
                }
            }

        });

        clear.addEventListener("click", (event) => {
            this.value = '';
            value = '';
            customOptions.forEach((item, index) => {
                item.querySelector(".RListItem__title").innerHTML = itemsArr[index];
                item.style.display = "flex";
                RListGroup.style.display = "flex";
                Not_found.style.display = "none";
                clear.style.visibility = "hidden";
            });
        });
    }

    function closeIfClickedOutside(menu, e) {
        if (
            e.target.closest(".RSelect") === null &&
            e.target !== this &&
            menu.offsetParent !== null
        ) {
            menu.style.display = "none";
            isOpen(rInput);
        }
    }
});
