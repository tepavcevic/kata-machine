export default function bs_list(haystack: number[], needle: number): boolean {
    let lo: number = 0;
    let hi: number = haystack.length;
    do {
        let mid: number = Math.floor(lo + (hi - lo) / 2);
        if (haystack[mid] === needle) {
            return true;
        } else if (haystack[mid] < needle) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    } while (lo < hi);

    return false;
}
