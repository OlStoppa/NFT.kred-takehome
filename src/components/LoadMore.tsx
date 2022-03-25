const LoadMore = ({ loadMoreAction }: { loadMoreAction: () => void }) => {
  return (
    <div className="load-more-wrapper">
      <button className="btn btn-light" onClick={loadMoreAction}>Load More</button>
    </div>
  )
}

export default LoadMore;