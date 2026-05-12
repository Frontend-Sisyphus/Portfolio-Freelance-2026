export const getIntlArray = (array: string) => {
  if (!array || array === 'undefined' || array === 'null') {
    return [];
  }
  
  if (array.trim() === '') {
    return [];
  }
  
  try {
    const parsed = JSON.parse(array);
    
    if (Array.isArray(parsed)) {
      return parsed;
    }
    
    if (typeof parsed === 'object' && parsed !== null) {
      console.warn('getIntlArray получил объект вместо массива:', parsed);
      return [parsed];
    }
    
    return [];
  } catch (error: any) {
    console.error('Ошибка парсинга JSON:', {
      error: error.message,
      input: array.substring(0, 100)
    });
    return [];
  }
};