import { useCallback, useEffect, useState } from 'react';

export default function useToggle(initValue = false) {
    const [visible, setVisible] = useState(initValue);

    useEffect(
        () => () => {
            setVisible(initValue);
        },
        [],
    );

    const handleVisible = useCallback(() => setVisible((prev) => !prev), []);

    return [visible, handleVisible] as const;
}
