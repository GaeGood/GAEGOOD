function createTop(listArr) {
  const top = document.createElement("thead");
  top.className = "table-light";
  const tr = document.createElement("tr");
  const addHtml = [];
  for (let count = 0; count < listArr.length; count++) {
    addHtml.push(`
    <th scope="col">
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">${listArr[count]}</font>
        </font>
    </th>`);
  }
  tr.innerHTML += addHtml.join("");
  top.prepend(tr);
  return top;
}

function createOderMiddle(dataArr) {
  const middle = document.createElement("tbody");
  const addHtml = [];
  for (let count = 0; count < dataArr.length; count++) {
    addHtml.push(
      `<tr id="${dataArr[count]._id}">
          <th scope="row">
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">${
                dataArr[count].date
              }</font>
            </font>
          </th>
          <td>
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">${
                dataArr[count].name
              }</font>
            </font>
          </td>
          <td>
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">${dataArr[
                count
              ].products.join(",<br>")}</font>
            </font>
          </td>
          <td>
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">${
                dataArr[count].total
              }</font>
            </font>
          </td>
          <td>
            <div class="dropdown">
              <a class="btn btn-outline-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ${dataArr[count].shopStatus}
              </a>
              <ul class="dropdown-menu btn__edit">
                <li><a class="dropdown-item" href="#">배송전</a></li>
                <li><a class="dropdown-item" href="#">배송중</a></li>
                <li><a class="dropdown-item" href="#">배송완료</a></li>
                <li><a class="dropdown-item" href="#">취소완료</a></li>
              </ul>
            </div>
          </td>
          <td>
            <button type="button" class="btn btn-outline-danger btn__delete">삭제하기</button>
          </td>
        </tr>`
    );
  }
  middle.innerHTML += addHtml.join("");
  return middle;
}

function createOderTable(listArr, datasArr) {
  //datas 는 필요한 데이터만 받아온 객체들의 배열
  const table = document.createElement("table");
  table.className = "table text-center";
  table.prepend(createTop(listArr));
  table.append(createOderMiddle(datasArr));
  return table;
}

function createUserTable(listArr, datasArr) {
  //datas 는 필요한 데이터만 받아온 객체들의 배열
  const table = document.createElement("table");
  table.className = "table text-center";
  table.prepend(createTop(listArr));
  table.append(createUserMiddle(datasArr));
  return table;
}

function createUserMiddle(dataArr) {
  const middle = document.createElement("tbody");
  const addHtml = [];
  for (let count = 0; count < dataArr.length; count++) {
    addHtml.push(
      `<tr id="${dataArr[count]._id}">
          <th scope="row">
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">${dataArr[count].date}</font>
            </font>
          </th>
          <td>
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">${dataArr[count].email}</font>
            </font>
          </td>
          <td>
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">${dataArr[count].name}</font>
            </font>
          </td>
          <td>
            <div class="dropdown">
              <a class="btn btn-outline-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ${dataArr[count].role}
              </a>
              <ul class="dropdown-menu btn__edit">
                <li><a class="dropdown-item" href="#">일반유저</a></li>
                <li><a class="dropdown-item" href="#">관리자</a></li>
              </ul>
            </div>
          </td>
          <td>
            <button type="button" class="btn btn-outline-danger btn__delete">삭제하기</button>
          </td>
        </tr>`
    );
  }
  middle.innerHTML += addHtml.join("");
  return middle;
}


function createCategoryMiddle(dataArr) {
  const middle = document.createElement("tbody");
  const addHtml = [];
  for (let count = 0; count < dataArr.length; count++) {
    addHtml.push(
      `<tr id="${dataArr[count]._id}">
          <th scope="row">
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">${dataArr[count].date}</font>
            </font>
          </th>
          <td>
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;" class="current__name">${dataArr[count].name}</font>
            </font>
          </td>
          <td>
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">${dataArr[count].updateDate}</font>
            </font>
          </td>
          <td>
          <button type="button" class="btn btn-outline-primary ms-auto p-2 bd-highlight btn__admin__editCategory" data-bs-toggle="modal"
      data-bs-target="#btn__admin__editCategory">수정하기</button>
          </td>
          <td>
            <button type="button" class="btn btn-outline-danger btn__delete">삭제하기</button>
          </td>
        </tr>`
    );
  }
  middle.innerHTML += addHtml.join("");
  return middle;
}


function createCategoryTable(listArr, datasArr) {
  //datas 는 필요한 데이터만 받아온 객체들의 배열
  const table = document.createElement("table");
  table.className = "table text-center";
  table.prepend(createTop(listArr));
  table.append(createCategoryMiddle(datasArr));
  return table;
}

function createProductTable(listArr, datasArr) {
  //datas 는 필요한 데이터만 받아온 객체들의 배열
  const table = document.createElement("table");
  table.className = "table text-center";
  table.prepend(createTop(listArr));
  table.append(createCategoryMiddle(datasArr));
  return table;
}

export {
  createOderTable,
  createUserTable,
  createCategoryTable,
  createProductTable,
};
