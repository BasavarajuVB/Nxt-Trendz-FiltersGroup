import {IoIosSearch} from 'react-icons/io'

import Category from '../Category'
import Rating from '../Rating'
import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptionsList,
    ratingsListOptions,
    filterOnCategory,
    filterOnRating,
    searchInput,
    onKeyPressed,
    onSearchProduct,
    clearAllFilters,
  } = props

  const onChangeProduct = event => {
    onSearchProduct(event.target.value)
  }

  const getClickedOptionId = id => {
    filterOnCategory(id)
  }

  const getClickedRatingId = id => {
    filterOnRating(id)
  }

  const onKeyClicked = event => {
    onKeyPressed(event.key)
  }

  const clearFilters = () => {
    clearAllFilters()
  }

  return (
    <div className="filters-group-container">
      {/* Replace this element with your code */}

      <div className="input-search-container">
        <input
          type="search"
          className="inputEl"
          placeholder="Search"
          onChange={onChangeProduct}
          value={searchInput}
          onKeyDown={onKeyClicked}
        />
        <IoIosSearch />
      </div>

      <h1 className="catogery-heading">Category</h1>
      <ul className="catogery-list">
        {categoryOptionsList.map(eachCategory => (
          <Category
            categoryItem={eachCategory}
            key={eachCategory.name}
            getClickedId={getClickedOptionId}
          />
        ))}
      </ul>

      <h1 className="rating-heading">Rating</h1>

      <ul>
        {ratingsListOptions.map(eachRating => (
          <Rating
            eachRatingImg={eachRating}
            key={eachRating.ratingId}
            getRatingId={getClickedRatingId}
          />
        ))}
      </ul>

      <button type="button" className="filter-button" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
