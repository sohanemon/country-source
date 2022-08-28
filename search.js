const search = document.getElementById("search");
search.addEventListener("change", (e) => {
  e.preventDefault();
  tbody.innerHTML = "";
  paginate(1, `name/${search.value}`);
});
search.addEventListener("input", (e) => {
  e.preventDefault();
  if (search.value === "") {
    paginate(1);
  }
});
