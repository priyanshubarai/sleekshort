import React from 'react'
import useUrlStore from '../store/store';

const Button = (props) => {

    const {loading} = useUrlStore();


  return (
    <button
        className="mt-4 ml-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md"
        onClick={props.handler}
        disabled={loading}
    >
          {props.msg}
    </button>
  )
}

export default Button
