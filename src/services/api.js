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
    const response = await api.get(`/member/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar membro: ' + error.message);
  }
};

export const updateMember = async (id, data) => {
  try {
    const response = await api.put(`/member/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar membro: ' + error.message);
  }
};
