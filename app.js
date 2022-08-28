const tbody = document.getElementById("tbody");
const currentPageUpdate = document.getElementById("current-page");
const warning = document.getElementById("warning");
let currentPage = 1;
function paginate(pageNo) {
  tbody.innerHTML = "";
  warning.style.display = "block";
  currentPageUpdate.innerHTML = `
    Showing
        <span class="font-semibold text-gray-900 dark:text-white">${
          10 * (pageNo - 1) + 1
        }</span> to
        <span class="font-semibold text-gray-900 dark:text-white">${
          10 * pageNo
        }</span> of
        <span class="font-semibold text-gray-900 dark:text-white">250</span>
        Entries
  `;
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) =>
      data.slice(10 * (pageNo - 1), 10 * pageNo).map((e) => setCountry(e))
    );
}
paginate(currentPage);

const setCountry = (country) => {
  warning.style.display = "none";
  let currency;
  try {
    currency = Object.entries(country.currencies)[0][1];
  } catch (e) {
    // console.log(e);
  }
  const tr = document.createElement("tr");
  tr.className =
    "bg-white hover:bg-slate-100 border-b dark:bg-slate-800 dark:border-slate-700 hover:dark:bg-slate-900 group";
  tr.innerHTML = `
            <th
              scope="row"
              class="py-4 px-6 font-medium text-slate-900 whitespace-nowrap dark:text-white"
            >
              ${country?.name?.common}
            </th>
            <td class="py-4 px-6"><img class='w-16' src="${
              country.flags?.svg
            }"/></td>
            <td class="py-4 px-6">${country.capital}</td>
            <td class="py-4 px-6">${
              currency ? currency.name : "No Currency"
            } <span class='text-lg'>${
    currency && "- " + currency.symbol
  }</span></td>
            <td class="py-4 px-6 text-right">
              <a
                href="#"
                class="font-medium text-sky-600 dark:text-sky-500 hover:underline"
                >More</a
              >
            </td>
    `;
  tbody.append(tr);
};

const nextPage = document
  .getElementById("next-page")
  .addEventListener("click", (e) => {
    e.preventDefault();
    paginate(++currentPage); // note: if we use currentPage++ then it may pass currentPage to the function and then it may increase it's value
  });
const prevPage = document
  .getElementById("prev-page")
  .addEventListener("click", (e) => {
    e.preventDefault();
    paginate(++currentPage);
  });
