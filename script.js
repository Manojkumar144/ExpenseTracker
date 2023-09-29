var form = document.getElementById('addForm');
var itemList = document.getElementById('items');

// Load items from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadItems);

// Form submit event
form.addEventListener('submit', addItem);
// Delete and Edit events using event delegation
itemList.addEventListener('click', handleItemClick);

// Global variable to store the currently edited item
var editingItem = null;

// Load items from local storage
function loadItems() {
  var items = JSON.parse(localStorage.getItem('items')) || [];
  items.forEach(function (itemText) {
    addItemToUI(itemText);
  });
}

// Save items to local storage
function saveItemsToLocalStorage() {
  var items = Array.from(itemList.getElementsByTagName('li')).map(function (li) {
    return li.textContent;
  });
  localStorage.setItem('items', JSON.stringify(items));
}

// Add item to the UI
function addItemToUI(itemText) {
  // Create new li element
  var li = document.createElement('li');
  // Add class
  li.className = 'list-item';
  // Add text node with input value
  li.appendChild(document.createTextNode(itemText));

    // Create del button element
    var deleteBtn = document.createElement('button');
    // Create edit button element
    var editBtn = document.createElement('button');

    // Add classes to del button
    deleteBtn.className = 'delete-btn';
    deleteBtn.style.marginRight = '2px';
    deleteBtn.style.marginLeft = '5px';

    // Add classes to edit button
    editBtn.className = 'edit-btn';
    editBtn.style.marginLeft = '2px';

    // Append text node
    deleteBtn.appendChild(document.createTextNode('X'));
    editBtn.appendChild(document.createTextNode('-'));

    // Append buttons to li
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

  // Append li to list
  itemList.appendChild(li);
  document.getElementById('item').value = '';
  document.getElementById('item1').value = '';
  document.getElementById('item2').value = '';
}

function addItem(e) {
  e.preventDefault();

  var newItem = document.getElementById('item').value;
  var newItem1 = document.getElementById('item1').value;
  var newItem2 = document.getElementById('item2').value;

  newItem = newItem + " " + newItem1 + " " + newItem2;

  if (editingItem) {
    editingItem.firstChild.textContent = newItem;
    saveItemsToLocalStorage();
    editingItem = null;
  } else {
    addItemToUI(newItem);
    saveItemsToLocalStorage();
  }


  document.getElementById('item').value = '';
  document.getElementById('item1').value = '';
  document.getElementById('item2').value = '';
}

function handleItemClick(e) {
  if (e.target.classList.contains('delete-btn')) {
    if (confirm('Are You Sure?')) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
      saveItemsToLocalStorage();
    }
  } else if (e.target.classList.contains('edit-btn')) {
    editingItem = e.target.parentElement;
    var itemText = editingItem.firstChild.textContent;
    var itemParts = itemText.split(' ');

    document.getElementById('item').value = itemParts[0];
    document.getElementById('item1').value = itemParts[1];
    document.getElementById('item2').value = itemParts[2];
  }
}

