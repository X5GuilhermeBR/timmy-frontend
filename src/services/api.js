import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const fetchMembers = async () => {
  try {
    const response = await api.get('/members');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar membros: ' + error.message);
  }
};

export const fetchMemberById = async (id) => {
  try {
    const response = await api.get(`/members/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar membro: ' + error.message);
  }
};
