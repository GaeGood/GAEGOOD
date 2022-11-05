async function verifyToken() {
  // 서버의 verifyToken API로 fetch 요청
  console.log("-------------------- 토큰 검증 시작 -------------------------");

  if (document.cookie.includes("jwt_token")) {
    const verifyResult = await fetch("api/auth/verifyToken")
      .then(async (res) => {
        const result = await res.json();
        // 서버가 200대의 status code를 반환한 경우 (검증 성공) => return result 으로 then 문으로 result 전달
        if (res.ok) {
          return result;
        }

        // 그 외의 status code를 반환한 경우 (검증 실패) => return Promise.reject(result) 로 catch 문으로 result 전달
        return Promise.reject(result);
      })
      .then((result) => {
        // 로그인 성공 확인용 코드 (추후 삭제 예정)
        console.log("로그인 성공 시 받게 되는 result");
        console.log(result);
        alert(result.resMsg.msg);

        // verifyToken API로부터 돌려 받은 유저 정보를 사용 (로그인 한 유저라고 판단)
        console.log("로그인 성공 한 유저 정보 result.resMsg.user;");
        console.log(result.resMsg.user);

        const loggedInUser = result.resMsg.user;

        return { verifySucceed: true, loggedInUser };
      })
      .catch((result) => {
        // 로그인 실패 확인용 코드 (추후 삭제 예정)
        console.log("로그인 실패 시 받게 되는 result");
        console.log(result);
        alert(result.resMsg.msg);

        return { verifySucceed: false };
      });

    return verifyResult;
  } else {
    return false;
  }
}

export { verifyToken };
