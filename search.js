const search = document.getElementById("search");
search.addEventListener("input", (e) => {
  e.preventDefault();
  if (!search.value) {
    tbody.innerHTML = "";
    paginate(1);
    return;
  }
  paginate(1, `name/${search.value}`);
});
