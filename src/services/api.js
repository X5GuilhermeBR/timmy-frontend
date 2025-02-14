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

export const createMember = async (data) => {
  try {
    const response = await api.post('/member', data);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar membro: ' + error.message);
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

export const updateMemberStatus = async (id, isActive) => {
  try {
    const response = await api.patch(`/member/${id}`, { isActive });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar status do membro: ' + error.message);
  }
};

export const getCepData = async (cep) => {
    try {
        const response = await api.get(`https://opencep.com/v1/${cep}`);
        return response.data;
    } catch {
        throw new Error('Erro ao buscar cep: ' + error.message);
    }
}

export const createAddress = async (data) => {
  try {
      const response = await api.post(`/address`, data);
      return response.data;
  } catch {
      throw new Error('Erro ao criar endereço: ' + error.message);
  }
}

export const fetchAddressByMemberId = async (memberId) => {
  try {
    const response = await api.get(`/address/${memberId}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar endereço do membro: ' + error.message);
  }
};
