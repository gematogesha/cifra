document.addEventListener("turbo:load", () => {

	const object = document.querySelector(".RDatePicker")

	if (object) {
		const calendar = document.querySelector(".RDatePicker__calendar"),
			input = document.querySelector(".RDatePicker__input input"),
			calHeader = document.querySelector(".RDatePicker__navigation"),
			calHeaderTitle = document.querySelectorAll(".RDatePicker__navigation span"),
			calDays = document.querySelector(".RDatePicker__week"),
			days = [
				"Пн",
				"Вт",
				"Ср",
				"Чт",
				"Пт",
				"Сб",
				"Вс"
			],
			months = [
				"Январь",
				"Февраль",
				"Март",
				"Апрель",
				"Май",
				"Июнь",
				"Июль",
				"Август",
				"Сентябрь",
				"Октябрь",
				"Ноябрь",
				"Декабрь"
			];


		let oneDay = 60 * 60 * 24 * 1000;
		let todayTimestamp =
			Date.now() -
			(Date.now() % oneDay) +
			new Date().getTimezoneOffset() * 1000 * 60;

		let selectedDay = todayTimestamp;

		const getNumberOfDays = (year, month) => {
			return 40 - new Date(year, month, 40).getDate();
		};

		const getDayDetails = (args) => {
			let date = args.index - args.firstDay;
			let day = args.index % 7;
			let prevMonth = args.month - 1;
			let prevYear = args.year;
			if (prevMonth < 0) {
				prevMonth = 11;
				prevYear--;
			}
			let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);

			let _date =
				(date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
			let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
			let timestamp = new Date(args.year, args.month, _date).getTime();
			return {
				date: _date,
				day,
				month,
				timestamp,
				dayString: days[day]
			};
		};

		function normalWeekDay(weekDay) {
			let result;

			if (weekDay > 0) {
				result = weekDay - 1;
			} else {
				result = 6;
			}

			return result;
		}

		const getMonthDetails = (year, month) => {
			let firstDay = normalWeekDay(new Date(year, month).getDay());
			let numberOfDays = getNumberOfDays(year, month);
			let monthArray = [];
			let rows = 6;
			let currentDay = null;
			let index = 0;
			let cols = 7;

			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < cols; col++) {
					currentDay = getDayDetails({
						index,
						numberOfDays,
						firstDay,
						year,
						month
					});
					monthArray.push(currentDay);
					index++;
				}
			}
			return monthArray;
		};

		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth();
		let monthDetails = getMonthDetails(year, month);

		const isCurrentDay = (day, cell) => {
			if (day.timestamp === todayTimestamp) {
				cell.classList.add("now");
			}
		};

		const isSelectedDay = (day, cell) => {
			if (day.timestamp === selectedDay) {
				cell.classList.add("active");
			}
		};

		const getMonthStr = (month) =>
			months[Math.max(Math.min(11, month), 0)] || "Month";
		const setHeaderNav = (offset, yearOffset) => {
			month = month + offset;
			year = year + yearOffset;
			if (month === -1) {
				month = 11;
				year--;
			} else if (month === 12) {
				month = 0;
				year++;
			}
			monthDetails = getMonthDetails(year, month);
			return {
				year,
				month,
				monthDetails
			};
		};

		const setHeader = (year, month) => {
			calHeaderTitle[0].innerHTML = getMonthStr(month);
			calHeaderTitle[1].innerHTML = year;
		};

		setHeader(year, month);

		const getDateStringFromTimestamp = (timestamp) => {
			let dateObject = new Date(timestamp);
			let month = dateObject.getMonth();
			let date = dateObject.getDate();
			return `${getMonthStr(month)} ${date}, ${dateObject.getFullYear()}`;
		};

		const setDateToInput = (timestamp) => {
			let dateString = getDateStringFromTimestamp(timestamp);
			input.value = dateString;
		};
		setDateToInput(todayTimestamp);

		for (let i = 0; i < days.length; i++) {
			let div = document.createElement("span");

			div.classList.add("RDatePicker__day");

			div.innerText = days[i].slice(0, 2);
			calDays.appendChild(div);
		}

		const setCalBody = (monthDetails) => {
			for (let i = 0; i < 6; i++) {
				let div = document.createElement("div"),
					indexDay = i;
				div.classList.add("RDatePicker__row");

				for (let i = 0; i < 7; i++) {
					let a = document.createElement("a"),
						index = i + 7 * indexDay
					monthDetails[index].month !== 0 && a.classList.add("block");
					monthDetails[index].month === 0 && isCurrentDay(monthDetails[index], a);
					a.classList.add("RDatePicker__column");

					a.innerText = monthDetails[index].date;
					div.appendChild(a);
				}

				calendar.appendChild(div);
			};
		};

		setCalBody(monthDetails);

		const updateCalendar = (btn) => {
			let newCal, offset, yearOffset;
			let btnChildren = btn.querySelector("i")
			if (btnChildren.classList.contains("rir-arrow-left_16")) {
				offset = -1;
				yearOffset = 0;
			} else if (btnChildren.classList.contains("rir-arrow-right_16")) {
				offset = 1;
				yearOffset = 0;
			}
			if (btnChildren.classList.contains("rir-rewind_16")) {
				offset = 0;
				yearOffset = -1;
			} else if (btnChildren.classList.contains("rir-forward_16")) {
				offset = 0;
				yearOffset = 1;
			}
			newCal = setHeaderNav(offset, yearOffset);
			setHeader(newCal.year, newCal.month);
			calendar.innerHTML = "";
			setCalBody(newCal.monthDetails);
		};

		const selectOnClick = () => {
			calendar.querySelectorAll(".RDatePicker__column").forEach((cell) => {
				cell.classList.remove("active");

				if (cell.classList.contains("isCurrent") &&
					!cell.classList.contains("active")) {
					cell.querySelector("span").classList.add("inactive_indicator");
				}
			});
		};


		const updateInput = () => {
			let currentDay = calendar.querySelector(".now");

			document.querySelectorAll(".cell_wrapper").forEach((cell) => {
				if (cell.classList.contains("current")) {
					cell.addEventListener("click", (e) => {
						let cell_date = e.target.textContent;

						currentDay !== null && currentDay.classList.remove("active");

						for (let i = 0; i < monthDetails.length; i++) {
							if (monthDetails[i].month === 0) {
								if (monthDetails[i].date.toString() === cell_date) {
									selectedDay = monthDetails[i].timestamp;
									setDateToInput(selectedDay);
									selectOnClick();

									isSelectedDay(monthDetails[i], cell);

									cell.querySelector('span').classList.contains('inactive_indicator')
										&& cell.querySelector('span').classList.remove('inactive_indicator');
								}
							}
						}
					});
				}
			});
		};

		updateInput();

		calHeader.querySelectorAll("button").forEach((btn) => {
			btn.addEventListener("click", () => {
				updateCalendar(btn);
				updateInput();
			});
		});

		input.addEventListener('click', () => {
			document.querySelector('#date_picker_calendar').classList.toggle('hidden');
			document.querySelector('#date_picker_input').classList.toggle('showCal');
			document.querySelector('#date').classList.toggle('onFocus');
		});
	}
});