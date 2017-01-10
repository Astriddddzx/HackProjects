let nextListId = 0;
let list = {
	"name": null,
	"items": []
}

function setName(newName) {
	list.name = newName;
}

function addItem(item) {
	list.items.push({id: nextListId, value: item});
	nextListId++;
}

function removeItem(id) {
	list.items = list.items.filter(item => item.id !== Number(id));
}

function hasName() {
	return list.name !== null ? true : false
}

function get() {
	return list;
}

addItem('Dummy Item 1');
addItem('Dummy Item 2');

module.exports = {
	setName: setName,
	addItem: addItem,
	removeItem: removeItem,
	hasName: hasName,
	get: get
};