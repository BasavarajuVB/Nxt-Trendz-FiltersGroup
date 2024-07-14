import './index.css'

const Rating = props => {
  const {eachRatingImg, getRatingId} = props
  const {imageUrl, ratingId} = eachRatingImg
  const filterOnRating = () => {
    getRatingId(ratingId)
  }

  return (
    <li className="list-rating">
      <button type="button" className="button" onClick={filterOnRating}>
        <img src={imageUrl} className="rating-img" alt={`rating ${ratingId}`} />
      </button>
      <p>&up</p>
    </li>
  )
}
export default Rating
