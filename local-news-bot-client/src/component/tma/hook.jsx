// src/tma/hook.jsx
import { useContext } from 'react';
import TmaContext from './context';

const useTma = () => {
    return useContext(TmaContext);
};

export default useTma;
