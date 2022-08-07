import { atom, DefaultValue, selector } from 'recoil';

// 예시 코드입니다.
type UserType = {
    username: string;
};
export const userState = atom<UserType>({
    key: 'userState',
    default: { username: '' },
});

export const usernameSelector = selector({
    key: 'usernameSelector',
    get: ({ get }) => {
        return get(userState).username;
    },
    set: ({ set, get }, newValue) => {
        set(userState, (prev) => {
            return prev == null ? prev : { ...prev, username: newValue as string };
        });
    },
});
