<nav class="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
    <a class="navbar-brand" href="{{ route('home') }}">Delivery</a>

    <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="{{ route('menu') }}">Меню</a>
            </li>
            @if((Auth::user()) && (Auth::user()->isAdmin()))
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('orders') }}">Заказы</a>
                </li>
            @endif
            @guest
                <li><a class="nav-link" href="{{ route('login') }}">Войти</a></li>
                <li><a class="nav-link" href="{{ route('register') }}">Регистрация</a></li>
            @else
                <li class="nav-item dropdown">
                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ Auth::user()->name }} <span class="caret"></span>
                    </a>

                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="{{ route('logout') }}"
                           onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                            Выйти
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    </div>
                </li>
            @endguest
        </ul>
    </div>
</nav>