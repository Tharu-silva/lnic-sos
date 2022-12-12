exports.fetchData = async (url,verb) => {
  try {
    const response = await fetch(url, {method: verb})
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

