// HTML에 로그인 모달창 관련 HTML 코드를 넣는 함수
// 로그인 창을 열고 싶은 경우, (ex 로그아웃 상태에서 주문하기 버튼 클릭 시)
// <button data-bs-toggle="modal" data-bs-target="#modalLogin">로그인</button> 처럼
// data-bs-toggle="modal" data-bs-target="#modalLogin" 속성을 이용해야 하며,
// "주문하기" 버튼처럼 특정 버튼을 클릭 시 로그인 모달이 뜨게 할지, 또는 주문페이지로 이동하게 할지의 여부는
// verifyToken으로 가져온 로그인 여부에 따라 동적으로 결정하는 로직이 필요함
function renderLoginModal() {
  const loginModal = `<div class="modal fade" id="modalLogin" tabindex="-1" aria-labelledby="modalLoginLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalLoginLabel">환영합니다!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="" method="" class="login__form">
            <div class="mb-3">
              <label for="inputEmail1" class="form-label">이메일</label>
              <input type="email" class="form-control" id="email" placeholder="user@gaegood.com">
            </div>
            <div class="mb-3">
              <label for="inputPassword1" class="form-label">비밀번호</label>
              <input type="password" class="form-control" id="password" placeholder="****">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <div id="find__password__wrap"><a href="/find-password" id="find__password__btn">비밀번호 찾기</a></div>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button type="button" class="btn btn-primary login__submit__btn">확인</button>
        </div>
      </div>
    </div>
  </div>`;

  document.body.innerHTML = loginModal + document.body.innerHTML;
}

export { renderLoginModal };
