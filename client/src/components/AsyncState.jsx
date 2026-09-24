function AsyncState({ loading, error, children }) {
  if (loading) {
    return (
      <p className="text-slate-400">
        Loading...
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-red-400">
        Failed to load data: {error}
      </p>
    )
  }

  return children
}

export default AsyncState