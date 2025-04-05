

export const Trascription = {
  toTranscription(str: string): string {
    const translitMap: { [key: string]: string } = {
        а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
        з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
        п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
        ч: 'ch', ш: 'sh', щ: 'shch', ы: 'y', э: 'e', ю: 'yu', я: 'ya',
        ' ': ' ', '.': '.', ',': '', '!': '!', '?': '?', '-': '-',
        "'": "'", '"': '"', '/': '/',
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
        '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
        '(': '(', ')': ')'
  };
    
  return str
    .toLowerCase()
    .split('')
    .map(char => /[a-zA-Z]/.test(char) ? char : (translitMap[char] || ''))
    .join('');
  }
}