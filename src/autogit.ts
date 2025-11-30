class AVLNode {
    value: number;
    left: AVLNode | null;
    right: AVLNode | null;
    height: number;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    private root: AVLNode | null;

    constructor() {
        this.root = null;
    }

    // Get height of a node (helper function)
    private getHeight(node: AVLNode | null): number {
        return node ? node.height : 0;
    }

    // Update node height based on children's heights
    private updateHeight(node: AVLNode): void {
        node.height = 1 + Math.max(
            this.getHeight(node.left),
            this.getHeight(node.right)
        );
    }

    // Get balance factor (difference between left and right subtree heights)
    private getBalance(node: AVLNode): number {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }


