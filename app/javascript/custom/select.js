document.addEventListener("turbo:load", () => {

   const dropdowns = document.querySelectorAll(".RSelect__input");
   const label = document.querySelectorAll(".RSelect__label")[0];

   if (dropdowns.length > 0) {
      dropdowns.forEach((dropdown) => {
         createCustomDropdown(dropdown);
      });
   }

   function createCustomDropdown(dropdown) {

      const customDropdown = document.querySelector("#RSelect");
      const clone = customDropdown.content.cloneNode(true);
      document.querySelector(".RSelect").appendChild(clone);

      const options = dropdown.querySelectorAll("option");
      const optionsArr = Array.prototype.slice.call(options);

      const selected = document.querySelectorAll(".RSelect__input")[1].querySelector("input");
      selected.name = dropdown.getAttribute("name")

      const menu = document.querySelector(".RPopover__content");

      document.querySelectorAll(".RSelect__input")[1].addEventListener("click", toggleDropdown.bind(menu));
      document.querySelectorAll(".RSelect__input")[1].querySelectorAll(".RInput__label")[0].htmlFor = label.htmlFor;

      optionsArr.forEach( function (option, index) {
         const item = document.querySelectorAll(".RListItem")[index];
         item.addEventListener(
            "click",
            setSelected.bind(item, selected, dropdown, menu)
         );
      });

      const search = document.querySelectorAll(".RSelect__input")[1].nextElementSibling.querySelector("input");
      search.addEventListener("input", filterItems.bind(search, optionsArr, menu));
      document.addEventListener(
         "click",
         closeIfClickedOutside.bind(customDropdown, menu)
      );
   }

   function toggleDropdown() {
      if (this.offsetParent !== null) {
         this.style.display = "none";
         isOpen();
      } else {
         this.style.display = "block";
         this.querySelector("input").focus();
         isOpen();
      }
   }

   function isOpen() {
      const RInput = document.querySelectorAll(".RSelect__input")[1].querySelector(".RInput");
      if (RInput.classList.contains('isOpen')) {
         RInput.classList.remove("isOpen");
      } else {
         RInput.classList.add("isOpen");
      }
   }

   function setSelected(selected, dropdown, menu) {

      const value = this.dataset.value;
      const label = this.getElementsByClassName("RListItem__title")[0].textContent;
      const input = document.querySelectorAll(".RSelect__input")[1].querySelector(".RInput");
      const input_label = input.getElementsByClassName("RInput__label")[0];

      selected.value = label;
      dropdown.value = value;
      input.classList.add("active")
      input_label.classList.add("active")

      menu.style.display = "none";

      isOpen();
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
      const customOptions = menu.querySelectorAll(".RSelect__list .RListItem");
      var value = this.value.toLowerCase();

      const clear = menu.querySelector(".RInput__clear");

      if (value != 0) {
         clear.style.visibility = "visible";
      } else {
         clear.style.visibility = "hidden";
      }

      const filteredItems = itemsArr.filter((item) =>
         item.textContent.toLowerCase().includes(value),
      );

      const indexesArr = filteredItems.map((item) => itemsArr.indexOf(item));

      itemsArr.forEach((option) => {
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

            }
         }

      });

      clear.addEventListener("click", (event) => {
         this.value = '';
         value = '';
         customOptions.forEach((item) => {
            item.style.display = "flex";
            RListGroup.style.display = "flex";
            Not_found.style.display = "none";
            clear.style.visibility = "hidden";
         });
      });
   }

   function closeIfClickedOutside(menu, e) {
      console.log(e.target.closest(".RSelect"))
      if (
         e.target.closest(".RSelect") === null &&
         e.target !== this &&
         menu.offsetParent !== null
      ) {
         menu.style.display = "none";
         isOpen();
      }
   }
});
