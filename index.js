
const loadAllNews = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch(err){
        console.log(err);

    }
    

}


const displayCategory = (newsAll) => {
    // console.log(newsAll);
    const allCategorySec = document.getElementById('allCategorySec');
    newsAll.forEach(news => {
        // console.log(news);
        const li = document.createElement('li');
        li.classList.add(('list-unstyled'));
        li.innerHTML = `
            <a onclick="loadNewsDetails('${news.category_id}')">${news.category_name}</a>
        `;
        allCategorySec.appendChild(li); 
    });
}
const loadNewsDetails = async(ctgId) => {
    spinnerLoad(true);
    // console.log(ctgId);
    const url = `https://openapi.programming-hero.com/api/news/category/${ctgId}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data);
    }
    catch(err){
        console.log(err)
    }
    
}


const displayNewsDetails = (newsBlog) => {
    // console.log(newsBlog);
    newsBlog.sort((a, b) => {
        return b.total_view - a.total_view
    })
    const newsLength = newsBlog.length;
        const arrayIteem = document.getElementById('itemNumber');
        arrayIteem.innerText = newsLength;
        const blogNewsContainer = document.getElementById('blog-container');
        blogNewsContainer.innerHTML = '';
        newsBlog.forEach(blog => {
            // console.log(blog);
        const div = document.createElement('div');
        div.innerHTML = `
        <div onclick="dataLoadPopop('${blog._id}')" class="card mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${blog.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${blog.title}</h5>
              <p class="card-text">${blog.details.slice(0, 200)}...</p>
              <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex">
                <img src="${blog.author.img}" class="img-fluid imgsize rounded-5 me-2" alt="athor">
                <div>
                    <h5 class="p-0 m-0">${blog.author.name ? blog.author.name : 'Not name'}</h5>
                    <span>${blog.author.published_date ? blog.author.published_date.slice(0, 10) : 'No date'}</span>
                </div>
            </div>
            <div class="viewAll">
                <span>View ${blog.total_view ? blog.total_view : '0'}</span>
            </div>
            <button class="btn btn-primary">Details</button>
          </div>
            </div>
          </div>
        </div>
      </div>
        `;
        blogNewsContainer.appendChild(div);
        
    });
    spinnerLoad(false);
    
    
}
// displayNewsDetails()

const dataLoadPopop = async(newsId) =>{
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        dataDetailsPopop(data.data);
    }
    catch(err){
        console.log(err);
    }
    

}

const dataDetailsPopop = (details) => {
    // console.log(details);
    details.forEach(data => {
        // console.log(data)
        const header = document.getElementById('exampleModalLabel');
        header.innerText = data.title;

        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
        <img src="${data.thumbnail_url}" class="img-fluid w-100" alt="athor">
        <p>${data.details.slice(0, 300)}...</p>
        <div class="d-flex">
                <img src="${data.author.img}" class="img-fluid imgsize rounded-5 me-2" alt="athor">
                <div>
                    <h5 class="p-0 m-0">${data.author.name ? data.author.name : 'Not name'}</h5>
                    <span>${data.author.published_date ? data.author.published_date.slice(0, 10) : 'No date'}</span>
                </div>
            </div>
            <div>
                <p class="my-2">Rating: ${data.rating.number}, Bagse: ${data.rating.badge}</p>
                <p class="my-2">Total-view: ${data.total_view ? data.total_view : 'not view'}</p>
                </div>
        `;
        
    });

}

const spinnerLoad = (spinnerId) => {
    const spinnerIdSec = document.getElementById('spinner-container');
    if(spinnerId){
        spinnerIdSec.classList.remove('d-none');
    }else{
        spinnerIdSec.classList.add('d-none');
    }
}



loadAllNews();

