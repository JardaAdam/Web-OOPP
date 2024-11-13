# Pro správnou funkčnost tlačítek je potřeba mít na backendu Django připravené URL cesty pro přihlášení a registraci.

# URL pro přihlášení (/login/) bude směrovat na stránku s formulářem pro přihlášení uživatele.
# URL pro registraci (/register/) bude směrovat na stránku s formulářem pro registraci nového uživatele.
# registrace 


# Vytvoření pohledu pro registraci: V souboru views.py přidejte pohled pro registraci uživatele. 
# Tento pohled bude zobrazovat registrační formulář a zpracovávat data.
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

# Pohled pro registraci
def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Účet byl vytvořen! Můžete se přihlásit.')
            return redirect('login')  # Po registraci přesměruje na přihlášení
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})

# URL konfigurace: V souboru urls.py přidejte URL pro registrační stránku.

from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
]
# Prihlaseni 
#  Na serverové straně budete muset správně zpracovat požadavek na přihlášení
#  a provést autentifikaci uživatele pomocí například Django's authenticate() a login() funkcí. Zde je příklad pro Django:
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

def login_view(request):
    if request.method == 'POST':
        # Načtení dat z requestu
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        # Ověření uživatele
        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)  # Přihlásíme uživatele
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'message': 'Neplatné přihlašovací údaje.'}, status=400)

    return JsonResponse({'success': False, 'message': 'Pouze POST požadavky jsou povoleny.'}, status=405)

# Tento backend bude provádět autentifikaci na základě poskytnutého emailu a hesla. Ujistěte se, že ve vašem 
# modelu uživatele je správně nastavené pole pro email (např. User.email nebo vlastní model).



# kalkulator
# V Django backendu vytvořte API endpoint /api/get_prices, který vrátí ceny 
# uložené v databázi, například ve formátu JSON:

# Doporučené kroky:

# Otevřete složku aplikace ve struktuře vašeho Django projektu.
# Vytvořte nebo otevřete soubor views.py (pokud už existuje).
# Vložte kód do tohoto souboru a uložte ho jako .py.
# Tip: Pokud jste tento pohled get_prices přidali do nového souboru (např. api.py), nezapomeňte ho importovat ve vašem urls.py, 
# abyste nastavili příslušný URL endpoint pro tento pohled.

# Backend – Django pohled (views.py)
from django.http import JsonResponse
from .models import Item  # Model pro jednotlivé položky

def get_prices(request):
    items = Item.objects.values_list('price', flat=True)
    return JsonResponse(list(items), safe=False)



# URL konfigurace (urls.py)
# Přidejte cestu k API, aby bylo možné z frontendového skriptu volat funkci get_prices.

from django.urls import path
from . import views

urlpatterns = [
    path('api/get_prices', views.get_prices, name='get_prices'),
]