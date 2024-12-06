const treeContainer = document.getElementById("tree-container");
const addNodeButton = document.getElementById("addNodeButton");
const resetButton = document.getElementById("resetButton");
const nodeValueInput = document.getElementById("nodeValue");

let root = null; // Root of the binary tree
const nodeSize = 50; // Node size in pixels
const horizontalSpacing = 60; // Horizontal spacing
const verticalSpacing = 100; // Vertical spacing

// Node class for the binary tree
class TreeNode {
    constructor(value, x, y) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = x;
        this.y = y;
    }
}

// Add a node to the binary tree
function addNode(value, parent, isLeft) {
    const node = document.createElement("div");
    node.className = "tree-node";
    node.innerText = value;
    node.style.left = `${parent.x + (isLeft ? -horizontalSpacing : horizontalSpacing)}px`;
    node.style.top = `${parent.y + verticalSpacing}px`;

    treeContainer.appendChild(node);

    return node;
}

// Insert a node in the binary tree
function insertNode(root, value, x, y) {
    if (!root) {
        const node = new TreeNode(value, x, y);
        createNodeElement(node);
        return node;
    }

    if (value < root.value) {
        if (!root.left) {
            const newNode = new TreeNode(value, root.x - horizontalSpacing, root.y + verticalSpacing);
            root.left = newNode;
            createNodeElement(newNode);
            drawEdge(root, newNode);
        } else {
            insertNode(root.left, value, root.x - horizontalSpacing, root.y + verticalSpacing);
        }
    } else {
        if (!root.right) {
            const newNode = new TreeNode(value, root.x + horizontalSpacing, root.y + verticalSpacing);
            root.right = newNode;
            createNodeElement(newNode);
            drawEdge(root, newNode);
        } else {
            insertNode(root.right, value, root.x + horizontalSpacing, root.y + verticalSpacing);
        }
    }

    return root;
}

// Create a visual node element
function createNodeElement(node) {
    const element = document.createElement("div");
    element.className = "tree-node";
    element.innerText = node.value;
    element.style.left = `${node.x}px`;
    element.style.top = `${node.y}px`;
    treeContainer.appendChild(element);
}

// Draw an edge between two nodes
function drawEdge(parent, child) {
    const edge = document.createElement("div");
    edge.className = "tree-link";

    const parentX = parent.x + nodeSize / 2;
    const parentY = parent.y + nodeSize / 2;
    const childX = child.x + nodeSize / 2;
    const childY = child.y + nodeSize / 2;

    const deltaX = childX - parentX;
    const deltaY = childY - parentY;
    const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    edge.style.width = `${length}px`;
    edge.style.left = `${parentX}px`;
    edge.style.top = `${parentY}px`;
    edge.style.transform = `rotate(${angle}deg)`;

    treeContainer.appendChild(edge);
}

// Event Listeners
addNodeButton.addEventListener("click", () => {
    const value = parseInt(nodeValueInput.value);
    if (!isNaN(value)) {
        if (!root) {
            root = new TreeNode(value, treeContainer.offsetWidth / 2 - nodeSize / 2, 10);
            createNodeElement(root);
        } else {
            insertNode(root, value, root.x, root.y);
        }
        nodeValueInput.value = "";
    } else {
        alert("Please enter a valid number.");
    }
});

resetButton.addEventListener("click", () => {
    root = null;
    treeContainer.innerHTML = "";
});
