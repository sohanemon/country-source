const tbody = document.getElementById("tbody");
const currentPageUpdate = document.getElementById("current-page");
const warning = document.getElementById("warning");
let currentPage = 1;
function paginate(pageNo, url = "all") {
  tbody.innerHTML = "";
  let len;
  warning.style.display = "block";
  fetch(`https://restcountries.com/v3.1/${url}`)
    .then((res) => res.json())
    .then((data) => {
      len = data?.length;
      data?.slice(10 * (pageNo - 1), 10 * pageNo).map((e) => setCountry(e));

      console.log(len);
    })
    .then(() => {
      currentPageUpdate.innerHTML = `
    Showing
        <span class="font-semibold text-gray-900 dark:text-white">${
          10 * (pageNo - 1) + 1
        }</span> to
        <span class="font-semibold text-gray-900 dark:text-white">${
          10 * pageNo
        }</span> of
        <span class="font-semibold text-gray-900 dark:text-white">${len}</span>
        Entries
  `;
    });
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
  tr.setAttribute("data-modal-toggle", "large-modal");
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
              <label for=${
                country.cca3
              } class="text-sky-500 hover:text-sky-300 cursor-pointer hover:underline">more</label>
              <input type="checkbox" id=${country.cca3} class="modal-toggle" />
              <label for=${country.cca3} class="modal cursor-pointer ">
                <label class="modal-box w-11/12 text-lg min-h-[400px] p-20 max-w-5xl space-y-5 text-left relative" for="">
                  <div class='flex gap-10  items-center'> 
                    <div> 
                      <h3 class="text-3xl font-bold">${country.name.common}</h3>
                      <h3 class='text-lg font-semibold'>${
                        country.name.official
                      }</h3>
                      </div>
                    <img class='w-20' src=${country.coatOfArms.svg}/>
                   
                  </div>
                  <div class='grid grid-cols-3 justify-start gap-5'>
                  <span>Language: ${Object.values(country.languages).map(
                    (e) => " " + e
                  )}</span>
                  <span>Population: ${country.population}</span>
                  <span>FIFA: ${country.fifa}</span>
                  </div>
                  <div class='grid grid-cols-3 justify-start gap-5'>
                  <span>Region: ${country.region}</span>
                  <span>Sub Region: ${country.subregion}</span>
                  <span>Continent: ${country.continents?.map((e) => e)}</span>
                  </div>
                  <div class='grid grid-cols-3 justify-start gap-5'>
                  <span>Area: ${country.area} km</span>
                  <span>Starting Day: ${country.startOfWeek}</span>
                  <span>Time Zone: ${country.timezones[0]}</span>
                  </div>
                </label>
              </label>
            </td>
    `;
  tbody.append(tr);
};

const nextPage = document
  .getElementById("next-page")
  .addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage === 25) {
      alert("Tor ki mathai shomossa?");
      return;
    }
    paginate(++currentPage); // note: if we use currentPage++ then it may pass currentPage to the function and then it may increase it's value
  });
const prevPage = document
  .getElementById("prev-page")
  .addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage === 1) {
      alert("Paglami koros kn?");
      return;
    }
    paginate(--currentPage);
  });
