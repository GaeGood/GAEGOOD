# 개굿(GAEGOOD) : 개발자 굿즈 판매 쇼핑몰 Project

## 프로젝트 주제

- 목적 : 개발자 굿즈가 갖고싶은 개발자들에게 **개발자 굿즈**를 판매하는 사이트
- 목표
    - 홈에서 굿즈 정보를 확인할 수 있습니다.
    - 회원 가입을 하지 않아도 상품을 구경하고 장바구니에 넣을 수 있습니다.
    - 최소한의 클릭으로 상품을 구매하거나 판매할 수 있습니다.

## 페르소나 (유닉스토발즈)
![developer](https://user-images.githubusercontent.com/59651691/200745685-f62a5f22-36cd-4669-8554-739fd1b94201.png)

💡 윤익수 (파평윤씨, UNIX Torvalds)  : <strong>"오프라인에서 개발자 굿즈를 안팔아서 온라인에서 구매하려고요"</strong>



<br />

## 1. 서비스 소개

#### 제품 등록, 장바구니 추가, 주문하기 등 쇼핑몰의 핵심 서비스를 구현합니다. 
1. 회원가입, 로그인, 회원정보 수정 등 **유저 정보 관련 CRUD** 
2. **제품 목록**을 조회 및, **제품 상세 정보**를 조회 가능함. 
3. 장바구니에 제품을 추가할 수 있으며, **장바구니에서 CRUD** 작업이 가능함.
4. 장바구니는 서버 DB가 아닌, 프론트 단에서 저장 및 관리됨 (localStorage, indexedDB 등)
5. 장바구니에서 주문을 진행하며, **주문 완료 후 조회 및 삭제**가 가능함.
6. 추가 기능 ...

<br />

## 데모 사이트
 - http://gaegood.com/
 <div>

<img alt="쇼핑-데모 로고" src="https://i.ibb.co/xSZHxmy/image.png">

</div>

### 1-1. API 설계 문서

- https://regular-ketchup-337.notion.site/bf94faeda3144c16884d47d1b1d99b41?v=85f4de506d71431fb30b58f85d42d00d

## Tech Stack

![gaegood_tech_stack drawio](https://user-images.githubusercontent.com/59651691/200760088-1ddbf681-e147-44eb-adf4-f4f1f26a40ac.png)

  
<br/>

## Infra

![gaegood drawio (3)](https://user-images.githubusercontent.com/59651691/201276994-3393e524-3919-4384-9280-e7fb4451c255.png)


<br/>

### 1-2. 데모 영상

<details><summary>사용자 회원가입, 로그인</summary>


</details>

<details><summary>카테고리 추가 및 반영</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)
   
</details>

<details><summary>제품 추가 및 반영</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<details><summary>장바구니 기능</summary>

![](https://velog.velcdn.com/images/gyuri092/post/a13cc16e-3be7-440d-8aee-c1c56903cff0/image.gif)

</details>

<details><summary>주문 기능</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<details><summary>관리자 페이지</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<br />

### 1-3. 페이지 별 화면

|  |  |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------|
| ![image](https://i.ibb.co/jyxjcd3/image.png) | ![image](https://i.ibb.co/Q860RKz/image.png) |
|    메인 페이지                                |      회원가입 화면                            |
| ![image](https://i.ibb.co/RpYN379/image.png) |                                         |
|    로그인 페이지                              |     앞으로 추가할 페이지                         |

<br />


### 2-1. 프론트엔드

- **Vanilla javascript**, html, css (**Bootstrap css**)
- Font-awesome 
- Daum 도로명 주소 api 
- 이외

### 2-2. 백엔드 

- **Express** (nodemon, babel-node로 실행됩니다.)
- Mongodb, Mongoose
- cors
- 이외


### 3-1. 폴더 구조
- 프론트: `src/views` 폴더 
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**

<br />


## 👪 구성원 역할
<br />

| 별칭(이름) | 담당 업무 |  
| ------ | ------ |
|  :rabbit: MAY(민영)   |  FE (팀장)   |
|  :snowflake: MANDY(규리)   |  FE   |
|  :snowman: HUNI(재훈)   |  BE   |
|  :penguin: SIAN(시안)   |  FE   |
|  :leopard: PEPE(종훈)   |  BE   |


<br />

## 5. 실행 방법

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
```


### Image Copyright
Copyrightⓒ2022 by Yalco (https://marpple.shop/kr/yalco)  
All pictures cannot be copied without permission.

---

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2022 엘리스 Inc. All rights reserved.
