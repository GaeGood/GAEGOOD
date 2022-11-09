function renderJoinModal() {
  console.log("------------ login modal 렌더 시작 ------------");
  const joinModal = `<div
  class="modal fade"
  id="modalJoin"
  tabindex="-1"
  aria-labelledby="modalJoinLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalJoinLabel">환영합니다!</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <form action="" method="" class="join__form">
          <div class="mb-3">
            <label for="inputUserName" class="form-label">이름</label>
            <input
              type="text"
              class="form-control"
              id="join__user__name"
              placeholder="geagood"
            />
          </div>
          <div class="mb-3">
            <label for="inputEmail" class="form-label">이메일</label>
            <input
              type="email"
              class="form-control"
              id="join__email"
              placeholder="user@gaegood.com"
            />
          </div>
          <div class="mb-3">
            <label for="inputPassword" class="form-label">비밀번호</label>
            <input
              type="password"
              class="form-control"
              id="join__password"
              placeholder="****"
            />
          </div>
          <div class="mb-3">
            <label for="inputPasswordCheck" class="form-label"
              >비밀번호 확인</label
            >
            <input
              type="password"
              class="form-control"
              id="join__password__check"
              placeholder="****"
            />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          닫기
        </button>
        <button type="button" class="btn btn-primary join__submit__btn">
          확인
        </button>
      </div>
    </div>
  </div>
</div>`;

  document.body.innerHTML = joinModal + document.body.innerHTML;
  console.log("------------ login modal 렌더 완료 ------------");
}

export { renderJoinModal };
