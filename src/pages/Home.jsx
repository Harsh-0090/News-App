import React, { useEffect, useState } from 'react'
import NewsArticle from '../components/NewsArticle'
import { useSearchParams } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";

const apiKey = import.meta.env.VITE_API_KEY


export default function Home() {
  let [page, setPage] = useState(1)
  const [articles, setArticles] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [searchParams] = useSearchParams()
  const [language, setLanguage] = useState("")
  const [q, setQ] = useState("")
  



  async function getApiData(q, language) {
    let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&page=1&pageSize=24&language=${language}&from=2026-03-08&sortBy=publishedAt&apiKey=84f064990f1a4d78acb24862c73d90fd`)
    response = await response.json();
    if (response.status === "ok") {
      setArticles(response.articles)
      setTotalResults(response.totalResults)
    }
  }

  async function fetchData() {
    setPage(page + 1)
    let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&page=${page}&pageSize=24&language=${language}&from=2026-03-08&sortBy=publishedAt&apiKey=84f064990f1a4d78acb24862c73d90fd`)
    response = await response.json();
    if (response.status === "ok") {
      setArticles(prev => prev.concat(response.articles))
    }

  }

  useEffect(() => {
    let q = searchParams.get("q") ?? "All"
    let language = searchParams.get("language") ?? "hi"
    setQ(q)
    setLanguage(language)
    getApiData(q, language)
  }, [searchParams])

  return (
    <>
      <div className='container-fluid'>

        <h5 className='bg-secondary text-center text-light p-3 mt-5 text-capitalize'>{q} Articles</h5>

        
        <InfiniteScroll
          dataLength={articles.length} // important
          next={fetchData}
          hasMore={articles.length < totalResults}
          loader={<div className='text-center my-5'>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}
        >
          <div className='row'>

            {articles.map((item, index) => {
              return <NewsArticle
                key={index}
                source={item.source?.name}
                title={item.title}
                description={item.description}
                url={item.url}
                pic={item.urlToImage}
                date={item.publishedAt}
              />
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}