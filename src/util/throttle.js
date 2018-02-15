// @flow
export default function throttle(fn: () => void, time: number): () => number {
    let pending = false;
    let timerId = 0;

    const later = () => {
        timerId = 0;
        if (pending) {
            fn();
            timerId = setTimeout(later, time);
            pending = false;
        }
    };

    return () => {
        pending = true;
        if (!timerId) {
            later();
        }
        return timerId;
    };
};
