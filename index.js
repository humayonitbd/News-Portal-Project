
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
    // console.log(ctgId);
    const url = `https://openapi.programming-hero.com/api/news/category/${ctgId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data);

}


const displayNewsDetails = (newsBlog) => {
    console.log(newsBlog);

}


loadAllNews();

