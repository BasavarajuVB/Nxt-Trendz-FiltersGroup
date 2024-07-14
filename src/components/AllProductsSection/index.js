import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const statusConstantsValues = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    categoryId: '',
    ratingId: '',
    searchInput: '',
    activeStatusValue: statusConstantsValues.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      activeStatusValue: statusConstantsValues.loading,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {activeOptionId, categoryId, ratingId, searchInput} = this.state

    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categoryId}&rating=${ratingId}&title_search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok === true) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.products.map(product => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }))

        this.setState({
          productsList: updatedData,
          activeStatusValue: statusConstantsValues.success,
        })
      } else {
        this.setState({activeStatusValue: statusConstantsValues.failure})
      }
    } catch (error) {
      this.setState({activeStatusValue: statusConstantsValues.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  filterOnCategory = categoryId => {
    this.setState({categoryId}, this.getProducts)
  }

  filterOnRating = ratingId => {
    this.setState({ratingId}, this.getProducts)
  }

  onSearchProduct = searchText => {
    const {productsList} = this.state
    const filteredProductList = productsList.filter(eachProduct =>
      eachProduct.title.toLowerCase().includes(searchText.toLowerCase()),
    )

    this.setState({productsList: filteredProductList, searchInput: searchText})
  }

  onKeyPressed = value => {
    if (value === 'Enter') {
      this.getProducts()
    }
  }

  clearAllFilters = () => {
    this.setState(
      {searchInput: '', categoryId: '', ratingId: ''},
      this.getProducts,
    )
  }

  renderNoProductView = () => (
    <div className="no-products-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="no products"
        className="no-products-error-img"
      />
      <h1 className="no-products-heading">No Products Found</h1>
      <p className="description">
        We could not find any products. Try other filters.
      </p>
    </div>
  )

  renderProductsView = () => {
    const {productsList} = this.state
    return (
      <ul className="products-list">
        {productsList.map(product => (
          <ProductCard productData={product} key={product.id} />
        ))}
      </ul>
    )
  }

  renderProductsFailure = () => (
    <div className="no-products-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="failure-image"
      />
      <h1 className="no-products-heading">Oops! Something Went Wrong</h1>
      <p className="description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderProductsList = () => {
    const {activeOptionId, productsList} = this.state

    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        {productsList.length === 0
          ? this.renderNoProductView()
          : this.renderProductsView()}
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderContent = () => {
    const {activeStatusValue} = this.state

    switch (activeStatusValue) {
      case statusConstantsValues.success:
        return this.renderProductsList()
      case statusConstantsValues.failure:
        return this.renderProductsFailure()
      case statusConstantsValues.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
          categoryOptionsList={categoryOptions}
          ratingsListOptions={ratingsList}
          filterOnCategory={this.filterOnCategory}
          filterOnRating={this.filterOnRating}
          searchInput={searchInput}
          onKeyPressed={this.onKeyPressed}
          onSearchProduct={this.onSearchProduct}
          clearAllFilters={this.clearAllFilters}
        />

        {this.renderContent()}
      </div>
    )
  }
}

export default AllProductsSection
