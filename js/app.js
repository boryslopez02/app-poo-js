const app = document.getElementById('app'),
form = document.getElementById('form'),
container = document.getElementById('container'),
prodList = document.getElementById('product-list')
let saves = [] 

window.addEventListener('load', () => {
    getStorage();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const pname = document.getElementById('name').value,
    pprice = document.getElementById('price').value,
    pyear = document.getElementById('year').value

    const product = new Product(pname, pprice, pyear)
    const ui = new UI()
    if (pname === '' || pprice === '' || pyear === '') {
        return ui.showMessage('Please, Complete All Fields', 'danger')
    }
    ui.addProduct(product)
});

prodList.addEventListener('click', (e) => {  
    const ui = new UI()
    if (e.target.name === 'delete') {
        ui.deleteProduct(e);
    }
});

function getStorage() {
    prodList.innerHTML = '';

    if (localStorage.getItem('product') === null) {
        saves = [];
    } else {
        saves = JSON.parse(localStorage.getItem('product', saves));

        saves.forEach(element => {
            let items = element;
            prodList.innerHTML += `<div class="card px-3 py-4 mb-3"><div class="d-flex justify-content-between text-center"><b>Product Name: <span>${items.productName}</span></b><b>Product Price: ${items.price}</b><b>Product Year: ${items.year}</b></div><a class="btn btn-danger btn-block w-75 mx-auto mt-4 text-white" name="delete">Delete</a></div>
            `
        });
    }
}

class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        let div = document.createElement('div')
        div.classList.add('card', 'px-3', 'py-4', 'mb-3')
        div.innerHTML = `<div class="d-flex justify-content-between text-center"><b>Product Name: <span>${product.name}</span></b><b>Product Price: ${product.price}</b><b>Product Year: ${product.year}</b></div><a class="btn btn-danger btn-block w-75 mx-auto mt-4 text-white" name="delete">Delete</a>
        `
        prodList.appendChild(div);
        this.showMessage('Product Added Successfully', 'success');
        this.resetForm();
        this.setStorage(product.name, product.price, product.year);
    }
    deleteProduct(e) {
        e.target.parentElement.remove();
        this.showMessage('Product Removed Successfully', 'warning')
        this.deleteStorage(e.target.parentNode.firstChild.firstChild.lastChild.innerText)
    }
    showMessage(message, color) {
        let div = document.createElement('div')
        div.className = `alert alert-${color}`;
        div.innerText = message;
        container.insertBefore(div, app)
        setTimeout(() => {
            div.remove()
        }, 3000);
    }
    setStorage(name, price, year) {
        let item = {
            productName: name,
            productPrice: price,
            productYear: year
        }
        saves.push(item)
        localStorage.setItem('product', JSON.stringify(saves))
    }
    deleteStorage(product) {
        let idx;
        saves.forEach((element, index) => {
            if (element.productName === product) {
                idx = index;
            }
        });
        saves.splice(idx, 1)
        localStorage.setItem('product', JSON.stringify(saves))
    }
    resetForm() {
        form.reset();
    }
}