class CartManager {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || {};
    // Инициализируем элементы после загрузки DOM
    this.initElements();
    this.init();

    // Создаем кастомное событие для изменений в корзине
    this.cartChangeEvent = new CustomEvent('cartChange', {
      detail: { items: this.items },
    });
  }

  initElements() {
    // Добавляем проверку готовности DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.cartIcon = document.querySelector('.cart-icon');
        this.countElement = document.querySelector('.cart-icon__count');
        this.notification = document.querySelector('.cart-icon__notification');
        this.updateCartCount();
      });
    } else {
      this.cartIcon = document.querySelector('.cart-icon');
      this.countElement = document.querySelector('.cart-icon__count');
      this.notification = document.querySelector('.cart-icon__notification');
      this.updateCartCount();
    }
  }

  init() {
    // Загрузка начального состояния из localStorage
    const savedCount = localStorage.getItem('cartCount');
    if (savedCount) {
      this.updateCartCount();
    }
  }

  updateUI() {
    // Добавляем проверки на существование элементов
    if (this.countElement) {
      this.countElement.textContent = this.getTotalItems();
    }

    if (this.notification) {
      if (!this.getTotalItems() > 0) {
        this.notification.style.display = 'none';
      }
    }
  }

  addToCart(product, quantity = 1) {
    const productId = product.id;
    if (!this.items[productId]) {
      this.items[productId] = {
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        article: product.article,
        quantity: quantity,
        category: product.subcatalog_name,
      };
    } else {
      this.items[productId].quantity += quantity;
    }
    this.saveCart();
    this.updateCartCount(); // Обновляем счетчик после добавления

    // Добавляем проверку на существование элемента
    if (this.cartIcon) {
      this.cartIcon.style.transform = 'scale(1.1)';
      setTimeout(() => {
        this.cartIcon.style.transform = 'scale(1)';
      }, 200);
    }
  }

  // directBuy(product, quantity = 1) {
  //   // Сохраняем данные для прямой покупки в localStorage
  //   const buyData = {
  //     id: product.id,
  //     name: product.name,
  //     price: product.price,
  //     image: product.image,
  //     article: product.article,
  //     category: product.subcatalog_name,
  //     quantity: quantity,
  //     total: product.price * quantity,
  //   };
  //   localStorage.setItem('directBuy', JSON.stringify(buyData));
  //   window.location.href = '/payment';
  // }

  removeFromCart(productId) {
    delete this.items[productId];
    this.saveCart();
    this.updateCartCount(); // Обновляем счетчик после удаления

    // Диспатчим событие при удалении
    this.cartChangeEvent = new CustomEvent('cartChange', {
      detail: { items: this.items },
    });
    document.dispatchEvent(this.cartChangeEvent);
  }

  updateQuantity(id, newQuantity) {
    if (this.items[id]) {
      this.items[id].quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(this.items));
      this.updateCartCount();

      // Диспатчим событие при изменении
      this.cartChangeEvent = new CustomEvent('cartChange', {
        detail: { items: this.items },
      });
      document.dispatchEvent(this.cartChangeEvent);
    }
  }

  getTotal() {
    return Object.values(this.items).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getTotalItems() {
    return Object.values(this.items).reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  getItems() {
    return this.items;
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  updateCartCount() {
    const totalItems = this.getTotalItems();
    localStorage.setItem('cartCount', totalItems);

    // Обновляем отображение счетчика в DOM
    this.updateUI();
  }

  clearCart() {
    this.items = {};
    localStorage.removeItem('cart');
    localStorage.setItem('cartCount', '0');
    this.updateCartCount();
  }
}

// Создаем экземпляр менеджера корзины после загрузки DOM
let cartManager;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    cartManager = new CartManager();
  });
} else {
  cartManager = new CartManager();
}

// Экспортируем для использования в других модулях
export default cartManager;
