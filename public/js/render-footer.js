function renderFooter() {
  const footer = document.querySelector("footer");

  footer.classList.add("text-center");
  footer.classList.add("text-white");
  footer.innerHTML = `<!-- Copyright -->
    <div class="text-center p-3" style="background-color: #404040">
      <p style="color: white">© 2022 개굿개굿</p>
      <p style="color: white">저작권 yalco</p>
    </div>
    <!-- Copyright -->`;
}

export { renderFooter };
