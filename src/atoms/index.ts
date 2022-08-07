import { MutableSnapshot } from 'recoil';
import { userState } from './user';

export function recoilInitializer({ set }: MutableSnapshot) {
    const my = true;
    if (my) {
        set(userState, { username: '준비..' });
    }
}
