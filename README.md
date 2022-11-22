# 개굿(GAEGOOD) : 개발자 굿즈 판매 쇼핑몰 Project

## 프로젝트 주제

- 목적 : 개발자 굿즈가 갖고싶은 개발자들에게 **개발자 굿즈**를 판매하는 사이트
- 목표
  - 홈에서 굿즈 정보를 확인할 수 있습니다.
  - 회원 가입을 하지 않아도 상품을 구경하고 장바구니에 넣을 수 있습니다.
  - 최소한의 클릭으로 상품을 구매하거나 판매할 수 있습니다.
### 제작기간
- 22/10/31 ~ 22/11/11
## 페르소나 (유닉스토발즈)

![developer](https://user-images.githubusercontent.com/59651691/200745685-f62a5f22-36cd-4669-8554-739fd1b94201.png)

💡 윤익수 (파평윤씨, UNIX Torvalds) : <strong>"오프라인에서 개발자 굿즈를 안팔아서 온라인에서 구매하려고요"</strong>

<br />

## 서비스 소개

#### 상품 등록, 장바구니 추가, 주문하기 등 쇼핑몰의 핵심 서비스를 구현합니다.

1. 회원가입(모달창), 로그인(모달창), 회원정보 수정 등 **유저 정보 관련 CRUD**
2. **상품 목록**을 조회 및, **상품 상세 정보**를 조회 가능함.
3. 장바구니에 상품을 추가할 수 있으며, **장바구니에서 CRUD** 작업이 가능함.
4. 장바구니는 서버 DB가 아닌, 프론트 단에서 저장 및 관리됨 (indexedDB)
5. 장바구니에서 주문을 진행하며, **주문 완료 후 조회 및 삭제**가 가능함.
6. nodemailer gmail을 활용한 임시패스워드 발급 기능구현

<br />

## 데모 사이트

- https://gaegood.com/
<div>

![GAEGOOD](https://user-images.githubusercontent.com/59651691/201486542-5f37d229-6e12-4c27-8ae6-4c779c81cd78.PNG)

</div>

### 1-1. API 설계 문서

- https://regular-ketchup-337.notion.site/bf94faeda3144c16884d47d1b1d99b41?v=85f4de506d71431fb30b58f85d42d00d

## Tech Stack

![gaegood_tech_stack drawio](https://user-images.githubusercontent.com/59651691/200760088-1ddbf681-e147-44eb-adf4-f4f1f26a40ac.png)

<br/>

## Infra

![gaegood drawio (3)](https://user-images.githubusercontent.com/59651691/201276994-3393e524-3919-4384-9280-e7fb4451c255.png)

<br/>

### 데모 영상

<details><summary>홈 & 카테고리별 상품조회</summary>

![image](https://user-images.githubusercontent.com/59651691/201486815-bf901786-ee40-418a-aa15-c34aa021b1bf.gif)


</details>


<details><summary>로그인 & 회원가입 & 토큰인증</summary>

![](https://velog.velcdn.com/images/gyuri092/post/7226d290-93ad-4020-99dd-0370593975ab/image.gif)

</details>


<details><summary>회원정보수정 & 회원탈퇴</summary>
 
![](https://velog.velcdn.com/images/bamzzi15/post/536380f7-5294-4d81-b9c1-42b0c1072b99/image.gif)
회원정보수정

![](https://velog.velcdn.com/images/bamzzi15/post/d932ddef-f712-44a9-a964-218ff322423d/image.gif)
회원탈퇴


</details>



<details><summary>장바구니 기능</summary>

![](https://velog.velcdn.com/images/gyuri092/post/a13cc16e-3be7-440d-8aee-c1c56903cff0/image.gif)

</details>


<details><summary>즉시구매 & 장바구니구매</summary>

![](https://velog.velcdn.com/images/gyuri092/post/62572aac-09a3-42ae-9aae-915541128764/image.gif)

![](https://velog.velcdn.com/images/gyuri092/post/2f26730d-5903-4ec9-97a1-6d95bf1ec15b/image.gif)

</details>


<details><summary>주문내역조회 & 주문정보수정 & 주문취소</summary>

![](https://velog.velcdn.com/images/bamzzi15/post/615a83df-8b63-476b-8a0f-c71fe8d87f43/image.gif)
주문조회


![](https://velog.velcdn.com/images/bamzzi15/post/2870e56c-3022-4a46-8071-7b455db72cf0/image.gif)
주문상세조회, 수정, 탈퇴

</details>


<details><summary>상품찜하기 & 찜목록조회</summary>

![](https://velog.velcdn.com/images/bamzzi15/post/c773a054-b27e-46bc-b618-d13eeb059459/image.gif)

</details>


<details><summary>관리자</summary>

![녹화_2022_11_13_02_28_45_368](https://user-images.githubusercontent.com/59651691/201486963-b0b0aba7-f9a6-42bc-85e8-9b2bf9072167.gif)

</details>

<br />

## 👪 구성원 역할

<br />

| 별칭(이름)              | 담당 업무 |
| ----------------------- | --------- |
| :rabbit: MAY(민영)      | FE (팀장) |
| :snowflake: MANDY(규리) | FE        |
| :snowman: HUNI(재훈)    | BE        |
| :penguin: SIAN(시안)    | FE        |
| :leopard: PEPE(종훈)    | BE        |

### 프론트엔드

- **Vanilla javascript**, html, css (**Bootstrap css**)
- Font-awesome
- Daum 도로명 주소 api
- SIAN(시안)
  - 관리자페이지 화면구성(상품관리,유저관리,주문관리) , 로그인 모달화면 구성
- May(민영)
  - 마이페이지 화면구성(회원정보수정, 주문목록, 찜목록, 회원탈퇴,주문생성)
- Mandy(규리)
  - 장바구니 구현,상품상세페이지 화면구성 (indexedDB)

### 백엔드

- **Express** (nodemon, babel-node로 실행됩니다.)
- Mongodb, Mongoose
- cors
- PEPE(종훈)
  - Product, Order, Category 스키마 설계 및 API 구현, 로그인 여부, 접근 권한, 입력 값 등을 체크하는 미들웨어 구현, 이미지 업로드 미들웨어 구현
- HUNI(재훈)
  - Auth : nodemailer 활용한 gmail 임시패스워드 발송, verifyToken ,bcrypt 활용한 해싱작업,JWT token cookie 인증방식 및 로그인,로그아웃 로직 설계
  - User : CRUD 작성
  - 배포: pm2 활용한 무중단 배포, nginx 활용한 reverse proxy 적용, google domain 설정, ssl letsencrypt적용

### 폴더 구조

- 프론트: `src/views` 폴더
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**

<br />

## Collaboration Tools

- Padlet : 초반 주제 기획시 의사결정 빠르게 하는 칸반 보드 용도(Trello보다 가벼워서 잠시 사용, 이후에 notion으로 통일)
- PigJam : 초반 기획시 빠른 레이아웃을 잡기 위해 사용
- Notion : 수정이 빈번하고 같이 수정해야하는 것, API 명세
- Discord : 화상회의 , 수시로 스크럼 잡는 용도
- Gitlab : Code Repository
- Gitlab Issue : 진행상황이나 Trouble Shooting 내역 적기
- Gitlab Wiki : 스크럼 회의내용 적기
- Postman Teams : API 테스트 진행

## Scrum

- 탄력적으로 운영. 시작스크럼 첫주(11:00~) , 둘째주(13:00~)
- YTB(Yesterday, Today, Blocking) 기반 스크럼 회의 진행
  - 어제할일, 오늘할일, 막히는 상황 스크럼 회의때 공유
- 필요시 수시로 프론트/백엔드/전체 스크럼 잡아서 진행

## 코드 컨벤션

- URL, URI를 RESTful 하게 작성하기
- 파일명이 여러 단어로 이루어지면 ‘- (하이픈)’ 으로 연결하기
- 스키마, 모델은 Upper Camel Case 사용하기
- 일반변수 lower Camel Case
- Class, ID Selector : 프론트엔드 재량
- DOM 요소 : 프론트엔드 재량
- 백엔드 : 4계층 구조 (Router,Controller,Service,Model)

## 커멧메세지 컨벤션 (개발 생산성을 낮추지 않기위해 3개로 축소)

- feat: 새로운 기능추가
- fix: 수정사항 발생시, 버그fix , refactoring
- template : html,css,js 등 view 관련 변경사항 발생시
- feat, fix, template 3가지를 공통적으로 사용하되 그 외는 자유롭게 사용

## 브랜치 전략

![gaegood_branch_strategy drawio (5)](https://user-images.githubusercontent.com/59651691/201320404-6b33526e-ce66-4c1a-9cc6-da612e68f07b.png)

<br />

## 배포

- google domain 적용
- letsencrypt ssl 무료 인증서 적용

## 실행 방법

```bash
git clone {.....repository_name}.git
cd {repository_name}
npm install
npm run start
```

### .env 설정

```
PORT = {PORT}
JWT_SECRET_KEY = {YOUR_JWT_SECRET_KEY}
SALT_ROUND = {SALT_ROUND}
MONGODB_URL = {YOUR_MONGODB_URL}
AUTH_GMAIL_USER = {YOUR_AUTH_GAMIL_USER}
AUTH_GMAIL_PASS = {YOUR_GMAIL_PASSWORD(ACCESS TOKEN)}
```

### Image Copyright

Copyrightⓒ2022 by Yalco (https://marpple.shop/kr/yalco)  
All pictures cannot be copied without permission.

---

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2022 엘리스 Inc. All rights reserved.
