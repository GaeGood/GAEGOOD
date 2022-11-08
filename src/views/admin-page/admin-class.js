function createTop(listArr) {
  const top = document.createElement("table");
  top.className = "table text-center";
  const addHtml = [];
  addHtml.push(`
  <thead>
  <tr>
    <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${name}</font></font></th>
  </tr>
    </thead>
    <thead class="table-light">
      <tr>`);
  4;
  for (let list = 0; list < listArr.length(); list++) {
    if (list < listArr.length - 2) {
      addHtml.push(`
    <th scope="col">
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">${list}</font>
        </font>
    </th>`);
    } else {
      addHtml.push(`
      <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">상태관리</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">취소</font>
          </font>
        </th>`);
    }
  }
  addHtml.push(`</tr></thead>`);

  top.innerHTML += addHtml.join("");
  return top;
}

function createMiddle(data){
  
}

function createTable(datas) {
  createTop();
}

export { createTable };
