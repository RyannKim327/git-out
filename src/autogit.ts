function lengthOfLIS(nums: number[]): number {
    const n = nums.length;
    const dp = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4
function lengthOfLIS(nums: number[]): number {
    const sub: number[] = [];

    for (let num of nums) {
        let left = 0;
        let right = sub.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (sub[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        sub[left] = num;
    }

    return sub.length;
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4
