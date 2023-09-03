document.addEventListener("DOMContentLoaded", function() {
    // Seluruh kode JavaScript Anda akan ditempatkan di sini

    class ShoppingCart {
        constructor() {
            this.cart = [];
            this.total = 0;
        }

        addToCart(item) {
            this.cart.push(item);
            this.updateCart();
        }

        updateCart() {
            const cartContainer = document.querySelector(".cart");
            const totalAmountElement = document.querySelector(".total");

            // Kosongkan cart dan total sebelum mengisi ulang
            cartContainer.innerHTML = "";
            this.total = 0;

            // Tambahkan setiap item dalam cart ke tampilan cart
            this.cart.forEach((item) => {
                const cartItem = document.createElement("div");
                cartItem.className = "cart-item";

                // Menggunakan toLocaleString() untuk pemisah ribuan dan format mata uang
                const formattedPrice = (item.price * item.quantity).toLocaleString('id-ID');

                cartItem.textContent = `${item.name} x ${item.quantity} = ${formattedPrice}`;
                cartContainer.appendChild(cartItem);
                this.total += item.price * item.quantity;
            });

            // Tampilkan total bayar
            totalAmountElement.textContent = `Total Bayar: Rp. ${this.total.toLocaleString('id-ID')}`;
        }
    }

    class ShopItem {
        constructor(name, price, imageName) {
            this.name = name;
            this.price = price;
            this.imageName = imageName;
            this.quantity = 1;
        }

        createHTML(index) {
            // Buat elemen HTML untuk setiap item
            const itemDiv = document.createElement("div");
            itemDiv.className = "item";

            itemDiv.innerHTML = `
                <div class="item-img">
                    <img src="./assets/${this.imageName}" />
                </div>
                <div class="item-desc">
                    <div class="item-name">
                        <p>${this.name}</p>
                    </div>
                    <div class="item-price">
                        <p>Rp. <span>${this.price.toLocaleString('id-ID')}</span></p>
                    </div>
                </div>
                
                <div class="add-to-cart">
                    <div class="qty">
                        <button class="btn blue subtract" data-index="${index}">-</button>
                        <button class="count white" id="count${index}">1</button>
                        <button class="btn blue add" data-index="${index}">+</button>
                    </div>
                    
                    <button class="btn orange-bar addToCart" data-index="${index}">
                        Tambah Barang
                    </button>
                </div>
            `;

            // Tambahkan event listener ke tombol "+" dan "-"
            itemDiv.querySelector(`.subtract`).addEventListener('click', () => {
                if (this.quantity > 1) {
                    this.quantity--;
                    this.updateQuantity(index);
                }
            });

            itemDiv.querySelector(`.add`).addEventListener('click', () => {
                this.quantity++;
                this.updateQuantity(index);
            });

            // Tambahkan event listener ke tombol "Tambah Barang"
            itemDiv.querySelector(`.addToCart`).addEventListener('click', () => {
                shoppingCart.addToCart(this);
            });

            return itemDiv;
        }

        updateQuantity(index) {
            document.querySelector(`#count${index}`).textContent = this.quantity;
        }
    }

    const shoppingCart = new ShoppingCart();
    const listItemsContainer = document.getElementById("list-items");

    const items = [
        new ShopItem('Mikroskop Untuk Melihat Kesalahan Orang Lain', 120000, 'microscope.jpg'),
        new ShopItem('Microphone Pelunas Hutang', 360000, 'mikrofon.jpg'),
        new ShopItem('Pintu Kemana Saja', 1400000, 'pintu-kemana-saja.webp'),
        new ShopItem('Kantong Ajaib Doraemon', 1800000, 'Pocket.webp' ),
        new ShopItem('Baling-baling Bambu', 300000, 'Bambo.webp'),
        new ShopItem('Konnyaku Penerjemah', 700000, 'Konnyaku.webp'),
        new ShopItem('Senter Pembesar', 100000, 'Senter.webp'),
        new ShopItem('Kain Pembungkus Waktu', 9000000, 'kain-waktu.jpg')
    ];

    items.forEach((item, index) => {
        listItemsContainer.appendChild(item.createHTML(index));
    });

    document.querySelector(".total").textContent = `Total Bayar: Rp. ${shoppingCart.total.toLocaleString('id-ID')}`;
});
