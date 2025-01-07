import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const notyf =
  typeof window !== 'undefined'
    ? new Notyf({
        duration: 5000,
        position: {
          x: 'right',
          y: 'top'
        },
        types: [
          {
            type: 'success',
            background: '#15803d'
          },
          {
            type: 'error',
            background: '#c94736'
          }
        ]
      })
    : null;
