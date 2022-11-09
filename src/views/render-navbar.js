function renderNavbar(loggedInUser) {
  console.log("------------ navbar 렌더 시작 ------------");
  let navbar;

  if (loggedInUser && loggedInUser.role === "admin") {
    // 관리자 navbar
    navbar = `
        <nav class="navbar">
        <a class="navbar-brand" href="/">GAEGOOD</a>
        <ul class="navbar-nav">
          <li class="nav-item admin">
            <a class="nav-link" href="/users/admin">관리자 페이지</a>
          </li>
          <li class="nav-item mypage">
            <a class="nav-link" href="/users/mypage">${loggedInUser.name}님의 마이페이지</a>
          </li>
          <li class="nav-item logout">
            <a class="nav-link">로그아웃</a>
          </li>
          <li class="nav-item cart">
            <a class="nav-link" href="/cart">장바구니
              <span class="icon">
                <i class="fas fa-cart-shopping"></i>
              </span>
            </a>
          </li>
        </ul>
        <!-- </div> -->
        </nav>
        `;
  } else if (loggedInUser) {
    // 일반 유저 navbar
    navbar = `
    <nav class="navbar">
    <a class="navbar-brand" href="/">GAEGOOD</a>
    <ul class="navbar-nav">
      <li class="nav-item mypage">
        <a class="nav-link" href="/users/mypage">${loggedInUser.name}님의 마이페이지</a>
      </li>
      <li class="nav-item logout">
        <a class="nav-link">로그아웃</a>
      </li>
      <li class="nav-item cart">
        <a class="nav-link" href="/cart">장바구니
          <span class="icon">
            <i class="fas fa-cart-shopping"></i>
          </span>
        </a>
      </li>
    </ul>
    <!-- </div> -->
    </nav>
        `;
  } else {
    // 로그인하지 않은 유저의 navbar
    navbar = `
     <nav class="navbar">
     <a class="navbar-brand" href="/">GAEGOOD</a>
     <ul class="navbar-nav">
       <li class="nav-item login">
         <a class="nav-link active" data-bs-toggle="modal" data-bs-target="#modalLogin" aria-current="page">로그인</a>
       </li>
       <li class="nav-item join__btn">
        <a class="nav-link active" data-bs-toggle="modal" data-bs-target="#modalJoin" href="#none">회원가입</a>
       </li>
       <li class="nav-item cart">
         <a class="nav-link" href="/cart">장바구니
           <span class="icon">
             <i class="fas fa-cart-shopping"></i>
           </span>
         </a>
       </li>
     </ul>
     <!-- </div> -->
     </nav>
         `;
  }

  // navbar를 body에 렌더
  document.body.innerHTML = navbar + document.body.innerHTML;
  console.log("------------ navbar 렌더 완료 ------------");
}

export { renderNavbar };
