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
    <div class="card card-compact bg-base-100 shadow-xl h-full">
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
// function postsAccess(data) {
//   console.log(data);
//   return data;
// }
loadLatestPosts();
