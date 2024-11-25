// prihlasovani
async function handleLogin(event) {
    event.preventDefault();  // Zabrání odeslání formuláře a reloadu stránky

    // Získání hodnot z formuláře
    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();

    // Základní validace (můžete přidat i další podmínky podle potřeby)
    if (!email || !password) {
        alert("Prosím vyplňte všechny údaje.");
        return;
    }

    // Příprava dat pro odeslání na backend
    const loginData = {
        email: email,
        password: password
    };

    // Odeslání přihlašovacích údajů na backend
    try {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        // Kontrola odpovědi od backendu
        if (response.ok && data.success) {
            // Pokud přihlášení bylo úspěšné, přesměrování na dashboard nebo jinou stránku
            window.location.href = '/dashboard';  // Směřujte na dashboard nebo jinou stránku
        } else {
            // Zobrazení chybové zprávy
            alert(data.message || "Neplatné přihlašovací údaje.");
        }

    } catch (error) {
        console.error('Chyba při přihlášení:', error);
        alert("Došlo k chybě při přihlášení. Zkuste to znovu.");
    }
}



// Kalkulator
// Funkce pro aktualizaci celkové ceny na základě počtu kusů a cen jednotlivých položek
function updateTotal() {
    let totalPrice = 0;
    // Iterace přes všechny řádky tabulky s položkami
    for (let i = 1; i <= 20; i++) {
        let count = document.querySelector(`input[name='count${i}']`).value; // Počet kusů
        let price = parseFloat(document.getElementById(`price-${i}`).textContent); // Cena za kus
        totalPrice += count * price; // Výpočet celkové ceny
    }
    // Aktualizace celkové ceny na stránce
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2) + ' Kč';
}

// Funkce pro odeslání poptávky
function submitRequest() {
    // Zde můžete přidat kód pro odeslání dat, například prostřednictvím AJAX nebo formuláře
    alert("Poptávka byla odeslána!");
}

// Funkce pro načítání cen z backendu při načtení stránky
async function fetchPrices() {
    try {
        // Provedeme GET požadavek na endpoint "/api/get_prices", který by měl vrátit ceny položek ve formátu JSON
        const response = await fetch("/api/get_prices");  // Endpoint Django API pro ceny
        const prices = await response.json();  // Parsujeme JSON odpověď do pole s cenami
        
        // Pro každou cenu v poli aktualizujeme odpovídající prvek v tabulce
        prices.forEach((price, index) => {
            // Nastavíme textovou hodnotu prvku s ID "price-{index}" na načtenou cenu
            document.getElementById(`price-${index + 1}`).textContent = price;
        });
    } catch (error) {
        // Pokud dojde k chybě během načítání cen, vypíšeme chybu do konzole
        console.error("Chyba při načítání cen:", error);
    }
}

// Spustí funkci fetchPrices po načtení stránky, aby se ceny položek aktualizovaly z backendu
window.onload = fetchPrices;

// Tento skript aktualizuje cenu podle dat z backendu (endpointu /api/get_prices). Nezapomeňte mít tento soubor propojený s HTML stránkou.

// poptavka Optimalizace pracovnichnich postupu
function submitRequest() {
    // Zde bude logika pro odeslání poptávky
    alert("Poptávka bude odeslána");
}