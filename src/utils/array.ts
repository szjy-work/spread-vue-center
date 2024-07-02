/**
 * 
 * @// 示例用法
    const A = ['a', 'b', 'c', 'd', 'e'];
    const B = ['b', 'd'];
    const result = removeSubArrayElements(A, B);
    console.log(result); // 输出: ['a', 'c', 'e']
 */
export function removeSubArrayElements(A: string[], B: string[]): string[] {
    // 使用 Set 来存储 B 数组的元素，以便快速查找
    const bSet = new Set(B);

    // 过滤 A 数组，只保留不在 B 数组中的元素
    return A.filter(item => !bSet.has(item));
}