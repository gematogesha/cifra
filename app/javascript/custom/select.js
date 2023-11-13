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

      const label = document.querySelectorAll(".RSelect__label")[0];

      // Get All Select Options
      // And Convert them from NodeList to Array
      const options = dropdown.querySelectorAll("option");
      const optionsArr = Array.prototype.slice.call(options);

      const selected = document.createElement("input");
      selected.type = "text";
      selected.disabled = "disabled";
      //selected.id = dropdown.id;
      selected.name = dropdown.getAttribute("name");
      selected.value = '';


      // Create Element for Dropdown Menu
      // Add Class and Append it to Custom Dropdown
      const menu = document.createElement("div");
      menu.classList.add("RPopover__content", "mt-2");

      menu.appendChild(RSelect__search);

      // Loop All Options and Create Custom Option for Each Option
      // And Append it to Inner Wrapper Element
      optionsArr.forEach((option) => {

         item.dataset.value = option.value;

         try {
            RListItem__title.textContent = option.textContent;
         } catch (error) {
            RListItem__title.textContent = "Пусто";
         };

         menuInnerWrapper.appendChild(item);

         item.addEventListener(
            "click",
            setSelected.bind(item, selected, dropdown, menu)
         );
      });


      // Add Input Event to Search Input Element to Filter Items
      // Add Click Event to Element to Close Custom Dropdown if Clicked Outside
      // Hide the Original Dropdown(Select)
      search.addEventListener("input", filterItems.bind(search, optionsArr, menu));
      document.addEventListener(
         "click",
         closeIfClickedOutside.bind(customDropdown, menu)
      );
      dropdown.style.display = "none";
      label.style.display = "none";
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
      const input = document.getElementsByClassName("RSelect__input")[0].getElementsByClassName("RInput")[0];
      const input_label = input.getElementsByClassName("RInput__label")[0];

      // Change the Text on Selected Element
      // Change the Value on Select Field
      selected.value = label;
      dropdown.value = value;
      input.classList.add("active")
      input_label.classList.add("active")

      // Close the Menu
      // Reset Search Input Value
      // Remove Selected Class from Previously Selected Option
      // And Show All Div if they Were Filtered
      // Add Selected Class to Clicked Option
      menu.style.display = "none";
      isOpen(document.querySelector('.RSelect_show').firstChild.children[0]);
      menu.querySelector("input").value = "";
      menu.querySelectorAll("section").forEach((div) => {
         if (div.classList.contains("active")) {
            div.classList.remove("active");
         }
         if (div.offsetParent === null) {
            div.style.display = "flex";
         }
      });
      this.classList.add("active");
   }

   // Filter the Items
   function filterItems(itemsArr, menu) {
      // Get All Custom Select Options
      // Get Value of Search Input
      // Get Filtered Items
      // Get the Indexes of Filtered Items
      const Not_found = document.querySelector('.RSelect__not-list');
      const RListGroup = menu.querySelector(".RListGroup");
      const customOptions = menu.querySelectorAll(".RSelect__list .RListItem");
      const value = this.value.toLowerCase();
      const filteredItems = itemsArr.filter((item) =>
         item.innerHTML.toLowerCase().includes(value),
      );
      const indexesArr = filteredItems.map((item) => itemsArr.indexOf(item));
      // Check if Option is not Inside Indexes Array
      // And Hide it and if it is Inside Indexes Array and it is Hidden Show it
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
