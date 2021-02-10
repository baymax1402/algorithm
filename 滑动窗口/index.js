/** 在整数数组 nums 中，是否存在两个下标 i 和 j，使得 nums [i] 和 nums [j] 的差的绝对值小于等于 t ，且满足 i 和 j 的差的绝对值也小于等于 ķ 。

如果存在则返回 true，不存在返回 false。

 

示例 1:

输入: nums = [1,2,3,1], k = 3, t = 0
输出: true
示例 2:

输入: nums = [1,0,1,1], k = 1, t = 2
输出: true
示例 3:

输入: nums = [1,5,9,1,5,9], k = 2, t = 3
输出: false


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/contains-duplicate-iii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * 算法
 思路

受 桶排序 的启发，我们可以把 桶 当做窗口来实现一个线性复杂度的解法。

算法

桶排序是一种把元素分散到不同桶中的排序算法。接着把每个桶再独立地用不同的排序算法进行排序。桶排序的概览如下所示：

在上面的例子中，我们有 8 个未排序的整数。我们首先来创建五个桶，这五个桶分别包含 [0,9], [10,19], [20, 29], [30, 39], [40, 49][0,9],[10,19],[20,29],[30,39],[40,49] 这几个区间。这 8 个元素中的任何一个元素都在一个桶里面。对于值为 xx 的元素来说，它所属桶的标签为 x/wx/w，在这里我们让 w = 10w=10。对于每个桶我们单独用其他排序算法进行排序，最后按照桶的顺序收集所有的元素就可以得到一个有序的数组了。

回到这个问题，我们尝试去解决的最大的问题在于：

对于给定的元素 xx, 在窗口中是否有存在区间 [x-t, x+t][x−t,x+t] 内的元素？
我们能在常量时间内完成以上判断嘛？
我们不妨把把每个元素当做一个人的生日来考虑一下吧。假设你是班上新来的一位学生，你的生日在 三月 的某一天，你想知道班上是否有人生日跟你生日在 t=30t=30 天以内。在这里我们先假设每个月都是3030天，很明显，我们只需要检查所有生日在 二月，三月，四月 的同学就可以了。

之所以能这么做的原因在于，我们知道每个人的生日都属于一个桶，我们把这个桶称作月份！每个桶所包含的区间范围都是 tt，这能极大的简化我们的问题。很显然，任何不在同一个桶或相邻桶的两个元素之间的距离一定是大于 tt 的。

我们把上面提到的桶的思想应用到这个问题里面来，我们设计一些桶，让他们分别包含区间 ..., [0,t], [t+1, 2t+1], ......,[0,t],[t+1,2t+1],...。我们把桶来当做窗口，于是每次我们只需要检查 xx 所属的那个桶和相邻桶中的元素就可以了。终于，我们可以在常量时间解决在窗口中搜索的问题了。

还有一件值得注意的事，这个问题和桶排序的不同之处在于每次我们的桶里只需要包含最多一个元素就可以了，因为如果任意一个桶中包含了两个元素，那么这也就是意味着这两个元素是 足够接近的 了，这时候我们就直接得到答案了。因此，我们只需使用一个标签为桶序号的散列表就可以了。
 */

const containsNearbyAlmostDuplicate = function(nums, k, t) {
    if (k < 0 || t < 0) return false;

    const getKey = (value) => {
        return Math.floor(value / (t + 1))
    }

    const map = new Map()
    let l = 0
    while (l < nums.length) {
        const key = getKey(nums[l])

        if (map.has(key)) {
            return true
        } else if (map.has(key + 1) || map.has(key - 1)) {
            if ((map.get(key + 1) - nums[l] <= t) || (nums[l] - map.get(key + 1) <= t)) {
                return true
            }
        }

        map.set(key, nums[l])

        if (l >= k) {
            map.delete(getKey(nums[l - k]))
        }
        l ++
    }
    return false
}

console.log(containsNearbyAlmostDuplicate([1, 2, 3, 1], 3, 0))