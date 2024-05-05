export const fetchExternalData = async (url,querry) => {
  const apiUrl = `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}${querry ? querry : ''}`
  const getToken =localStorage.getItem('token')
  const token = JSON.parse(getToken)
  try {
    const response = await fetch(apiUrl,{
      headers:{
        apiKey:'24405e01-fbc1-45a5-9f5a-be13afcd757c',
        Authorization:`Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:')
    return null;
  }
};