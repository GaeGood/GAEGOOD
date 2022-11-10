function renderFooter() {
  const footer = document.querySelector("footer");

  footer.classList.add("text-center");
  footer.classList.add("text-white");
  footer.style.backgroundColor = "blanchedalmond";
  footer.innerHTML = `<!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
      <p>© 2022 개굿개굿</p>
      <p>저작권 yalco</p>
    </div>
    <!-- Copyright -->`;
}

export { renderFooter };
