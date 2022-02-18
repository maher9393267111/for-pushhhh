import React from 'react'
import PropTypes from 'prop-types'

const LocalSearch = ({keyword,handleSearchChange,setKeyword}) => {
  return (
    <div className='container mt-5'>

<input
            type="search"
            placeholder="Filter"
            value={keyword}
             onChange={handleSearchChange}
            className="form-control mb-4"
          />



    </div>
  )
}



export default LocalSearch