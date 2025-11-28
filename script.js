document.addEventListener("DOMContentLoaded", () => {
    const cartCountElement = document.getElementById("cartCount");
    const modalCartCountElement = document.getElementById("modalCartCount");
    const cartListElement = document.getElementById("cart-list");
    const finalizeButton = document.getElementById("finalizar-compra");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    
    let cart = [];
    const renderCart = () => {
        // 1. Actualizar Contadores
        const totalItems = cart.length;
        cartCountElement.textContent = totalItems;
        modalCartCountElement.textContent = totalItems;

        // 2. Calcular el total
        const totalAmount = cart.reduce((sum, item) => sum + parseFloat(item.precio), 0);
        
        // 3. Actualizar el botón de finalizar compra
        const totalFormatted = new Intl.NumberFormat('es-AR', { 
            style: 'currency', 
            currency: 'ARS', // Usa ARS si es en Argentina, o ajusta a tu moneda.
            minimumFractionDigits: 2 
        }).format(totalAmount);
        
        finalizeButton.textContent = `Finalizar Compra (${totalFormatted})`;
        finalizeButton.disabled = totalItems === 0;

        // 4. Renderizar la lista
        cartListElement.innerHTML = ''; // Limpiar la lista actual

        if (totalItems === 0) {
            // Mostrar mensaje de carrito vacío si no hay productos
            const emptyItem = document.createElement('li');
            emptyItem.className = 'list-group-item text-center';
            emptyItem.textContent = '¡Carrito vacío!';
            cartListElement.appendChild(emptyItem);
        } else {
            // Mostrar los productos en la lista
            cart.forEach(item => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                
                const itemFormatted = new Intl.NumberFormat('es-AR', { 
                    style: 'currency', 
                    currency: 'ARS',
                    minimumFractionDigits: 2 
                }).format(item.precio);

                listItem.innerHTML = `
                    <span>${item.nombre}</span>
                    <span class="badge bg-primary rounded-pill">${itemFormatted}</span>
                `;
                cartListElement.appendChild(listItem);
            });
        }
    };
    

    renderCart();

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute('data-nombre');
            // IMPORTANTE: Obtener el precio del atributo data-precio
            const productPrice = button.getAttribute('data-precio'); 

            // Agregar el nuevo producto al array del carrito
            cart.push({ nombre: productName, precio: productPrice });

            // Volver a renderizar el carrito para actualizar la lista y el total
            renderCart();
            
            // Animación visual del carrito
            cartCountElement.classList.add("pulse");
            setTimeout(() => cartCountElement.classList.remove("pulse"), 400);
            
            alert(`${productName} ha sido añadido al carrito.`);
        });
    });
    
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('show.bs.modal', renderCart);
    }
});