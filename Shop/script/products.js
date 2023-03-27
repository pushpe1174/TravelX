// General Declarations
const ProductColor = [
    {id: "product_colour_1", Color: "#9BDC28", Name: "Yellow-Green"},
    {id: "product_colour_2", Color: "#03A9F4", Name: "Vivid Cerulean"},
    {id: "product_colour_3", Color: "#E91E63", Name: "Razzmatazz"},
    {id: "backpack_colour_1", Color: "#67745F", Name: "Axolotl"},
    {id: "shelter_colour_1", Color: "#44AEA6", Name: "Verdigris"},
    {id: "shelter_colour_2", Color: "#FFF", Name: "White"},
    {id: "compass_colour_1", Color: "#5B3011", Name: "Seal Brown"},
    {id: "first_aid_colour_1", Color: "#F44336", Name: "Coral Red"},
    {id: "gloves_colour_1", Color: "#F2E273", Name: "Jasmine"},
    {id: "gloves_colour_2", Color: "#3A393E", Name: "Onyx"}
];

window.onload = function () {
// Product 1

    // Products
    document.getElementById("product_colour_1").addEventListener("click", function () {
        document.getElementById("product_image").src = "images/products/shoe.png"
    })
    document.getElementById("product_colour_2").addEventListener("click", function () {
        document.getElementById("product_image").src = "images/products/shoe_1.png"
    })
    document.getElementById("product_colour_3").addEventListener("click", function () {
        document.getElementById("product_image").src = "images/products/shoe_2.png"
    })

// General Process

    // Change Colors
    const colorElements = document.getElementsByClassName('product_color')
    for (let i = 0; i < colorElements.length; i++) {
        const currentColorElement = colorElements[i]
        currentColorElement.addEventListener('click', function (event) {
            const parentColor = window.getComputedStyle(currentColorElement).accentColor
            const currentParent = event.target.parentElement.parentElement.parentElement
            const currentInstances = currentParent.getElementsByClassName('size_value')
            for (let j = 0; j < currentInstances.length; j++) {
                const currentElement = currentInstances[j].id
                document.getElementById(currentElement).style.accentColor = parentColor
            }
        })
    }

    // Product Quantity Increment
    const ProductQTYIncrement = document.getElementsByClassName('plus-btn_general')
    for (let i=0; i < ProductQTYIncrement.length; i++) {
        const currentButton = ProductQTYIncrement[i]
        currentButton.addEventListener('click', function (event) {
            const currentParent = event.target.parentElement
            const buttonValue = parseInt(currentParent.getElementsByClassName('quantity_value')[0].value)
            if (buttonValue < 1000) {
                currentParent.getElementsByClassName('quantity_value')[0].value = buttonValue + 1
            }
        })
    }

    // Product Quantity Decrement
    const ProductQTYDecrement = document.getElementsByClassName('minus-btn_general')
    for (let i=0; i < ProductQTYDecrement.length; i++) {
        const currentButton = ProductQTYDecrement[i]
        currentButton.addEventListener('click', function (event) {
            const currentParent = event.target.parentElement
            const buttonValue = parseInt(currentParent.getElementsByClassName('quantity_value')[0].value)
            if (buttonValue > 1) {
                currentParent.getElementsByClassName('quantity_value')[0].value = buttonValue - 1
            }
        })
    }

// Button Functions

    // Out of Stock Items
    document.getElementById('shelter_colour_2').addEventListener('click', function (){
        document.getElementById('cart_product_3').style.pointerEvents = 'none'
        document.getElementById('cart_product_3').style.marginTop = '50px'
        document.getElementById('quantity_value_p3').value = '0'
        document.getElementById('plus-btn_p3').disabled = true
        document.getElementById('minus-btn_p3').disabled = true
        document.getElementById('cart_product_3').innerText = 'OUT OF STOCK'
    })
    document.getElementById('shelter_colour_1').addEventListener('click', function (){
        document.getElementById('cart_product_3').style.pointerEvents = 'auto'
        document.getElementById('cart_product_3').style.marginTop = ''
        document.getElementById('quantity_value_p3').value = '1'
        document.getElementById('plus-btn_p3').disabled = false
        document.getElementById('minus-btn_p3').disabled = false
        document.getElementById('cart_product_3').innerText = 'ADD TO CART'
    })

    // Get color from the array
    function getColor(instanceID) {
        for (let i = 0; i < ProductColor.length; i++) {
            if (instanceID === ProductColor[i].id) {
                return ProductColor[i].Color
            }
        }
    }

    // Get color name
    function getColorName(ColorID) {
        for (let i = 0; i < ProductColor.length; i++) {
            if (ColorID === ProductColor[i].Color) {
                return ProductColor[i].Name
            }
        }
    }

    // Add to cart process
    const AddToCartButtons = document.getElementsByClassName("cart_button")
    for (let i = 0; i < AddToCartButtons.length; i++) {
        let CurrentButton = AddToCartButtons[i]
        CurrentButton.addEventListener("click", AddToCartPressed)
    }

    // Function to handle the event (Add to Cart)
    function AddToCartPressed(event) {
        const Items = event.target.parentElement.parentElement

        // Check whether any colour selected
        let trigger = false
        const color = Items.getElementsByClassName('product_color')
        const size = Items.getElementsByClassName('size_value')
        for (let i=0; i<color.length; i++) {
            if (color[i].checked) {
                trigger = true
            }
        } if (trigger === false) {
            alert("Please select a colour!")
            return
        } else {
            trigger = false
        }

        // Check whether any size selected
        for (let i=0; i<size.length; i++) {
            if (size[i].checked) {
                trigger = true
            }
        } if (trigger === false) {
            alert("Please select a size!")
            return
        }

        const CartImage = Items.getElementsByClassName("product_image")[0].src
        const CartTitle = Items.getElementsByClassName("product_name")[0].innerHTML
        const CartPrice = Items.getElementsByClassName("price_tag")[0].innerHTML
        const CartQuantity = Items.getElementsByClassName("quantity_value")[0].value
        const CartSize = Items.querySelector('input[class="size_value"]:checked').value
        const CartColor = getColor(Items.querySelector('input[class="product_color"]:checked').id)
        AddToCart(CartTitle, CartPrice, CartQuantity, CartSize, CartColor, CartImage)
        updateTotal()
    }

    function d2h(d) { return (+d).toString(16); }

    const rgbToHex = (r, g, b) => '#' + [r, g, b]
        .map(x => d2h(x).padStart(2, '0')).join('')

    function trimmer (value) {
        const normalised = value.substring(4, value.length - 1).replace(/ /g, '').split(',')
        const red = normalised[0]
        const green = normalised[1]
        const blue = normalised[2]
        return rgbToHex(red, green, blue)
    }

    // Pre-Check before cart
    function AddToCart(CartTitle, CartPrice, CartQuantity, CartSize, CartColor, CartImage) {
        const cartRow = document.createElement('div')
        cartRow.classList.add('item')
        const cartItems = document.getElementsByClassName('shopping-cart')[0]
        const cartItemGetTitle = cartItems.getElementsByClassName('product_title')
        const cartItemGetColor = cartItems.getElementsByClassName('product_color')
        const cartItemGetSize = cartItems.getElementsByClassName('product_size')
        for (let i = 0; i < cartItemGetTitle.length; i++) {
            const CurrentTitle = cartItemGetTitle[i].innerHTML
            const CurrentSize = cartItemGetSize[i].innerHTML
            const CurrentColor = trimmer(cartItemGetColor[i].style.backgroundColor)
            if ((CurrentTitle === CartTitle) && (CurrentColor === CartColor.toLowerCase()) && (CurrentSize === CartSize)) {
                return alert("This item has already been added to cart.\nPerhaps you may increase the quantity on Cart.")
            }
        }
        cartRow.innerHTML = `
        <div class="buttons">
            <span class="delete-btn"></span>
        </div>
        <div class="image">
            <img src="${CartImage}" alt="" />
        </div>
        <div class="description">
            <span class="product_title">${CartTitle}</span>
            <span>Size : 
                <label class="product_size">${CartSize}</label>
            </span>
            <span>
                <label class="product_color"></label>
            </span>
        </div>
        <div class="quantity">
            <button class="plus-btn" type="button" name="button">+</button>
            <label>
                <input class="item-quantity" type="text" name="name" value="${CartQuantity}" readonly>
            </label>
            <button class="minus-btn" type="button" name="button">-</button>
        </div>
        <div class="total-price">${CartPrice} / unit</div>`
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('product_color')[0].style.backgroundColor = CartColor
        const value = document.getElementById('lblCartCount').innerText
        if (value === '') {
            document.getElementById('lblCartCount').innerText = '1'
        } else {
            const count_int = parseInt(document.getElementById('lblCartCount').innerText)
            document.getElementById('lblCartCount').innerText = (count_int + 1).toString()
        }
        alert('Item added to cart')
        cartRow.getElementsByClassName('delete-btn')[0].addEventListener('click', RemoveCartItem)
        cartRow.getElementsByClassName('plus-btn')[0].addEventListener('click', QTYIncrement)
        cartRow.getElementsByClassName('minus-btn')[0].addEventListener('click', QTYDecrement)
    }

    // Remove Cart function
    function RemoveCartItem(event) {
        event.target.parentElement.parentElement.remove()
        decreaseCount()
        updateTotal()
    }

    // Remove cart press event
    const RemoveCartClass = document.getElementsByClassName("delete-btn")
    for (let i = 0; i < RemoveCartClass.length; i++) {
        const CurrentItem = RemoveCartClass[i]
        CurrentItem.addEventListener('click', function (event) {
            event.target.parentElement.parentElement.remove()
            decreaseCount()
            updateTotal()
        })
    }

    // Update Total
    function updateTotal() {
        let total = 0
        const ProductContainer = document.getElementsByClassName('shopping-cart')[0]
        const CartItems =  ProductContainer.getElementsByClassName('item')
        for (let i = 0; i < CartItems.length; i++) {
            const CurrentRow = CartItems[i]
            const ItemPriceIndex = CurrentRow.children[4].innerHTML.replace('$', '')
            const ItemPrice = parseFloat(ItemPriceIndex)
            const ItemQuantity = CurrentRow.getElementsByClassName('item-quantity')[0].value
            const ItemNewPrice = ItemPrice * ItemQuantity
            total += ItemNewPrice
        }
        document.getElementsByClassName('total-payable')[0].innerText = 'USD $' + total.toFixed(2)
    }

    // Cart product Increment
    const cartIncrement = document.getElementsByClassName('plus-btn')
    for (let i=0; i < cartIncrement.length; i++) {
        const currentButton = cartIncrement[i]
        currentButton.addEventListener('click', function (event) {
            const currentParent = event.target.parentElement
            const buttonValue = parseInt(currentParent.getElementsByClassName('item-quantity')[0].value)
            currentParent.getElementsByClassName('item-quantity')[0].value = buttonValue + 1
            updateTotal()
        })
    }

    // Cart product Decrement
    const cartDecrement = document.getElementsByClassName('minus-btn')
    for (let i=0; i < cartDecrement.length; i++) {
        const currentButton = cartDecrement[i]
        currentButton.addEventListener('click', function (event) {
            const currentParent = event.target.parentElement
            const buttonValue = parseInt(currentParent.getElementsByClassName('item-quantity')[0].value)
            if (buttonValue > 1) {
                currentParent.getElementsByClassName('item-quantity')[0].value = buttonValue - 1
            }
            updateTotal()
        })
    }

    // Increase cart item quantity
    function QTYIncrement(event) {
        const currentParent = event.target.parentElement
        const buttonValue = parseInt(currentParent.getElementsByClassName('item-quantity')[0].value)
        currentParent.getElementsByClassName('item-quantity')[0].value = buttonValue + 1
        updateTotal()
    }

    // Decrease cart item quantity
    function QTYDecrement(event) {
        const currentParent = event.target.parentElement
        const buttonValue = parseInt(currentParent.getElementsByClassName('item-quantity')[0].value)
        if (buttonValue > 1) {
            currentParent.getElementsByClassName('item-quantity')[0].value = buttonValue - 1
        }
        updateTotal()
    }

    // Decrease cart count
    function decreaseCount() {
        const count = document.getElementById('lblCartCount').innerText
        const count_int = parseInt(document.getElementById('lblCartCount').innerText)
        if (count !== '' && count_int !== 1) {
            document.getElementById('lblCartCount').innerText = (count_int - 1).toString()
        } else {
            document.getElementById('lblCartCount').innerText = ''
            document.getElementById('side-bar').style.visibility = 'hidden'
        }
    }

    // Check cart for products
    document.getElementById('cart_icon').addEventListener('click', function () {
        const count = document.getElementById('lblCartCount').innerText
        const visibility = document.getElementById('side-bar').style.visibility
        if (count === '') {
            alert('Please add something to Cart!')
        } else if (visibility === 'visible') {
            document.getElementById('side-bar').style.visibility = 'hidden'
        } else {
            document.getElementById('side-bar').style.visibility = 'visible'
        }
    })

    // Validate form data
    document.getElementById('submit-trigger').addEventListener('click', function (event) {
        const required_fields = document.getElementsByClassName('personal-data')
        for (let i=0; i<required_fields.length; i++) {
            const current_element = required_fields[i]
            if (current_element.value.length === 0) {
                alert('Please fill your ' + (current_element.getAttribute('placeholder').slice(0, -1)).toLowerCase() + '!')
                event.preventDefault()
                document.getElementById('acknowledge').checked = false
                return current_element.focus()
            }
            if (document.getElementById('acknowledge').checked === false) {
                alert('Please confirm your details!')
                event.preventDefault()
                return
            }
        } checkoutProcess(event)
    })

    // Checkout Process
    function checkoutProcess(event) {

        // Prevent form refresh
        event.preventDefault()

        // Get User Data
        const firstName = document.getElementById('first-name').value
        const lastName = document.getElementById('last-name').value
        const address = document.getElementById('customer-address').value
        const city = document.getElementById('customer-city').value
        const country = document.getElementById('customer-country').value
        const postcode = document.getElementById('customer-postcode').value

        // Append Customer Data
        document.getElementById('name').innerHTML = firstName + ' ' + lastName
        document.getElementById('address').innerHTML = address
        document.getElementById('city').innerHTML = city
        document.getElementById('country').innerHTML = country
        document.getElementById('postcode').innerHTML = postcode

        const parentElementReceipt = document.getElementsByClassName('summary-container')[0]

        // Get Cart Items
        const cartItemsList = document.getElementsByClassName('shopping-cart')[0]
        const cartTitle = cartItemsList.getElementsByClassName('product_title')
        for (let i = 0; i < cartTitle.length; i++) {
            const CurrentTitle = cartItemsList.getElementsByClassName('product_title')[i].innerHTML
            const cartItemColor = cartItemsList.getElementsByClassName('product_color')[i]
            const CurrentSize = cartItemsList.getElementsByClassName('product_size')[i].innerHTML.toUpperCase()
            const CurrentQTY = cartItemsList.getElementsByClassName('item-quantity')[i].value
            const CurrentPrice = cartItemsList.getElementsByClassName('total-price')[i].innerHTML
            const CurrentColor = getColorName(trimmer(cartItemColor.style.backgroundColor).toUpperCase())

            const ReceiptRow = document.createElement('div')
            ReceiptRow.classList.add('item')
            ReceiptRow.innerHTML = `<div class="item">
            <table>
                <tr>
                    <td>Product: </td>
                    <td class="product-detail">${CurrentTitle}</td>
                </tr>
                <tr>
                    <td>Size: </td>
                    <td class="product-detail">${CurrentSize}</td>
                </tr>
                <tr>
                    <td>Quantity: </td>
                    <td class="product-detail">x${CurrentQTY}</td>
                </tr>
                <tr>
                    <td>Color: </td>
                    <td class="product-detail">${CurrentColor}</td>
                </tr>
                <tr>
                    <td>Price: </td>
                    <td class="product-detail">${CurrentPrice}</td>
                </tr>
            </table>
            </div>`
            parentElementReceipt.append(ReceiptRow)
        }

        // Update Total
        const parentPrice = document.getElementsByClassName('total-payable')[0]
        document.getElementsByClassName('grand-total-receipt')[0].innerHTML = "Total Bill:&nbsp;" +
            parentPrice.innerHTML.replace('USD', '')

        // Remove other elements
        const elements = document.getElementsByClassName('parent-div-class')
        for (let i=0; i<elements.length; i++) {
            elements[i].remove()
        }
        document.getElementsByClassName('order-summary')[0].remove()

        // Reset Cart Count
        document.getElementById('lblCartCount').innerText = ''

        // Make the class visible
        document.getElementsByClassName('self-parent')[0].style.display = 'flex'
        document.getElementsByClassName('order-receipt')[0].style.display = 'flex'
    }

    // Reload the page
    document.getElementsByClassName('class-parent-redirect')[0].addEventListener('click', function(){
        location.reload()
    })
}