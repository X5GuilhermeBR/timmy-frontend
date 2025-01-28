/* eslint-disable @typescript-eslint/no-explicit-any */
export declare const fetchMembers: () => Promise<any>;
export declare const fetchMemberById: (id: string) => Promise<Member>;
export declare const updateMember: (id: string, data: Partial<Member>) => Promise<any>;
