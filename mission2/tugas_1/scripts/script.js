document.addEventListener("DOMContentLoaded", function () {
    class ShoppingCart {
        constructor() {
            this.cart = [];
            this.total = 0;
        }

        addToCart(item) {
            // Cari apakah item sudah ada dalam keranjang
            const existingItem = this.cart.find(
                (cartItem) => cartItem.name === item.name
            );

            if (existingItem) {
                // Jika item sudah ada, sesuaikan kuantitas dengan jumlah yang ada di tombol count
                existingItem.quantity = item.quantity;
            } else {
                // Jika item belum ada, tambahkan item baru ke keranjang
                this.cart.push({ ...item }); // Klone objek item
            }

            this.updateCart();
        }

        removeFromCart(itemName) {
            // Hapus item dari keranjang berdasarkan nama
            this.cart = this.cart.filter((item) => item.name !== itemName);
            this.updateCart();
        }

        updateCart() {
            const cartContainer = document.querySelector(".cart-list");
            const totalAmountElement = document.querySelector(".nominal-total-amount");
            const taxAmountElement = document.querySelector(".nominal-tax");
            const grandTotalAmountElement = document.querySelector(".nominal-grand-total");

            // Kosongkan cart sebelum mengisi ulang
            cartContainer.innerHTML = "";
            let cartTotal = 0;

            // Tambahkan setiap item dalam cart ke tampilan cart
            this.cart.forEach((item) => {
                const cartItemContainer = document.createElement("div");
                cartItemContainer.className = "cart-list-item";

                const cartItemImage = document.createElement("div");
                cartItemImage.className = "cart-img";
                const img = document.createElement("img");
                img.src = `./assets/${item.imageName}`;
                cartItemImage.appendChild(img);

                const cartItemDesc = document.createElement("div");
                cartItemDesc.className = "cart-desc";

                const cartItemName = document.createElement("div");
                cartItemName.className = "cart-desc-name";
                const itemName = document.createElement("p");
                itemName.textContent = item.name;
                cartItemName.appendChild(itemName);

                const cartPriceQty = document.createElement("div");
                cartPriceQty.className = "cart-price-n-qty";
                cartPriceQty.textContent = `Rp ${item.price.toLocaleString(
                    "id-ID"
                )} * ${item.quantity}`;

                const totalPerItem = document.createElement("div");
                totalPerItem.className = "total-per-item";
                totalPerItem.textContent = `Rp ${(
                item.price * item.quantity
                ).toLocaleString("id-ID")}`;

                const removeButton = document.createElement("button");
                removeButton.className = "btn red remove";
                removeButton.textContent = "Remove";
                removeButton.dataset.itemName = item.name;

                // Tambahkan event listener ke tombol "Remove"
                removeButton.addEventListener("click", (event) => {
                    const itemName = event.target.dataset.itemName;
                    this.removeFromCart(itemName);
                });

                cartItemDesc.appendChild(cartItemName);
                cartItemDesc.appendChild(cartPriceQty);
                cartItemDesc.appendChild(removeButton);

                cartItemContainer.appendChild(cartItemImage);
                cartItemContainer.appendChild(cartItemDesc);
                cartItemContainer.appendChild(totalPerItem);
                cartContainer.appendChild(cartItemContainer);

                // Hitung total pembelian
                cartTotal += item.price * item.quantity;
            });

            // Hitung pajak 11%
            const taxAmount = cartTotal * 0.11;

            // Hitung total bayar
            const grandTotal = cartTotal - taxAmount;

            // Tampilkan total pembelian di keranjang
            totalAmountElement.textContent = `Rp ${cartTotal.toLocaleString("id-ID")}`;
            taxAmountElement.textContent = `Rp ${taxAmount.toLocaleString("id-ID")}`;
            grandTotalAmountElement.textContent = `Rp ${grandTotal.toLocaleString("id-ID")}`;
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
                            <p>Rp. <span>${this.price.toLocaleString(
                                "id-ID"
                            )}</span></p>
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
            itemDiv.querySelector(`.subtract`).addEventListener("click", () => {
                if (this.quantity > 1) {
                    this.quantity--;
                    this.updateQuantity(index);
                }
            });

            itemDiv.querySelector(`.add`).addEventListener("click", () => {
                this.quantity++;
                this.updateQuantity(index);
            });

            // Tambahkan event listener ke tombol "Tambah Barang"
            itemDiv.querySelector(`.addToCart`).addEventListener("click", () => {
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
        new ShopItem("Mikroskop Untuk Melihat Kesalahan Orang Lain", 120000, "microscope.jpg"),
        new ShopItem("Microphone Pelunas Hutang", 360000, "mikrofon.jpg"),
        new ShopItem("Pintu Kemana Saja", 1400000, "pintu-kemana-saja.webp"),
        new ShopItem("Kantong Ajaib Doraemon", 1800000, "Pocket.webp"),
        new ShopItem("Baling-baling Bambu", 300000, "Bambo.webp"),
        new ShopItem("Konnyaku Penerjemah", 700000, "Konnyaku.webp"),
        new ShopItem("Senter Pembesar", 100000, "Senter.webp"),
        new ShopItem("Kain Pembungkus Waktu", 9000000, "kain-waktu.jpg"),
    ]; 

    items.forEach((item, index) => {
        listItemsContainer.appendChild(item.createHTML(index));
    });
});
