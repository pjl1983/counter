let number = [];
let comma = 0;

function animateNumber() {
	const numberContainerValue = document.getElementsByClassName('number_container');
	for (let i = 0; i < numberContainerValue.length; i++) {
		if (numberContainerValue[i].childElementCount > 1) {
			for (let x = 0; x < numberContainerValue[i].childNodes.length; x++) {
				if (numberContainerValue[i].childNodes[x].className === 'new_number') {
					numberContainerValue[i].childNodes[x].classList.remove('new_number');
					numberContainerValue[i].childNodes[x].classList.add('current_number');
				} else if (numberContainerValue[i].childNodes[x].className === 'current_number') {
					numberContainerValue[i].childNodes[x].classList.remove('current_number');
					numberContainerValue[i].childNodes[x].classList.add('remove_number');
				}
			}
		}
	}
}

function setNumber(arrayValue) {
	number = arrayValue;
	let comma = 0;
	let counter = document.getElementById('counter');
	while (counter.firstChild) {
		counter.removeChild(counter.firstChild);
	}

	for (let i = 0; i < number.length; i++) {
		let node = document.createElement('div');
		node.classList.add('number_container');
		node.setAttribute('id', 'position_' + i);
		node.innerHTML = '<div class="current_number">' + number[i] + '</div>';
		document.getElementById('counter').appendChild(node);
	}

	for (let i = arrayValue.length - 1; i > 0; i--) {
		if (i % 3 == 0) {
			comma +=1;
			let node = document.createElement('div');
			node.classList.add('comma');
			node.setAttribute('id', 'comma_' + comma);
			let number = ((36 * 3) * comma ) + 5;
			node.setAttribute("style", "right:" + number + "px");
			node.innerHTML = ',';
			document.getElementById('counter').appendChild(node);
		}
	}
}

function poll(newNumber) {
	const numberContainerValue = document.getElementsByClassName('number_container');

	if (newNumber.length !== number.length) {
		setNumber(newNumber);
	}

	for (let i = 0; i < numberContainerValue.length; i++) {
		for (let x = 0; x < numberContainerValue[i].childNodes.length; x++) {
			if (numberContainerValue[i].childNodes[x].className === 'remove_number') {
				numberContainerValue[i].removeChild(numberContainerValue[i].childNodes[x])
			}
		}

		if (Number(numberContainerValue[i].innerText) !== Number(newNumber[i])) {
			let node = document.createElement('div');
			node.classList.add('new_number');
			node.innerHTML = newNumber[i].toString();
			const parent = document.getElementById('position_' + i);
			document.getElementById('position_' + i).insertBefore(node, parent.childNodes[0]);
		}
	}

	animateNumber();
}

function init() {
	let i = 500;

	function stringToArray(string) {
		return string.split('');
	}

	(function interval() {
		setTimeout(() => {
			var x = i.toString();
			poll(stringToArray(x));
			i += 1;
			interval();
		}, 100);
	})();
}

window.onload = () => {
	init();
};