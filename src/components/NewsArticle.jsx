export default function NewsArticle(props) {
  return (
    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex '>

      <div className="card w-100 d-flex flex-column">

        <img
          src={props.pic ? props.pic : "/Images/images.png"}
          onError={(e) => {
            e.target.src = "/Images/images.png"
          }}
          className="card-img-top"
          alt="news"
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title">{props.title}</h5>

          <div className="card-source">
            <p>{props.source}</p>
            <p>{props.date ? new Date(props.date).toLocaleDateString() : "No Date"}</p>
          </div>

          <p className="card-text">{props.description}</p>

          {/* 🔥 BUTTON ALWAYS BOTTOM */}
          <a
            href={props.url}
            target='_blank'
            rel="noreferrer"
            className="btn btn-primary mt-auto"
          >
            Read Full Article
          </a>

        </div>
      </div>

    </div>
  )
}