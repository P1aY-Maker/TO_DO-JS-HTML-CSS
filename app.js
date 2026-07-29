const array1 = [1, 2, 3]
const array2 = [4, 5, 6]

localStorage.setItem("arrayNo1", JSON.stringify(array1))
localStorage.setItem("arrayNo2", JSON.stringify(array2))

const local1 = JSON.parse(localStorage.getItem("arrayNo1"))

console.log(typeof local1)

// localStorage.removeItem("arrayNo2")
localStorage.clear()
