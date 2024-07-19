export class Games {
  #options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "3afaaf2c07mshc91cca8ddcf7080p138a7cjsn5d3fc1ce2f57",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  #shortenDescription(description) {
    return description
      .split(" ")
      .splice(0, Math.min(description.length, 10))
      .join(" ");
  }

  async getByCategory(category) {
    const response = await fetch(
      this.baseUrl + "games" + "?category=" + category,
      this.#options
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  constructCards(data) {
    return data
      .map(
        (iterator) => `
        <div class="col-md-6 col-lg-4 col-xl-3" onclick=clickable("${
          iterator.id
        }") data-bs-toggle="modal"
      data-bs-target="#game-modal">
          <div class="card">
            <div>
              <img
                src="${iterator.thumbnail}"
                class="card-img-top rounded-top-3"
                alt="${iterator.title} game"
              />
            </div>
            <div class="card-body">
              <div class="card-title">
                <h3>${iterator.title}</h3>
                <span class="badge text-bg-primary p-2">Free</span>
              </div>
              <p class="card-text">
               ${this.#shortenDescription(iterator.short_description)}
              </p>
            </div>
            <div class="card-footer">
              <div>
                <p>${iterator.genre}</p>
                <p>${iterator.platform}</p>
              </div>
            </div>
          </div>
        </div>`
      )
      .join("");
  }

  async getGameInfo(id) {
    const response = await fetch(
      this.baseUrl + "game" + "?id=" + id,
      this.#options
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  constructDetails(data) {
    console.log("sss");
    $("#image").attr("src", data.thumbnail);
    $("#image").attr("alt", data.title + "game");
    $("#game-name").html(`Title: ${data.title}`);
    $("#category").html(
      `Category: <span class="badge text-bg-info"> ${data.genre}</span>`
    );
    $("#platform").html(
      `platform: <span class="badge text-bg-info">${data.platform}</span>`
    );
    $("#status").html(
      `status: <span class="badge text-bg-info"> ${data.status}</span>`
    );
    $("#description").html(`status: ${data.description}`);
    $("#game-link").attr("href", data.game_url);
  }
}
