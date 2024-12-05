const delay = 1000; // Delay in ms

function createArrayElement(value) {
  const div = document.createElement("div");
  div.textContent = value;
  div.classList.add("array-element");
  return div;
}

function displayRow(arrays) {
  const row = document.createElement("div");
  row.classList.add("array-container");

  // For each array in the input (split or merged), add all elements in a single row
  arrays.forEach((arr) => {
    arr.forEach((value) => {
      const element = createArrayElement(value);
      row.appendChild(element);
    });
  });

  // Append the newly created row to the tree-container
  document.getElementById("tree-container").appendChild(row);
}

async function divideAndMerge(arr) {
  if (arr.length === 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Display the current split arrays all in one row
  displayRow([left, right]);
  await new Promise((resolve) => setTimeout(resolve, delay));

  const [sortedLeft, sortedRight] = await Promise.all([
    divideAndMerge(left),
    divideAndMerge(right),
  ]);

  const merged = merge(sortedLeft, sortedRight);

  // Display the merged arrays all in one row
  displayRow([merged]);
  await new Promise((resolve) => setTimeout(resolve, delay));

  return merged;
}

function merge(left, right) {
  let i = 0, j = 0;
  const merged = [];

  // Merge both sorted arrays
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      merged.push(left[i]);
      i++;
    } else {
      merged.push(right[j]);
      j++;
    }
  }

  return [...merged, ...left.slice(i), ...right.slice(j)];
}

async function startMergeSort() {
  const input = document.getElementById("input-array").value;
  if (!input) {
    alert("Please enter numbers separated by commas.");
    return;
  }

  const array = input.split(",").map((x) => parseInt(x.trim(), 10));

  if (array.some(isNaN)) {
    alert("Please ensure all inputs are valid numbers.");
    return;
  }

  document.getElementById("tree-container").innerHTML = "";

  // Display the initial array in one row
  displayRow([array]);
  await new Promise((resolve) => setTimeout(resolve, delay));

  await divideAndMerge(array);
}
