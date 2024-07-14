import './index.css'

const Category = props => {
  const {categoryItem, getClickedId} = props
  const {name, categoryId} = categoryItem
  const getCategoryItems = () => {
    getClickedId(categoryId)
  }

  return (
    <li>
      <button className="button" type="button" onClick={getCategoryItems}>
        <p>{name}</p>
      </button>
    </li>
  )
}
export default Category
