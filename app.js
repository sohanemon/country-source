fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => data.map((e) => setCountry(e)));

const tbody = document.getElementById("tbody");
const setCountry = (country) => {
  let currency;
  try {
    currency = Object.entries(country.currencies)[0][1];
  } catch (e) {
    // console.log(e);
  }
  const tr = document.createElement("tr");
  tr.className = "bg-white border-b dark:bg-slate-800 dark:border-slate-700";
  tr.innerHTML = `
            <th
              scope="row"
              class="py-4 px-6 font-medium text-slate-900 whitespace-nowrap dark:text-white"
            >
              ${country.name.common}
            </th>
            <td class="py-4 px-6"><img class='w-16' src="${
              country.flags.svg
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
                class="font-medium text-fuchsia-600 dark:text-fuchsia-500 hover:underline"
                >More</a
              >
            </td>
    `;
  tbody.append(tr);
};
