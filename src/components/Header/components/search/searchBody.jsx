import { truncateText } from "@/src/function/function"

export const SearchBody = ({ data }) => {
  return <div onClick={() => window.location = `/Single/${data.id}/${data.name}`}>
    <div className='SearchResultDiv'>
      <div className='SearchResultDivInfo'>
        <p>{truncateText(data.name, 10)}</p>
        <p className='SearchResultDivInfoMount'>{data.dates[0].start_date.slice(0, 10)}</p>
      </div>
      <div className='SearchResultDivInfoPrice'>
        <p>{data?.price}-{data.price} AMD</p>
      </div>
    </div>
    <div className='SearchResultDivLine' />
  </div>
}