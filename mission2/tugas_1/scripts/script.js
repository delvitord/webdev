let count = 1;

document.getElementById('add').addEventListener('click', () => {
    count++;
    document.getElementById('count').innerHTML = count;
});

document.getElementById('subtract').addEventListener('click', () => {
    if (count > 0) {
        count--;
        document.getElementById('count').innerHTML = count;
    }
});

const items = [
    { name: 'Microphone Pelunas Hutang', price: 120000, imageName: 'mikrofon.jpg' },
    { name: 'Pintu Kemana Saja', price: 1400000, imageName: 'pintu-kemana-saja.webp'},
    { name: 'Kantong Ajaib Doraemon', price: 1800000 },
    { name: 'Baling-baling Bambu', price: 300000 },
    { name: 'Konnyaku Penerjemah', price: 700000 },
    { name: 'Senter Pembersar', price: 99000 }
];

const cart = []; // Inisialisasi cart sebagai array kosong
let total = 0; // Inisialisasi total pembayaran

// Ambil elemen dengan ID "list-items" dari HTML
const listItems = document.getElementById("list-items");

items.forEach((item, index) => {
    // Buat elemen HTML untuk setiap item
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    itemDiv.innerHTML = `
        <div class="item-img">
            <img src="./assets/${item.imageName}" /> <!-- Menggunakan imageName -->
        </div>
        <div class="item-desc">
            <div class="item-name">
                <p>${item.name}</p>
            </div>
            <div class="item-price">
                <p>Rp. <span>${item.price}</span></p>
            </div>
        </div>
        
        <div class="add-to-cart">
            <div class="qty">
                <button class="btn blue" id="subtract${index}">-</button>
                <button class="count white" id="count${index}">1</button>
                <button class="btn blue" id="add${index}">+</button>
            </div>
            
            <button class="btn orange-bar" id="addToCart${index}">
                Tambah Barang
            </button>
        </div>
    `;

    listItems.appendChild(itemDiv);

    // Tambahkan event listener ke tombol "+" dan "-"
    let count = 1; // Default count value
    document.getElementById(`add${index}`).addEventListener('click', () => {
        count++;
        document.getElementById(`count${index}`).innerHTML = count;
    });

    document.getElementById(`subtract${index}`).addEventListener('click', () => {
        if (count > 0) {
            count--;
            document.getElementById(`count${index}`).innerHTML = count;
        }
    });

    // Tambahkan event listener ke tombol "Tambah Barang" untuk menambahkan item ke cart
    document.getElementById(`addToCart${index}`).addEventListener('click', () => {
        if (count > 0) {
            const cartItem = {
                name: item.name,
                price: item.price,
                quantity: count
            };
            cart.push(cartItem);
            updateCart();
        }
    });
});

// Fungsi untuk mengupdate tampilan cart dan total bayar
function updateCart() {
    const cartContainer = document.querySelector(".cart");
    const totalContainer = document.querySelector(".total");

    // Kosongkan cart dan total sebelum mengisi ulang
    cartContainer.innerHTML = "";
    total = 0;

    // Tambahkan setiap item dalam cart ke tampilan cart
    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `${item.name} x ${item.quantity} = Rp. ${item.price * item.quantity}`;
        cartContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    // Tampilkan total bayar
    totalContainer.innerHTML = `Total Bayar: Rp. ${total}`;
}
