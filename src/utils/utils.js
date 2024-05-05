export const  transformText =(text) => {
    const words = text.split('_');
    const transformedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    const transformedText = transformedWords.join(' ');
    return transformedText;
  }

 export function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    });
    return formatter.format(angka);
  }
  
  // Contoh penggunaan
  const nilai = 1000000;
  console.log(formatRupiah(nilai)); // Output: Rp 1.000.000,00
  