/* eslint-disable @typescript-eslint/no-explicit-any */
export declare const fetchMembers: () => Promise<Member[]>;
export declare const fetchMemberById: (id: string) => Promise<Member>;
export declare const createMember: (data: Member) => Promise<Member>;
export declare const updateMember: (id: string, data: Partial<Member>) => Promise<Member>;
export declare const updateMemberStatus: (id: string, isActive: boolean) => Promise<Member>;
export declare const getCepData: (cep: string) => Promise<any>;
export declare const createAddress: (data: Address) => Promise<Address>;
export declare const fetchAddressByMemberId: (memberId: string) => Promise<Address>;
