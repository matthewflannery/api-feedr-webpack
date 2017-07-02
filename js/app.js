import main, { add, subtract } from './math'

// console.log(add(1, 2))
// console.log(subtract(2, 1))
// main()

const app = document.querySelector('#app')


// Model - State
const state = {
  source: '',
  articles: [
    {
      image: '',
      title: '',
      theme: '',
      impressions: '',
      summary: '',
      link: '',
    }
  ]
}

// Fetch wrapper using a proxy to fix CORS issue
function fetchUrl(url) {
  return fetch(`https://accesscontrolalloworiginall.herokuapp.com/${url}`)
}

// Returns Reddit articles
function fetchTopRedditArticles() {
  return fetchUrl('https://www.reddit.com/r/netsec/top.json')
  .then(res => res.json())
  // Use destructuring here to avoid writing awful crap like data.data.children, hellz yeah JS.
  .then(({data}) => {
    return data.children.map(({ data }) => {
      // JS GODMODE ENABLED
      const { thumbnail, title, subreddit, ups, url } = data;
      return {
        image: thumbnail,
        title: title,
        theme: subreddit,
        impressions: ups,
        summary: 'o',
        link: url
      }
    })
  })
}

// Returns Digg articles
function fetchDiggArticles() {
  return fetchUrl('http://digg.com/api/news/popular.json')
  .then(res => res.json())
  .then(({data}) => {
    return data.feed.map(article => {
      return {
        date:article.date_published,
        image: article.content.media.images[0].original_url,
        title: article.content.title,
        theme: article.content_type,
        impressions: article.fb_shares.count,
        summary: article.content.description,
        link: article.content.original_url
      }
    })
  })
}

// Returns Mashable articles
function fetchMashableArticles() {
  return fetchUrl('http://migbylab.com/feed.json')
  .then(res => res.json())
  .then(data => {
    return data.new.map(article => {
      return {
        image: article.feature_image,
        title: article.display_title,
        theme: article.channel,
        impressions: article.formatted_shares,
        summary: article.excerpt,
        link: article.short_url
      }
    })
  })
}

function fetchArticles(source) {
  if (source === 'mashable') {
    return fetchMashableArticles()
  }
  if (source == 'reddit') {
    return fetchTopRedditArticles()
  }
  if (source == 'digg') {
    return fetchDiggArticles()
  }
}

function renderArticles(articles) {
  return articles.map(article => `
    <article class="article">
      <section class="featuredImage">
        <img src="${article.image}" alt="" />
      </section>
      <section class="articleContent">
          <a href="${article.link}"><h3>${article.title}</h3></a>
          <h6>${article.theme}</h6>
      </section>
      <section class="impressions">
        ${article.impressions}
      </section>
      <div class="clearfix"></div>
    </article>
  `)
}

// View
function render(container, data) {
  container.innerHTML = `
  <header>
    <section class="container">
      <a href="#"><h1>Feedr</h1></a>
      <nav>
        <ul>
          <li><a href="#">News Source: <span>${data.source}</span></a>
            <ul>
                <li><a id = "mashable" href="#">mashable</a></li>
                <li><a id = "reddit" href="#">reddit</a></li>
                <li><a id = "digg" href="#">digg</a></li>
            </ul>
          </li>
        </ul>
        <section id="search">
          <input type="text" name="name" value="">
          <a href="#"><img src="images/search.png" alt="" /></a>
        </section>
      </nav>
      <div class="clearfix"></div>
    </section>
  </header>
  <div id="popUp" class="loader hidden">
    <a href="#" class="closePopUp">X</a>
    <div class="container">
      <h1>Article title here</h1>
      <p>
        Article description/content here.
      </p>
      <a href="#" class="popUpAction" target="_blank">Read more from source</a>
    </div>
  </div>
  <section id="main" class="container">
    ${renderArticles(data.articles)}
  </section>
  `
}


// Render initial view
render(app, state)

// Controllers - listener to event, update state, and render view
// A closure that can be used by delegate in place of the event callback, could also be done another way (below, commented)
function handleDropDown(source) {
  return (event) => {
    state.source = source
    console.log('State updated to: ', state.source)
    fetchArticles(state.source)
    .then(articles => state.articles = articles)
    .then(() => render(app, state))
    .catch(err => {
     // Insert error handling here
     console.log('There was an error:', err)
     // Render the error
     render(app, state)
    })
  }
}

/* delegate('body', 'click', '#mashable', event => {
   handleDropDown('mashable')
 }) */

delegate('body', 'click', '#mashable', handleDropDown('mashable'))
delegate('body', 'click', '#reddit', handleDropDown('reddit'))
delegate('body', 'click', '#digg', handleDropDown('digg'))
