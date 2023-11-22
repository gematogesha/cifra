document.addEventListener("turbo:load", () => {

   const RSelect__input = document.querySelectorAll(".RSelect__input"),
      selected = document.createElement("input");
   var mainInput = '';
   var rInput = '';
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
      input.addEventListener("click", toggleDropdown.bind(menu));
      let optionsArr = menu.querySelectorAll(".RListItem");

      optionsArr.forEach((item) => {
         item.addEventListener(
            "click",
            setSelected.bind(item, selected, menu)
         );
      });

      const search = menu.querySelector("input");
      search.addEventListener("input", filterItems.bind(search, optionsArr, menu));
      document.addEventListener(
         "click",
         closeIfClickedOutside.bind(input, menu)
      );
   }

   function toggleDropdown() {
      if (this.nextElementSibling !== null) {
         this.style.display = "none";
         isOpen();
      } else {
         this.style.display = "block";
         isOpen();
      }
   }

   function isOpen() {
      RSelect__input.forEach((item) => {
         const RInput = item.querySelector(".RInput");
         if (RInput.classList.contains('isOpen')) {
            RInput.classList.remove("isOpen");
         } else {
            RInput.classList.add("isOpen");
         }
      });
   }

   function setNullSelected(item, menu) {
      if (selected.value = ' ') {
         const value = item.querySelectorAll("input")[0].value;
         const label = menu.querySelector("[data-value='" + value + "']").textContent;

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
