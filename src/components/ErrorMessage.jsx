
const ErrorMessage = () => {
  return (
    <div className="flex flex-col items-center min-h-[500px] px-11">
      <img src="/gif/error.gif" alt=" errorgif" className="h-72" />
      <div className="border border-red-600 bg-red-50 font-semibold text-red-600 px-5 py-3 rounded-lg">
        Something went wrong. Please try again later
      </div>
    </div>
  )
}

export default ErrorMessage