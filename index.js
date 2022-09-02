
const loadAllNews = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}


const displayCategory = (newsAll) => {
    // console.log(newsAll);
    const allCategorySec = document.getElementById('allCategorySec');
    newsAll.forEach(news => {
        console.log(news);
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
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data);
    
}


const displayNewsDetails = (newsBlog) => {
    console.log(newsBlog);
    const newsLength = newsBlog.length;
    //     console.log(newsLength);
    const arrayIteem = document.getElementById('itemNumber');
    arrayIteem.innerText = newsLength;
    const blogNewsContainer = document.getElementById('blog-container');
    blogNewsContainer.innerHTML = '';
    newsBlog.forEach(blog => {
        console.log(blog);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card mb-3">
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
                    <span>${blog.author.published_date ? blog.author.published_date : 'No date'}</span>
                </div>
            </div>
            <div class="viewAll">
                <span>View ${blog.total_view ? blog.total_view : '0'}</span>
            </div>
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
// loadNewsDetails('3')
// displayNewsDetails('2')

const spinnerLoad = (spinnerId) => {
    const spinnerIdSec = document.getElementById('spinner-container');
    if(spinnerId){
        spinnerIdSec.classList.remove('d-none');
    }else{
        spinnerIdSec.classList.add('d-none');
    }
}




loadAllNews();

