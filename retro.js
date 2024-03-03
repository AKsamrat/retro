let allData = '';

const searchBtn = async () => {
  toggleSpinner(true);

  const searchText = document.getElementById('search-text').value;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
  );
  const data = await res.json();
  const postContainer = document.getElementById('post-container');
  postContainer.textContent = '';
  setTimeout(function () {
    displayPost(data.posts);
    toggleSpinner(false);
  }, 2000);
};

const loadAllData = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/posts'
  );
  const data = await res.json();
  displayPost(data.posts);
  allData = data.posts;
};
const displayPost = items => {
  const postContainer = document.getElementById('post-container');
  postContainer.textContent = '';
  items.forEach(item => {
    const activityDisplay = document.getElementById('activity-display');
    const div = document.createElement('div');
    div.innerHTML = `<div  class="bg-[#F3F3F5] p-4 lg:p-7 rounded-2xl col-span-4 hover:scale-105 hover:bg-[#797dfc38]">
    <div class="grid grid-cols-1 lg:grid-cols-6 gap-5 ">
            <!-- pic section== -->
            <div class="size-20 bg-[#F3F3F5] rounded-2xl relative col-span-1">
              <img class="rounded-2xl p-2" src="${item.image}" alt="">
              <div id="activity-display" class=" ${
                item?.isActive ? 'bg-green-600' : 'bg-red-600'
              } size-4 rounded-full  -top-0 -right-0 absolute"> </div>

            </div>
            <!-- info section== -->

            <div class="col-span-5">
              <div class="border-b-2 border-dashed border-slate-200 hover:border-slate-400 pb-4">
                <div class="flex items-center gap-8">
                  <p class="font-normal inter"># <span>${
                    item.category
                  }</span> </p>
                  <p class="font-normal inter">Author: <span>${
                    item.author.name
                  }</span></p>
                </div>
                <h3 class="font-bold text-[20px] py-3 "> ${item.title}</h3>
                <p class="font-normal inter text-wrap">${item.description}</p>
              </div>
              <div class="flex justify-between items-center mt-3">
                <div class="flex justify-center items-center gap-6">
                  <div class="flex justify-center items-center gap-2">
                    <img src="./images/tabler-icon-message-2.png" alt="">
                    <span class="font-normal inter">${item.comment_count}</span>
                  </div>
                  <div class="flex justify-center items-center gap-2">
                    <img src="./images/tabler-icon-eye.png" alt="">
                    <span class="font-normal inter">${item.view_count}</span>
                  </div>
                  <div class="flex justify-center items-center gap-2">
                    <img src="./images/tabler-icon-clock-hour-9.png" alt="">
                   <p><span class="font-normal inter">${
                     item.posted_time
                   } </span>min</p> 
                  </div>
                </div>
                <div class="size-8 rounded-full bg-green-800 flex justify-center items-center text-white hover:bg-green-500">
                 <button onclick="addInfo('${item.title.replace(/'/g, '@')}','${
      item.view_count
    }')" ><i class="fa-solid fa-envelope-open"></i></button> 
                </div>
              </div>


            </div>
          </div>`;
    postContainer.appendChild(div);
  });
};

// latest post section================

const latestPost = async () => {
  const latestPosts = document.getElementById('latest-post-container');
  const res = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
  );
  const data = await res.json();
  data.forEach(post => {
    const div = document.createElement('div');
    div.innerHTML = `<div class="border-2 border-slate-200 rounded-2xl p-5">
            <div class=" w-80 h-48 bg-slate-200 rounded-2xl">
              <img class="rounded-2xl" src="${post.cover_image}" alt="">
            </div>
            <div class="flex justify-start items-center gap-3 py-4 pt-6">
              <img src="./images/Frame (1).png" alt="">
              <p class="text-[#12132D99] text-[16px] ">${
                post.author?.posted_date || 'Unknown'
              }</p>
            </div>
            <h3 class="font-extrabold text-lg">${post.title}</h3>
            <p class="text-[#12132D99] text-[16px] py-3">${post.description}</p>
            <div class="flex justify-start items-center gap-4">
              <div class="size-11 rounded-full">
                <img class="rounded-full" src="${post.profile_image}" alt="">
              </div>
              <div>
                <p class="text-[16px] font-bold">${post.author.name}</p>
                <p class="text-sm font-normal">${
                  post.author?.designation || 'Unknown'
                }</p>
              </div>
            </div>

          </div>`;
    latestPosts.appendChild(div);
  });
};

// info display====

let inCount = 0;
const addInfo = (title, count) => {
  // console.log(title);
  inCount++;
  document.getElementById('info-count').innerText = inCount;

  const div = document.createElement('div');
  const infoContainer = document.getElementById('info-container');
  div.innerHTML = `<div  class="bg-white rounded-xl flex justify-between items-center p-4 gap-4">
  <h3 id="add-title" class="text-[16px] font-semibold">${title.replace(
    '@',
    "'"
  )}</h3>
            <div class="flex justify-center items-center gap-2">
              <img src="./images/tabler-icon-eye.png" alt="">
              <span class="font-normal inter">${count}</span>
            </div>
            </div>
            `;
  infoContainer.appendChild(div);
};

// spinner section=================
const toggleSpinner = isLoading => {
  console.log('got spinner');
  const spinner = document.getElementById('spinner');
  if (isLoading) {
    spinner.classList.remove('hidden');
  } else {
    spinner.classList.add('hidden');
  }
};
latestPost();

loadAllData();
console.log(allData);
