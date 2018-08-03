let number = [];
let comma = 0;
const number_container = 'number_container';
const new_number = 'new_number';
const current_number = 'current_number';
const remove_number = 'remove_number';

function animateNumber() {
	const numberContainerValue = document.getElementsByClassName(number_container);
	for (let i = 0; i < numberContainerValue.length; i++) {
		let numberContainerElement = numberContainerValue[i];
		if (numberContainerElement.childElementCount > 1) {
			for (let x = 0; x < numberContainerElement.childNodes.length; x++) {
				let childNode = numberContainerElement.childNodes[x];
				if (childNode.className === new_number) {
					childNode.classList.remove(new_number);
					childNode.classList.add(current_number);
				} else if (childNode.className === current_number) {
					childNode.classList.remove(current_number);
					childNode.classList.add(remove_number);
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
		node.classList.add(number_container);
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
	const numberContainerValue = document.getElementsByClassName(number_container);

	if (newNumber.length !== number.length) {
		setNumber(newNumber);
	}

	for (let i = 0; i < numberContainerValue.length; i++) {
		let numberContainerElement = numberContainerValue[i];
		for (let x = 0; x < numberContainerElement.childNodes.length; x++) {
			let childNode = numberContainerElement.childNodes[x];
			if (childNode.className === remove_number) {
				numberContainerElement.removeChild(childNode)
			}
		}

		if (Number(numberContainerElement.innerText) !== Number(newNumber[i])) {
			let node = document.createElement('div');
			node.classList.add(new_number);
			node.innerHTML = newNumber[i].toString();
			const parent = document.getElementById('position_' + i);
			document.getElementById('position_' + i).insertBefore(node, parent.childNodes[0]);
		}
	}

	animateNumber();
}

function init() {
	let i = 999999995;

	function stringToArray(string) {
		return string.split('');
	}

	function interval() {
		poll(stringToArray(i.toString()));
		i += 1;
	}

	setInterval(interval, 1000);
}

window.onload = function(){
	init();
};