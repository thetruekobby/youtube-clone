const ErrorMessage = ({ message }) => {
  return (
    <div className="flex flex-col items-center min-h-[500px] px-11">
      <img src="/img/error.png" alt=" error" className="h-72 object-contain object-center" />
      <div className="text-center font-semibold text-red-600 px-5 py-3 rounded-lg">
        {message || "Something went wrong. Please try again later"}
      </div>
    </div>
  )
}

export default ErrorMessage
