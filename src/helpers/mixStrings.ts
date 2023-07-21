export default function mixStringsComplex(str1: string, str2: string, pattern: string) {
    if (!pattern || pattern.length === 0) {
      throw new Error("Pattern must be provided and non-empty.");
    }
  
    const mixedString = [];
    let index1 = 0;
    let index2 = 0;
  
    for (const char of pattern) {
      if (char === "1" && index1 < str1.length) {
        mixedString.push(str1.charAt(index1));
        index1++;
      } else if (char === "2" && index2 < str2.length) {
        mixedString.push(str2.charAt(index2));
        index2++;
      }
    }
  
    // Append remaining characters from both strings
    mixedString.push(str1.substring(index1));
    mixedString.push(str2.substring(index2));
  
    return mixedString.join("");
  }
  