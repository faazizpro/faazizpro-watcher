const loadData = async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories/`);
    const data = await res.json();
    const allData = data.data;
    displayCategory(allData);
};


const displayCategory = (categories) =>{
    const categoryContainer = document.getElementById('video-category');
    categories.forEach(category =>{
        // console.log(category.category_id);
        const categoryDiv = document.createElement('div');
        const btn = document.createElement('button');
        btn.onclick = () =>{
            loadVideos(category.category_id);
        };
        btn.classList = 'px-10 bg-gray-300 py-2 rounded-md text-base font-medium focus:bg-red-500 focus:text-white'
        btn.innerText = category.category;
        categoryDiv.appendChild(btn);
        categoryContainer.appendChild(categoryDiv)
    })
};


const loadVideos = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const allVideos = data.data;
    // console.log(allVideos);
    displayVideos(allVideos)
};

const displayVideos = (videos) =>{
    const totalVideos = videos.length;
    const videoContainer = document.getElementById('all-videos');
    videoContainer.innerHTML = '';
    if(videos.length < 1){
        const errDiv = document.createElement('div');
        errDiv.classList = 'flex flex-col items-center'
        errDiv.innerHTML = `
            <img src="../images/err.png" alt="" srcset="" />
            <p class="text-2xl font-bold leading-10 md:w-[350px] mt-8 text-center mx-auto">Oops!! Sorry, There is no content here</p>
        `;
        videoContainer.classList.remove('grid');

        videoContainer.appendChild(errDiv);
    }
    else{
        videoContainer.classList.add('grid');

    }
    videos.forEach(video =>{
        // console.log(video);
        const vDiv = document.createElement('div');
        vDiv.classList = 'card w-full bg-base-100 shadow-xl';
        vDiv.innerHTML =   `
            <figure><img src="${video.thumbnail}" class="h-[190px] w-full" alt="Shoes" /></figure>
            <div class="card-body">
                <div class="flex gap-3">
                    <img src="${video.authors[0].profile_picture}" class="w-10 h-10 rounded-full" alt="" srcset="" />
                    <div>
                        <h2 class="text-xl font-bold leading-8 mb-3">${video.title}</h2>
                        <div class="">
                            <p class="text-sm text-gray-500 mb-3 flex gap-3">${video.authors[0].profile_name} 
                            ${video.authors[0].verified ? `<img src="../images/tik.svg" alt="" srcset="" />` : ''}
                        </div>
                        <p class="text-sm text-gray-500">${video.others.views} views</p>
                    </div>
                </div>
            </div>
        `;
        videoContainer.appendChild(vDiv);
    })
}


loadVideos('1000');
loadData();