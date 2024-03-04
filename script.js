// Let's discuss section scripts
const loadDiscussSection = async (searchText = "") => {
  setTimeout(async () => {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
    );
    const { posts } = await response.json();
    const discussContainer = document.getElementById("discuss-cards-container");
    discussContainer.textContent = "";
    posts.forEach((post) => {
      let isActive = "";
      if (post.isActive) {
        isActive = `<div
      id="is-active"
      class="h-4 w-4 bg-[#10B981] border-2 border-white absolute rounded-full -right-1 -top-1"
    ></div>`;
      } else {
        isActive = `<div
      id="is-active"
      class="h-4 w-4 bg-[#FF3434] border-2 border-white absolute rounded-full -right-1 -top-1"
    ></div>`;
      }
      const div = document.createElement("div");

      div.innerHTML = `
    <div class="card card-side bg-[#F3F3F5]"
          >
            <div class="mt-8 ml-4 lg:ml-8 relative">
              <img
                class="lg:h-16 lg:w-auto w-24 rounded-xl"
                src="${post.image}"
                alt="Movie"
              />
              ${isActive}
            </div>
            <div class="card-body inter">
              <div class="lg:flex items-center gap-3 text-sm">
                <h5># ${post.category}</h5>
                <h5>Author : ${post.author.name}</h5>
              </div>
              <h2 class="text-xl font-bold">${post.title}</h2>
              <p class="text-gray-500">
                ${post.description}
              </p>
              <hr class="border-dashed border" />
              <div class="lg:flex items-center justify-between">
                <div class="flex gap-5">
                  <div class="flex items-center gap-2">
                    <img src="./images/comment.png" alt="" />
                    <h5 class="text-gray-500">${post.comment_count}</h5>
                  </div>
                  <div class="flex items-center gap-2">
                    <img src="./images/tabler-icon-eye.png" alt="" />
                    <h5 class="text-gray-500">${post.view_count}</h5>
                  </div>
                  <div class="flex items-center gap-2">
                    <img src="./images/tabler-icon-clock-hour-9.png" alt="" />
                    <h5 class="text-gray-500">${post.posted_time} min</h5>
                  </div>
                </div>
                <div class="flex justify-end items-center">
                  <button class="btn read-btn rounded-full p-0 min-h-0 h-[30px]">
                    <img src="./images/email-1.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>`;

      discussContainer.appendChild(div);
    });

    const button = document.querySelectorAll(".read-btn");
    let count = 0;
    button.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        count++;
        document.getElementById("counter").innerText = count;
        const title =
          btn.parentNode.parentNode.parentNode.childNodes[3].innerText;

        const comments =
          btn.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[3]
            .innerText;
        const readContainer = document.getElementById("read-container");
        const div = document.createElement("div");
        div.innerHTML = `
      <div class="flex bg-white rounded-2xl p-4 gap-4">
              <h3 class="font-semibold">
                ${title}
              </h3>
              <div class="flex items-center mr-4">
                <img src="./images/tabler-icon-eye.png" alt="" />
                <h5>${comments}</h5>
              </div>
            </div>`;
        readContainer.appendChild(div);
      });
    });

    toggleLoader(false);
  }, 2000);
};
// handle search
const handleSearch = () => {
  toggleLoader(true);
  const input = document.getElementById("search-field").value;
  loadDiscussSection(input);

  console.log(input);
};
// loader function
const toggleLoader = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  let container = document.getElementById("discuss-cards-container");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
    container.innerHTML = "";
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

loadDiscussSection();
// Latest post section scripts
const loadLatestPosts = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await response.json();
  const latestPostsContainer = document.getElementById(
    "latest-posts-container"
  );
  data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card card-compact bg-base-100 border-[#12132D26] border h-full">
            <figure>
              <img
                class="p-4 rounded-3xl"
                src="${element.cover_image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
            <h4 class="flex items-center gap-2"><img src="./images/date.png" alt="">${
              element.author.posted_date || "No publish date"
            }</h4>
              <h2 class="card-title">${element.title}</h2>
              <p>${element.description}</p>
    <div class="flex items-center gap-3 ">
      <img class='max-h-11 rounded-full' src="${
        element.profile_image
      }" alt="" />
      <div>
        <h2 class="font-bold text-lg">${element.author.name}</h2>
        <h3>${element.author.designation || "Unknown"}</h3>
      </div>
    </div>
            </div>
          </div>
    `;
    latestPostsContainer.appendChild(div);
  });
  return data;
};
loadLatestPosts();
