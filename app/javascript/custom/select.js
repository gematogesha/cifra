document.addEventListener("turbo:load", () => {

   const dropdowns = document.querySelectorAll(".RSelect");

   // Check if Dropdowns are Exist
   // Loop Dropdowns and Create Custom Dropdown for each Select Element
   if (dropdowns.length > 0) {
      dropdowns.forEach((dropdown) => {
         createCustomDropdown(dropdown);
      });
   }

   // Create Custom Dropdown
   function createCustomDropdown(dropdown) {
      // Get All Select Options
      // And Convert them from NodeList to Array
      const options = dropdown.querySelectorAll("option");
      const optionsArr = Array.prototype.slice.call(options);

      // Create Custom Dropdown Element and Add Class Dropdown
      const customDropdown = document.createElement("div");
      customDropdown.classList.add("RSelect");
      customDropdown.classList.add("RSelect_show");
      dropdown.insertAdjacentElement("afterend", customDropdown);

      // Create Element for Selected Option

      const RSelect__input_main = document.createElement("div");
      RSelect__input_main.classList.add("RSelect__input");

      const RInput_main = document.createElement("label");
      RInput_main.classList.add("RInput", "default", "eluno", "readonly");
      RSelect__input_main.appendChild(RInput_main);

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
      RInput__label_main.innerHTML += "КАКОЕ ТО ПОЛЕ Я НЕ ПРИДМАЛ";
      RInput__input_main.appendChild(RInput__label_main);

      const selected = document.createElement("input");
      selected.type = "text";
      selected.disabled = "disabled";

      try {
         selected.value = optionsArr[0].textContent;
      } catch (error) {
         selected.value = "Пусто";
      };

      //selected.value = optionsArr[0].textContent;
      RInput__input_main.appendChild(selected);

      customDropdown.appendChild(RSelect__input_main);

      // Create Element for Dropdown Menu
      // Add Class and Append it to Custom Dropdown
      const menu = document.createElement("div");
      menu.classList.add("RPopover__content", "mt-2");
      customDropdown.appendChild(menu);
      RSelect__input_main.addEventListener("click", toggleDropdown.bind(menu));

      // Create Search Input Element
      const RSelect__search = document.createElement("div");
      RSelect__search.classList.add("RSelect__search");

      const RInput = document.createElement("label");
      RInput.classList.add("RInput", "default", "eluno");
      RSelect__search.appendChild(RInput);

      const RInput__before = document.createElement("a");
      RInput__before.classList.add("RInput__before");
      RInput.appendChild(RInput__before);

      const RIcon = document.createElement("i");
      RIcon.classList.add("RIcon", "rir-search_16");
      RInput__before.appendChild(RIcon);

      const RInput__body = document.createElement("div");
      RInput__body.classList.add("RInput__body", "is-label");
      RInput.appendChild(RInput__body);

      const RInput__input = document.createElement("label");
      RInput__input.classList.add("RInput__input");
      RInput__body.appendChild(RInput__input);

      const RInput__label = document.createElement("label");
      RInput__label.classList.add("RInput__label");
      RInput__label.innerHTML += 'Поиск';
      RInput__input.appendChild(RInput__label);

      const search = document.createElement("input");
      search.type = "text";
      RInput__input.appendChild(search);

      menu.appendChild(RSelect__search);

      // Create Wrapper Element for Menu Items
      // Add Class and Append to Menu Element
      const menuInnerWrapper = document.createElement("section");
      menuInnerWrapper.classList.add("RListGroup", "RSelect__list");
      menu.appendChild(menuInnerWrapper);

      // Loop All Options and Create Custom Option for Each Option
      // And Append it to Inner Wrapper Element
      optionsArr.forEach((option) => {
         const item = document.createElement("section");
         item.classList.add("RListItem");
         item.dataset.value = option.value;

         const RMenu__char = document.createElement("span");
         RMenu__char.classList.add("RMenu__char");
         RMenu__char.textContent = option.textContent[0];
         item.appendChild(RMenu__char);

         const RListItem__content = document.createElement("section");
         RListItem__content.classList.add("RListItem__content");
         item.appendChild(RListItem__content);

         const RListItem__title = document.createElement("span");
         RListItem__title.classList.add("RListItem__title");

         try {
            RListItem__title.textContent = option.textContent;
         } catch (error) {
            RListItem__title.textContent = "Пусто";
         };

         RListItem__title.textContent = option.textContent;
         RListItem__content.appendChild(RListItem__title);



         menuInnerWrapper.appendChild(item);

         item.addEventListener(
            "click",
            setSelected.bind(item, selected, dropdown, menu)
         );
      });

      // Add Selected Class to First Custom Select Option
      try {
         menuInnerWrapper.querySelector("section").classList.add("selected");
      } catch (error) {

         const item = document.createElement("section");
         item.classList.add("RListItem");
         menuInnerWrapper.appendChild(item);

         const RListItem__content = document.createElement("section");
         RListItem__content.classList.add("RListItem__content");
         item.appendChild(RListItem__content);

         const RListItem__title = document.createElement("span");
         RListItem__title.classList.add("RListItem__title");
         RListItem__title.textContent = "Пусто";
         RListItem__content.appendChild(RListItem__title);
      };

      // Add Input Event to Search Input Element to Filter Items
      // Add Click Event to Element to Close Custom Dropdown if Clicked Outside
      // Hide the Original Dropdown(Select)
      search.addEventListener("input", filterItems.bind(search, optionsArr, menu));
      document.addEventListener(
         "click",
         closeIfClickedOutside.bind(customDropdown, menu)
      );
      dropdown.style.display = "none";
   }

   // Toggle for Display and Hide Dropdown
   function toggleDropdown() {
      if (this.offsetParent !== null) {
         this.style.display = "none";
         isOpen(document.querySelector('.RSelect_show').firstChild.children[0]);
      } else {
         this.style.display = "block";
         this.querySelector("input").focus();
         isOpen(document.querySelector('.RSelect_show').firstChild.children[0]);
      }

   }

   function isOpen(input) {
      if (input.classList.contains('isOpen')) {
         input.classList.remove("isOpen");
      } else {
         input.classList.add("isOpen");
      }
   }

   // Set Selected Option
   function setSelected(selected, dropdown, menu) {
      // Get Value and Label from Clicked Custom Option
      const value = this.dataset.value;
      const label = this.getElementsByClassName("RListItem__title")[0].textContent;

      // Change the Text on Selected Element
      // Change the Value on Select Field
      selected.value = label;
      dropdown.value = value;

      // Close the Menu
      // Reset Search Input Value
      // Remove Selected Class from Previously Selected Option
      // And Show All Div if they Were Filtered
      // Add Selected Class to Clicked Option
      menu.style.display = "none";
      isOpen(document.querySelector('.RSelect_show').firstChild.children[0]);
      menu.querySelector("input").value = "";
      menu.querySelectorAll("section").forEach((div) => {
         if (div.classList.contains("is-select")) {
            div.classList.remove("is-select");
         }
         if (div.offsetParent === null) {
            div.style.display = "flex";
         }
      });
      this.classList.add("is-select");
   }

   // Filter the Items
   function filterItems(itemsArr, menu) {
      // Get All Custom Select Options
      // Get Value of Search Input
      // Get Filtered Items
      // Get the Indexes of Filtered Items
      const customOptions = menu.querySelectorAll(".RSelect__list section");
      const value = this.value.toLowerCase();
      const filteredItems = itemsArr.filter((item) =>
         item.innerHTML.toLowerCase().includes(value)

      );
      const indexesArr = filteredItems.map((item) => itemsArr.indexOf(item));
      // Check if Option is not Inside Indexes Array
      // And Hide it and if it is Inside Indexes Array and it is Hidden Show it
      itemsArr.forEach((option) => {
         if (!indexesArr.includes(itemsArr.indexOf(option))) {
            customOptions[itemsArr.indexOf(option)].style.display = "none";
         } else {
            if (customOptions[itemsArr.indexOf(option)].offsetParent === null) {
               customOptions[itemsArr.indexOf(option)].style.display = "flex";
            }
         }
      });
   }

   // Close Dropdown if Clicked Outside Dropdown Element
   function closeIfClickedOutside(menu, e) {
      if (
         e.target.closest(".RSelect") === null &&
         e.target !== this &&
         menu.offsetParent !== null
      ) {
         menu.style.display = "none";
         isOpen(document.querySelector('.RSelect_show').firstChild.children[0]);
      }

   }

});
